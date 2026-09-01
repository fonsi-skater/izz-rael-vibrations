import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

// AUTH TEMPORARILY DISABLED — see middleware.ts note.

const promoSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional().nullable(),
  discountPct: z.number().int().min(1).max(99),
  active: z.boolean().default(true),
  startsAt: z.string().optional().nullable(),
  endsAt: z.string().optional().nullable(),
});

export async function GET() {
  const promotions = await prisma.promotion.findMany({
    include: { products: true },
    orderBy: { id: "desc" },
  });
  return NextResponse.json(promotions);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = promoSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const promo = await prisma.promotion.create({
    data: {
      title: data.title,
      description: data.description ?? undefined,
      discountPct: data.discountPct,
      active: data.active,
      startsAt: data.startsAt ? new Date(data.startsAt) : undefined,
      endsAt: data.endsAt ? new Date(data.endsAt) : undefined,
    },
  });

  return NextResponse.json(promo, { status: 201 });
}
