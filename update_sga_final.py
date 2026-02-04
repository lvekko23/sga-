import os

# Configuración Final con cambios de texto y contacto
files = {
    "src/lib/constants.ts": """
export const COMPANY_INFO = {
  name: "SGA",
  phone: "+54 9 11 3448-4723",
  whatsappUrl: "https://wa.me/5491134484723",
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

export const SERVICES = [
  { id: "insectos", title: "Insectos", description: "Gel sin olor." },
  { id: "roedores", title: "Roedores", description: "Cebos seguros." },
];
""",
    "src/app/page.tsx": """
import { ShieldCheck, Bug, Rat, Trees } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-10 bg-white">
      {/* Hero Section */}
      <section className="relative bg-green-700 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative container mx-auto text-center max-w-3xl">
          <span className="inline-block py-1 px-3 rounded-full bg-green-800 text-green-100 text-sm font-semibold mb-4 border border-green-600">
            SGA - Soluciones Ambientales
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Control de Plagas <br/>
            <span className="text-green-200">Efectivo y Seguro</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-50 mb-8 font-light">
            Protegemos tu hogar, campo y negocio. Especialistas en desinfección y erradicación total.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY_INFO.whatsappUrl} className="bg-white text-green-700 hover:bg-green-50 font-bold py-4 px-8 rounded-lg text-lg transition shadow-lg">
              Pedir Presupuesto
            </a>
            <a href="#servicios" className="bg-green-800 hover:bg-green-900 text-white border border-green-600 font-bold py-4 px-8 rounded-lg text-lg transition">
              Ver Servicios
            </a>
          </div>
        </div>
      </section>

      {/* Servicios Actualizados */}
      <section id="servicios" className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-green-900">Nuestros Servicios</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Utilizamos productos de primera línea, autorizados y amigables con el medio ambiente.</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Insectos", 
              icon: Bug, 
              desc: "Control total de cucarachas, hormigas, arañas y mosquitos. Aplicación de gel sin olor y sin desalojar." 
            },
            { 
              title: "Roedores", 
              icon: Rat, 
              desc: "Desratización efectiva y segura para mascotas y niños mediante estaciones de cebado profesionales." 
            },
            { 
              title: "Campos y Exteriores", 
              icon: Trees, 
              desc: "Fumigación de campos, parques y jardines. Control de plagas en grandes superficies abiertas." 
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
          <h2 className="text-3xl font-bold mb-4 text-green-900">Tu tranquilidad es nuestra prioridad</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            En <strong>{COMPANY_INFO.name}</strong>, todos nuestros trabajos cuentan con garantía escrita.
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
          <p className="text-green-200">Expertos en control de plagas y fumigación de campos. Cuidamos lo que más te importa.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Contacto</h3>
          {/* Dirección eliminada a pedido */}
          <a href={`tel:${COMPANY_INFO.phone}`} className="block mb-2 hover:text-white transition text-lg font-semibold">{COMPANY_INFO.phone}</a>
          <p className="text-green-200">{COMPANY_INFO.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Horarios</h3>
          <p>{COMPANY_INFO.schedule}</p>
          <div className="mt-4 inline-block bg-green-800 px-3 py-1 rounded-md border border-green-700">
             <span className="text-green-300 font-semibold">Urgencias 24hs</span>
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
    print("🛠️ Aplicando cambios finales a SGA...")
    
    for path, content in files.items():
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip())
        
        print(f"✅ Actualizado: {path}")

    print("\n✨ ¡Listo! Revisa la web.")

if __name__ == "__main__":
    update_final()