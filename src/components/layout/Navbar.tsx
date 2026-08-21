import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-4 rounded-pill bg-brand-dark px-4 py-2.5 text-white">
      <Link href="/" className="flex items-center gap-2 pl-2 font-semibold">
        <span className="text-brand-orange">IZZ</span>
        <span>-RAEL</span>
      </Link>

      <div className="hidden flex-1 items-center rounded-pill bg-white/10 px-4 py-2 text-sm text-white/70 md:flex">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full bg-transparent outline-none placeholder:text-white/50"
        />
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/cart"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark"
          aria-label="Cart"
        >
          🛒
        </Link>
        <Link
          href="/compare"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-dark"
          aria-label="Compare"
        >
          ⇄
        </Link>
      </div>
    </nav>
  );
}
