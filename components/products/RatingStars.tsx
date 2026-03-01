"use client";

export function RatingStars({ value }: { value: number }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const idx = i + 1;
    const filled = idx <= full || (idx === full + 1 && half);
    return (
      <span key={i} aria-hidden="true" className={filled ? "text-yellow-500" : "text-slate-300"}>
        ★
      </span>
    );
  });

  return <span className="inline-flex items-center gap-0.5 text-xs">{stars}</span>;
}
