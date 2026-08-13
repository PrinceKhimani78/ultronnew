-- =====================================================================
-- Migration: 20260813000002_backfill_service_highlights.sql
--
-- Idempotently backfills the `highlights` object into the `content_blocks`
-- JSONB column for each of the six existing service records.
--
-- Safety guarantees:
--   - Uses `||` (JSONB merge) so ALL existing content_blocks data is preserved.
--   - Each UPDATE is scoped to a specific slug.
--   - Only updates when `content_blocks->'highlights'` IS NULL (idempotent).
--   - Does not affect blogs, team members, enquiries, or website settings.
--   - Does not overwrite an existing `highlights` key an admin has already saved.
-- =====================================================================

-- Business Banking
UPDATE services
SET
  content_blocks = content_blocks || jsonb_build_object(
    'highlights', jsonb_build_object(
      'hero',        'Around Your',
      'advantages',  'for Banking',
      'process',     'Approved',
      'whyUltron',   'Choose Us',
      'faqs',        'Questions'
    )
  ),
  updated_at = NOW()
WHERE
  slug = 'business-banking'
  AND (content_blocks -> 'highlights') IS NULL;

-- Business Setup
UPDATE services
SET
  content_blocks = content_blocks || jsonb_build_object(
    'highlights', jsonb_build_object(
      'hero',        'Built to Actually Operate',
      'advantages',  'Setup Process Apart',
      'process',     'Operational Business',
      'whyUltron',   'Choose Us',
      'faqs',        'Questions'
    )
  ),
  updated_at = NOW()
WHERE
  slug = 'business-setup'
  AND (content_blocks -> 'highlights') IS NULL;

-- Business Finance
UPDATE services
SET
  content_blocks = content_blocks || jsonb_build_object(
    'highlights', jsonb_build_object(
      'hero',        'Lenders Who Actually Say Yes',
      'advantages',  'Business Financing',
      'process',     'Facility Approved',
      'whyUltron',   'Choose Us',
      'faqs',        'Questions'
    )
  ),
  updated_at = NOW()
WHERE
  slug = 'business-finance'
  AND (content_blocks -> 'highlights') IS NULL;

-- Real Estate Mortgages
UPDATE services
SET
  content_blocks = content_blocks || jsonb_build_object(
    'highlights', jsonb_build_object(
      'hero',        'Don''t Fit a Standard Checklist',
      'advantages',  'Mortgage Cases',
      'process',     'Mortgage Case Forward',
      'whyUltron',   'Choose Us',
      'faqs',        'Questions'
    )
  ),
  updated_at = NOW()
WHERE
  slug = 'real-estate-mortgages'
  AND (content_blocks -> 'highlights') IS NULL;

-- Trade Finance
UPDATE services
SET
  content_blocks = content_blocks || jsonb_build_object(
    'highlights', jsonb_build_object(
      'hero',        'Keeps Cash Flow Moving',
      'advantages',  'Trade Finance Covers',
      'process',     'Trade Finance Facility',
      'whyUltron',   'Choose Us',
      'faqs',        'Questions'
    )
  ),
  updated_at = NOW()
WHERE
  slug = 'trade-finance'
  AND (content_blocks -> 'highlights') IS NULL;

-- Compliance & Regulatory Advisory
UPDATE services
SET
  content_blocks = content_blocks || jsonb_build_object(
    'highlights', jsonb_build_object(
      'hero',        'Holds Up Under Scrutiny',
      'advantages',  'Compliance Advisory Covers',
      'process',     'Compliance Position',
      'whyUltron',   'Choose Us',
      'faqs',        'Questions'
    )
  ),
  updated_at = NOW()
WHERE
  slug = 'compliance-regulatory-advisory'
  AND (content_blocks -> 'highlights') IS NULL;
