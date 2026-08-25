"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products, productFamilies } from "@/lib/data/directory";
import {
  AMOUNT_BANDS,
  SPEED_BANDS,
  CREDIT_BANDS,
  REVENUE_BANDS,
  TIME_BANDS,
  matchesAmountBand
} from "@/lib/filters";
import { DEFAULT_FILTERS, filtersFromSearchParams, filtersToSearchParams } from "@/lib/url";
import { FilterGroup } from "./FilterGroup";

function countsFor(values: string[], getValues: (product: (typeof products)[number]) => string[]) {
  const map = new Map<string, number>();
  values.forEach((v) => map.set(v, 0));

  for (const p of products) {
    for (const v of getValues(p)) {
      if (map.has(v)) map.set(v, (map.get(v) ?? 0) + 1);
    }
  }
  return map;
}

export function FilterSidebar() {
  const sp = useSearchParams();
  const router = useRouter();
  const current = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);
  const provider = sp.get("provider");
  const [draft, setDraft] = useState(current);

  useEffect(() => {
    setDraft(current);
  }, [current]);

  const fundingTypes = useMemo(
    () => Array.from(new Set(products.map((p) => p.fundingType))).sort(),
    []
  );

  const familyLabels = new Map(productFamilies.map((x) => [x.id, x.name]));

  const familyCounts = useMemo(
    () => countsFor(productFamilies.map((x) => x.id), (p) => [p.productFamilyId]),
    []
  );

  const typeCounts = useMemo(
    () => countsFor(fundingTypes, (p) => [p.fundingType]),
    [fundingTypes]
  );

  const amountCounts = useMemo(() => {
    const map = new Map<string, number>();
    AMOUNT_BANDS.forEach((b) => map.set(b.id, products.filter((p) => matchesAmountBand(p, b.id)).length));
    return map;
  }, []);

  const speedCounts = useMemo(
    () => countsFor(SPEED_BANDS.map((x) => x.id), (p) => {
      const t = (p.timeToFunding || "").toLowerCase();
      if (t.includes("hour") || t.includes("same day")) {
        const nums = [...t.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
        const days = nums.length ? Math.max(...nums) / 24 : 1;
        return [days <= 1 ? "day1" : "days2-3"];
      }
      if (t.includes("day")) {
        const nums = [...t.matchAll(/\d+(?:\.\d+)?/g)].map((m) => Number(m[0]));
        const d = nums.length ? Math.max(...nums) : 1;
        return [d <= 3 ? "days2-3" : d <= 7 ? "days4-7" : "weekplus"];
      }
      return ["weekplus"];
    }),
    []
  );

  const creditCounts = useMemo(
    () => countsFor(CREDIT_BANDS.map((x) => x.id), (p) => {
      const s = p.minCreditScore;
      if (s == null) return ["nostated"];
      if (s < 600) return ["under600"];
      if (s < 650) return ["600-649"];
      if (s < 680) return ["650-679"];
      return ["680+"];
    }),
    []
  );

  const revenueCounts = useMemo(
    () => countsFor(REVENUE_BANDS.map((x) => x.id), (p) => {
      const v = p.minMonthlyRevenue;
      if (v == null) return ["nostated"];
      if (v < 5_000) return ["0-5k"];
      if (v < 10_000) return ["5k-10k"];
      if (v < 25_000) return ["10k-25k"];
      return ["25k+"];
    }),
    []
  );

  const timeCounts = useMemo(
    () => countsFor(TIME_BANDS.map((x) => x.id), (p) => {
      const v = p.minTimeInBusinessMonths;
      if (v == null) return ["nostated"];
      if (v <= 3) return ["0-3"];
      if (v <= 6) return ["3-6"];
      if (v <= 12) return ["6-12"];
      return ["12+"];
    }),
    []
  );

  function apply() {
    router.push(`/products?${filtersToSearchParams({ ...draft, page: 1 }, provider).toString()}`);
  }

  function clearAll() {
    setDraft(DEFAULT_FILTERS);
    router.push(provider ? `/products?provider=${encodeURIComponent(provider)}` : "/products");
  }

  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Filters</h2>
        <button className="text-sm text-slate-600 hover:text-slate-900" onClick={clearAll}>
          Clear all
        </button>
      </div>

      {provider && (
        <div className="mt-3 rounded-xl border bg-slate-50 p-3 text-xs text-slate-600">
          Showing products for one provider.
          <button className="ml-2 font-medium text-secondary hover:underline" onClick={() => router.push("/products")}>
            Remove provider
          </button>
        </div>
      )}

      <div className="mt-4 space-y-4">
        <FilterGroup
          title="Product Family"
          options={productFamilies.map((x) => x.id)}
          labels={familyLabels}
          selected={draft.familyIds}
          counts={familyCounts}
          onChange={(v) => setDraft((d) => ({ ...d, familyIds: v }))}
        />

        <FilterGroup
          title="Funding Type"
          options={fundingTypes}
          selected={draft.fundingTypes}
          counts={typeCounts}
          onChange={(v) => setDraft((d) => ({ ...d, fundingTypes: v }))}
        />

        <FilterGroup
          title="Amount Needed"
          options={AMOUNT_BANDS.map((x) => x.id)}
          labels={new Map(AMOUNT_BANDS.map((x) => [x.id, x.label]))}
          selected={draft.amountBands}
          counts={amountCounts}
          onChange={(v) => setDraft((d) => ({ ...d, amountBands: v }))}
        />

        <FilterGroup
          title="Time to Funding"
          options={SPEED_BANDS.map((x) => x.id)}
          labels={new Map(SPEED_BANDS.map((x) => [x.id, x.label]))}
          selected={draft.speedBands}
          counts={speedCounts}
          onChange={(v) => setDraft((d) => ({ ...d, speedBands: v }))}
        />

        <FilterGroup
          title="Minimum Credit"
          options={CREDIT_BANDS.map((x) => x.id)}
          labels={new Map(CREDIT_BANDS.map((x) => [x.id, x.label]))}
          selected={draft.creditBands}
          counts={creditCounts}
          onChange={(v) => setDraft((d) => ({ ...d, creditBands: v }))}
        />

        <FilterGroup
          title="Monthly Revenue"
          options={REVENUE_BANDS.map((x) => x.id)}
          labels={new Map(REVENUE_BANDS.map((x) => [x.id, x.label]))}
          selected={draft.revenueBands}
          counts={revenueCounts}
          onChange={(v) => setDraft((d) => ({ ...d, revenueBands: v }))}
        />

        <FilterGroup
          title="Time in Business"
          options={TIME_BANDS.map((x) => x.id)}
          labels={new Map(TIME_BANDS.map((x) => [x.id, x.label]))}
          selected={draft.timeBands}
          counts={timeCounts}
          onChange={(v) => setDraft((d) => ({ ...d, timeBands: v }))}
        />

        <label className="flex cursor-pointer items-center justify-between rounded-xl border px-3 py-3">
          <span>
            <span className="block text-sm font-medium">Startup eligible</span>
            <span className="block text-xs text-slate-500">Show products marked startup-friendly</span>
          </span>
          <input
            type="checkbox"
            checked={draft.startupOnly}
            onChange={(e) => setDraft((d) => ({ ...d, startupOnly: e.target.checked }))}
            className="h-4 w-4"
          />
        </label>
      </div>

      <div className="mt-5 flex gap-2">
        <button onClick={apply} className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          Apply Filters
        </button>
        <button onClick={() => setDraft(current)} className="rounded-xl border px-4 py-2 text-sm font-medium hover:border-secondary">
          Reset
        </button>
      </div>
    </div>
  );
}
