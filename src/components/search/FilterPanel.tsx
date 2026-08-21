"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface FilterPanelProps {
  categories: { id: string; name: string; slug: string }[];
  brands: { id: string; name: string }[];
  selected: {
    q?: string;
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export default function FilterPanel({
  categories,
  brands,
  selected,
}: FilterPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [minPrice, setMinPrice] = useState(selected.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState(selected.maxPrice ?? "");

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  }

  function applyPriceRange() {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    router.push(`/search?${params.toString()}`);
  }

  return (
    <aside className="h-fit rounded-card bg-white p-5 shadow-panel">
      <p className="text-sm font-medium text-brand-dark">Category</p>
      <div className="mt-2 flex flex-col gap-1.5">
        <button
          onClick={() => updateParam("category", null)}
          className={`text-left text-xs ${
            !selected.category ? "font-semibold text-brand-orange" : "text-brand-dark/60"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => updateParam("category", c.slug)}
            className={`text-left text-xs ${
              selected.category === c.slug
                ? "font-semibold text-brand-orange"
                : "text-brand-dark/60"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm font-medium text-brand-dark">Brand</p>
      <div className="mt-2 flex flex-col gap-1.5">
        <button
          onClick={() => updateParam("brand", null)}
          className={`text-left text-xs ${
            !selected.brand ? "font-semibold text-brand-orange" : "text-brand-dark/60"
          }`}
        >
          All
        </button>
        {brands.map((b) => (
          <button
            key={b.id}
            onClick={() => updateParam("brand", b.name)}
            className={`text-left text-xs ${
              selected.brand === b.name
                ? "font-semibold text-brand-orange"
                : "text-brand-dark/60"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm font-medium text-brand-dark">Price (KES)</p>
      <div className="mt-2 flex items-center gap-2">
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="w-full rounded-lg border border-black/10 px-2 py-1 text-xs"
        />
        <span className="text-xs text-brand-dark/40">–</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="w-full rounded-lg border border-black/10 px-2 py-1 text-xs"
        />
      </div>
      <button
        onClick={applyPriceRange}
        className="mt-3 w-full rounded-pill bg-brand-dark px-4 py-2 text-xs font-semibold text-white"
      >
        Apply
      </button>
    </aside>
  );
}
