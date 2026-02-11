import os

# Configuración Final con optimización SEO para conversiones locales
files = {
    "src/lib/constants.ts": """
export const COMPANY_INFO = {
  name: "SGA Fumigaciones",
  phone: "+54 9 11 5496-5979",
  whatsappUrl: "https://wa.me/5491134484723?text=Hola,%20necesito%20un%20presupuesto%20para%20una%20fumigación.",
  email: "sga.fumigaciones@gmail.com",
  // Dirección vacía para que no aparezca
  address: "",
  schedule: "Lunes a Sábado de 8:00 a 20:00hs",
};

export const MENU_ITEMS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Nosotros", href: "/#nosotros" },
  { name: "Contacto", href: "/#contacto" },
];
""",
    "src/app/page.tsx": """
import { Metadata } from 'next';
import { ShieldCheck, Bug, Rat, Trees } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

// --- CONFIGURACIÓN SEO (VITAL PARA GOOGLE Y ADS) ---
export const metadata: Metadata = {
  title: 'SGA Fumigaciones | Control de Plagas en Luján y Zona Oeste',
  description: 'Servicio de urgencia en fumigación y control de plagas en Luján. Desratización, cucarachas y hormigas para hogares, campos y comercios. ¡Presupuesto sin cargo!',
  keywords: 'fumigaciones en lujan, control de plagas lujan, desratizacion, fumigar cucarachas, SGA fumigaciones zona oeste',
};

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-10 bg-white">
      {/* Hero Section - Optimizada para conversión */}
      <section className="relative bg-green-700 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative container mx-auto text-center max-w-3xl">
          <span className="inline-block py-1 px-3 rounded-full bg-green-800 text-green-100 text-sm font-bold mb-4 border border-green-500 uppercase tracking-wide">
            Especialistas en la zona
          </span>
          {/* H1 con palabras clave exactas que busca el usuario */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Fumigaciones y <br/> Control de Plagas <br/>
            <span className="text-green-300">en Luján</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-50 mb-8 font-light">
            Solucionamos tu problema hoy. Servicio rápido y seguro para hogares, comercios y campos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-green-800 hover:bg-green-50 font-extrabold py-4 px-8 rounded-lg text-lg transition shadow-xl transform hover:-translate-y-1">
              📲 Pedir Presupuesto Ya
            </a>
            <a href="#servicios" className="bg-green-800 hover:bg-green-900 text-white border border-green-500 font-bold py-4 px-8 rounded-lg text-lg transition">
              Ver Servicios
            </a>
          </div>
        </div>
      </section>

      {/* Servicios Actualizados con SEO local */}
      <section id="servicios" className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-900">Nuestros Servicios de Fumigación</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Utilizamos productos de primera línea, autorizados y seguros para tu familia y mascotas.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Control de Insectos", 
              icon: Bug, 
              desc: "Erradicación de cucarachas, hormigas, arañas y mosquitos. Aplicación de gel sin olor, no hace falta abandonar la casa." 
            },
            { 
              title: "Desratización", 
              icon: Rat, 
              desc: "Eliminación de roedores efectiva y segura mediante estaciones de cebado profesionales. Ideal para hogares y galpones." 
            },
            { 
              title: "Campos y Exteriores", 
              icon: Trees, 
              desc: "Fumigación de grandes extensiones, parques, jardines y fábricas. Control preventivo y reactivo de plagas." 
            },
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition border border-green-100 group">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                <s.icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Garantía */}
      <section className="bg-green-50 py-16 border-y border-green-100">
        <div className="container mx-auto px-4 text-center">
          <ShieldCheck className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-green-900">Trabajos con Garantía Escrita</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            En <strong>{COMPANY_INFO.name}</strong> nuestra prioridad es tu tranquilidad. Resolvemos el problema de raíz.
          </p>
        </div>
      </section>
    </div>
  );
}
""",
    "src/components/layout/Footer.tsx": """
import { COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 py-12 mt-auto">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{COMPANY_INFO.name}</h3>
          <p className="text-green-200">Expertos en control de plagas y fumigaciones en Luján y zonas aledañas. Cuidamos tu espacio.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contacto Directo</h3>
          {/* Dirección eliminada a pedido */}
          <a href={`tel:${COMPANY_INFO.phone}`} className="block mb-2 hover:text-white transition text-lg font-semibold">{COMPANY_INFO.phone}</a>
          <p className="text-green-200">{COMPANY_INFO.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Atención</h3>
          <p>{COMPANY_INFO.schedule}</p>
          <div className="mt-4 inline-block bg-green-800 px-3 py-1 rounded-md border border-green-700">
             <span className="text-green-300 font-semibold">Servicio de Urgencias</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-green-800 text-sm text-green-400">
        © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
"""
}

def update_final():
    print("🛠️ Aplicando optimización SEO local a SGA...")
    
    for path, content in files.items():
        # Asegurarse de que el directorio existe antes de escribir
        os.makedirs(os.path.dirname(path), exist_ok=True)
        
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip() + "\n")
        
        print(f"✅ Actualizado: {path}")

    print("\n✨ ¡Listo! Hacé un push a Vercel para ver los cambios.")

if __name__ == "__main__":
    update_final()