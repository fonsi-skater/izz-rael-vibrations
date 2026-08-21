"use client";

import { useCompare } from "@/context/CompareContext";

export default function CompareBadge() {
  const { items } = useCompare();
  if (items.length === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-semibold text-white">
      {items.length}
    </span>
  );
}
