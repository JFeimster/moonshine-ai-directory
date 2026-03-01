import { Header } from "@/components/header/Header";
import { SkeletonCard } from "@/components/products/SkeletonCard";

export default function Loading() {
  return (
    <div>
      <Header />
      <main className="mx-auto max-w-7xl px-4 pb-20">
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </main>
    </div>
  );
}
