export default function FeaturedProducts() {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-4">
      <div className="rounded-card bg-white p-5 shadow-panel">
        <p className="text-sm font-medium text-brand-dark">Popular Brands</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Yamaha", "JBL", "Shure", "Fender", "Ibanez"].map((brand) => (
            <span
              key={brand}
              className="rounded-pill bg-brand-panel px-3 py-1 text-xs text-brand-dark/70"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-card bg-brand-dark p-5 text-white shadow-panel">
        <p className="text-sm font-medium">New Arrivals</p>
        <p className="mt-6 text-lg font-semibold leading-snug">
          Latest keyboards & mixers just landed.
        </p>
        <a href="/products?sort=new" className="mt-4 text-xs text-white/70">
          Browse new stock ↗
        </a>
      </div>
    </div>
  );
}
