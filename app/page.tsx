import { Header } from "@/components/header/Header";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PartnerSpotlight } from "@/components/partners/PartnerSpotlight";
import { ResourcesSection } from "@/components/resources/ResourcesSection";
import { CompareBar } from "@/components/compare/CompareBar";

export default function HomePage() {
  return (
    <div>
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-28">
        <section className="py-8">
          <div className="rounded-2xl bg-card shadow-soft">
            <div className="p-6 md:p-10">
              <h1 className="text-3xl font-semibold md:text-4xl">Find Your Perfect Funding Match</h1>
              <p className="mt-2 max-w-2xl text-slate-600">
                Search by speed, amount, credit score, and industry. Compare up to 3 products side-by-side.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {["SaaS Funding", "Bad Credit", "Next-Day Cash"].map((x) => (
                  <a
                    key={x}
                    href={`/products?q=${encodeURIComponent(x)}`}
                    className="rounded-full border bg-white px-3 py-1 text-sm hover:border-secondary"
                  >
                    {x}
                  </a>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {["Line of Credit", "Term Loan", "MCA", "Invoice Financing", "SBA", "Equipment"].map((c) => (
                  <a
                    key={c}
                    href={`/products?type=${encodeURIComponent(c)}`}
                    className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    {c}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-auto">
            <FilterSidebar />
          </aside>
          <div>
            <ProductGrid />
          </div>
        </section>

        <section className="mt-10">
          <PartnerSpotlight />
        </section>

        <section className="mt-10">
          <ResourcesSection />
        </section>

        <footer className="mt-12 border-t py-10 text-sm text-slate-600">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <div className="font-semibold text-slate-900">Product Categories</div>
              <ul className="mt-2 space-y-1">
                <li><a className="hover:text-slate-900" href="/products?type=Line%20of%20Credit">Line of Credit</a></li>
                <li><a className="hover:text-slate-900" href="/products?type=Term%20Loan">Term Loans</a></li>
                <li><a className="hover:text-slate-900" href="/products?type=MCA">MCA</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Partners</div>
              <ul className="mt-2 space-y-1">
                <li><a className="hover:text-slate-900" href="#">Partner Program</a></li>
                <li><a className="hover:text-slate-900" href="#">Featured Partners</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Resources</div>
              <ul className="mt-2 space-y-1">
                <li><a className="hover:text-slate-900" href="#">Guides</a></li>
                <li><a className="hover:text-slate-900" href="#">Videos</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Legal</div>
              <ul className="mt-2 space-y-1">
                <li><a className="hover:text-slate-900" href="#">Disclosures</a></li>
                <li><a className="hover:text-slate-900" href="#">Privacy</a></li>
                <li><a className="hover:text-slate-900" href="#">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-xs">© {new Date().getFullYear()} Moonshine Capital. All rights reserved.</div>
        </footer>
      </main>

      <CompareBar />
    </div>
  );
}
