"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PromoRow {
  id: string;
  title: string;
  discountPct: number;
  active: boolean;
  products: { id: string }[];
}

export default function PromotionTable({ promotions }: { promotions: PromoRow[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? Products using it will be unlinked.`)) return;

    setDeletingId(id);
    const res = await fetch(`/api/promotions/${id}`, { method: "DELETE" });
    setDeletingId(null);

    if (res.ok) {
      router.refresh();
    } else {
      alert("Failed to delete promotion.");
    }
  }

  if (promotions.length === 0) {
    return (
      <div className="mt-6 rounded-card bg-white p-10 text-center shadow-panel">
        <p className="text-sm text-brand-dark/60">No promotions yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-card bg-white shadow-panel">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-black/5 text-xs text-brand-dark/50">
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Discount</th>
            <th className="px-4 py-3">Products</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((p) => (
            <tr key={p.id} className="border-b border-black/5 last:border-0">
              <td className="px-4 py-3 font-medium text-brand-dark">{p.title}</td>
              <td className="px-4 py-3 text-brand-orange font-medium">{p.discountPct}%</td>
              <td className="px-4 py-3 text-brand-dark/70">{p.products.length}</td>
              <td className="px-4 py-3">
                <span
                  className={`rounded-pill px-2 py-1 text-[11px] font-medium ${
                    p.active
                      ? "bg-green-100 text-green-700"
                      : "bg-brand-panel text-brand-dark/60"
                  }`}
                >
                  {p.active ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-3">
                  <Link
                    href={`/admin/promotions/${p.id}/edit`}
                    className="text-xs font-medium text-brand-dark/60 hover:text-brand-dark"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
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
