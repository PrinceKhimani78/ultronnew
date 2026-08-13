import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { canEditContent, getCurrentAdmin } from '@/lib/admin/auth';
import { INITIAL_STATIC_SERVICES } from '@/lib/cms-data';
import { slugify } from '@/lib/cms-sanitizer';
import { createClient } from '@/lib/supabase/server';
import type { ServiceRecord } from '@/lib/supabase/types';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const { data: dbData, error } = await supabase
      .from('services')
      .select('*')
      .is('archived_at', null)
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 },
      );
    }

    const currentServices = (dbData || []) as ServiceRecord[];
    const existingSlugs = new Set(currentServices.map((s) => s.slug));
    const missingServices = INITIAL_STATIC_SERVICES.filter(
      (ss) => !existingSlugs.has(ss.slug),
    );

    if (missingServices.length > 0) {
      try {
        await supabase
          .from('services')
          .upsert(missingServices as unknown as ServiceRecord[], {
            onConflict: 'slug',
            ignoreDuplicates: true,
          });

        const { data: reFetched, error: reFetchError } = await supabase
          .from('services')
          .select('*')
          .is('archived_at', null)
          .order('display_order', { ascending: true });

        if (!reFetchError && reFetched && reFetched.length > 0) {
          return NextResponse.json({ services: reFetched });
        }
      } catch (seedErr: unknown) {
        console.error('Auto-seed error for services:', seedErr);
      }
    }

    if (currentServices.length === 0) {
      return NextResponse.json({ services: INITIAL_STATIC_SERVICES });
    }

    return NextResponse.json({ services: currentServices });
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

    if (!name || !short_description) {
      return NextResponse.json(
        { error: 'Service name and short description are required.' },
        { status: 400 },
      );
    }

    const slug = slugify(customSlug || name);
    const supabase = await createClient();

    const { data: existing } = await supabase
      .from('services')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'A service with this URL slug already exists.' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('services')
      .insert({
        name,
        slug,
        short_description,
        hero_title: hero_title || name,
        hero_description: hero_description || short_description,
        hero_image_url,
        icon_url,
        content_blocks: content_blocks || {},
        cta_label: cta_label || 'Talk to Us',
        cta_url: cta_url || '#contact',
        seo_title: seo_title || name,
        meta_description: meta_description || short_description,
        status: status || 'published',
        show_in_navigation: show_in_navigation ?? true,
        show_on_homepage: show_on_homepage ?? true,
        display_order: Number(display_order) || 0,
        created_by: admin.id,
        updated_by: admin.id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    revalidatePath('/services');
    revalidatePath(`/services/${slug}`);
    revalidatePath('/');

    return NextResponse.json({ service: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
