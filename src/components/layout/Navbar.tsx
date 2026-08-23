"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartBadge from "@/components/cart/CartBadge";
import CompareBadge from "@/components/cart/CompareBadge";

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <nav className="flex items-center justify-between gap-4 rounded-pill bg-brand-dark px-4 py-2.5 text-white">
      <Link href="/" className="flex items-center gap-2 pl-1">
        <Image
          src="/logo/logo-navbar.png"
          alt="IZZ-RAEL Vibrations"
          width={32}
          height={32}
          className="rounded-full"
          priority
        />
        <span className="hidden font-semibold sm:inline">IZZ-RAEL</span>
      </Link>

      <div className="hidden flex-1 items-center rounded-pill bg-white/10 px-4 py-2 text-sm text-white/70 md:flex">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full bg-transparent outline-none placeholder:text-white/50"
        />
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/cart"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark"
          aria-label="Cart"
        >
          🛒
          <CartBadge />
        </Link>
        <Link
          href="/compare"
          className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark"
          aria-label="Compare"
        >
          ⇄
          <CompareBadge />
        </Link>
      </div>
    </nav>
  );
}
