"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatPriceKES } from "@/lib/utils";

interface ProductRow {
  id: string;
  modelName: string;
  price: number;
  stock: number;
  brand: { name: string };
  category: { name: string };
  subcategory: { name: string } | null;
}

export default function ProductTable({ products }: { products: ProductRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, modelName: string) {
    if (!confirm(`Delete ${modelName}? This can't be undone.`)) return;

    setDeletingId(id);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeletingId(null);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete product.");
    }
  }

  if (products.length === 0) {
    return (
      <div className="mt-6 rounded-card bg-white p-10 text-center shadow-panel">
        <p className="text-sm text-brand-dark/60">No products yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-card bg-white shadow-panel">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/5 text-xs text-brand-dark/50">
            <th className="px-4 py-3">Model</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-black/5 last:border-0">
              <td className="px-4 py-3 font-medium text-brand-dark">
                {p.modelName}
              </td>
              <td className="px-4 py-3 text-brand-dark/70">
                {p.category.name}
                {p.subcategory ? ` · ${p.subcategory.name}` : ""}
              </td>
              <td className="px-4 py-3 text-brand-dark/70">{p.brand.name}</td>
              <td className="px-4 py-3 text-brand-orange font-medium">
                {formatPriceKES(p.price)}
              </td>
              <td className="px-4 py-3 text-brand-dark/70">{p.stock}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/products/${p.id}/edit`}
                    className="text-xs font-medium text-brand-dark/60 hover:text-brand-dark"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.modelName)}
                    disabled={deletingId === p.id}
                    className="text-xs font-medium text-red-500 hover:text-red-700 disabled:opacity-50"
                  >
                    {deletingId === p.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
