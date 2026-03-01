"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductSubmission } from "@/lib/types";

export function AdminSubmissions() {
  const [items, setItems] = useState<ProductSubmission[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function refresh() {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/submissions");
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to load submissions.");
      setItems(data.items);
    } catch (e: any) {
      setErr(e.message || "Failed.");
    } finally {
      setLoading(false);
    }
  }

  async function decide(id: string, status: "approved" | "rejected") {
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to update.");
      await refresh();
    } catch (e: any) {
      setErr(e.message || "Failed.");
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const grouped = useMemo(() => {
    const all = items ?? [];
    return {
      submitted: all.filter((x) => x.status === "submitted"),
      approved: all.filter((x) => x.status === "approved"),
      rejected: all.filter((x) => x.status === "rejected")
    };
  }, [items]);

  return (
    <section className="rounded-2xl bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Submissions</h2>
          <p className="mt-1 text-sm text-slate-600">Approve to publish to the directory.</p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border bg-white px-4 py-2 text-sm hover:border-secondary" onClick={refresh} disabled={loading}>
            Refresh
          </button>
          <a className="rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white hover:opacity-90" href="/products">
            View directory
          </a>
        </div>
      </div>

      {err && <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}

      {!items && (
        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-2xl bg-slate-100" />
          ))}
        </div>
      )}

      {items && (
        <div className="mt-6 space-y-8">
          <Group title={`Needs review (${grouped.submitted.length})`} items={grouped.submitted} onDecide={decide} loading={loading} />
          <Group title={`Approved (${grouped.approved.length})`} items={grouped.approved} onDecide={decide} loading={loading} readOnly />
          <Group title={`Rejected (${grouped.rejected.length})`} items={grouped.rejected} onDecide={decide} loading={loading} readOnly />
        </div>
      )}
    </section>
  );
}

function Group({
  title,
  items,
  onDecide,
  loading,
  readOnly
}: {
  title: string;
  items: ProductSubmission[];
  onDecide: (id: string, status: "approved" | "rejected") => void;
  loading: boolean;
  readOnly?: boolean;
}) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      {items.length === 0 ? (
        <div className="mt-2 text-sm text-slate-600">None.</div>
      ) : (
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {items.map((s) => (
            <div key={s.id} className="rounded-2xl border bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-slate-600">{s.providerName}</div>
                </div>
                <span className="rounded-full border bg-white px-3 py-1 text-xs">{s.status}</span>
              </div>

              <div className="mt-3 text-sm text-slate-600">{s.tagline}</div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-slate-500">Amount</div>
                  <div className="font-medium text-slate-900">${Math.round(s.amountMin / 1000)}k–${Math.round(s.amountMax / 1000)}k</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-slate-500">Speed</div>
                  <div className="font-medium text-slate-900">{s.timeToFund}</div>
                </div>
                <div className="rounded-lg bg-slate-50 p-2">
                  <div className="text-slate-500">Min credit</div>
                  <div className="font-medium text-slate-900">{s.minCreditScore}+</div>
                </div>
              </div>

              <div className="mt-4">
                <a className="text-sm font-medium text-secondary hover:underline" href={s.applyUrl} target="_blank" rel="noreferrer">
                  Apply link ↗
                </a>
              </div>

              {!readOnly && (
                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
                    onClick={() => onDecide(s.id, "approved")}
                    disabled={loading}
                  >
                    Approve
                  </button>
                  <button
                    className="flex-1 rounded-xl border bg-white px-4 py-2 text-sm hover:border-secondary disabled:opacity-50"
                    onClick={() => onDecide(s.id, "rejected")}
                    disabled={loading}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
