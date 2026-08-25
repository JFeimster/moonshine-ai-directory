"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { filtersFromSearchParams, filtersToSearchParams } from "@/lib/url";

const QUICK = [
  { key: "amt", label: "Funding Amount", value: "25k-100k" },
  { key: "speed", label: "Speed", value: "day1" },
  { key: "credit", label: "Credit Score", value: "under600" },
  { key: "revenue", label: "Revenue", value: "10k-25k" }
] as const;

export function QuickFilters() {
  const router = useRouter();
  const sp = useSearchParams();
  const f = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);
  const provider = sp.get("provider");

  function toggle(q: (typeof QUICK)[number]) {
    const next = { ...f, page: 1 };

    if (q.key === "amt") {
      next.amountBands = next.amountBands.includes(q.value)
        ? next.amountBands.filter((x) => x !== q.value)
        : [...next.amountBands, q.value];
    }
    if (q.key === "speed") {
      next.speedBands = next.speedBands.includes(q.value)
        ? next.speedBands.filter((x) => x !== q.value)
        : [...next.speedBands, q.value];
    }
    if (q.key === "credit") {
      next.creditBands = next.creditBands.includes(q.value)
        ? next.creditBands.filter((x) => x !== q.value)
        : [...next.creditBands, q.value];
    }
    if (q.key === "revenue") {
      next.revenueBands = next.revenueBands.includes(q.value)
        ? next.revenueBands.filter((x) => x !== q.value)
        : [...next.revenueBands, q.value];
    }

    router.push(`/products?${filtersToSearchParams(next, provider).toString()}`);
  }

  const active = new Set<string>();
  f.amountBands.forEach((x) => active.add(`amt:${x}`));
  f.speedBands.forEach((x) => active.add(`speed:${x}`));
  f.creditBands.forEach((x) => active.add(`credit:${x}`));
  f.revenueBands.forEach((x) => active.add(`revenue:${x}`));

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
              on ? "border-secondary bg-secondary text-white" : "bg-white"
            }`}
          >
            {q.label}
          </button>
        );
      })}
    </div>
  );
}
