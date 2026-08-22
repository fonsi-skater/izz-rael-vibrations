"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

interface BlogFormProps {
  initial?: {
    id: string;
    title: string;
    content: string;
    coverImage: string | null;
    published: boolean;
  };
}

export default function BlogForm({ initial }: BlogFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initial);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [coverImage, setCoverImage] = useState(initial?.coverImage ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = {
      title,
      content,
      coverImage: coverImage || null,
      published,
    };

    const url = isEdit ? `/api/blog/${initial!.id}` : "/api/blog";
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

    router.push("/admin/blog");
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
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-xs font-medium text-brand-dark/60">
          Cover Image
        </label>
        <div className="mt-1">
          <ImageUpload value={coverImage} onChange={setCoverImage} />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-brand-dark/60">
          Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          required
          className="mt-1 w-full rounded-lg border border-black/10 px-3 py-2 text-sm"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-dark/70">
        <input
          type="checkbox"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />
        Published (visible on the public site)
      </label>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-pill bg-brand-lime px-5 py-2.5 text-sm font-semibold text-brand-dark disabled:opacity-50"
      >
        {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Post"}
      </button>
    </form>
  );
}
