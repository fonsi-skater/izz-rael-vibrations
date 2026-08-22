import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [productCount, orderCount, promoCount, blogCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.promotion.count({ where: { active: true } }),
    prisma.blogPost.count(),
  ]);

  const cards = [
    { label: "Products", value: productCount, href: "/admin/products" },
    { label: "Orders", value: orderCount, href: "/admin/orders" },
    { label: "Active Promotions", value: promoCount, href: "/admin/promotions" },
    { label: "Blog Posts", value: blogCount, href: "/admin/blog" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-brand-dark">Admin Dashboard</h1>
        <div className="flex gap-2">
          <Link href="/admin/blog/new" className="rounded-pill border border-black/10 px-4 py-2 text-xs font-semibold text-brand-dark">
            + New Post
          </Link>
          <Link href="/admin/products/new" className="rounded-pill bg-brand-lime px-4 py-2 text-xs font-semibold text-brand-dark">
            + Add Product
          </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-card bg-white p-6 shadow-panel transition hover:shadow-lg"
          >
            <p className="text-xs text-brand-dark/50">{c.label}</p>
            <p className="mt-2 text-3xl font-semibold text-brand-dark">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
