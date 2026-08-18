-- Migration: 20260818000000_website_settings_enhancement.sql
-- Description: Ensure all Website Settings keys and enhanced fields are seeded and synchronized.

-- 1. Ensure website_settings table exists
CREATE TABLE IF NOT EXISTS public.website_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_group TEXT NOT NULL,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  updated_by UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Index on setting_key
CREATE INDEX IF NOT EXISTS idx_website_settings_key ON public.website_settings(setting_key);

-- 3. Upsert enhanced default records for all 4 settings groups
INSERT INTO public.website_settings (setting_group, setting_key, setting_value)
VALUES
('general', 'company_info', '{
  "business_name": "Ultron Financials",
  "legal_name": "Ultron Financials",
  "tagline": "UAE company formation, banking and compliance",
  "short_description": "Ultron Financials is a corporate advisory firm in the UAE delivering end-to-end business advisory for banking, company setup, compliance and financial structuring.",
  "primary_email": "info@ultronfinancials.com",
  "secondary_email": "info@ultronfinancials.com",
  "primary_phone": "+971 4 575 1693",
  "whatsapp_number": "+971 4 575 1693",
  "office_address": "Office No. 19-20, 1503, 15th Floor, Fahidi Heights, Khalid Bin Al Waleed Road, Dubai, UAE",
  "city": "Dubai",
  "state_emirate": "Dubai",
  "country": "AE",
  "postal_code": "00000",
  "google_maps_url": "",
  "google_maps_embed_url": "",
  "working_hours": "Monday – Friday: 9:00 AM – 6:00 PM (GST)"
}'::jsonb),
('social', 'social_links', '{
  "linkedin_url": "https://www.linkedin.com/company/ultron-financials",
  "instagram_url": "",
  "facebook_url": "",
  "youtube_url": "",
  "twitter_url": "",
  "whatsapp_url": "https://wa.me/97145751693"
}'::jsonb),
('header_footer', 'contact_details', '{
  "header_phone": "+971 4 575 1693",
  "header_email": "info@ultronfinancials.com",
  "header_cta_label": "Book a call",
  "header_cta_link": "#contact",
  "footer_email": "info@ultronfinancials.com",
  "footer_phone": "+971 4 575 1693",
  "footer_whatsapp": "+971 4 575 1693",
  "footer_address": "Office No. 19-20, 1503, 15th Floor, Fahidi Heights, Khalid Bin Al Waleed Road, Dubai, UAE",
  "footer_working_hours": "Monday – Friday: 9:00 AM – 6:00 PM (GST)",
  "footer_copyright_text": "Ultron Financials. All rights reserved.",
  "footer_short_description": "UAE corporate advisory firm delivering business banking, setup, finance, and regulatory compliance."
}'::jsonb),
('cta_forms', 'cta_settings', '{
  "default_cta_label": "Book a call",
  "default_cta_destination": "#contact",
  "consultation_email_recipient": "info@ultronfinancials.com",
  "form_notification_email": "info@ultronfinancials.com",
  "whatsapp_cta_number": "97145751693"
}'::jsonb)
ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  updated_at = now();
