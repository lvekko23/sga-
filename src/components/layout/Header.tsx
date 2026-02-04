import Link from 'next/link';
import { Phone, Lightbulb } from 'lucide-react';
import { COMPANY_INFO, MENU_ITEMS } from '@/lib/constants';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        
        {/* LOGO: Bombilla + SGA */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 bg-green-100 rounded-full border-2 border-green-600 group-hover:bg-green-600 transition-colors duration-300">
            <Lightbulb className="w-6 h-6 text-green-700 group-hover:text-white transition-colors duration-300" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            {/* CORRECCIÓN: Texto en Verde Oscuro (no blanco) */}
            <span className="text-3xl font-extrabold text-green-900 tracking-tighter">SGA</span>
            <span className="text-[0.65rem] font-bold text-green-700 tracking-widest uppercase">Control de Plagas</span>
          </div>
        </Link>
        
        {/* MENÚ: Enlaces en Verde Oscuro */}
        <nav className="hidden md:flex gap-8">
          {MENU_ITEMS.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              // CORRECCIÓN: text-green-900 para que se vea bien sobre blanco
              className="text-sm font-bold text-green-900 hover:text-green-600 uppercase tracking-wide transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Botón de Llamada */}
        <div className="flex items-center gap-4">
          <a href={`tel:${COMPANY_INFO.phone}`} className="hidden md:flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-full hover:bg-green-800 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <Phone size={18} />
            <span className="font-bold">Llamar Ahora</span>
          </a>
        </div>
      </div>
    </header>
  );
}