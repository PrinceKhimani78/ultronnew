'use client';

import { usePathname } from 'next/navigation';
import { type PublicSiteSettings } from '@/lib/cms-data';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FloatingWhatsAppButtonProps {
  settings?: PublicSiteSettings;
}

export function FloatingWhatsAppButton({
  settings,
}: FloatingWhatsAppButtonProps) {
  const pathname = usePathname();

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const rawPhone =
    settings?.cta?.whatsappNumber ||
    settings?.whatsapp ||
    settings?.telephone ||
    '97145751693';
  const phoneNumber = rawPhone.replace(/\D/g, '') || '97145751693';

  const prefilledMessage = encodeURIComponent(
    `Hello ${settings?.name || 'Ultron Financials'}, I would like to discuss my requirements.`,
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${prefilledMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(37,211,102,0.5)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] active:scale-95 md:right-7 md:bottom-7 md:h-16 md:w-16"
    >
      <WhatsAppIcon className="h-7 w-7 fill-white text-white md:h-8 md:w-8" />
    </a>
  );
}
