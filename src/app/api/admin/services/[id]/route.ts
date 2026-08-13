import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { canEditContent, getCurrentAdmin } from '@/lib/admin/auth';
import { INITIAL_STATIC_SERVICES } from '@/lib/cms-data';
import { slugify } from '@/lib/cms-sanitizer';
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
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      const fallback = INITIAL_STATIC_SERVICES.find(
        (s) => s.id === id || s.slug === id,
      );
      if (fallback) {
        return NextResponse.json({ service: fallback });
      }
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    return NextResponse.json({ service: data });
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
      name,
      slug: customSlug,
      short_description,
      hero_title,
      hero_description,
      hero_image_url,
      icon_url,
      content_blocks,
      cta_label,
      cta_url,
      seo_title,
      meta_description,
      status,
      show_in_navigation,
      show_on_homepage,
      display_order,
    } = body;

    const supabase = await createClient();

    let slug: string | undefined = undefined;
    if (customSlug || name) {
      slug = slugify(customSlug || name);

      // Check unique slug if changed
      const { data: existing } = await supabase
        .from('services')
        .select('id')
        .eq('slug', slug)
        .neq('id', id)
        .maybeSingle();

      if (existing) {
        return NextResponse.json(
          { error: 'Another service is already using this URL slug.' },
          { status: 400 },
        );
      }
    }

    const updatePayload: Record<string, unknown> = {
      updated_by: admin.id,
    };

    if (name !== undefined) updatePayload.name = name;
    if (slug !== undefined) updatePayload.slug = slug;
    if (short_description !== undefined)
      updatePayload.short_description = short_description;
    if (hero_title !== undefined) updatePayload.hero_title = hero_title;
    if (hero_description !== undefined)
      updatePayload.hero_description = hero_description;
    if (hero_image_url !== undefined)
      updatePayload.hero_image_url = hero_image_url;
    if (icon_url !== undefined) updatePayload.icon_url = icon_url;
    if (content_blocks !== undefined)
      updatePayload.content_blocks = content_blocks;
    if (cta_label !== undefined) updatePayload.cta_label = cta_label;
    if (cta_url !== undefined) updatePayload.cta_url = cta_url;
    if (seo_title !== undefined) updatePayload.seo_title = seo_title;
    if (meta_description !== undefined)
      updatePayload.meta_description = meta_description;
    if (status !== undefined) updatePayload.status = status;
    if (show_in_navigation !== undefined)
      updatePayload.show_in_navigation = !!show_in_navigation;
    if (show_on_homepage !== undefined)
      updatePayload.show_on_homepage = !!show_on_homepage;
    if (display_order !== undefined)
      updatePayload.display_order = Number(display_order) || 0;

    const { data, error } = await supabase
      .from('services')
      .update(updatePayload as unknown as { name?: string })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath('/services');
    if (slug) revalidatePath(`/services/${slug}`);
    revalidatePath('/');

    return NextResponse.json({ service: data });
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

    // Soft deletion
    const { error } = await supabase
      .from('services')
      .update({ archived_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath('/services');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
