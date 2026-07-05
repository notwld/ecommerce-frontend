import type { Metadata } from "next";
import { Arimo } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";

const arimo = Arimo({
  variable: "--font-arimo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mendeez",
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
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
