"use client";

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [tipoPlaga, setTipoPlaga] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const plagas = [
    { id: 'cucarachas', nombre: 'Cucarachas', icono: '🪳' },
    { id: 'roedores', nombre: 'Roedores', icono: '🐀' },
    { id: 'mosquitos', nombre: 'Mosquitos', icono: '🦟' },
    { id: 'hormigas', nombre: 'Hormigas/Pulgones', icono: '🐜' },
    { id: 'jardin', nombre: 'Plagas de Jardín', icono: '🌿' },
  ];

  const propiedades = [
    { id: 'hogar', nombre: 'Particular / Casa', icono: '🏠' },
    { id: 'comercio', nombre: 'Comercio / Local', icono: '🏪' },
    { id: 'fabrica', nombre: 'Fábrica / Empresa', icono: '🏭' },
    { id: 'parque', nombre: 'Parques / Consorcio', icono: '🌳' },
  ];

  const handleCotizar = (e) => {
    e.preventDefault();
    if (!tipoPropiedad || !tipoPlaga) {
      alert("Por favor selecciona el tipo de propiedad y la plaga a tratar.");
      return;
    }

    const mensaje = encodeURIComponent(
      `Hola SGA, quisiera solicitar un presupuesto personalizado.\n\n` +
      `*Nombre:* ${nombre || 'No especificado'}\n` +
      `*Teléfono:* ${telefono || 'No especificado'}\n` +
      `*Propiedad:* ${tipoPropiedad}\n` +
      `*Plaga/Servicio:* ${tipoPlaga}`
    );

    window.open(`https://wa.me/5492323357985?text=${mensaje}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-zinc-100 font-sans">
      
      {/* 1. HERO SECTION CON OVERLAY VERDE TRANSPARENTE */}
      <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1600&auto=format&fit=crop"
            alt="Jardín y gestión ambiental"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-emerald-950/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 pt-12">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight drop-shadow-md">
            SGA SERVICIOS DE GESTIÓN AMBIENTAL
          </h1>
          <p className="text-lg md:text-2xl text-emerald-100 font-medium max-w-2xl mx-auto">
            Soluciones integrales de fumigación, control de plagas y cuidado de espacios verdes.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4 text-sm md:text-base font-semibold">
            <span className="bg-emerald-600/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-emerald-400/30 flex items-center gap-2 shadow-lg">
              🛡️ Utilizamos productos 100% seguros para niños y mascotas
            </span>
            <span className="bg-emerald-600/80 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-emerald-400/30 flex items-center gap-2 shadow-lg">
              ✨ Asesoramiento profesional garantizado
            </span>
          </div>

          <div className="pt-6">
            <a 
              href="#cotizador" 
              className="inline-block bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-8 py-4 rounded-xl transition-all shadow-xl hover:scale-105 uppercase tracking-wider"
            >
              Solicitar Presupuesto Online
            </a>
          </div>
        </div>
      </section>

      {/* 2. GALERÍA / TRABAJO TÉCNICO Y ESPACIOS */}
      <section className="py-16 px-6 max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-emerald-400 uppercase">Nuestros Servicios en Acción</h2>
          <p className="text-slate-400">Personal técnico capacitado y aplicación en todo tipo de ambientes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative h-64 rounded-xl overflow-hidden border border-slate-800 group">
            <Image 
              src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=800&auto=format&fit=crop" 
              alt="Personal técnico trabajando" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
            <p className="absolute bottom-4 left-4 font-bold text-sm text-emerald-300">Técnicos Capacitados</p>
          </div>

          <div className="relative h-64 rounded-xl overflow-hidden border border-slate-800 group">
            <Image 
              src="https://images.unsplash.com/photo-1592417817098-8f3d6eb1626f?q=80&w=800&auto=format&fit=crop" 
              alt="Fumigación y control" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
            <p className="absolute bottom-4 left-4 font-bold text-sm text-emerald-300">Aplicaciones Seguras</p>
          </div>

          <div className="relative h-64 rounded-xl overflow-hidden border border-slate-800 group">
            <Image 
              src="https://images.unsplash.com/photo-1558904541-efa843a96f01?q=80&w=800&auto=format&fit=crop" 
              alt="Parques y Jardines" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
            <p className="absolute bottom-4 left-4 font-bold text-sm text-emerald-300">Parques y Jardines</p>
          </div>

          <div className="relative h-64 rounded-xl overflow-hidden border border-slate-800 group">
            <Image 
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop" 
              alt="Residencias y comercios" 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
            <p className="absolute bottom-4 left-4 font-bold text-sm text-emerald-300">Tratamiento Residencial</p>
          </div>
        </div>
      </section>

      {/* 3. COTIZADOR INTERACTIVO */}
      <section id="cotizador" className="py-16 bg-slate-950 border-y border-slate-800 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Solicitá tu Presupuesto</h2>
            <p className="text-slate-400">Completá los pasos para comunicarte directamente con nuestro equipo por WhatsApp.</p>
          </div>

          <form onSubmit={handleCotizar} className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-2xl">
            
            <div>
              <label className="block text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
                1. Seleccioná el tipo de propiedad
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {propiedades.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setTipoPropiedad(p.nombre)}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      tipoPropiedad === p.nombre 
                        ? 'border-emerald-500 bg-emerald-950/50 text-white font-bold ring-2 ring-emerald-500/50' 
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{p.icono}</span>
                    <span className="text-xs">{p.nombre}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
                2. Seleccioná el servicio o problema
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {plagas.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setTipoPlaga(p.nombre)}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      tipoPlaga === p.nombre 
                        ? 'border-emerald-500 bg-emerald-950/50 text-white font-bold ring-2 ring-emerald-500/50' 
                        : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl">{p.icono}</span>
                    <span className="text-xs">{p.nombre}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Nombre (Opcional)</label>
                <input 
                  type="text" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)} 
                  placeholder="Tu nombre" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Teléfono (Opcional)</label>
                <input 
                  type="text" 
                  value={telefono} 
                  onChange={(e) => setTelefono(e.target.value)} 
                  placeholder="Ej: 1122334455" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-lg shadow-emerald-900/30"
            >
              <span className="text-xl">💬</span> Enviar consulta y cotizar por WhatsApp
            </button>
          </form>
        </div>
      </section>

      {/* 4. LOGOS DE ACREDITACIONES (ANMAT Y SENASA) */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-slate-900 text-center space-y-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Empresa Habilitada y Certificada
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-2">
            <div className="bg-white p-3 rounded-lg flex items-center justify-center w-36 h-16 shadow-md">
              <span className="font-black text-blue-900 text-xl tracking-tighter">anmat</span>
            </div>

            <div className="bg-white p-3 rounded-lg flex items-center justify-center w-36 h-16 shadow-md">
              <span className="font-black text-sky-700 text-xl tracking-tighter">senasa</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900/50 text-xs text-slate-600">
          © {new Date().getFullYear()} SGA - Servicios de Gestión Ambiental. Todos los derechos reservados.
        </div>
      </footer>

    </div>
  );
}
