import { Metadata } from 'next';
import { ShieldCheck, Bug, Rat, Leaf, Factory } from 'lucide-react';
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
            SGA Servicios de <br className="hidden md:block"/> Gestión Ambiental
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
              desc: "Erradicación de cucarachas, hormigas, chinches, pulgas y mosquitos con geles y líquidos de última generación." 
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

      {/* Garantía */}
      <section className="bg-green-50 py-16 border-y border-green-100">
        <div className="container mx-auto px-4 text-center">
          <ShieldCheck className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4 text-green-900 uppercase">Trabajos con Garantía Escrita</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            En <strong>{COMPANY_INFO.name}</strong> nuestra prioridad es tu tranquilidad. Operamos bajo estrictas normas de seguridad ambiental.
          </p>
        </div>
      </section>
    </div>
  );
}
