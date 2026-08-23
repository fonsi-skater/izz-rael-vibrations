import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const updateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional().nullable(),
  discountPct: z.number().int().min(1).max(99).optional(),
  active: z.boolean().optional(),
  startsAt: z.string().optional().nullable(),
  endsAt: z.string().optional().nullable(),
});

// PUT /api/promotions/[id] — update (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const promo = await prisma.promotion.update({
    where: { id: params.id },
    data: {
      ...data,
      description: data.description ?? undefined,
      startsAt: data.startsAt ? new Date(data.startsAt) : undefined,
      endsAt: data.endsAt ? new Date(data.endsAt) : undefined,
    },
  });

  return NextResponse.json(promo);
}

// DELETE /api/promotions/[id] — admin only
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Unlink any products before deleting the promotion, since Product.promotionId
  // is a nullable optional relation, not a cascading one.
  await prisma.product.updateMany({
    where: { promotionId: params.id },
    data: { promotionId: null },
  });

  await prisma.promotion.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
