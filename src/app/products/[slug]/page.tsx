import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { prisma } from "@/lib/prisma";
import { formatPriceKES } from "@/lib/utils";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { brand: true, category: true, subcategory: true },
  });

  if (!product) return notFound();

  const whatsappLink = buildWhatsAppOrderLink([
    {
      modelName: product.modelName,
      brand: product.brand.name,
      price: product.price,
      qty: 1,
    },
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Navbar />
      <main className="mt-6 grid gap-8 rounded-card bg-white p-6 shadow-panel md:grid-cols-2 md:p-10">
        <div className="flex h-72 items-center justify-center rounded-xl bg-brand-panel text-sm text-brand-dark/40 md:h-full">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.modelName}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            "No image yet"
          )}
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-brand-dark/40">
            {product.category.name}
            {product.subcategory ? ` · ${product.subcategory.name}` : ""}
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-brand-dark">
            {product.brand.name} {product.modelName}
          </h1>
          <p className="mt-3 text-xl font-semibold text-brand-orange">
            {formatPriceKES(product.price)}
          </p>

          {product.description && (
            <p className="mt-4 text-sm text-brand-dark/70">
              {product.description}
            </p>
          )}

          <p className="mt-4 text-xs text-brand-dark/50">
            {product.stock > 0
              ? `${product.stock} in stock`
              : "Contact us for availability"}
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-pill bg-brand-lime px-6 py-3 text-sm font-semibold text-brand-dark shadow-sm transition hover:brightness-95"
          >
            Order via WhatsApp <span aria-hidden>↗</span>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
