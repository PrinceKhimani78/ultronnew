import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { canEditContent, getCurrentAdmin } from '@/lib/admin/auth';
import { INITIAL_STATIC_TEAM } from '@/lib/cms-data';
import { createClient } from '@/lib/supabase/server';
import type { TeamMemberRecord } from '@/lib/supabase/types';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const { data: dbData, error } = await supabase
      .from('team_members')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 },
      );
    }

    const currentTeam = (dbData || []) as TeamMemberRecord[];
    const existingIds = new Set(currentTeam.map((tm) => tm.id));
    const missingTeam = INITIAL_STATIC_TEAM.filter(
      (st) => !existingIds.has(st.id),
    );

    if (missingTeam.length > 0) {
      try {
        await supabase
          .from('team_members')
          .upsert(missingTeam, { onConflict: 'id', ignoreDuplicates: true });

        const { data: reFetched, error: reFetchError } = await supabase
          .from('team_members')
          .select('*')
          .order('display_order', { ascending: true });

        if (!reFetchError && reFetched && reFetched.length > 0) {
          return NextResponse.json({ team: reFetched });
        }
      } catch (seedErr: unknown) {
        console.error('Auto-seed error for team members:', seedErr);
      }
    }

    if (currentTeam.length === 0) {
      return NextResponse.json({ team: INITIAL_STATIC_TEAM });
    }

    return NextResponse.json({ team: currentTeam });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !canEditContent(admin.profile.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

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

    if (!full_name || !job_title) {
      return NextResponse.json(
        { error: 'Full name and job title are required.' },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('team_members')
      .insert({
        full_name,
        job_title,
        profile_image_url: profile_image_url || '/brand/kuldeep.png',
        image_alt: image_alt || full_name,
        bio: bio || null,
        email: email || null,
        phone: phone || null,
        linkedin_url: linkedin_url || null,
        social_url: social_url || null,
        show_email_publicly: !!show_email_publicly,
        show_phone_publicly: !!show_phone_publicly,
        is_visible: is_visible ?? true,
        display_order: Number(display_order) || 1,
        created_by: admin.id,
        updated_by: admin.id,
      })
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
