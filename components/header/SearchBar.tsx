"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { products } from "@/lib/data/directory";
import { filtersFromSearchParams, filtersToSearchParams } from "@/lib/url";

export function SearchBar() {
  const router = useRouter();
  const sp = useSearchParams();
  const f = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);
  const [value, setValue] = useState(f.q);

  const suggestions = useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return [];

    const pool = new Set<string>();

    for (const p of products) {
      if (p.name.toLowerCase().includes(q)) pool.add(p.name);
      if (p.providerName.toLowerCase().includes(q)) pool.add(p.providerName);
      if (p.fundingType.toLowerCase().includes(q)) pool.add(p.fundingType);
      if (p.productFamilyName.toLowerCase().includes(q)) pool.add(p.productFamilyName);
    }

    return Array.from(pool).slice(0, 7);
  }, [value]);

  function submit(nextQ: string) {
    const next = { ...f, q: nextQ, page: 1 };
    const provider = sp.get("provider");
    router.push(`/products?${filtersToSearchParams(next, provider).toString()}`);
  }

  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(value);
        }}
        className="flex items-center gap-2"
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Search ${products.length}+ funding products...`}
          className="w-full rounded-2xl border bg-white px-4 py-3 text-sm shadow-sm"
          aria-label="Search funding products"
        />
        <button className="rounded-2xl bg-secondary px-4 py-3 text-sm font-medium text-white hover:opacity-90">
          Search
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-[52px] z-50 overflow-hidden rounded-2xl border bg-white shadow-soft">
          <ul className="max-h-64 overflow-auto py-2">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50"
                  onClick={() => {
                    setValue(s);
                    submit(s);
                  }}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
