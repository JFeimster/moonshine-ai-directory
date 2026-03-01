"use client";

import Link from "next/link";
import { SearchBar } from "./SearchBar";
import { QuickFilters } from "./QuickFilters";
import { UserMenu } from "./UserMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="h-7 w-7 rounded-lg bg-primary" aria-hidden="true" />
          <span>Moonshine Capital</span>
        </Link>

        <nav className="hidden md:flex items-center gap-2 ml-2" aria-label="Primary">
          <a className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-white" href="/partners">Partners</a>
          <a className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-white" href="/resources">Resources</a>
          <a className="rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-white" href="/portal">Portal</a>
        </nav>


        <div className="flex flex-1 items-center justify-center gap-3">
          <div className="w-full max-w-2xl">
            <SearchBar />
          </div>
          <div className="hidden lg:block">
            <QuickFilters />
          </div>
        </div>

        <UserMenu />
      </div>

      <div className="border-t bg-bg lg:hidden">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <QuickFilters />
        </div>
      </div>
    </header>
  );
}
