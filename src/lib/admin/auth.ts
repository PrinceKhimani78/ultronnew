import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import type { AdminProfile, AdminRole } from '@/lib/supabase/types';

export type AdminUser = {
  id: string;
  email: string;
  profile: {
    id: string;
    full_name: string;
    role: AdminRole;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
};

/**
 * Verifies server-side session authenticity using `getUser()` (not getSession)
 * and retrieves the verified active admin profile from PostgreSQL.
 */
export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const supabase = await createClient();

  // Always verify user with auth server, never rely on unverified session cookies alone
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return null;
  }

  const { data: profileData, error: profileError } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const profile = profileData as unknown as AdminProfile | null;

  if (profileError || !profile || !profile.is_active) {
    return null;
  }

  return {
    id: user.id,
    email: user.email || '',
    profile,
  };
}

/**
 * Enforces server-side authentication and redirects unauthenticated or inactive users.
 */
export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect('/admin/login');
  }

  return admin;
}

/**
 * Enforces server-side role authorization.
 */
export async function requireRole(
  allowedRoles: AdminRole[],
): Promise<AdminUser> {
  const admin = await requireAdmin();

  if (!allowedRoles.includes(admin.profile.role)) {
    redirect('/admin?error=permission_denied');
  }

  return admin;
}
