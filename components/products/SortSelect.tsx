"use client";

import type { SortOption } from "@/lib/types";

export function SortSelect({
  value,
  onChange
}: {
  value: SortOption;
  onChange: (v: SortOption) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-slate-600">Sort</span>
      <select
        className="rounded-xl border bg-white px-3 py-2 text-sm"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        aria-label="Sort products"
      >
        <option value="relevance">Relevance</option>
        <option value="speed">Fastest</option>
        <option value="amount">Highest amount</option>
        <option value="credit">Lowest credit minimum</option>
      </select>
    </label>
  );
}
