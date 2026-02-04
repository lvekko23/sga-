import Script from 'next/script'  
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SGA Fumigaciones - Control de Plagas en Luján",
  description: "Servicio profesional de control de plagas, desinsectación y desratización en Luján y alrededores. Urgencias 24hs. Contacto: " + COMPANY_INFO.phone,
  keywords: ["fumigaciones lujan", "control de plagas", "desratizacion", "matar cucarachas", "sga fumigaciones"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  // Datos estructurados para Google (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PestControl",
    "name": "SGA Fumigaciones",
    "image": "https://sga-fumigaciones.vercel.app/images/sga-logo-green.png",
    "description": "Expertos en control de plagas y desinfección integral.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Luján",
      "addressRegion": "Buenos Aires",
      "addressCountry": "AR"
    },
    "telephone": COMPANY_INFO.phone,
    "url": "https://sga-fumigaciones.vercel.app",
    "priceRange": "$$"
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body className={cn("min-h-screen flex flex-col bg-slate-50", inter.className)}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        
        {/* Script de SEO Local */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17807347778"
          strategy="afterInteractive"
        />

        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-17807347778');
          `}
        </Script>
      </body>
    </html>
  );
}