"use client";

import { useState } from "react";

const PRODUCT_TYPES = ["Line of Credit","Term Loan","MCA","Invoice Financing","SBA","Equipment"] as const;
const TIMES = ["Same Day","Next Day","2-3 Days","1+ Week"] as const;
const INDUSTRIES = ["SaaS","Ecommerce","Agency","Construction","Healthcare","Retail","Trucking","Hospitality","General"] as const;

export function ProviderSubmitForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | { id: string }>(null);
  const [err, setErr] = useState<string | null>(null);

  const [form, setForm] = useState({
    providerName: "",
    providerLogo: "",
    name: "",
    tagline: "",
    productType: "Line of Credit",
    industries: ["General"],
    amountMin: 10000,
    amountMax: 100000,
    timeToFund: "Next Day",
    minCreditScore: 600,
    features: "Fast approval\nClear terms\nFlexible credit",
    applyUrl: ""
  });

  async function submit() {
    setErr(null);
    setOk(null);
    setLoading(true);

    try {
      const payload = {
        providerName: form.providerName.trim(),
        providerLogo: form.providerLogo.trim() || undefined,
        name: form.name.trim(),
        tagline: form.tagline.trim(),
        productType: form.productType,
        industries: form.industries,
        amountMin: Number(form.amountMin),
        amountMax: Number(form.amountMax),
        timeToFund: form.timeToFund,
        minCreditScore: Number(form.minCreditScore),
        features: form.features.split("\n").map((x) => x.trim()).filter(Boolean),
        applyUrl: form.applyUrl.trim()
      };

      if (!payload.providerName || !payload.name || !payload.tagline || !payload.applyUrl) {
        throw new Error("Missing required fields: provider name, product name, tagline, and apply URL.");
      }

      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to submit.");
      setOk({ id: data.submission.id });
    } catch (e: any) {
      setErr(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function toggleIndustry(v: string) {
    setForm((f) => {
      const has = f.industries.includes(v);
      const next = has ? f.industries.filter((x) => x !== v) : [...f.industries, v];
      return { ...f, industries: next.length ? next : ["General"] };
    });
  }

  return (
    <section className="rounded-2xl bg-card p-6 shadow-soft">
      <h2 className="text-xl font-semibold">Submit a product</h2>
      <p className="mt-1 text-sm text-slate-600">
        Be specific. The directory works when constraints are honest: amount, speed, and credit.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Provider name *</label>
          <input
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.providerName}
            onChange={(e) => setForm((f) => ({ ...f, providerName: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Provider logo URL (optional)</label>
          <input
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            placeholder="/logos/provider-a.svg"
            value={form.providerLogo}
            onChange={(e) => setForm((f) => ({ ...f, providerLogo: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Product name *</label>
          <input
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Tagline *</label>
          <input
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.tagline}
            onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Product type</label>
          <select
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.productType}
            onChange={(e) => setForm((f) => ({ ...f, productType: e.target.value }))}
          >
            {PRODUCT_TYPES.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Time to fund</label>
          <select
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.timeToFund}
            onChange={(e) => setForm((f) => ({ ...f, timeToFund: e.target.value }))}
          >
            {TIMES.map((x) => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Amount min</label>
          <input
            type="number"
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.amountMin}
            onChange={(e) => setForm((f) => ({ ...f, amountMin: Number(e.target.value) }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Amount max</label>
          <input
            type="number"
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.amountMax}
            onChange={(e) => setForm((f) => ({ ...f, amountMax: Number(e.target.value) }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Minimum credit score</label>
          <input
            type="number"
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.minCreditScore}
            onChange={(e) => setForm((f) => ({ ...f, minCreditScore: Number(e.target.value) }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Apply URL *</label>
          <input
            className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            placeholder="https://..."
            value={form.applyUrl}
            onChange={(e) => setForm((f) => ({ ...f, applyUrl: e.target.value }))}
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Industries</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {INDUSTRIES.map((i) => {
              const on = form.industries.includes(i);
              return (
                <button
                  type="button"
                  key={i}
                  onClick={() => toggleIndustry(i)}
                  className={`rounded-full border px-3 py-2 text-xs font-medium hover:border-secondary ${
                    on ? "bg-secondary text-white border-secondary" : "bg-white"
                  }`}
                >
                  {i}
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">Key features (one per line)</label>
          <textarea
            className="mt-1 h-28 w-full rounded-xl border bg-white px-3 py-2 text-sm"
            value={form.features}
            onChange={(e) => setForm((f) => ({ ...f, features: e.target.value }))}
          />
        </div>
      </div>

      {err && <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{err}</div>}
      {ok && (
        <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
          Submitted. Tracking ID: <span className="font-mono">{ok.id}</span>. An admin must approve before it publishes.
          <div className="mt-2">
            <a className="text-secondary hover:underline" href="/portal/admin">Go to admin review →</a>
          </div>
        </div>
      )}

      <div className="mt-5 flex gap-2">
        <button
          className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit for review"}
        </button>
        <a className="rounded-xl border bg-white px-5 py-2 text-sm hover:border-secondary" href="/portal/admin">
          Admin review
        </a>
      </div>
    </section>
  );
}
