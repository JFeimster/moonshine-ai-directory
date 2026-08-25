import { Header } from "@/components/header/Header";
import { FilterSidebar } from "@/components/filters/FilterSidebar";
import { ProductGrid } from "@/components/products/ProductGrid";
import { PartnerSpotlight } from "@/components/partners/PartnerSpotlight";
import { ResourcesSection } from "@/components/resources/ResourcesSection";
import { CompareBar } from "@/components/compare/CompareBar";
import { fundingDisclaimer, productFamilies, products } from "@/lib/data/directory";

export default function HomePage() {
  return (
    <div>
      <Header />

      <main className="mx-auto max-w-7xl px-4 pb-28">
        <section className="py-8">
          <div className="rounded-2xl bg-card shadow-soft">
            <div className="p-6 md:p-10">
              <div className="text-sm font-medium text-primary">Moonshine Capital Funding Directory</div>
              <h1 className="mt-2 text-3xl font-semibold md:text-4xl">Find the capital lane that actually fits the file.</h1>
              <p className="mt-2 max-w-3xl text-slate-600">
                Compare {products.length} funding products by amount, speed, credit profile, monthly revenue, time in business, and funding type.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                <a href="/products?family=working-capital" className="rounded-full border bg-white px-3 py-1 text-sm hover:border-secondary">
                  Working Capital
                </a>
                <a href="/products?credit=under600" className="rounded-full border bg-white px-3 py-1 text-sm hover:border-secondary">
                  Under 600 Credit
                </a>
                <a href="/products?speed=day1" className="rounded-full border bg-white px-3 py-1 text-sm hover:border-secondary">
                  ≤ 24-Hour Funding
                </a>
                <a href="/products?startup=1" className="rounded-full border bg-white px-3 py-1 text-sm hover:border-secondary">
                  Startup Eligible
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {productFamilies.map((family) => (
                  <a
                    key={family.id}
                    href={`/products?family=${encodeURIComponent(family.id)}`}
                    className="rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                  >
                    {family.name}
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

        <div className="mt-10 rounded-xl border bg-white p-4 text-xs leading-relaxed text-slate-600">
          {fundingDisclaimer}
        </div>

        <footer className="mt-12 border-t py-10 text-sm text-slate-600">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div>
              <div className="font-semibold text-slate-900">Funding</div>
              <ul className="mt-2 space-y-1">
                <li><a className="hover:text-slate-900" href="/products">All Products</a></li>
                <li><a className="hover:text-slate-900" href="/products?family=working-capital">Working Capital</a></li>
                <li><a className="hover:text-slate-900" href="/products?family=business-line-access">Business Lines</a></li>
                <li><a className="hover:text-slate-900" href="/products?family=real-estate-capital">Real Estate Capital</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Directory</div>
              <ul className="mt-2 space-y-1">
                <li><a className="hover:text-slate-900" href="/partners">Funding Partners</a></li>
                <li><a className="hover:text-slate-900" href="/tools">Funding Tools</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold text-slate-900">Resources</div>
              <ul className="mt-2 space-y-1">
                <li><a className="hover:text-slate-900" href="/resources">Guides</a></li>
                <li><a className="hover:text-slate-900" href="/tools">Calculators & Tools</a></li>
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
