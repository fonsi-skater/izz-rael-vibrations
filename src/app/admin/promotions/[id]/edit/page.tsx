import { notFound } from "next/navigation";
import PromotionForm from "@/components/admin/PromotionForm";
import { prisma } from "@/lib/prisma";

export default async function EditPromotionPage({
  params,
}: {
  params: { id: string };
}) {
  const promo = await prisma.promotion.findUnique({ where: { id: params.id } });

  if (!promo) return notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-brand-dark">Edit Promotion</h1>
      <PromotionForm
        initial={{
          id: promo.id,
          title: promo.title,
          description: promo.description,
          discountPct: promo.discountPct,
          active: promo.active,
          startsAt: promo.startsAt ? promo.startsAt.toISOString() : null,
          endsAt: promo.endsAt ? promo.endsAt.toISOString() : null,
        }}
      />
    </div>
  );
}
