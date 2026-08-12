'use client';

import { BarChart3, Inbox, LogOut, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { createClient } from '@/lib/supabase/client';

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
};

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: BarChart3 },
  { label: 'Enquiries', href: '/admin/enquiries', icon: Inbox },
] as const;

export function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between bg-[#023F3D] p-5 text-white">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-[#FDFBEE] text-lg font-bold text-[#035551]">
              UF
            </div>
            <div>
              <span className="font-display block text-base font-bold tracking-tight text-white uppercase">
                Ultron Admin
              </span>
              <span className="block text-[11px] font-medium tracking-widest text-[#DCCB8E] uppercase">
                Lead System
              </span>
            </div>
          </Link>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-white/70 hover:text-white lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav
          aria-label="Admin Navigation"
          className="mt-6 flex flex-col gap-1.5"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#035551] font-semibold text-[#FDFBEE] shadow-inner'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Sign Out */}
      <div className="border-t border-white/10 pt-4">
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-red-300 hover:bg-red-950/40 hover:text-red-100"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-[#023F3D] lg:block">
        {navContent}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-full shadow-2xl">
            {navContent}
          </div>
        </div>
      )}
    </>
  );
}
