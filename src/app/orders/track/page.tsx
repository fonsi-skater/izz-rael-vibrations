"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { formatPriceKES } from "@/lib/utils";

interface OrderItem {
  productId: string;
  modelName: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  totalPrice: number;
  status: string;
  createdAt: string;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  READY: "Ready for pickup/delivery",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default function OrderTrackPage() {
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setOrders(null);

    const res = await fetch(`/api/orders/lookup?phone=${encodeURIComponent(phone.trim())}`);
    setLoading(false);

    if (!res.ok) {
      setError("Please enter a valid phone number.");
      return;
    }

    const data = await res.json();
    setOrders(data);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Navbar />
      <main className="mt-6">
        <h1 className="text-2xl font-semibold text-brand-dark">Track Your Order</h1>
        <p className="mt-1 text-sm text-brand-dark/50">
          Enter the phone number you used when ordering.
        </p>

        <form onSubmit={handleLookup} className="mt-6 flex gap-2">
          <input
            type="tel"
            placeholder="Phone number (e.g. 2547XXXXXXXX)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-pill bg-brand-dark px-5 py-2 text-sm font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Searching..." : "Track"}
          </button>
        </form>

        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        {orders && orders.length === 0 && (
          <p className="mt-6 text-sm text-brand-dark/50">
            No orders found for that phone number.
          </p>
        )}

        {orders && orders.length > 0 && (
          <div className="mt-6 flex flex-col gap-4">
            {orders.map((order) => (
              <div key={order.id} className="rounded-card bg-white p-5 shadow-panel">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-brand-dark/40">
                    {new Date(order.createdAt).toLocaleDateString("en-KE", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                  <span className="rounded-pill bg-brand-panel px-3 py-1 text-xs font-medium text-brand-dark">
                    {STATUS_LABELS[order.status] ?? order.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-1">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-brand-dark/70">
                        {item.modelName} × {item.qty}
                      </span>
                      <span className="text-brand-dark">
                        {formatPriceKES(item.price * item.qty)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex justify-between border-t border-black/5 pt-3 text-sm font-semibold">
                  <span className="text-brand-dark">Total</span>
                  <span className="text-brand-orange">
                    {formatPriceKES(order.totalPrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
