"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { filtersFromSearchParams, filtersToSearchParams } from "@/lib/url";

const QUICK = [
  { key: "industry", label: "Business Type", value: "SaaS" },
  { key: "amt", label: "Funding Amount", value: "25k-100k" },
  { key: "time", label: "Speed", value: "Next Day" },
  { key: "credit", label: "Credit Score", value: "Fair (580-669)" }
] as const;

export function QuickFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const f = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);

  function toggle(q: typeof QUICK[number]) {
    const next = { ...f, page: 1 };
    if (q.key === "industry") {
      const v = q.value;
      next.industries = next.industries.includes(v as any)
        ? next.industries.filter((x) => x !== (v as any))
        : [...next.industries, v as any];
    } else if (q.key === "amt") {
      const v = q.value;
      next.amountRanges = next.amountRanges.includes(v as any)
        ? next.amountRanges.filter((x) => x !== (v as any))
        : [...next.amountRanges, v as any];
    } else if (q.key === "time") {
      const v = q.value;
      next.times = next.times.includes(v as any)
        ? next.times.filter((x) => x !== (v as any))
        : [...next.times, v as any];
    } else if (q.key === "credit") {
      const v = q.value;
      next.creditTiers = next.creditTiers.includes(v as any)
        ? next.creditTiers.filter((x) => x !== (v as any))
        : [...next.creditTiers, v as any];
    }
    router.push(`/products?${filtersToSearchParams(next).toString()}`);
  }

  const active = new Set<string>();
  for (const i of f.industries) active.add("industry:" + i);
  for (const a of f.amountRanges) active.add("amt:" + a);
  for (const t of f.times) active.add("time:" + t);
  for (const c of f.creditTiers) active.add("credit:" + c);

  return (
    <div className="flex flex-wrap gap-2">
      {QUICK.map((q) => {
        const id = `${q.key}:${q.value}`;
        const on = active.has(id);
        return (
          <button
            key={id}
            onClick={() => toggle(q)}
            className={`rounded-full border px-3 py-2 text-xs font-medium hover:border-secondary ${
              on ? "bg-secondary text-white border-secondary" : "bg-white"
            }`}
          >
            {q.label}
          </button>
        );
      })}
    </div>
  );
}
