import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const blogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url().optional().nullable(),
  published: z.boolean().default(false),
});

// GET /api/blog — list all posts (public; includes unpublished for admin use)
export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

// POST /api/blog — create a post (admin only)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = blogSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const slug = slugify(`${data.title}-${Date.now()}`);

  const post = await prisma.blogPost.create({
    data: {
      ...data,
      slug,
      publishedAt: data.published ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
