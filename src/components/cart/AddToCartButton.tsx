"use client";

import { useCart } from "@/context/CartContext";
import type { CartLine } from "@/types";

export default function AddToCartButton({
  item,
  className,
}: {
  item: CartLine;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(item);
      }}
      className={
        className ??
        "rounded-pill bg-brand-dark px-4 py-2 text-xs font-semibold text-white transition hover:brightness-110"
      }
    >
      Add to Cart
    </button>
  );
}
