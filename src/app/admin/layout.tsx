import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ultron Administration | Financial Advisory Lead Management',
  description:
    'Internal lead management and consultation enquiry administration for Ultron Financials.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FDFBEE] font-sans text-slate-900 antialiased">
      {children}
    </div>
  );
}
