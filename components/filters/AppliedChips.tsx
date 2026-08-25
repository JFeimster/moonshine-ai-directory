"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { productFamilies } from "@/lib/data/directory";
import { AMOUNT_BANDS, SPEED_BANDS, CREDIT_BANDS, REVENUE_BANDS, TIME_BANDS } from "@/lib/filters";
import { filtersFromSearchParams, filtersToSearchParams } from "@/lib/url";

const labelMap = new Map<string, string>([
  ...productFamilies.map((x) => [`family:${x.id}`, x.name] as [string, string]),
  ...AMOUNT_BANDS.map((x) => [`amt:${x.id}`, x.label] as [string, string]),
  ...SPEED_BANDS.map((x) => [`speed:${x.id}`, x.label] as [string, string]),
  ...CREDIT_BANDS.map((x) => [`credit:${x.id}`, x.label] as [string, string]),
  ...REVENUE_BANDS.map((x) => [`revenue:${x.id}`, x.label] as [string, string]),
  ...TIME_BANDS.map((x) => [`tib:${x.id}`, x.label] as [string, string])
]);

export function AppliedChips() {
  const sp = useSearchParams();
  const router = useRouter();
  const f = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);
  const provider = sp.get("provider");

  const chips = [
    ...f.familyIds.map((v) => ({ k: "family", v })),
    ...f.fundingTypes.map((v) => ({ k: "type", v })),
    ...f.amountBands.map((v) => ({ k: "amt", v })),
    ...f.speedBands.map((v) => ({ k: "speed", v })),
    ...f.creditBands.map((v) => ({ k: "credit", v })),
    ...f.revenueBands.map((v) => ({ k: "revenue", v })),
    ...f.timeBands.map((v) => ({ k: "tib", v })),
    ...(f.startupOnly ? [{ k: "startup", v: "Startup eligible" }] : [])
  ];

  if (chips.length === 0 && !f.q && !provider) return null;

  function push(next: typeof f) {
    router.push(`/products?${filtersToSearchParams({ ...next, page: 1 }, provider).toString()}`);
  }

  function remove(k: string, v: string) {
    const next = { ...f };

    if (k === "family") next.familyIds = next.familyIds.filter((x) => x !== v);
    if (k === "type") next.fundingTypes = next.fundingTypes.filter((x) => x !== v);
    if (k === "amt") next.amountBands = next.amountBands.filter((x) => x !== v);
    if (k === "speed") next.speedBands = next.speedBands.filter((x) => x !== v);
    if (k === "credit") next.creditBands = next.creditBands.filter((x) => x !== v);
    if (k === "revenue") next.revenueBands = next.revenueBands.filter((x) => x !== v);
    if (k === "tib") next.timeBands = next.timeBands.filter((x) => x !== v);
    if (k === "startup") next.startupOnly = false;

    push(next);
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      {provider && (
        <span className="rounded-full border bg-white px-3 py-1 text-xs">
          Provider filter
          <button className="ml-2 text-slate-500 hover:text-slate-900" onClick={() => router.push("/products")} aria-label="Remove provider filter">
            ×
          </button>
        </span>
      )}

      {f.q && (
        <span className="rounded-full border bg-white px-3 py-1 text-xs">
          Search: {f.q}
          <button className="ml-2 text-slate-500 hover:text-slate-900" onClick={() => push({ ...f, q: "" })} aria-label="Remove search">
            ×
          </button>
        </span>
      )}

      {chips.map((c) => (
        <span key={`${c.k}:${c.v}`} className="rounded-full border bg-white px-3 py-1 text-xs">
          {labelMap.get(`${c.k}:${c.v}`) ?? c.v}
          <button className="ml-2 text-slate-500 hover:text-slate-900" onClick={() => remove(c.k, c.v)} aria-label={`Remove ${c.v}`}>
            ×
          </button>
        </span>
      ))}
    </div>
  );
}
