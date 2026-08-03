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
          <a href={`tel:${COMPANY_INFO.phone}`} className="block mb-2 hover:text-white transition font-medium">{COMPANY_INFO.phone}</a>
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
      
      <div className="relative mt-12 pt-8 border-t border-green-800 text-center text-sm text-green-400 font-medium">
        <div className="absolute -top-3.5 left-12 md:left-1/4 bg-green-900 px-2 text-green-700 hover:text-green-500 transition-colors duration-300">
          <Bug className="w-7 h-7 transform -rotate-45" />
        </div>
        
        <div className="absolute -top-3.5 right-12 md:right-1/4 bg-green-900 px-2 text-green-700 hover:text-green-500 transition-colors duration-300">
          <Rat className="w-7 h-7 transform scale-x-[-1]" />
        </div>

        © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
