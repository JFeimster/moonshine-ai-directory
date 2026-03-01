"use client";

import Link from "next/link";

export function UserMenu() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/auth/sign-in"
        className="rounded-xl border bg-white px-3 py-2 text-sm hover:border-secondary"
        aria-label="User account"
      >
        Account
      </Link>
    </div>
  );
}
