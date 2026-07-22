import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Analytics } from "@vercel/analytics/next";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AT Wardrobe",
  description: "Modern premium fashion experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${arimo.variable} h-full antialiased`}>
      <body className="min-h-full bg-brand-background text-brand-text font-sans">
        <CartProvider>
          <AnnouncementBar />
          {children}
          <SiteFooter />
          <CartDrawer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
