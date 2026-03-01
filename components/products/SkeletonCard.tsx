export function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft">
      <div className="h-5 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="mt-6 grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-12 animate-pulse rounded bg-slate-100" />
        ))}
      </div>
      <div className="mt-6 space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 animate-pulse rounded bg-slate-100" />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2">
        <div className="h-10 animate-pulse rounded bg-slate-100" />
        <div className="h-10 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
