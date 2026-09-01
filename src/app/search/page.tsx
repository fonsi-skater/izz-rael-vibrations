export const dynamic = "force-dynamic";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/product/ProductCard";
import FilterPanel from "@/components/search/FilterPanel";
import { prisma } from "@/lib/prisma";

interface SearchPageProps {
  searchParams: {
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, category, brand, minPrice, maxPrice } = searchParams;

  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { modelName: { contains: q, mode: "insensitive" } },
                  { brand: { name: { contains: q, mode: "insensitive" } } },
                ],
              }
            : {},
          category ? { category: { slug: category } } : {},
          brand ? { brand: { name: brand } } : {},
          minPrice ? { price: { gte: Number(minPrice) } } : {},
          maxPrice ? { price: { lte: Number(maxPrice) } } : {},
        ],
      },
      include: { brand: true, category: true, subcategory: true, promotion: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Navbar />
      <main className="mt-6 grid gap-6 lg:grid-cols-[1fr_3fr]">
        <FilterPanel
          categories={categories}
          brands={brands}
          selected={{ q, category, brand, minPrice, maxPrice }}
        />

        <div>
          <h1 className="text-2xl font-semibold text-brand-dark">
            {q ? `Results for "${q}"` : "Browse Products"}
          </h1>
          <p className="mt-1 text-sm text-brand-dark/50">
            {products.length} items
          </p>

          {products.length === 0 ? (
            <p className="mt-8 text-sm text-brand-dark/50">
              No products matched. Try adjusting your filters.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
