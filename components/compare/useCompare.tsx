"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { FundingProduct } from "@/lib/types";

type CompareState = {
  items: FundingProduct[];
  toggle: (p: FundingProduct) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

const Ctx = createContext<CompareState | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<FundingProduct[]>([]);

  const api = useMemo<CompareState>(() => ({
    items,
    toggle: (p) => {
      setItems((cur) => {
        if (cur.some((x) => x.id === p.id)) return cur.filter((x) => x.id !== p.id);
        if (cur.length >= 3) return cur;
        return [...cur, p];
      });
    },
    has: (id) => items.some((x) => x.id === id),
    clear: () => setItems([])
  }), [items]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
