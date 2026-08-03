"use client";

import React, { useState } from 'react';

export default function Cotizador() {
  const [tipoPropiedad, setTipoPropiedad] = useState('');
  const [tipoPlaga, setTipoPlaga] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  // Definimos la variable/estado que antes no estaba declarada y causaba el ReferenceError
  const [requierePersonalized, setRequierePersonalized] = useState(false);

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

  const handlePropiedadSelect = (nombrePropiedad: string) => {
    setTipoPropiedad(nombrePropiedad);
    // Si selecciona empresas, comercios o parques, requiere inspección/presupuesto personalizado
    if (nombrePropiedad !== 'Particular / Casa') {
      setRequierePersonalized(true);
    } else {
      setRequierePersonalized(false);
    }
  };

  const handleCotizar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tipoPropiedad || !tipoPlaga) {
      alert("Por favor selecciona el tipo de propiedad y la plaga a tratar.");
      return;
    }

    // Mensaje preconfigurado para enviar directamente al WhatsApp de SGA
    const mensaje = encodeURIComponent(
      `Hola SGA, quisiera solicitar un presupuesto personalizado.\n\n` +
      `*Nombre:* ${nombre || 'No especificado'}\n` +
      `*Teléfono:* ${telefono || 'No especificado'}\n` +
      `*Propiedad:* ${tipoPropiedad}\n` +
      `*Plaga/Servicio:* ${tipoPlaga}\n` +
      `*Requiere inspección especial:* ${requierePersonalized ? 'Sí' : 'No'}`
    );

    window.open(`https://wa.me/5492323357985?text=${mensaje}`, '_blank');
  };

  return (
    <div className="bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6 shadow-2xl max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
          Solicitá tu Presupuesto
        </h2>
        <p className="text-slate-400 text-sm">
          Completá los pasos para comunicarte directamente con nuestro equipo por WhatsApp.
        </p>
      </div>

      <form onSubmit={handleCotizar} className="space-y-6">
        
        {/* Paso 1: Tipo de propiedad */}
        <div>
          <label className="block text-sm font-bold text-emerald-400 uppercase tracking-wider mb-3">
            1. Seleccioná el tipo de propiedad
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {propiedades.map((p) => (
              <button
                type="button"
                key={p.id}
                onClick={() => handlePropiedadSelect(p.nombre)}
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

        {/* Paso 2: Tipo de plaga */}
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

        {/* Aviso si requiere inspección personalizada */}
        {requierePersonalized && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-300">
            ℹ️ Para espacios comerciales, industriales o de gran dimensión se realiza una evaluación previa adaptada.
          </div>
        )}

        {/* Paso 3: Datos opcionales */}
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

        {/* Botón de envío a WhatsApp */}
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-wider text-sm shadow-lg shadow-emerald-900/30"
        >
          <span className="text-xl">💬</span> Enviar consulta y cotizar por WhatsApp
        </button>
      </form>
    </div>
  );
}