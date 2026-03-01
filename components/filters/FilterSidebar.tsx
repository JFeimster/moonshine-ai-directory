"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/lib/data/products";
import { filtersFromSearchParams, filtersToSearchParams, DEFAULT_FILTERS } from "@/lib/url";
import { amountToRange, scoreToTier } from "@/lib/filters";
import { FilterGroup } from "./FilterGroup";

const PRODUCT_TYPES = ["Line of Credit","Term Loan","MCA","Invoice Financing","SBA","Equipment"] as const;
const AMOUNTS = ["0-25k","25k-100k","100k-500k","500k+"] as const;
const TIMES = ["Same Day","Next Day","2-3 Days","1+ Week"] as const;
const CREDITS = ["Bad (≤579)","Fair (580-669)","Good (670-739)","Excellent (740+)"] as const;
const INDUSTRIES = ["SaaS","Ecommerce","Agency","Construction","Healthcare","Retail","Trucking","Hospitality","General"] as const;

export function FilterSidebar() {
  const sp = useSearchParams();
  const router = useRouter();
  const f = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);
  const [draft, setDraft] = useState(f);

  const counts = useMemo(() => {
    const typeCount = new Map<string, number>();
    const amtCount = new Map<string, number>();
    const timeCount = new Map<string, number>();
    const creditCount = new Map<string, number>();
    const industryCount = new Map<string, number>();

    for (const p of products) {
      typeCount.set(p.productType, (typeCount.get(p.productType) ?? 0) + 1);
      const ar = amountToRange(p.amountMin, p.amountMax);
      amtCount.set(ar, (amtCount.get(ar) ?? 0) + 1);
      timeCount.set(p.timeToFund, (timeCount.get(p.timeToFund) ?? 0) + 1);
      const ct = scoreToTier(p.minCreditScore);
      creditCount.set(ct, (creditCount.get(ct) ?? 0) + 1);
      for (const i of p.industries) industryCount.set(i, (industryCount.get(i) ?? 0) + 1);
    }

    return { typeCount, amtCount, timeCount, creditCount, industryCount };
  }, []);

  function apply() {
    router.push(`/products?${filtersToSearchParams({ ...draft, page: 1 }).toString()}`);
  }

  function clearAll() {
    setDraft(DEFAULT_FILTERS);
    router.push(`/products`);
  }

  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold">Filters</h2>
        <button className="text-sm text-slate-600 hover:text-slate-900" onClick={clearAll}>
          Clear all
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <FilterGroup title="Product Type" options={PRODUCT_TYPES as any} selected={draft.productTypes as any} counts={counts.typeCount}
          onChange={(v) => setDraft((d) => ({ ...d, productTypes: v as any }))} />

        <FilterGroup title="Amount Range" options={AMOUNTS as any} selected={draft.amountRanges as any} counts={counts.amtCount}
          onChange={(v) => setDraft((d) => ({ ...d, amountRanges: v as any }))} />

        <FilterGroup title="Time to Fund" options={TIMES as any} selected={draft.times as any} counts={counts.timeCount}
          onChange={(v) => setDraft((d) => ({ ...d, times: v as any }))} />

        <FilterGroup title="Credit Requirements" options={CREDITS as any} selected={draft.creditTiers as any} counts={counts.creditCount}
          onChange={(v) => setDraft((d) => ({ ...d, creditTiers: v as any }))} />

        <FilterGroup title="Industry" options={INDUSTRIES as any} selected={draft.industries as any} counts={counts.industryCount}
          onChange={(v) => setDraft((d) => ({ ...d, industries: v as any }))} />
      </div>

      <div className="mt-5 flex gap-2">
        <button onClick={apply} className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90">
          Apply Filters
        </button>
        <button onClick={() => setDraft(f)} className="flex-1 rounded-xl border px-4 py-2 text-sm font-medium hover:border-secondary">
          Reset
        </button>
      </div>
    </div>
  );
}
