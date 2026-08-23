"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface PromotionFormProps {
  initial?: {
    id: string;
    title: string;
    description: string | null;
    discountPct: number;
    active: boolean;
    startsAt: string | null;
    endsAt: string | null;
  };
}

function toDateInputValue(value: string | null): string {
  if (!value) return "";
  return value.slice(0, 10);
}

export default function PromotionForm({ initial }: PromotionFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [discountPct, setDiscountPct] = useState(
    String(initial?.discountPct ?? "10")
  );
  const [active, setActive] = useState(initial?.active ?? true);
  const [startsAt, setStartsAt] = useState(
    toDateInputValue(initial?.startsAt ?? null)
  );
  const [endsAt, setEndsAt] = useState(
    toDateInputValue(initial?.endsAt ?? null)
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      title,
      description: description || null,
      discountPct: Number(discountPct),
      active,
      startsAt: startsAt || null,
      endsAt: endsAt || null,
    };

    const url = isEdit ? `/api/promotions/${initial!.id}` : "/api/promotions";
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

    router.push("/admin/promotions");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4 rounded-card bg-white p-6 shadow-panel"
    >
      <div>
        <label className="text-xs font-medium text-brand-dark/60">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="e.g. End of Year Sale"
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
          rows={2}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-brand-dark/60">
          Discount Percentage
        </label>
        <input
          type="number"
          value={discountPct}
          onChange={(e) => setDiscountPct(e.target.value)}
          required
          min={1}
          max={99}
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-brand-dark/60">
            Starts (optional)
          </label>
          <input
            type="date"
            value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-brand-dark/60">
            Ends (optional)
          </label>
          <input
            type="date"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-dark/70">
        <input
          type="checkbox"
          checked={active}
          onChange={(e) => setActive(e.target.checked)}
        />
        Active
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-pill bg-brand-lime px-5 py-2.5 text-sm font-semibold text-brand-dark disabled:opacity-50"
      >
        {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Promotion"}
      </button>

      <p className="text-[11px] text-brand-dark/40">
        After saving, assign this promotion to products from each product's edit page.
      </p>
    </form>
  );
}
