export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function PromotionsPage() {
  const now = new Date();

  const promotions = await prisma.promotion.findMany({
    where: {
      active: true,
      OR: [{ startsAt: null }, { startsAt: { lte: now } }],
      AND: [{ OR: [{ endsAt: null }, { endsAt: { gte: now } }] }],
    },
    include: {
      products: {
        include: { brand: true, category: true, subcategory: true },
      },
    },
    orderBy: { id: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Navbar />
      <main className="mt-6">
        <h1 className="text-2xl font-semibold text-brand-dark">Promotions</h1>
        <p className="mt-1 text-sm text-brand-dark/50">
          Current deals across the catalog.
        </p>

        {promotions.length === 0 ? (
          <p className="mt-8 text-sm text-brand-dark/50">
            No active promotions right now — check back soon.
          </p>
        ) : (
          <div className="mt-6 flex flex-col gap-8">
            {promotions.map((promo) => (
              <section key={promo.id}>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-lg font-semibold text-brand-dark">
                    {promo.title}
                  </h2>
                  <span className="rounded-pill bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
                    {promo.discountPct}% off
                  </span>
                </div>
                {promo.description && (
                  <p className="mt-1 text-sm text-brand-dark/50">
                    {promo.description}
                  </p>
                )}

                {promo.products.length === 0 ? (
                  <p className="mt-3 text-xs text-brand-dark/40">
                    No products assigned to this promotion yet.
                  </p>
                ) : (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {promo.products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
