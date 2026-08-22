import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });

  if (!post || !post.published) return notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Navbar />
      <main className="mt-6 rounded-card bg-white p-6 shadow-panel md:p-10">
        {post.coverImage && (
          <div className="mb-6 h-56 w-full overflow-hidden rounded-xl bg-brand-panel">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <p className="text-xs text-brand-dark/40">
          {post.publishedAt &&
            new Date(post.publishedAt).toLocaleDateString("en-KE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-brand-dark">
          {post.title}
        </h1>

        <div className="mt-6 whitespace-pre-wrap text-sm leading-relaxed text-brand-dark/80">
          {post.content}
        </div>
      </main>
      <Footer />
    </div>
  );
}
