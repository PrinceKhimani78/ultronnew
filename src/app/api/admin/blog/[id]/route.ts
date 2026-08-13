import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { canEditContent, getCurrentAdmin } from '@/lib/admin/auth';
import { sanitizeHtml, slugify } from '@/lib/cms-sanitizer';
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
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({ post: data });
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
      title,
      slug: customSlug,
      excerpt,
      content,
      featured_image_url,
      featured_image_alt,
      category,
      tags,
      author_name,
      status,
      is_featured,
      featured_position,
      published_at,
      seo_title,
      meta_description,
      og_image_url,
    } = body;

    const slug = slugify(customSlug || title);
    const sanitizedContent = sanitizeHtml(content || '');

    const supabase = await createClient();

    // Check unique slug if changed
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .neq('id', id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'Another post is already using this URL slug.' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        title,
        slug,
        excerpt,
        content: sanitizedContent,
        featured_image_url,
        featured_image_alt,
        category,
        tags: Array.isArray(tags) ? tags : [],
        author_name,
        status,
        is_featured: !!is_featured,
        featured_position,
        published_at:
          status === 'published'
            ? published_at || new Date().toISOString()
            : null,
        seo_title: seo_title || title,
        meta_description: meta_description || excerpt,
        og_image_url,
        updated_by: admin.id,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      let friendlyError = error.message;
      if (error.message.includes('Could not find the table')) {
        friendlyError =
          "The 'blog_posts' table does not exist in Supabase yet. Please run the migration script 'supabase/migrations/20260813000000_create_cms_schema.sql' in your Supabase SQL Editor.";
      }
      return NextResponse.json({ error: friendlyError }, { status: 400 });
    }

    revalidatePath('/blogs');
    revalidatePath(`/blogs/${slug}`);
    revalidatePath('/');

    return NextResponse.json({ post: data });
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
      .from('blog_posts')
      .update({ archived_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      let friendlyError = error.message;
      if (error.message.includes('Could not find the table')) {
        friendlyError =
          "The 'blog_posts' table does not exist in Supabase yet. Please run the migration script 'supabase/migrations/20260813000000_create_cms_schema.sql' in your Supabase SQL Editor.";
      }
      return NextResponse.json({ error: friendlyError }, { status: 400 });
    }

    revalidatePath('/blogs');
    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
