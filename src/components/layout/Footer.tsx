import { COMPANY_INFO } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100 py-12 mt-auto">
      <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 uppercase">{COMPANY_INFO.name}</h3>
          <p className="text-green-200">Expertos en Manejo Integral de Plagas para Industrias, Comercios, Hogares y Jardines. Cuidamos el medio ambiente.</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4 uppercase">Contacto</h3>
          <a href={`tel:${COMPANY_INFO.phone}`} className="block mb-2 hover:text-white transition font-medium">{COMPANY_INFO.phone}</a>
          <p>{COMPANY_INFO.email}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-4 uppercase">Horarios</h3>
          <p className="font-medium">{COMPANY_INFO.schedule}</p>
          <div className="mt-4 inline-block bg-green-800 px-3 py-1 rounded-md border border-green-700">
             <span className="text-green-300 font-bold tracking-wide">URGENCIAS 24HS</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-12 pt-8 border-t border-green-800 text-sm text-green-400 font-medium">
        © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
