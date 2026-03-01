import { PartnersCarousel } from "@/components/partners/PartnersCarousel";

export function PartnerSpotlight() {
  return (
    <section className="rounded-2xl bg-card p-6 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Partner Spotlight</h2>
          <p className="mt-1 text-sm text-slate-600">Featured funding partners with proven conversion.</p>
        </div>
        <a className="rounded-xl border bg-white px-4 py-2 text-sm hover:border-secondary" href="/partners">
          View All Partners
        </a>
      </div>

      <div className="mt-5">
        <PartnersCarousel />
      </div>
    </section>
  );
}
