'use client';

import { useEffect, useState } from 'react';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import type { AdminUser } from '@/lib/admin/auth';

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const res = await fetch('/api/admin/me');
        if (!res.ok) {
          window.location.href = '/admin/login';
          return;
        }
        const data = await res.json();
        if (!data.admin) {
          window.location.href = '/admin/login';
          return;
        }
        setAdminUser(data.admin);
      } catch {
        window.location.href = '/admin/login';
      } finally {
        setLoading(false);
      }
    }
    fetchAdmin();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBEE]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#035551] border-t-transparent" />
          <span className="font-display text-sm font-bold tracking-wider text-[#035551] uppercase">
            Loading Ultron Admin...
          </span>
        </div>
      </div>
    );
  }

  if (!adminUser) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminTopBar
          admin={adminUser}
          title="Ultron Lead Dashboard"
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
