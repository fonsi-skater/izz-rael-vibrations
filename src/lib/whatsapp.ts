import { formatPriceKES } from "./utils";

export interface WhatsAppOrderItem {
  modelName: string;
  brand: string;
  price: number;
  qty: number;
}

/**
 * Builds a wa.me link pre-filled with the customer's cart, so "checkout"
 * hands off to WhatsApp instead of a payment gateway.
 */
export function buildWhatsAppOrderLink(
  items: WhatsAppOrderItem[],
  businessNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
): string {
  const lines = [
    "Hi IZZ-RAEL Vibrations, I'd like to order:",
    "",
    ...items.map(
      (item) =>
        `- ${item.brand} ${item.modelName} x${item.qty} — ${formatPriceKES(
          item.price * item.qty
        )}`
    ),
    "",
    `Total: ${formatPriceKES(
      items.reduce((sum, item) => sum + item.price * item.qty, 0)
    )}`,
  ];

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${businessNumber}?text=${message}`;
}
