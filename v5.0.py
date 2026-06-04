import os

files = {
    "src/lib/constants.ts": """
export const COMPANY_INFO = {
  name: "SGA Servicios de Gestión Ambiental",
  phone: "+54 9 11 5496-5979",
  whatsappUrl: "https://wa.me/5491154965979",
  email: "contacto@sga-fumigaciones.com",
  address: "Luján, Buenos Aires",
  schedule: "Lunes a Sábado de 8:00 a 20:00hs",
};

export const MENU_ITEMS = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "/#servicios" },
  { name: "Cotizador", href: "/#cotizador" },
  { name: "Contacto", href: "/#contacto" },
];
""",

    "src/components/Cotizador.tsx": """
"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import { Calculator, FileText, MessageCircle } from "lucide-react";

const TIPOS_CLIENTE = ["Hogar", "Comercio", "Industria", "Jardines"];
const TIPOS_PLAGA = ["Roedores", "Cucarachas", "Pulgas", "Chinches de la cama", "Mosquitos"];
const TELEFONO_SGA = "5491154965979"; 

export default function Cotizador() {
  const [tipo, setTipo] = useState("Hogar");
  const [plaga, setPlaga] = useState("Roedores");
  const [medida, setMedida] = useState("");
  const [resultado, setResultado] = useState<any>(null);

  // Verificamos si la combinación actual requiere presupuesto personalizado
  const requierePersonalizado = tipo === "Industria" || tipo === "Jardines" || plaga === "Mosquitos";
  // Verificamos si la plaga se mide por ambientes o m2
  const mideEnAmbientes = plaga === "Cucarachas" || plaga === "Chinches de la cama";

  const calcular = () => {
    if (requierePersonalizado) {
      setResultado({ tipo, plaga, isCustom: true });
      return;
    }

    const valor = parseFloat(medida);
    if (isNaN(valor) || valor <= 0) {
      alert(`Por favor, ingresá la cantidad de \${mideEnAmbientes ? 'ambientes' : 'metros cuadrados'}.`);
      return;
    }

    let precio = 0;
    let notas = "";

    if (plaga === "Roedores") {
      precio = 85000;
      notas = "Precio base para propiedades de hasta 100 m2.";
    } else if (plaga === "Cucarachas") {
      precio = 75000;
      notas = "Precio base para propiedades de hasta 2 ambientes.";
    } else if (plaga === "Pulgas") {
      precio = 95000;
      notas = "Precio base para propiedades de hasta 60 m2.";
    } else if (plaga === "Chinches de la cama") {
      precio = 70000 * valor;
      notas = `Precio calculado a razón de $70.000 por ambiente (\${valor} ambientes).`;
    }

    setResultado({ 
      tipo, 
      plaga, 
      medida: valor,
      etiquetaMedida: mideEnAmbientes ? "ambientes" : "m2",
      total: precio.toFixed(2),
      notas, // <-- CORREGIDO ACÁ (Antes decía notes)
      isCustom: false 
    });
  };

  const generarPDF = () => {
    if (!resultado || resultado.isCustom) return;
    const doc = new jsPDF();
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SGA SERVICIOS DE GESTION AMBIENTAL", 20, 30);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("Presupuesto - Manejo Integral de Plagas", 20, 40);

    doc.setFontSize(12);
    doc.text("---------------------------------------------------------", 20, 50);
    doc.text(`Tipo de Cliente: \${resultado.tipo}`, 20, 60);
    doc.text(`Plaga a tratar: \${resultado.plaga}`, 20, 70);
    doc.text(`Espacio a cubrir: \${resultado.medida} \${resultado.etiquetaMedida}`, 20, 80);
    doc.text("---------------------------------------------------------", 20, 90);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`PRECIO ESTIMADO FINAL: $ \${resultado.total}`, 20, 105);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(resultado.notas, 20, 115);
    doc.text("Validez del presupuesto: 15 dias.", 20, 125);
    doc.text("Los precios pueden variar tras la inspeccion tecnica presencial en caso de exceder dimensiones.", 20, 130);
    doc.text("Gracias por confiar en nuestros servicios.", 20, 140);

    doc.save("Presupuesto_SGA.pdf");
  };

  const enviarWhatsApp = () => {
    if (!resultado) return;
    let texto = "";
    
    if (resultado.isCustom) {
      texto = `Hola SGA! Vengo de la web y necesito un presupuesto personalizado.\\n\\n🏢 *Sector:* \${resultado.tipo}\\n🐛 *Plaga a tratar:* \${resultado.plaga}\\n\\n¿Me podrían asesorar?`;
    } else {
      texto = `Hola SGA! Generé un presupuesto en su web y quiero coordinar:\\n\\n🏢 *Cliente:* \${resultado.tipo}\\n🐛 *Plaga:* \${resultado.plaga}\\n📏 *Espacio:* \${resultado.medida} \${resultado.etiquetaMedida}\\n💰 *Presupuesto Estimado:* \$\${resultado.total}\\n\\n¿Tienen disponibilidad para una visita?`;
    }
    
    window.open(`https://wa.me/\${TELEFONO_SGA}?text=\${encodeURIComponent(texto)}`, '_blank');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-green-100 max-w-md mx-auto my-12">
      <div className="text-center mb-6">
        <Calculator className="w-12 h-12 text-green-600 mx-auto mb-2" />
        <h3 className="text-2xl font-bold text-green-900">Cotizador Online</h3>
        <p className="text-gray-600 text-sm">Calculá el costo de tu servicio al instante</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block font-bold text-gray-700 mb-1">Tipo de cliente / Entorno</label>
          <select className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border text-gray-900 font-medium focus:ring-green-500 focus:border-green-500" value={tipo} onChange={(e) => {setTipo(e.target.value); setResultado(null);}}>
            {TIPOS_CLIENTE.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Tipo de plaga a tratar</label>
          <select className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border text-gray-900 font-medium focus:ring-green-500 focus:border-green-500" value={plaga} onChange={(e) => {setPlaga(e.target.value); setResultado(null);}}>
            {TIPOS_PLAGA.map(k => <option key={k} value={k}>{k}</option>)}
          </select>
        </div>

        {!requierePersonalizado && (
          <div>
            <label className="block font-bold text-gray-700 mb-1">
              {mideEnAmbientes ? "Cantidad de ambientes" : "Metros cuadrados aprox."}
            </label>
            <input 
              type="number" 
              className="w-full border-gray-300 rounded-lg p-3 bg-gray-50 border text-gray-900 font-medium focus:ring-green-500 focus:border-green-500" 
              placeholder={mideEnAmbientes ? "Ej: 2" : "Ej: 100"} 
              value={medida} 
              onChange={(e) => setMedida(e.target.value)} 
            />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button onClick={calcular} className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-lg transition">
            {requierePersonalizado ? "Consultar Disponibilidad" : "Calcular Total"}
          </button>
          <button onClick={() => { setMedida(""); setResultado(null); }} className="w-1/3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition">
            Limpiar
          </button>
        </div>
      </div>

      {resultado && (
        <div className="mt-6 p-5 bg-green-50 border-2 border-dashed border-green-500 rounded-lg text-center animate-in fade-in zoom-in duration-300">
          
          {resultado.isCustom ? (
            <>
              <p className="text-xl font-extrabold text-green-700 mb-2">Presupuesto Personalizado</p>
              <p className="text-sm text-gray-600 mb-4">Por las características de este servicio, necesitamos más detalles para cotizarte correctamente.</p>
              <button onClick={enviarWhatsApp} className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition">
                <MessageCircle className="w-5 h-5" /> Contactar por WhatsApp
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-green-800 font-semibold mb-1">Precio Estimado:</p>
              <p className="text-4xl font-extrabold text-green-700 mb-2">$ {resultado.total}</p>
              <p className="text-xs text-gray-500 mb-4 font-medium italic">{resultado.notas}</p>
              
              <div className="flex flex-col gap-3">
                <button onClick={generarPDF} className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition">
                  <FileText className="w-5 h-5" /> Descargar PDF
                </button>
                <button onClick={enviarWhatsApp} className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition">
                  <MessageCircle className="w-5 h-5" /> Enviar por WhatsApp
                </button>
              </div>
            </>
          )}

        </div>
      )}
    </div>
  );
}
""",

    "src/app/page.tsx": """
import { Metadata } from 'next';
import { Bug, Rat, Leaf, Factory } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';
import Cotizador from '@/components/Cotizador';

export const metadata: Metadata = {
  title: 'SGA Servicios de Gestión Ambiental | Manejo Integral de Plagas',
  description: 'Manejo integral de plagas para Industrias, Comercios, Hogares y Jardines. Desratización, cucarachas y mosquitos.',
};

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-10 bg-white">
      {/* Hero Section */}
      <section className="relative bg-green-800 text-white py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative container mx-auto text-center max-w-5xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-lg leading-tight uppercase">
            SGA SERVICIOS DE <br className="hidden md:block"/> GESTIÓN AMBIENTAL
          </h1>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-green-300 uppercase tracking-widest drop-shadow-md">
            Manejo Integral de Plagas
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href={COMPANY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-white text-green-800 hover:bg-green-50 font-extrabold py-4 px-8 rounded-lg text-lg transition shadow-xl transform hover:-translate-y-1">
              📲 Contacto Directo
            </a>
            <a href="#cotizador" className="bg-green-700 hover:bg-green-900 text-white border border-green-500 font-bold py-4 px-8 rounded-lg text-lg transition">
              Cotizar Servicio
            </a>
          </div>
        </div>
      </section>

      {/* SECCIÓN DEL BOT COTIZADOR */}
      <section id="cotizador" className="container mx-auto px-4 scroll-mt-20">
        <Cotizador />
      </section>

      {/* Servicios */}
      <section id="servicios" className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-green-900 uppercase">Servicios Especializados</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto text-lg">Soluciones adaptadas para cada entorno con certificación oficial.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              title: "INDUSTRIAS", 
              icon: Factory, 
              desc: "Manejo integral de plagas para el sector industrial, fábricas y galpones. Auditorías y certificados oficiales." 
            },
            { 
              title: "Desinsectación", 
              icon: Bug, 
              desc: "Erradicación de cucarachas, hormigas, chinches, pulgas y mosquitos. Uso de productos domisanitarios aprobados por ANMAT." 
            },
            { 
              title: "Desratización", 
              icon: Rat, 
              desc: "Control efectivo de roedores mediante estaciones de cebado de seguridad inviolables." 
            },
            { 
              title: "Jardines y Campos", 
              icon: Leaf, 
              desc: "Fumigación y mantenimiento preventivo en exteriores, control de mosquitos, hormigas y plagas vegetales." 
            },
          ].map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition border border-green-100 group">
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                <s.icon className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 uppercase">{s.title}</h3>
              <p className="text-gray-600 font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
""",

    "src/components/layout/Footer.tsx": """
import { COMPANY_INFO } from '@/lib/constants';
import { Bug, Rat } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 py-12 mt-auto">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 uppercase">SGA SERVICIOS DE GESTIÓN AMBIENTAL</h3>
          <p className="text-green-200">Expertos en Manejo Integral de Plagas para Industrias, Comercios, Hogares y Jardines. Cuidamos el medio ambiente.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4 uppercase">Contacto</h3>
          <a href={`tel:\${COMPANY_INFO.phone}`} className="block mb-2 hover:text-white transition font-medium">{COMPANY_INFO.phone}</a>
          <p>{COMPANY_INFO.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4 uppercase">Horarios</h3>
          <p className="font-medium text-green-200">Horario lunes a viernes 8 a 19</p>
          <p className="font-medium text-green-200">Sábado 9 a 12</p>
          <div className="mt-4 inline-block bg-green-800 px-3 py-1 rounded-md border border-green-700">
             <span className="text-green-300 font-bold tracking-wide">Urgencias 24 hs</span>
          </div>
        </div>
      </div>
      
      {/* Línea verde del fondo con las plagas integradas de forma divertida */}
      <div className="relative mt-12 pt-8 border-t border-green-800 text-center text-sm text-green-400 font-medium">
        {/* Cucaracha (Bug) a la izquierda de la línea */}
        <div className="absolute -top-3.5 left-12 md:left-1/4 bg-green-900 px-2 text-green-700 hover:text-green-500 transition-colors duration-300">
          <Bug className="w-7 h-7 transform -rotate-45" />
        </div>
        
        {/* Roedor (Rat) a la derecha de la línea */}
        <div className="absolute -top-3.5 right-12 md:right-1/4 bg-green-900 px-2 text-green-700 hover:text-green-500 transition-colors duration-300">
          <Rat className="w-7 h-7 transform scale-x-[-1]" />
        </div>

        © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
"""
}

def armar_web():
    print("🚀 Reemplazando e inyectando archivos en Next.js...")
    
    for path, content in files.items():
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content.strip() + "\n")
        print(f"✅ Listo: {path}")

if __name__ == "__main__":
    armar_web()