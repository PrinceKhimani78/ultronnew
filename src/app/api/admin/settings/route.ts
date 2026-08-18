import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { getCurrentAdmin, isSuperAdminOrAdmin } from '@/lib/admin/auth';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase.from('website_settings').select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const settingsMap: Record<string, unknown> = {};
    (data || []).forEach((item) => {
      settingsMap[item.setting_key] = item.setting_value;
    });

    return NextResponse.json({ settings: settingsMap });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !isSuperAdminOrAdmin(admin.profile.role)) {
      return NextResponse.json(
        {
          error:
            'Forbidden. Settings can only be edited by Admins and Super Admins.',
        },
        { status: 403 },
      );
    }

    const body = await request.json();
    const { key, group, value } = body;

    if (!key || !group || value === undefined) {
      return NextResponse.json(
        { error: 'Setting key, group, and value are required.' },
        { status: 400 },
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('website_settings')
      .upsert(
        {
          setting_group: group,
          setting_key: key,
          setting_value: value,
          updated_by: admin.id,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'setting_key' },
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath('/', 'layout');
    revalidatePath('/', 'page');
    revalidatePath('/about', 'page');
    revalidatePath('/partner', 'page');
    revalidatePath('/contact', 'page');
    revalidatePath('/services', 'page');
    revalidatePath('/blogs', 'page');

    return NextResponse.json({ setting: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
