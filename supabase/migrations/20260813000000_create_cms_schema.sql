-- Supabase Database Migration: Ultron CMS Expansion
-- Migration File: 20260813000000_create_cms_schema.sql

-- 1. Add 'editor' to admin_role enum if it does not already exist
ALTER TYPE admin_role ADD VALUE IF NOT EXISTS 'editor';

-- 2. Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image_url TEXT NOT NULL,
  featured_image_alt TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  author_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  featured_position TEXT DEFAULT 'left',
  published_at TIMESTAMPTZ,
  seo_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  created_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ
);

-- 3. Services Table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_description TEXT NOT NULL,
  hero_title TEXT NOT NULL,
  hero_description TEXT NOT NULL,
  hero_image_url TEXT,
  icon_url TEXT,
  content_blocks JSONB NOT NULL DEFAULT '{}'::jsonb,
  cta_label TEXT NOT NULL DEFAULT 'Talk to Us',
  cta_url TEXT NOT NULL DEFAULT '#contact',
  seo_title TEXT,
  meta_description TEXT,
  status TEXT NOT NULL DEFAULT 'published',
  show_in_navigation BOOLEAN NOT NULL DEFAULT true,
  show_on_homepage BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ
);

-- 4. Team Members Table
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  profile_image_url TEXT,
  image_alt TEXT NOT NULL DEFAULT '',
  bio TEXT,
  email TEXT,
  phone TEXT,
  linkedin_url TEXT,
  social_url TEXT,
  show_email_publicly BOOLEAN NOT NULL DEFAULT false,
  show_phone_publicly BOOLEAN NOT NULL DEFAULT false,
  is_visible BOOLEAN NOT NULL DEFAULT true,
  display_order INT NOT NULL DEFAULT 0,
  created_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  archived_at TIMESTAMPTZ
);

-- 5. Website Settings Table
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_group TEXT NOT NULL,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  updated_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Indexes for Performance & Queries
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_archived_at ON public.blog_posts(archived_at);

CREATE INDEX IF NOT EXISTS idx_services_slug ON public.services(slug);
CREATE INDEX IF NOT EXISTS idx_services_status ON public.services(status);
CREATE INDEX IF NOT EXISTS idx_services_display_order ON public.services(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_services_archived_at ON public.services(archived_at);

CREATE INDEX IF NOT EXISTS idx_team_members_visible ON public.team_members(is_visible);
CREATE INDEX IF NOT EXISTS idx_team_members_display_order ON public.team_members(display_order ASC);
CREATE INDEX IF NOT EXISTS idx_team_members_archived_at ON public.team_members(archived_at);

CREATE INDEX IF NOT EXISTS idx_website_settings_key ON public.website_settings(setting_key);

-- 7. Triggers for Automatic updated_at Updates
CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_team_members_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

CREATE TRIGGER trg_website_settings_updated_at
  BEFORE UPDATE ON public.website_settings
  FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- 8. Row Level Security & Privilege Setup
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_settings ENABLE ROW LEVEL SECURITY;

-- Revoke all table privileges from anon role except SELECT on public rows
REVOKE ALL ON public.blog_posts FROM anon;
REVOKE ALL ON public.services FROM anon;
REVOKE ALL ON public.team_members FROM anon;
REVOKE ALL ON public.website_settings FROM anon;

GRANT SELECT ON public.blog_posts TO anon;
GRANT SELECT ON public.services TO anon;
GRANT SELECT ON public.team_members TO anon;
GRANT SELECT ON public.website_settings TO anon;

-- Authenticated Active Admin Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.services TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.team_members TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.website_settings TO authenticated;

-- RLS Policies for Anon (Public Data)
CREATE POLICY "Public can view published blog posts" ON public.blog_posts
  FOR SELECT TO anon
  USING (status = 'published' AND archived_at IS NULL);

CREATE POLICY "Public can view published services" ON public.services
  FOR SELECT TO anon
  USING (status = 'published' AND archived_at IS NULL);

CREATE POLICY "Public can view visible team members" ON public.team_members
  FOR SELECT TO anon
  USING (is_visible = true AND archived_at IS NULL);

CREATE POLICY "Public can view website settings" ON public.website_settings
  FOR SELECT TO anon
  USING (true);

-- RLS Policies for Active Admins
CREATE POLICY "Admins can view all blog posts" ON public.blog_posts
  FOR SELECT TO authenticated
  USING (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can manage blog posts" ON public.blog_posts
  FOR ALL TO authenticated
  USING (public.is_active_admin(auth.uid()))
  WITH CHECK (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can view all services" ON public.services
  FOR SELECT TO authenticated
  USING (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can manage services" ON public.services
  FOR ALL TO authenticated
  USING (public.is_active_admin(auth.uid()))
  WITH CHECK (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can view all team members" ON public.team_members
  FOR SELECT TO authenticated
  USING (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can manage team members" ON public.team_members
  FOR ALL TO authenticated
  USING (public.is_active_admin(auth.uid()))
  WITH CHECK (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can view all website settings" ON public.website_settings
  FOR SELECT TO authenticated
  USING (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can update website settings" ON public.website_settings
  FOR ALL TO authenticated
  USING (public.is_active_admin(auth.uid()))
  WITH CHECK (public.is_active_admin(auth.uid()));
