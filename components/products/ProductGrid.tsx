"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/lib/data/products";
import { filterProducts } from "@/lib/filters";
import { filtersFromSearchParams, filtersToSearchParams } from "@/lib/url";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { SortSelect } from "./SortSelect";
import { Pagination } from "./Pagination";
import { AppliedChips } from "@/components/filters/AppliedChips";
import { useCompare } from "@/components/compare/useCompare";

const PAGE_SIZE = 12;

export function ProductGrid() {
  const sp = useSearchParams();
  const router = useRouter();
  const f = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);

  const [openId, setOpenId] = useState<string | null>(null);
  const compare = useCompare();

  const filtered = useMemo(() => filterProducts(products, f), [f]);
  const total = filtered.length;

  const page = f.page ?? 1;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const items = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  function setSort(sort: any) {
    const next = { ...f, sort, page: 1 };
    router.push(`/products?${filtersToSearchParams(next).toString()}`);
  }

  function setPage(nextPage: number) {
    const next = { ...f, page: nextPage };
    router.push(`/products?${filtersToSearchParams(next).toString()}`);
  }

  const active = products.find((p) => p.id === openId) ?? null;

  return (
    <div>
      <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li><a className="hover:text-slate-900" href="/">Home</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-slate-900">Funding Products</li>
          </ol>
        </nav>

        <div className="flex items-center justify-between gap-3 md:justify-end">
          <div className="text-sm text-slate-600">
            Showing <span className="font-medium text-slate-900">{items.length}</span> of{" "}
            <span className="font-medium text-slate-900">{total}</span>
          </div>
          <SortSelect value={f.sort} onChange={setSort} />
        </div>
      </div>

      <AppliedChips />

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onLearnMore={() => setOpenId(p.id)}
            onToggleCompare={() => compare.toggle(p)}
            isCompared={compare.has(p.id)}
          />
        ))}
      </div>

      <div className="mt-6">
        <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
      </div>

      <ProductModal product={active} open={!!active} onClose={() => setOpenId(null)} />
    </div>
  );
}
