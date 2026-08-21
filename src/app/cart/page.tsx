"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { formatPriceKES } from "@/lib/utils";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();

  const whatsappLink = buildWhatsAppOrderLink(
    items.map((i) => ({
      modelName: i.modelName,
      brand: i.brand,
      price: i.price,
      qty: i.qty,
    }))
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Navbar />
      <main className="mt-6">
        <h1 className="text-2xl font-semibold text-brand-dark">Your Cart</h1>

        {items.length === 0 ? (
          <div className="mt-6 rounded-card bg-white p-10 text-center shadow-panel">
            <p className="text-sm text-brand-dark/60">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-pill bg-brand-lime px-5 py-2.5 text-sm font-semibold text-brand-dark"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 rounded-card bg-white p-4 shadow-panel"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-panel text-[10px] text-brand-dark/40">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.modelName}
                        className="h-full w-full rounded-xl object-cover"
                      />
                    ) : (
                      "No image"
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs text-brand-dark/50">{item.brand}</p>
                    <p className="font-medium text-brand-dark">{item.modelName}</p>
                    <p className="text-sm font-semibold text-brand-orange">
                      {formatPriceKES(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.qty - 1)}
                      className="h-7 w-7 rounded-full bg-brand-panel text-sm text-brand-dark"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">{item.qty}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.productId, item.qty + 1)}
                      className="h-7 w-7 rounded-full bg-brand-panel text-sm text-brand-dark"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="ml-2 text-xs text-brand-dark/40 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={clearCart}
                className="self-start text-xs text-brand-dark/40 hover:text-red-500"
              >
                Clear cart
              </button>
            </div>

            <div className="h-fit rounded-card bg-white p-6 shadow-panel">
              <p className="text-sm font-medium text-brand-dark">Order Summary</p>
              <div className="mt-4 flex justify-between text-sm text-brand-dark/70">
                <span>Total</span>
                <span className="font-semibold text-brand-dark">
                  {formatPriceKES(totalPrice)}
                </span>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-pill bg-brand-lime px-5 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:brightness-95"
              >
                Order via WhatsApp <span aria-hidden>↗</span>
              </a>
              <p className="mt-3 text-center text-[11px] text-brand-dark/40">
                No online payment yet — this opens WhatsApp with your order pre-filled.
              </p>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
