import { NextResponse } from 'next/server';

import { requireAdmin } from '@/lib/admin/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const admin = await requireAdmin();

    if (admin.profile.role === 'viewer') {
      return NextResponse.json(
        { success: false, message: 'Viewer accounts have read-only access.' },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { enquiryId, note } = body;

    if (!enquiryId || !note || typeof note !== 'string' || note.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Note text cannot be empty.' },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const rpcFn = supabase.rpc as unknown as (
      name: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: unknown }>;

    // Call transactional Security-Definer RPC
    const { data, error } = await rpcFn('add_enquiry_note_with_activity', {
      p_enquiry_id: enquiryId,
      p_note: note.trim(),
      p_admin_id: admin.id,
    });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      data,
      message: 'Note added successfully.',
    });
  } catch (error: unknown) {
    const msg =
      error instanceof Error ? error.message : 'Failed to add internal note.';
    console.error('Admin note creation error:', error);
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
