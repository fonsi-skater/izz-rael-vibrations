import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// AUTH TEMPORARILY DISABLED — see middleware.ts note.

const blogSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  coverImage: z.string().url().optional().nullable(),
  published: z.boolean().default(false),
});

export async function GET() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
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
