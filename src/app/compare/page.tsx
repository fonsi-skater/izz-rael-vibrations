"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCompare } from "@/context/CompareContext";
import { formatPriceKES } from "@/lib/utils";

export default function ComparePage() {
  const { items, removeItem, clearCompare } = useCompare();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Navbar />
      <main className="mt-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-brand-dark">Compare</h1>
          {items.length > 0 && (
            <button
              onClick={clearCompare}
              className="text-xs text-brand-dark/40 hover:text-red-500"
            >
              Clear all
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-6 rounded-card bg-white p-10 text-center shadow-panel">
            <p className="text-sm text-brand-dark/60">
              No products selected. Add up to 3 from the catalog to compare them side by side.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-block rounded-pill bg-brand-lime px-5 py-2.5 text-sm font-semibold text-brand-dark"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-card bg-white p-4 shadow-panel">
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `120px repeat(${items.length}, minmax(180px, 1fr))`,
              }}
            >
              <div />
              {items.map((item) => (
                <div key={item.id} className="text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl bg-brand-panel text-[10px] text-brand-dark/40">
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
                  <p className="mt-2 text-sm font-semibold text-brand-dark">
                    {item.brand} {item.modelName}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-1 text-[11px] text-brand-dark/40 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <div className="self-center text-xs font-medium text-brand-dark/50">Category</div>
              {items.map((item) => (
                <div key={item.id} className="text-center text-sm text-brand-dark/70">
                  {item.category}
                  {item.subcategory ? ` · ${item.subcategory}` : ""}
                </div>
              ))}

              <div className="self-center text-xs font-medium text-brand-dark/50">Price</div>
              {items.map((item) => (
                <div key={item.id} className="text-center text-sm font-semibold text-brand-orange">
                  {formatPriceKES(item.price)}
                </div>
              ))}

              <div className="self-center text-xs font-medium text-brand-dark/50">Availability</div>
              {items.map((item) => (
                <div key={item.id} className="text-center text-sm text-brand-dark/70">
                  {item.stock > 0 ? `${item.stock} in stock` : "Contact for availability"}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
