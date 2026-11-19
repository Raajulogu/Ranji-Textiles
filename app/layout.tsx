import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5EFE6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "RANJI TEXTILES | Wholesale Muslin Baby Clothing & Essentials",
  description:
    "Thoughtfully crafted muslin essentials for little ones. Direct-from-manufacturer wholesale baby wear, swaddles, sets & bespoke textile printing from Tiruppur, India.",
  keywords: [
    "muslin baby clothing",
    "wholesale baby wear",
    "organic cotton muslin",
    "Tiruppur textile manufacturer",
    "baby jabla wholesale",
    "muslin swaddles bulk",
  ],
  authors: [{ name: "Ranji Textiles Tiruppur" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${plusJakarta.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-[#F5EFE6] text-[#573820] font-sans antialiased selection:bg-[#B77B63]/20 selection:text-[#573820]">
        {children}
      </body>
    </html>
  );
}
