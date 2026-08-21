import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Navbar />

      <main className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Hero />
        <FeaturedProducts />
      </main>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-card bg-white p-5 shadow-panel">
          <p className="text-sm font-medium text-brand-dark">More Products</p>
          <p className="mt-2 text-xs text-brand-dark/50">Browse the full catalog</p>
          <a href="/products" className="mt-3 inline-block text-xs font-medium text-brand-orange">
            Explore →
          </a>
        </div>
        <div className="rounded-card bg-white p-5 shadow-panel">
          <p className="text-sm font-medium text-brand-dark">Compare Gear</p>
          <p className="mt-2 text-xs text-brand-dark/50">Put two models side by side</p>
          <a href="/compare" className="mt-3 inline-block text-xs font-medium text-brand-orange">
            Compare →
          </a>
        </div>
        <div className="rounded-card bg-white p-5 shadow-panel">
          <p className="text-sm font-medium text-brand-dark">Current Promotions</p>
          <p className="mt-2 text-xs text-brand-dark/50">Deals updated regularly</p>
          <a href="/promotions" className="mt-3 inline-block text-xs font-medium text-brand-orange">
            View deals →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
