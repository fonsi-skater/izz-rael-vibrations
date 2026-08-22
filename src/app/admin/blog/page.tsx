import Link from "next/link";
import { prisma } from "@/lib/prisma";
import BlogTable from "@/components/admin/BlogTable";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-brand-dark">Blog / Guides</h1>
        <Link
          href="/admin/blog/new"
          className="rounded-pill bg-brand-lime px-4 py-2 text-xs font-semibold text-brand-dark"
        >
          + New Post
        </Link>
      </div>

      <BlogTable posts={posts} />
    </div>
  );
}
