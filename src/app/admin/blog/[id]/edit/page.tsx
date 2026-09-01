export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { prisma } from "@/lib/prisma";

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await prisma.blogPost.findUnique({ where: { id: params.id } });

  if (!post) return notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-brand-dark">Edit Post</h1>
      <BlogForm
        initial={{
          id: post.id,
          title: post.title,
          content: post.content,
          coverImage: post.coverImage,
          published: post.published,
        }}
      />
    </div>
  );
}
