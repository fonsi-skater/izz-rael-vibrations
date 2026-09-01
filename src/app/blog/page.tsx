export const dynamic = "force-dynamic";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export default async function BlogListPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Navbar />
      <main className="mt-6">
        <h1 className="text-2xl font-semibold text-brand-dark">Guides & Stories</h1>
        <p className="mt-1 text-sm text-brand-dark/50">
          Buying tips, equipment guides, and updates from IZZ-RAEL Vibrations.
        </p>

        {posts.length === 0 ? (
          <p className="mt-8 text-sm text-brand-dark/50">No posts yet — check back soon.</p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="rounded-card bg-white p-4 shadow-panel transition hover:shadow-lg"
              >
                <div className="mb-3 flex h-32 items-center justify-center rounded-xl bg-brand-panel text-xs text-brand-dark/40">
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="h-full w-full rounded-xl object-cover"
                    />
                  ) : (
                    "No image"
                  )}
                </div>
                <p className="text-[11px] text-brand-dark/40">
                  {post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString("en-KE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                </p>
                <p className="mt-1 font-medium text-brand-dark">{post.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-brand-dark/50">
                  {post.content.slice(0, 120)}
                  {post.content.length > 120 ? "..." : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
