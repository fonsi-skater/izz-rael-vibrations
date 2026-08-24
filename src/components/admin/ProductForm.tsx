"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

interface Option {
  id: string;
  name: string;
}

interface ProductFormProps {
  categories: Option[];
  subcategories: (Option & { categoryId: string })[];
  brands: Option[];
  promotions: (Option & { discountPct: number })[];
  initial?: {
    id: string;
    modelName: string;
    description: string | null;
    price: number;
    stock: number;
    categoryId: string;
    subcategoryId: string | null;
    brandId: string;
    promotionId: string | null;
    images: string[];
  };
}

export default function ProductForm({
  categories,
  subcategories,
  brands,
  promotions,
  initial,
}: ProductFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [modelName, setModelName] = useState(initial?.modelName ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(String(initial?.price ?? ""));
  const [stock, setStock] = useState(String(initial?.stock ?? "0"));
  const [categoryId, setCategoryId] = useState(initial?.categoryId ?? "");
  const [subcategoryId, setSubcategoryId] = useState(
    initial?.subcategoryId ?? ""
  );
  const [brandId, setBrandId] = useState(initial?.brandId ?? "");
  const [promotionId, setPromotionId] = useState(initial?.promotionId ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.images?.[0] ?? "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredSubcategories = subcategories.filter(
    (s) => s.categoryId === categoryId
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      modelName,
      description: description || undefined,
      price: Number(price),
      stock: Number(stock),
      categoryId,
      subcategoryId: subcategoryId || null,
      brandId,
      promotionId: promotionId || null,
      images: imageUrl ? [imageUrl] : [],
    };

    const url = isEdit ? `/api/products/${initial!.id}` : "/api/products";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong.");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4 rounded-card bg-white p-6 shadow-panel"
    >
      <div>
        <label className="text-xs font-medium text-brand-dark/60">
          Model Name
        </label>
        <input
          value={modelName}
          onChange={(e) => setModelName(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-brand-dark/60">
          Description (optional)
        </label>
        <textarea
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-brand-dark/60">
            Price (KES)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min={0}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-brand-dark/60">
            Stock
          </label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            min={0}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-brand-dark/60">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setSubcategoryId("");
            }}
            required
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-brand-dark/60">
            Subcategory (optional)
          </label>
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          >
            <option value="">None</option>
            {filteredSubcategories.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-brand-dark/60">
          Brand
        </label>
        <select
          value={brandId}
          onChange={(e) => setBrandId(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        >
          <option value="">Select brand</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-brand-dark/60">
          Promotion (optional)
        </label>
        <select
          value={promotionId}
          onChange={(e) => setPromotionId(e.target.value)}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        >
          <option value="">None</option>
          {promotions.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} (-{p.discountPct}%)
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-brand-dark/60">
          Product Image
        </label>
        <div className="mt-1">
          <ImageUpload value={imageUrl} onChange={setImageUrl} />
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-pill bg-brand-lime px-5 py-2.5 text-sm font-semibold text-brand-dark disabled:opacity-50"
      >
        {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
      </button>
    </form>
  );
}
