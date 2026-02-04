import os

# Actualizamos el nombre en las constantes y en el título de la web (Metadata)
files = {
    "src/lib/constants.ts": """
export const COMPANY_INFO = {
  name: "SGA Fumigaciones",
  phone: "+54 9 11 3448-4723",
  whatsappUrl: "https://wa.me/5491134484723",
  email: "sga.fumigaciones@gmail.com",
  // Dirección vacía
  address: "",
  schedule: "Lunes a Sábado de 8:00 a 20:00hs",
};

export const MENU_ITEMS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Contacto", href: "/#contacto" },
];

export const SERVICES = [
  { id: "insectos", title: "Insectos", description: "Gel sin olor." },
  { id: "roedores", title: "Roedores", description: "Cebos seguros." },
];
""",
    "src/app/layout.tsx": """
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SGA Fumigaciones - Control de Plagas",
  description: "Expertos en control de plagas y desinfección integral. Cucarachas, roedores y fumigación de campos.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={cn("min-h-screen flex flex-col bg-slate-50", inter.className)}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
"""
}

def update_name():
    print("🏷️ Cambiando nombre a 'SGA Fumigaciones'...")
    
    for path, content in files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip())
        
        print(f"✅ Actualizado: {path}")

    print("\n✨ ¡Nombre actualizado correctamente!")

if __name__ == "__main__":
    update_name()