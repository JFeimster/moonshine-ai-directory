"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products, partners } from "@/lib/data/directory";
import { filterProducts } from "@/lib/filters";
import { filtersFromSearchParams, filtersToSearchParams } from "@/lib/url";
import { ProductCard } from "./ProductCard";
import { ProductModal } from "./ProductModal";
import { SortSelect } from "./SortSelect";
import { Pagination } from "./Pagination";
import { AppliedChips } from "@/components/filters/AppliedChips";
import { useCompare } from "@/components/compare/useCompare";
import type { SortOption } from "@/lib/types";

const PAGE_SIZE = 12;

export function ProductGrid() {
  const sp = useSearchParams();
  const router = useRouter();
  const f = useMemo(() => filtersFromSearchParams(new URLSearchParams(sp.toString())), [sp]);
  const providerId = sp.get("provider");

  const [openId, setOpenId] = useState<string | null>(sp.get("open"));
  const compare = useCompare();

  useEffect(() => {
    setOpenId(sp.get("open"));
  }, [sp]);

  const filtered = useMemo(() => filterProducts(products, f, providerId), [f, providerId]);
  const total = filtered.length;
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(f.page, pageCount);
  const items = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const providerName = providerId ? partners.find((p) => p.id === providerId)?.name : null;

  function setSort(sort: SortOption) {
    const next = { ...f, sort, page: 1 };
    router.push(`/products?${filtersToSearchParams(next, providerId).toString()}`);
  }

  function setPage(page: number) {
    const next = { ...f, page };
    router.push(`/products?${filtersToSearchParams(next, providerId).toString()}`);
  }

  function openProduct(id: string) {
    setOpenId(id);
    const next = new URLSearchParams(sp.toString());
    next.set("open", id);
    router.replace(`/products?${next.toString()}`, { scroll: false });
  }

  function closeProduct() {
    setOpenId(null);
    const next = new URLSearchParams(sp.toString());
    next.delete("open");
    router.replace(`/products?${next.toString()}`, { scroll: false });
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
            {providerName && (
              <>
                <li aria-hidden="true">/</li>
                <li className="text-slate-900">{providerName}</li>
              </>
            )}
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

      {items.length === 0 ? (
        <div className="mt-4 rounded-2xl border bg-white p-8 text-center">
          <h3 className="font-semibold">No products match those filters.</h3>
          <p className="mt-1 text-sm text-slate-600">Clear a filter or broaden the amount, credit, or speed criteria.</p>
          <a href="/products" className="mt-4 inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white">
            Clear filters
          </a>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onLearnMore={() => openProduct(p.id)}
              onToggleCompare={() => compare.toggle(p)}
              isCompared={compare.has(p.id)}
            />
          ))}
        </div>
      )}

      <div className="mt-6">
        <Pagination page={safePage} pageCount={pageCount} onPageChange={setPage} />
      </div>

      <ProductModal product={active} open={!!active} onClose={closeProduct} />
    </div>
  );
}
