/**
 * Loads the initial equipment catalog (from the original spreadsheet)
 * into the database. Run with: npm run seed
 */
import { PrismaClient } from "@prisma/client";
import { slugify } from "../src/lib/utils";

const prisma = new PrismaClient();

interface SeedProduct {
  category: string;
  subcategory?: string;
  brand: string;
  modelName: string;
  price: number;
}

// Transcribed directly from the provided spreadsheet.
const products: SeedProduct[] = [
  // Speakers - Passive
  { category: "Speakers", subcategory: "Passive", brand: "Trill", modelName: "TR815", price: 19500 },
  { category: "Speakers", subcategory: "Passive", brand: "Nexo", modelName: "PS15", price: 26000 },
  { category: "Speakers", subcategory: "Passive", brand: "Nexo", modelName: "PS12", price: 21000 },
  { category: "Speakers", subcategory: "Passive", brand: "Nexo", modelName: "PS10", price: 18000 },
  { category: "Speakers", subcategory: "Passive", brand: "JBL", modelName: "SRX715", price: 27000 },
  { category: "Speakers", subcategory: "Passive", brand: "JBL", modelName: "SRX712", price: 23000 },

  // Keyboards - Electronic
  { category: "Keyboards", subcategory: "Electronic", brand: "Yamaha", modelName: "Psr-e283", price: 24000 },
  { category: "Keyboards", subcategory: "Electronic", brand: "Yamaha", modelName: "Psr-e383", price: 32000 },
  { category: "Keyboards", subcategory: "Electronic", brand: "Yamaha", modelName: "Psr-e483", price: 46000 },
  { category: "Keyboards", subcategory: "Electronic", brand: "Yamaha", modelName: "Psr-sx610", price: 98000 },
  { category: "Keyboards", subcategory: "Electronic", brand: "Yamaha", modelName: "Psr-sx720", price: 145000 },

  // Mixer - Omax (plain models)
  { category: "Mixer", brand: "Omax", modelName: "DH744", price: 3500 },
  { category: "Mixer", brand: "Omax", modelName: "DH769", price: 6500 },

  // Microphone
  { category: "Microphone", brand: "Shure", modelName: "GLXD4", price: 7000 },

  // Mixer - Powered (Omax)
  { category: "Mixer", subcategory: "Powered", brand: "Omax", modelName: "OMAX4CH", price: 10000 },
  { category: "Mixer", subcategory: "Powered", brand: "Omax", modelName: "OMAX6CH", price: 15000 },
  { category: "Mixer", subcategory: "Powered", brand: "Omax", modelName: "OMAX8CH", price: 17000 },
  { category: "Mixer", subcategory: "Powered", brand: "Omax", modelName: "OMAX12CH", price: 21000 },
  { category: "Mixer", subcategory: "Powered", brand: "Omax", modelName: "OMAX16CH", price: 25000 },

  // Mixer - Plain (Yamaha)
  { category: "Mixer", subcategory: "Plain", brand: "Yamaha", modelName: "MG12", price: 26000 },
  { category: "Mixer", subcategory: "Plain", brand: "Yamaha", modelName: "MG16", price: 0 }, // price TBD from sheet
  { category: "Mixer", subcategory: "Plain", brand: "Yamaha", modelName: "MG24", price: 0 }, // price TBD from sheet

  // Guitar - Acoustic
  { category: "Guitar", subcategory: "Acoustic", brand: "Olive", modelName: "Size 38", price: 4500 },
  { category: "Guitar", subcategory: "Acoustic", brand: "Ibanez", modelName: "Size41", price: 8500 },

  // Guitar - Electric (Solo)
  { category: "Guitar", subcategory: "Electric", brand: "Fender", modelName: "Solo", price: 10000 },
  { category: "Guitar", subcategory: "Electric", brand: "Ibanez", modelName: "Solo", price: 12000 },
  { category: "Guitar", subcategory: "Electric", brand: "Gibson", modelName: "Solo", price: 18500 },

  // Guitar - Rhythm
  { category: "Guitar", subcategory: "Rhythm", brand: "Ibanez", modelName: "Rhythm", price: 9500 },
  { category: "Guitar", subcategory: "Rhythm", brand: "Fender", modelName: "Rhythm", price: 8500 },
];

async function main() {
  for (const p of products) {
    const category = await prisma.category.upsert({
      where: { name: p.category },
      update: {},
      create: { name: p.category, slug: slugify(p.category) },
    });

    const subcategory = p.subcategory
      ? await prisma.subcategory.upsert({
          where: {
            name_categoryId: { name: p.subcategory, categoryId: category.id },
          },
          update: {},
          create: { name: p.subcategory, categoryId: category.id },
        })
      : null;

    const brand = await prisma.brand.upsert({
      where: { name: p.brand },
      update: {},
      create: { name: p.brand },
    });

    const slug = slugify(`${p.brand}-${p.modelName}`);

    await prisma.product.upsert({
      where: { slug },
      update: { price: p.price },
      create: {
        modelName: p.modelName,
        slug,
        price: p.price,
        images: [],
        stock: 0,
        categoryId: category.id,
        subcategoryId: subcategory?.id,
        brandId: brand.id,
      },
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
