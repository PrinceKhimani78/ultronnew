import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

import { canEditContent, getCurrentAdmin } from '@/lib/admin/auth';
import { sanitizeHtml, slugify } from '@/lib/cms-sanitizer';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .is('archived_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      let friendlyError = error.message;
      if (error.message.includes('Could not find the table')) {
        friendlyError =
          "The 'blog_posts' table does not exist in Supabase yet. Please run the migration script 'supabase/migrations/20260813000000_create_cms_schema.sql' in your Supabase SQL Editor.";
      }
      return NextResponse.json({ error: friendlyError }, { status: 400 });
    }

    return NextResponse.json({ posts: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
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

    if (!title || !excerpt || !category) {
      return NextResponse.json(
        { error: 'Title, excerpt, and category are required.' },
        { status: 400 },
      );
    }

    const slug = slugify(customSlug || title);
    const sanitizedContent = sanitizeHtml(content || '');

    const supabase = await createClient();

    // Check unique slug
    const { data: existing } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: 'A blog post with this URL slug already exists.' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title,
        slug,
        excerpt,
        content: sanitizedContent,
        featured_image_url:
          featured_image_url ||
          'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        featured_image_alt: featured_image_alt || title,
        category,
        tags: Array.isArray(tags) ? tags : [],
        author_name:
          author_name || admin.profile.full_name || 'Ultron Advisory',
        status: status || 'draft',
        is_featured: !!is_featured,
        featured_position: featured_position || 'left',
        published_at:
          status === 'published'
            ? published_at || new Date().toISOString()
            : null,
        seo_title: seo_title || title,
        meta_description: meta_description || excerpt,
        og_image_url: og_image_url || featured_image_url,
        created_by: admin.id,
        updated_by: admin.id,
      })
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
