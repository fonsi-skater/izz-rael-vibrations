import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders/lookup?phone=254712345678 — public order lookup by phone
export async function GET(req: NextRequest) {
  const phone = req.nextUrl.searchParams.get("phone");

  if (!phone || phone.trim().length < 7) {
    return NextResponse.json(
      { error: "A valid phone number is required" },
      { status: 400 }
    );
  }

  const orders = await prisma.order.findMany({
    where: { customerPhone: phone.trim() },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
