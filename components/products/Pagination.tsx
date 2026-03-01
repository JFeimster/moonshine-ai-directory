"use client";

export function Pagination({
  page,
  pageCount,
  onPageChange
}: {
  page: number;
  pageCount: number;
  onPageChange: (p: number) => void;
}) {
  if (pageCount <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < pageCount;

  return (
    <div className="flex items-center justify-between">
      <button
        className="rounded-xl border bg-white px-4 py-2 text-sm hover:border-secondary disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
        disabled={!canPrev}
      >
        Previous
      </button>
      <div className="text-sm text-slate-600">
        Page <span className="font-medium text-slate-900">{page}</span> of{" "}
        <span className="font-medium text-slate-900">{pageCount}</span>
      </div>
      <button
        className="rounded-xl border bg-white px-4 py-2 text-sm hover:border-secondary disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
        disabled={!canNext}
      >
        Next
      </button>
    </div>
  );
}
