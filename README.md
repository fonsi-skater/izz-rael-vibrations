# IZZ-RAEL Vibrations — Ecommerce Website (Music Equipment)

> "Only for the Discerning one"

This is the project scaffold for IZZ-RAEL Vibrations' online catalog + storefront.
No code has been implemented yet — this is the folder structure + architecture plan
for review before we start building.

## 1. What we're building

A catalog-style ecommerce site (price listings, not live payments) for music
equipment: speakers, keyboards, mixers, microphones, guitars, etc.

Required areas (from brief):
- Product catalog (browsable by category/brand)
- Shopping cart (client-side, no payment — used to bundle a WhatsApp inquiry)
- Order tracking (status lookup by tracking code)
- Search + filters (category, brand, price range)
- Comparison tool (side-by-side spec/price comparison)
- Promotions & discounts (admin-managed discount codes / featured deals)
- Blog / guides (equipment guides, buying tips, artist spotlights)
- Admin panel: add / edit / delete products & prices (full CRUD)
- Checkout flow: "Order via WhatsApp" — builds a pre-filled wa.me message
  with product name(s), quantity, and price, no payment gateway (for now)

## 2. Tech stack (all free-tier)

| Layer          | Choice                                   | Why |
|----------------|-------------------------------------------|-----|
| Framework      | Next.js 14 (App Router) + TypeScript      | One codebase for site, admin, and API routes |
| Styling        | Tailwind CSS                              | Fast to match the nitec-style reference theme |
| Database       | PostgreSQL (Supabase or Neon free tier)   | Free, relational — fits category/brand/model hierarchy |
| ORM            | Prisma                                    | Type-safe CRUD, easy migrations, matches your other Prisma projects |
| Image hosting  | Cloudinary free tier                      | Product photos + logo, free transformations |
| Admin auth     | NextAuth (credentials provider)           | Free, simple login for you to manage products |
| Hosting        | Vercel free tier                          | Zero-cost deploy, matches your existing stack |
| Checkout       | wa.me deep link (no gateway)              | Matches brief — "if one wants to pay, direct to WhatsApp" |

## 3. Data model (from your spreadsheet)

Your sheet's hierarchy (Category → Subcategory/Type → Brand → Model → Price)
maps to Prisma models in `prisma/schema.prisma`:

```
Category (Speakers, Keyboards, Mixer, Microphone, Guitar)
  └─ Subcategory (Passive/Active, Electronic, Powered/Plain, Acoustic/Electric/Rhythm)
       └─ Brand (Trill, Nexo, JBL, Yamaha, OMAX, Shure, Ibanez, Fender, Gibson, Olive)
            └─ Product (model_name, price, images, description, stock, featured)
```

Every product row is fully editable/removable from the admin panel — nothing
is hardcoded.

## 4. Theme

Home page and layout will mirror the reference image: soft grey-green
gradient background, rounded white "glass" card panels, dark pill navbar
with search, lime-green rounded CTA button, circular social icons, small
stat/feature cards along the bottom and right rail. Logo (IZZ-RAEL Vibrations,
orange equalizer mark) goes in the navbar + favicon.

## 5. Folder structure

See `docs/ARCHITECTURE.md` for a full breakdown of every folder's purpose.

## 6. Next steps (once you approve this structure)

1. `npx create-next-app` init + install Tailwind, Prisma, NextAuth, Cloudinary SDK
2. Set up Supabase/Neon project + run first Prisma migration
3. Seed the database with your spreadsheet data (`scripts/seed-equipment.ts`)
4. Build layout + home page to match the reference theme
5. Build product catalog, filters, search, comparison tool
6. Build cart + WhatsApp checkout flow
7. Build admin CRUD panel
8. Build blog/guides + promotions
9. Deploy to Vercel
