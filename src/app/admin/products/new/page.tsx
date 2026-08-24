import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function NewProductPage() {
  const [categories, subcategories, brands, promotions] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.subcategory.findMany({ orderBy: { name: "asc" } }),
    prisma.brand.findMany({ orderBy: { name: "asc" } }),
    prisma.promotion.findMany({ orderBy: { title: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-brand-dark">Add Product</h1>
      <ProductForm
        categories={categories}
        subcategories={subcategories}
        brands={brands}
        promotions={promotions}
      />
    </div>
  );
}
