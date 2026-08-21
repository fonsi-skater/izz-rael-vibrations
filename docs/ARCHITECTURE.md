# Folder-by-folder guide

## Root
- `prisma/schema.prisma` — database models (Category, Subcategory, Brand, Product, Order, Promotion, BlogPost, Admin)
- `scripts/seed-equipment.ts` — one-time script to load your spreadsheet data into the database
- `.env.example` — env vars needed (DB URL, Cloudinary keys, admin secret, WhatsApp number)
- `public/logo/` — IZZ-RAEL Vibrations logo + favicon
- `public/images/` — fallback/local product & blog images (most will live on Cloudinary)

## src/app (pages — Next.js App Router)
- `page.tsx` — home page (matches reference theme)
- `products/` — full catalog listing + `[slug]/` product detail page
- `category/[category]/` — products filtered by category (Speakers, Keyboards, etc.)
- `search/` — search results with filter panel (category, brand, price range)
- `compare/` — side-by-side comparison of selected products
- `cart/` — cart review before "Order via WhatsApp"
- `checkout/` — builds the wa.me link and redirects
- `orders/track/` — customer enters a tracking code to see order status
- `promotions/` — active discounts/deals page
- `blog/` — guides listing + `[slug]/` individual post
- `admin/` — password-protected dashboard:
  - `products/` (list, edit, delete) + `products/new/` (add product)
  - `categories/`, `promotions/`, `orders/` — manage each
  - `login/` — admin sign-in

## src/app/api (backend routes)
- `products/` — GET (list/filter/search), POST (create); `[id]/` — GET, PUT, DELETE one product
- `categories/`, `promotions/`, `orders/` — CRUD for each
- `search/` — search + filter query endpoint
- `auth/` — NextAuth admin login handler

## src/components
- `layout/` — Navbar, Footer, Sidebar (shared shell)
- `home/` — Hero, FeaturedProducts, SocialFollow (home-page-specific pieces)
- `product/` — ProductCard, ProductGrid, ProductDetail, CompareTable
- `cart/` — CartItem, CartSummary
- `search/` — SearchBar, FilterPanel
- `admin/` — ProductForm, ProductTable, AdminNav
- `blog/` — BlogCard, BlogContent
- `ui/` — shared low-level pieces (Button, Input, Badge, Modal)

## src/lib
- `prisma.ts` — Prisma client singleton
- `whatsapp.ts` — builds the pre-filled wa.me order message
- `auth.ts` — NextAuth config
- `utils.ts` — formatting helpers (price formatting in KES, slugify, etc.)

## src/context & src/hooks
- `CartContext.tsx` / `useCart.ts` — cart state (stored in localStorage, no backend cart table needed)
- `CompareContext.tsx` — holds up to N products selected for comparison

## src/types
- Shared TypeScript types (Product, Category, Order, etc.) mirrored from Prisma models

## src/styles
- `theme.ts` — color tokens, fonts, spacing constants matching the reference design
