import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CompareProvider } from "@/context/CompareContext";

export const metadata: Metadata = {
  title: "IZZ-RAEL Vibrations | Only for the Discerning one",
  description:
    "Speakers, keyboards, mixers, microphones, guitars and more — IZZ-RAEL Vibrations, only for the discerning one.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-app-gradient antialiased">
        <CartProvider>
          <CompareProvider>{children}</CompareProvider>
        </CartProvider>
      </body>
    </html>
  );
}
