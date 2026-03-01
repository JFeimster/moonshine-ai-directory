"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { filtersFromSearchParams, filtersToSearchParams, DEFAULT_FILTERS } from "@/lib/url";

export function AppliedChips() {
  const sp = useSearchParams();
  const router = useRouter();
  const f = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);

  const chips = [
    ...f.productTypes.map((v) => ({ k: "type", v })),
    ...f.amountRanges.map((v) => ({ k: "amt", v })),
    ...f.times.map((v) => ({ k: "time", v })),
    ...f.creditTiers.map((v) => ({ k: "credit", v })),
    ...f.industries.map((v) => ({ k: "industry", v }))
  ];

  if (chips.length === 0 && !f.q) return null;

  function remove(k: string, v: string) {
    const next = { ...f, page: 1 };
    if (k === "type") next.productTypes = next.productTypes.filter((x) => x !== (v as any));
    if (k === "amt") next.amountRanges = next.amountRanges.filter((x) => x !== (v as any));
    if (k === "time") next.times = next.times.filter((x) => x !== (v as any));
    if (k === "credit") next.creditTiers = next.creditTiers.filter((x) => x !== (v as any));
    if (k === "industry") next.industries = next.industries.filter((x) => x !== (v as any));
    router.push(`/products?${filtersToSearchParams(next).toString()}`);
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {f.q && (
        <span className="rounded-full border bg-white px-3 py-1 text-xs">
          Search: {f.q}
          <button className="ml-2 text-slate-500 hover:text-slate-900" onClick={() => router.push(`/products?${filtersToSearchParams({ ...f, q: "", page: 1 }).toString()}`)} aria-label="Remove search">
            ×
          </button>
        </span>
      )}

      {chips.map((c) => (
        <span key={`${c.k}:${c.v}`} className="rounded-full border bg-white px-3 py-1 text-xs">
          {c.v}
          <button className="ml-2 text-slate-500 hover:text-slate-900" onClick={() => remove(c.k, c.v)} aria-label={`Remove ${c.v}`}>
            ×
          </button>
        </span>
      ))}

      <button
        className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white hover:opacity-90"
        onClick={() => router.push("/products")}
      >
        Clear all
      </button>
    </div>
  );
}
