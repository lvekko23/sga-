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
      alert(`Por favor, ingresá la cantidad de ${mideEnAmbientes ? 'ambientes' : 'metros cuadrados'}.`);
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
      notas = `Precio calculado a razón de $70.000 por ambiente (${valor} ambientes).`;
    }

    setResultado({ 
      tipo, 
      plaga, 
      medida: valor,
      etiquetaMedida: mideEnAmbientes ? "ambientes" : "m2",
      total: precio.toFixed(2),
      notes,
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
      texto = `Hola SGA! Vengo de la web y necesito un presupuesto personalizado.\n\n🏢 *Sector:* \${resultado.tipo}\n🐛 *Plaga a tratar:* \${resultado.plaga}\n\n¿Me podrían asesorar?`;
    } else {
      texto = `Hola SGA! Generé un presupuesto en su web y quiero coordinar:\n\n🏢 *Cliente:* \${resultado.tipo}\n🐛 *Plaga:* \${resultado.plaga}\n📏 *Espacio:* \${resultado.medida} \${resultado.etiquetaMedida}\n💰 *Presupuesto Estimado:* \$\${resultado.total}\n\n¿Tienen disponibilidad para una visita?`;
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
