import Link from "next/link";
import { formatPriceKES } from "@/lib/utils";
import { getActiveDiscount, getDiscountedPrice } from "@/lib/pricing";
import AddToCartButton from "@/components/cart/AddToCartButton";
import AddToCompareButton from "@/components/product/AddToCompareButton";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  const discountPct = getActiveDiscount(product.promotion);
  const finalPrice = discountPct
    ? getDiscountedPrice(product.price, discountPct)
    : product.price;

  return (
    <div className="rounded-card bg-white p-4 shadow-panel transition hover:shadow-lg">
      <Link href={`/products/${product.slug}`}>
        <div className="relative mb-3 flex h-32 items-center justify-center rounded-xl bg-brand-panel text-xs text-brand-dark/40">
          {discountPct && (
            <span className="absolute left-2 top-2 rounded-pill bg-brand-orange px-2 py-0.5 text-[10px] font-semibold text-white">
              -{discountPct}%
            </span>
          )}
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.modelName}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            "No image yet"
          )}
        </div>
        <p className="text-xs text-brand-dark/50">{product.brand.name}</p>
        <p className="font-medium text-brand-dark">{product.modelName}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <p className="text-sm font-semibold text-brand-orange">
            {formatPriceKES(finalPrice)}
          </p>
          {discountPct && (
            <p className="text-xs text-brand-dark/40 line-through">
              {formatPriceKES(product.price)}
            </p>
          )}
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-2">
        <AddToCartButton
          item={{
            productId: product.id,
            modelName: product.modelName,
            brand: product.brand.name,
            price: finalPrice,
            qty: 1,
            image: product.images[0],
          }}
          className="w-full rounded-pill bg-brand-dark px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
        />
        <AddToCompareButton
          item={{
            id: product.id,
            modelName: product.modelName,
            brand: product.brand.name,
            category: product.category.name,
            subcategory: product.subcategory?.name ?? null,
            price: finalPrice,
            stock: product.stock,
            image: product.images[0],
          }}
        />
      </div>
    </div>
  );
}
