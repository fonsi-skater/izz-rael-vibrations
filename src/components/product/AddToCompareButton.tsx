"use client";

import { useCompare } from "@/context/CompareContext";
import type { CompareItem } from "@/context/CompareContext";

export default function AddToCompareButton({ item }: { item: CompareItem }) {
  const { toggleItem, isCompared, isFull } = useCompare();
  const compared = isCompared(item.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(item);
      }}
      disabled={!compared && isFull}
      className={`w-full rounded-pill border px-4 py-2 text-xs font-semibold transition disabled:opacity-40 ${
        compared
          ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
          : "border-black/10 text-brand-dark/60 hover:border-black/20"
      }`}
    >
      {compared ? "Remove from Compare" : "Add to Compare"}
    </button>
  );
}
