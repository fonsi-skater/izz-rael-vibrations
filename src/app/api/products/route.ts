import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const productSchema = z.object({
  modelName: z.string().min(1),
  description: z.string().optional(),
  price: z.number().int().nonnegative(),
  images: z.array(z.string().url()).default([]),
  stock: z.number().int().nonnegative().default(0),
  featured: z.boolean().default(false),
  categoryId: z.string().min(1),
  subcategoryId: z.string().optional().nullable(),
  brandId: z.string().min(1),
});

// GET /api/products — list all products (public)
export async function GET() {
  const products = await prisma.product.findMany({
    include: { brand: true, category: true, subcategory: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

// POST /api/products — create a product (admin only)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = productSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const slug = slugify(`${data.modelName}-${Date.now()}`);

  const product = await prisma.product.create({
    data: { ...data, slug },
  });

  return NextResponse.json(product, { status: 201 });
}
