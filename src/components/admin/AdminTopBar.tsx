'use client';

import { Menu, User } from 'lucide-react';

import type { AdminUser } from '@/lib/admin/auth';

type Props = {
  admin: AdminUser;
  title: string;
  onOpenMobileMenu?: () => void;
};

export function AdminTopBar({ admin, title, onOpenMobileMenu }: Props) {
  const roleLabel =
    admin.profile.role === 'super_admin'
      ? 'Super Admin'
      : admin.profile.role === 'admin'
        ? 'Administrator'
        : 'Viewer';

  return (
    <header className="flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </button>

        <h1 className="font-display text-lg font-bold text-slate-900 uppercase sm:text-xl">
          {title}
        </h1>
      </div>

      {/* User Badge */}
      <div className="flex items-center gap-3">
        <div className="hidden flex-col text-right sm:flex">
          <span className="text-sm font-bold text-slate-900">
            {admin.profile.full_name || admin.email}
          </span>
          <span className="text-xs font-semibold text-[#035551] uppercase">
            {roleLabel}
          </span>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#035551]/10 text-[#035551]">
          <User className="h-5 w-5" />
        </div>
      </div>
    </header>
  );
}
