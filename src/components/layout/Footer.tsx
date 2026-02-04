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