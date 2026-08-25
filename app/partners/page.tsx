import { Header } from "@/components/header/Header";
import { PartnersCarousel } from "@/components/partners/PartnersCarousel";
import { PartnersList } from "@/components/partners/PartnersList";

export const metadata = {
  title: "Funding Partners — Moonshine Capital",
  description: "Browse funding partners by product focus, industries, and typical qualification profile."
};

export default function PartnersPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <div className="py-8">
          <h1 className="text-3xl font-semibold md:text-4xl">Funding Partners</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Compare providers by the types of capital they offer, the businesses they serve, and their typical qualification profile.
          </p>
        </div>

        <section className="rounded-2xl bg-card p-6 shadow-soft">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Featured Partners</h2>
              <p className="mt-1 text-sm text-slate-600">Partners with multiple active products in the directory.</p>
            </div>
            <a className="rounded-xl border bg-white px-4 py-2 text-sm hover:border-secondary" href="#all">
              Jump to full list
            </a>
          </div>
          <div className="mt-5">
            <PartnersCarousel />
          </div>
        </section>

        <section id="all" className="mt-8">
          <PartnersList />
        </section>
      </main>
    </div>
  );
}
