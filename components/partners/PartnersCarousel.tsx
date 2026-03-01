import { partners } from "@/lib/data/partners";

export function PartnersCarousel() {
  return (
    <div className="relative">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
        {partners.map((p) => (
          <a
            key={p.id}
            href={p.link}
            className="min-w-[280px] snap-start rounded-2xl border bg-white p-4 hover:border-secondary"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-100" aria-hidden="true" />
              <div>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="text-xs text-slate-600">{p.specialization}</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Speed</div>
                <div className="font-medium text-slate-900">{p.speed}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Min Credit</div>
                <div className="font-medium text-slate-900">{p.minCredit}+</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2">
                <div className="text-slate-500">Types</div>
                <div className="font-medium text-slate-900">{p.productTypes.length}</div>
              </div>
            </div>

            <div className="mt-4 inline-flex rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white hover:opacity-90">
              Browse products →
            </div>
          </a>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500">Tip: swipe horizontally to view more partners.</p>
    </div>
  );
}
