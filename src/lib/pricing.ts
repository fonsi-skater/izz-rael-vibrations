import type { Promotion } from "@/types";

export function getActiveDiscount(promotion?: Promotion | null): number | null {
  if (!promotion || !promotion.active) return null;

  const now = new Date();
  if (promotion.startsAt && new Date(promotion.startsAt) > now) return null;
  if (promotion.endsAt && new Date(promotion.endsAt) < now) return null;

  return promotion.discountPct;
}

export function getDiscountedPrice(price: number, discountPct: number): number {
  return Math.round(price * (1 - discountPct / 100));
}
