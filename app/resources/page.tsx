import { Header } from "@/components/header/Header";
import { resources } from "@/lib/data/resources";

export const metadata = {
  title: "Resources — Moonshine Capital",
  description: "Guides, tips, and playbooks to choose funding and improve approval odds."
};

export default function ResourcesPage() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <div className="py-8">
          <h1 className="text-3xl font-semibold md:text-4xl">Resources</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Education that improves conversion: clearer choices, fewer failed applications, faster funding.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resources
            .slice()
            .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
            .map((r) => (
              <a key={r.slug} href={`/resources/${r.slug}`} className="rounded-2xl bg-card p-6 shadow-soft hover:opacity-95">
                <div className="flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span key={t} className="rounded-full border bg-white px-3 py-1 text-xs">
                      {t}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 text-xl font-semibold">{r.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{r.excerpt}</p>
                <div className="mt-4 text-xs text-slate-500">
                  {new Date(r.publishedAt).toLocaleDateString()} • {r.readingTime}
                </div>
                <div className="mt-6 inline-flex rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-white">
                  Read →
                </div>
              </a>
            ))}
        </div>
      </main>
    </div>
  );
}
