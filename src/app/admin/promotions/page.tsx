export const dynamic = "force-dynamic";

import Link from "next/link";
import { prisma } from "@/lib/prisma";
import PromotionTable from "@/components/admin/PromotionTable";

export default async function AdminPromotionsPage() {
  const promotions = await prisma.promotion.findMany({
    include: { products: true },
    orderBy: { id: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-brand-dark">Promotions</h1>
        <Link
          href="/admin/promotions/new"
          className="rounded-pill bg-brand-lime px-4 py-2 text-xs font-semibold text-brand-dark"
        >
          + New Promotion
        </Link>
      </div>

      <PromotionTable promotions={promotions} />
    </div>
  );
}
