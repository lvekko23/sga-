import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function WhatsAppButton() {
  return (
    <a
      href={COMPANY_INFO.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}