-- Supabase Database Migration: Ultron Financials Admin Panel & Enquiry System
-- Migration File: 20260812000000_create_admin_schema.sql

-- Enable uuid-ossp extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Enums
CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'viewer');
CREATE TYPE enquiry_status AS ENUM ('new', 'reviewing', 'contacted', 'qualified', 'not_qualified', 'converted', 'closed');
CREATE TYPE enquiry_priority AS ENUM ('low', 'normal', 'high', 'urgent');
CREATE TYPE delivery_status AS ENUM ('pending', 'delivered', 'failed');

-- 2. Admin Profiles Table
CREATE TABLE public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE RESTRICT,
  full_name TEXT NOT NULL,
  role admin_role NOT NULL DEFAULT 'admin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Sequence for Dynamic Enquiry Reference Numbers
CREATE SEQUENCE IF NOT EXISTS enquiry_reference_seq START WITH 101 INCREMENT BY 1;

-- Reference Number Function: UF-YYYY-000101
CREATE OR REPLACE FUNCTION generate_enquiry_reference()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
DECLARE
  seq_val BIGINT;
  year_str TEXT;
BEGIN
  seq_val := nextval('enquiry_reference_seq');
  year_str := to_char(now(), 'YYYY');
  RETURN 'UF-' || year_str || '-' || lpad(seq_val::text, 6, '0');
END;
$$;

