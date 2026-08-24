import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const [product, categories, subcategories, brands, promotions] =
    await Promise.all([
      prisma.product.findUnique({ where: { id: params.id } }),
      prisma.category.findMany({ orderBy: { name: "asc" } }),
      prisma.subcategory.findMany({ orderBy: { name: "asc" } }),
      prisma.brand.findMany({ orderBy: { name: "asc" } }),
      prisma.promotion.findMany({ orderBy: { title: "asc" } }),
    ]);

  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-brand-dark">Edit Product</h1>
      <ProductForm
        categories={categories}
        subcategories={subcategories}
        brands={brands}
        promotions={promotions}
        initial={{
          id: product.id,
          modelName: product.modelName,
          description: product.description,
          price: product.price,
          stock: product.stock,
          categoryId: product.categoryId,
          subcategoryId: product.subcategoryId,
          brandId: product.brandId,
          promotionId: product.promotionId,
          images: product.images,
        }}
      />
    </div>
  );
}
