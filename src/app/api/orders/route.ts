import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const orderSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(7),
  items: z
    .array(
      z.object({
        productId: z.string(),
        modelName: z.string(),
        qty: z.number().int().positive(),
        price: z.number().int().nonnegative(),
      })
    )
    .min(1),
});

// POST /api/orders — create an order record (public, customer self-service)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = orderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { customerName, customerPhone, items } = parsed.data;
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const order = await prisma.order.create({
    data: {
      customerName,
      customerPhone,
      items,
      totalPrice,
    },
  });

  return NextResponse.json(order, { status: 201 });
}
