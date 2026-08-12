import { NextResponse } from 'next/server';

import { requireAdmin } from '@/lib/admin/auth';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await requireAdmin();

    // Check if role is allowed (super_admin or admin, viewer cannot mutate)
    if (admin.profile.role === 'viewer') {
      return NextResponse.json(
        { success: false, message: 'Viewer accounts have read-only access.' },
        { status: 403 },
      );
    }

    const { id } = await params;
    const body = await request.json();

    const { status, priority, assigned_to, archive } = body;

    const supabase = await createClient();

    let result;

    const rpcFn = supabase.rpc as unknown as (
      name: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: unknown }>;

    if (typeof archive === 'boolean') {
      // Archive / Restore transactional RPC
      const { data, error } = await rpcFn('archive_enquiry_with_activity', {
        p_enquiry_id: id,
        p_archive: archive,
        p_admin_id: admin.id,
      });

      if (error) throw error;
      result = data;
    } else {
      // Update status / priority / assignment transactional RPC
      const { data, error } = await rpcFn('update_enquiry_with_activity', {
        p_enquiry_id: id,
        p_status: status || null,
        p_priority: priority || null,
        p_assigned_to: assigned_to || null,
        p_admin_id: admin.id,
      });

      if (error) throw error;
      result = data;
    }

    return NextResponse.json({
      success: true,
      data: result,
      message: 'Enquiry updated successfully.',
    });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : 'Failed to update enquiry.';
    console.error('Admin enquiry update error:', error);
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
