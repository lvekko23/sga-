import os

files = {
    "src/app/layout.tsx": """
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
      </body>
    </html>
  );
}
"""
}

def add_schema():
    print("🚀 Mejorando SEO con Datos Estructurados (Schema.org)...")
    
    for path, content in files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip())
        
        print(f"✅ SEO Local agregado en: {path}")

    print("\n✨ ¡Listo! Ahora Google entenderá mejor que eres un negocio local en Luján.")

if __name__ == "__main__":
    add_schema()