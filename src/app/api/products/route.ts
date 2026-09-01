import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

// AUTH TEMPORARILY DISABLED — see middleware.ts note.

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
  promotionId: z.string().optional().nullable(),
});

export async function GET() {
  const products = await prisma.product.findMany({
    include: { brand: true, category: true, subcategory: true, promotion: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
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