-- 4. Enquiries Table
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number TEXT UNIQUE NOT NULL DEFAULT generate_enquiry_reference(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country_code TEXT,
  company_name TEXT,
  business_type TEXT,
  service TEXT,
  message TEXT,
  source_page TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  status enquiry_status NOT NULL DEFAULT 'new',
  priority enquiry_priority NOT NULL DEFAULT 'normal',
  assigned_to UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_contacted_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Enquiry Notes Table
CREATE TABLE public.enquiry_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES public.admin_profiles(id) ON DELETE RESTRICT,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Enquiry Activity Timeline Table
CREATE TABLE public.enquiry_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  previous_value JSONB,
  new_value JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Integration Deliveries Table (Resend / CRM Audit)
CREATE TABLE public.integration_deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES public.enquiries(id) ON DELETE CASCADE,
  destination TEXT NOT NULL,
  status delivery_status NOT NULL DEFAULT 'pending',
  attempt_count INT NOT NULL DEFAULT 1,
  last_attempt_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  external_id TEXT,
  last_error_code TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Performance & RLS Indexes
CREATE INDEX idx_admin_profiles_active_role ON public.admin_profiles(id, is_active, role);
CREATE INDEX idx_enquiries_status ON public.enquiries(status);
CREATE INDEX idx_enquiries_service ON public.enquiries(service);
CREATE INDEX idx_enquiries_priority ON public.enquiries(priority);
CREATE INDEX idx_enquiries_submitted_at ON public.enquiries(submitted_at DESC);
CREATE INDEX idx_enquiries_assigned_to ON public.enquiries(assigned_to);
CREATE INDEX idx_enquiries_archived_at ON public.enquiries(archived_at);
CREATE INDEX idx_enquiries_email_lower ON public.enquiries(lower(email));
CREATE INDEX idx_enquiry_notes_enquiry_id ON public.enquiry_notes(enquiry_id);
CREATE INDEX idx_enquiry_activity_enquiry_id ON public.enquiry_activity(enquiry_id);
CREATE INDEX idx_integration_deliveries_enquiry ON public.integration_deliveries(enquiry_id);

-- 9. Automatic Updated-At Trigger Function
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_admin_profiles_updated_at BEFORE UPDATE ON public.admin_profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER trg_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
CREATE TRIGGER trg_enquiry_notes_updated_at BEFORE UPDATE ON public.enquiry_notes FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

-- 10. Helper Function for Active Admin Check
CREATE OR REPLACE FUNCTION public.is_active_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  active_status BOOLEAN;
BEGIN
  SELECT is_active INTO active_status
  FROM public.admin_profiles
  WHERE id = user_id;
  RETURN COALESCE(active_status, false);
END;
$$;

-- 11. Transactional Security-Definer RPC Functions
CREATE OR REPLACE FUNCTION public.update_enquiry_with_activity(
  p_enquiry_id UUID,
  p_status enquiry_status DEFAULT NULL,
  p_priority enquiry_priority DEFAULT NULL,
  p_assigned_to UUID DEFAULT NULL,
  p_admin_id UUID DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  old_rec RECORD;
  new_rec RECORD;
  act_action TEXT := 'update';
BEGIN
  SELECT * INTO old_rec FROM public.enquiries WHERE id = p_enquiry_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Enquiry not found';
  END IF;

  UPDATE public.enquiries
  SET
    status = COALESCE(p_status, status),
    priority = COALESCE(p_priority, priority),
    assigned_to = CASE WHEN p_assigned_to IS NOT NULL THEN p_assigned_to ELSE assigned_to END,
    last_contacted_at = CASE WHEN p_status = 'contacted' THEN now() ELSE last_contacted_at END,
    updated_at = now()
  WHERE id = p_enquiry_id
  RETURNING * INTO new_rec;

  IF p_status IS NOT NULL AND p_status != old_rec.status THEN
    act_action := 'status_changed';
  ELSIF p_priority IS NOT NULL AND p_priority != old_rec.priority THEN
    act_action := 'priority_changed';
  ELSIF p_assigned_to IS NOT NULL AND p_assigned_to != old_rec.assigned_to THEN
    act_action := 'assigned';
  END IF;

  INSERT INTO public.enquiry_activity (enquiry_id, admin_id, action, previous_value, new_value)
  VALUES (
    p_enquiry_id,
    p_admin_id,
    act_action,
    to_jsonb(old_rec),
    to_jsonb(new_rec)
  );

  RETURN to_jsonb(new_rec);
END;
$$;

CREATE OR REPLACE FUNCTION public.add_enquiry_note_with_activity(
  p_enquiry_id UUID,
  p_note TEXT,
  p_admin_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  note_rec RECORD;
BEGIN
  INSERT INTO public.enquiry_notes (enquiry_id, admin_id, note)
  VALUES (p_enquiry_id, p_admin_id, p_note)
  RETURNING * INTO note_rec;

  INSERT INTO public.enquiry_activity (enquiry_id, admin_id, action, new_value)
  VALUES (p_enquiry_id, p_admin_id, 'note_added', jsonb_build_object('note_id', note_rec.id, 'note', p_note));

  RETURN to_jsonb(note_rec);
END;
$$;

CREATE OR REPLACE FUNCTION public.archive_enquiry_with_activity(
  p_enquiry_id UUID,
  p_archive BOOLEAN,
  p_admin_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_rec RECORD;
  act_action TEXT;
BEGIN
  IF p_archive THEN
    UPDATE public.enquiries SET archived_at = now() WHERE id = p_enquiry_id RETURNING * INTO new_rec;
    act_action := 'archived';
  ELSE
    UPDATE public.enquiries SET archived_at = NULL WHERE id = p_enquiry_id RETURNING * INTO new_rec;
    act_action := 'restored';
  END IF;

  INSERT INTO public.enquiry_activity (enquiry_id, admin_id, action, new_value)
  VALUES (p_enquiry_id, p_admin_id, act_action, to_jsonb(new_rec));

  RETURN to_jsonb(new_rec);
END;
$$;

-- 12. Row Level Security (RLS) & Explicit Grant Revocation
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.integration_deliveries ENABLE ROW LEVEL SECURITY;

-- Explicitly REVOKE all table privileges from anon role
REVOKE ALL ON public.admin_profiles FROM anon;
REVOKE ALL ON public.enquiries FROM anon;
REVOKE ALL ON public.enquiry_notes FROM anon;
REVOKE ALL ON public.enquiry_activity FROM anon;
REVOKE ALL ON public.integration_deliveries FROM anon;

-- Grant permissions to authenticated active admins
GRANT SELECT, UPDATE ON public.admin_profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.enquiries TO authenticated;
GRANT SELECT, INSERT, UPDATE ON public.enquiry_notes TO authenticated;
GRANT SELECT, INSERT ON public.enquiry_activity TO authenticated;
GRANT SELECT, INSERT ON public.integration_deliveries TO authenticated;

-- RLS Policies
-- Admin Profiles Policy
CREATE POLICY "Admins can view active admin profiles" ON public.admin_profiles
  FOR SELECT TO authenticated
  USING (public.is_active_admin(auth.uid()));

-- Enquiries Policy
CREATE POLICY "Admins can view enquiries" ON public.enquiries
  FOR SELECT TO authenticated
  USING (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can update enquiries" ON public.enquiries
  FOR UPDATE TO authenticated
  USING (public.is_active_admin(auth.uid()))
  WITH CHECK (public.is_active_admin(auth.uid()));

-- Enquiry Notes Policy
CREATE POLICY "Admins can view enquiry notes" ON public.enquiry_notes
  FOR SELECT TO authenticated
  USING (public.is_active_admin(auth.uid()));

CREATE POLICY "Admins can insert enquiry notes" ON public.enquiry_notes
  FOR INSERT TO authenticated
  WITH CHECK (public.is_active_admin(auth.uid()) AND auth.uid() = admin_id);

-- Enquiry Activity Policy
CREATE POLICY "Admins can view enquiry activity" ON public.enquiry_activity
  FOR SELECT TO authenticated
  USING (public.is_active_admin(auth.uid()));
