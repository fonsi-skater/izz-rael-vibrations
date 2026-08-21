export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-brand-dark/60">
      <div className="flex flex-col items-center justify-between gap-3 border-t border-black/10 pt-6 md:flex-row">
        <p>© {new Date().getFullYear()} IZZ-RAEL Vibrations. Only for the discerning one.</p>
        <div className="flex gap-4">
          <a href="/blog">Guides</a>
          <a href="/promotions">Promotions</a>
          <a href="/orders/track">Track order</a>
        </div>
      </div>
    </footer>
  );
}
