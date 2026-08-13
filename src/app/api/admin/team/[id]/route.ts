import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { canEditContent, getCurrentAdmin } from '@/lib/admin/auth';
import { INITIAL_STATIC_TEAM } from '@/lib/cms-data';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const supabase = await createClient();

    const { data, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      const fallback = INITIAL_STATIC_TEAM.find((m) => m.id === id);
      if (fallback) {
        return NextResponse.json({ member: fallback });
      }
      return NextResponse.json(
        { error: 'Team member not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ member: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !canEditContent(admin.profile.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const {
      full_name,
      job_title,
      profile_image_url,
      image_alt,
      bio,
      email,
      phone,
      linkedin_url,
      social_url,
      show_email_publicly,
      show_phone_publicly,
      is_visible,
      display_order,
    } = body;

    const supabase = await createClient();

    const updatePayload: Record<string, unknown> = {
      updated_by: admin.id,
    };

    if (full_name !== undefined) updatePayload.full_name = full_name;
    if (job_title !== undefined) updatePayload.job_title = job_title;
    if (profile_image_url !== undefined)
      updatePayload.profile_image_url = profile_image_url;
    if (image_alt !== undefined) updatePayload.image_alt = image_alt;
    if (bio !== undefined) updatePayload.bio = bio;
    if (email !== undefined) updatePayload.email = email;
    if (phone !== undefined) updatePayload.phone = phone;
    if (linkedin_url !== undefined) updatePayload.linkedin_url = linkedin_url;
    if (social_url !== undefined) updatePayload.social_url = social_url;
    if (show_email_publicly !== undefined)
      updatePayload.show_email_publicly = !!show_email_publicly;
    if (show_phone_publicly !== undefined)
      updatePayload.show_phone_publicly = !!show_phone_publicly;
    if (is_visible !== undefined) updatePayload.is_visible = !!is_visible;
    if (display_order !== undefined)
      updatePayload.display_order = Number(display_order) || 1;

    const { data, error } = await supabase
      .from('team_members')
      .update(updatePayload as unknown as { full_name?: string })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath('/about');
    revalidatePath('/');

    return NextResponse.json({ member: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !canEditContent(admin.profile.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id } = await params;
    const supabase = await createClient();

    const { error } = await supabase
      .from('team_members')
      .update({ archived_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath('/about');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
