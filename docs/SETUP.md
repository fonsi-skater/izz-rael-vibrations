# Getting this running

## 1. Install dependencies
```
npm install
```

## 2. Create a free Supabase project
1. Go to supabase.com → New project
2. Once it's provisioned, go to Project Settings → Database → Connection string (URI)
3. Copy the connection string

## 3. Set up environment variables
```
cp .env.example .env
```
Fill in:
- `DATABASE_URL` — the Supabase connection string from step 2
- `NEXTAUTH_SECRET` — run `openssl rand -base64 32` to generate one
- `WHATSAPP_BUSINESS_NUMBER` — the number (with country code, no + or spaces) orders should be sent to
- Cloudinary keys — from cloudinary.com (free tier), needed once we wire up product image uploads

Also add, for the client-side WhatsApp link:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=2547XXXXXXXX
```

## 4. Push the schema to Supabase
```
npx prisma generate
npx prisma db push
```

## 5. Load the starting catalog
```
npm run seed
```
This loads the products from your original spreadsheet. Two prices
(Yamaha MG16 and MG24) were unclear in the photo — they're seeded as 0
and flagged in `scripts/seed-equipment.ts` so you can fix them from the
admin panel once it's built, or tell me the correct prices now.

## 6. Run the dev server
```
npm run dev
```
Visit http://localhost:3000

---

**Note:** `prisma generate` needs to reach `binaries.prisma.sh` to download
its query engine — this is blocked in the sandboxed environment I built
this in, so I could only validate the schema by eye here. It will work
normally on your machine or once deployed to Vercel.
