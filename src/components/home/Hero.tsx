import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-card bg-brand-panel p-8 shadow-panel md:p-12">
      <span className="inline-flex items-center gap-2 rounded-pill bg-white px-3 py-1 text-xs font-medium text-brand-dark/70 shadow-sm">
        ▤ Sound is Classic
      </span>

      <h1 className="mt-6 max-w-md text-4xl font-semibold leading-tight text-brand-dark md:text-5xl">
        Only for the Discerning One.
      </h1>

      <div className="mt-4 flex max-w-md items-start gap-3 text-sm text-brand-dark/60">
        <span className="text-2xl font-light text-brand-dark/30">01</span>
        <div>
          <p className="font-medium text-brand-dark">Clear Sounds</p>
          <p>Making your dream setup come true — from acoustics to full PA rigs.</p>
        </div>
      </div>

      <Link
        href="/products"
        className="mt-8 inline-flex items-center gap-2 rounded-pill bg-brand-lime px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:brightness-95"
      >
        View All Products <span aria-hidden>↗</span>
      </Link>

      <p className="mt-10 text-xs text-brand-dark/50">Follow us on:</p>
      <div className="mt-2 flex gap-3">
        {["Twitter", "TikTok", "Instagram", "LinkedIn"].map((label) => (
          <span
            key={label}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs text-brand-dark/60 shadow-sm"
            aria-label={label}
          >
            {label[0]}
          </span>
        ))}
      </div>
    </section>
  );
}
