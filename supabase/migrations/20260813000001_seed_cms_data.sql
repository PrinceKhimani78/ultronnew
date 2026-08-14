-- Supabase Seed Migration: Initial Content Migration
-- Migration File: 20260813000001_seed_cms_data.sql

-- Seed Website Settings
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
  "office_address": "Office No. 19-20, 1503, 15th Floor, Fahidi Heights, Khalid Bin Al Waleed Road",
  "city": "Dubai",
  "state_emirate": "Dubai",
  "country": "AE",
  "postal_code": "00000",
  "google_maps_url": "",
  "google_maps_embed_url": "",
  "working_hours": "Monday - Friday: 9:00 AM - 6:00 PM GST"
}'::jsonb),
('social', 'social_links', '{
  "linkedin_url": "https://www.linkedin.com/company/ultron-financials",
  "instagram_url": "",
  "facebook_url": "",
  "youtube_url": "",
  "twitter_url": ""
}'::jsonb),
('header_footer', 'contact_details', '{
  "header_phone": "+971 4 575 1693",
  "header_email": "info@ultronfinancials.com",
  "footer_phone": "+971 4 575 1693",
  "footer_email": "info@ultronfinancials.com",
  "footer_address": "Office No. 19-20, 1503, 15th Floor, Fahidi Heights, Khalid Bin Al Waleed Road, Dubai, UAE",
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
ON CONFLICT (setting_key) DO NOTHING;

-- Seed Services
INSERT INTO public.services (id, name, slug, short_description, hero_title, hero_description, cta_label, cta_url, seo_title, meta_description, status, show_in_navigation, show_on_homepage, display_order, content_blocks)
VALUES
(
  's1111111-1111-1111-1111-111111111111',
  'Business Banking',
  'business-banking',
  'Corporate accounts for nationalities and activities standard applications struggle with.',
  'Banking Built Around Your Actual Profile',
  'Corporate accounts for nationalities and activities standard applications struggle with.',
  'Talk to Us',
  '#contact',
  'Business Banking | Ultron Financials',
  'Corporate accounts for nationalities and activities standard applications struggle with.',
  'published',
  true,
  true,
  1,
  '{
    "benefits": [
      "Structuring for complex ownership and multi jurisdiction income",
      "Documentation reviewed before it reaches a bank",
      "Introductions to banks with real appetite for your profile",
      "Support through every compliance query",
      "One direct point of contact throughout"
    ],
    "advantages": {
      "headline": "Why Businesses Come to Us for Banking",
      "subtext": "Most rejections come down to positioning, not eligibility."
    },
    "process": {
      "headline": "How We Get Your Account Approved",
      "subtext": "A process built on why applications actually fail.",
      "steps": [
        {"step": "STEP 01", "title": "Initial Review", "desc": "We flag anything a bank might question.", "imageSrc": "/brand/banking-process-01.jpg", "imageAlt": "Initial Review"},
        {"step": "STEP 02", "title": "Positioning", "desc": "We rebuild the application to answer those questions upfront.", "imageSrc": "/brand/banking-process-02.jpg", "imageAlt": "Positioning"},
        {"step": "STEP 03", "title": "Submission", "desc": "We approach banks with genuine appetite for your profile.", "imageSrc": "/brand/banking-process-03.jpg", "imageAlt": "Submission"},
        {"step": "STEP 04", "title": "Resolution", "desc": "We stay involved until the account is active.", "imageSrc": "/brand/banking-process-04.jpg", "imageAlt": "Resolution"}
      ]
    },
    "whyUltron": {
      "introduction": "Account decisions come down to how a case is built, not just whether you qualify.",
      "points": [
        "We address the reason behind a decline, not just the paperwork",
        "We approach only banks that fit your profile",
        "We stay engaged until the account is open"
      ]
    },
    "faqs": [
      {"q": "Can you help if my application was declined?", "a": "Yes, we review why and rebuild the case before reapplying."},
      {"q": "Do you work with higher risk activities?", "a": "Yes, provided the business is legitimate."},
      {"q": "How long does account opening take?", "a": "It depends on your profile, we will give a realistic estimate upfront."},
      {"q": "Will you tell me honestly if my case won''t work?", "a": "Yes, we assess feasibility before taking on a case."},
      {"q": "Do I need a company already set up?", "a": "No, we can factor banking into the setup itself."}
    ],
    "cta": {
      "headline": "Start With a Structure That Works",
      "subtext": "Tell us about your business and we will map out the setup.",
      "buttonLabel": "Talk to Us"
    }
  }'::jsonb
),
(
  's2222222-2222-2222-2222-222222222222',
  'Business Setup',
  'business-setup',
  'Mainland, free zone and offshore formation, structured for how you will bank and grow.',
  'Company Structures Built to Actually Operate',
  'Mainland, free zone and offshore formation, structured for how you will bank and grow.',
  'Talk to Us',
  '#contact',
  'Business Setup | Ultron Financials',
  'Mainland, free zone and offshore formation, structured for how you will bank and grow.',
  'published',
  true,
  true,
  2,
  '{
    "benefits": [
      "Jurisdiction and licence selection matched to your activity",
      "Ownership structuring built to survive bank scrutiny",
      "Full handling of registration and documentation",
      "Setup coordinated with account opening",
      "One advisor from first call to operational readiness"
    ],
    "advantages": {
      "headline": "What Sets Our Setup Process Apart",
      "subtext": "The structure behind the licence matters more than the licence itself."
    },
    "process": {
      "headline": "From Idea to Operational Business",
      "subtext": "A sequence built to avoid rework later.",
      "steps": [
        {"step": "STEP 01", "title": "Consultation", "desc": "We understand your activity and banking plans.", "imageSrc": "/brand/setup-process-01.jpg", "imageAlt": "Consultation"},
        {"step": "STEP 02", "title": "Structuring", "desc": "We design the jurisdiction and ownership structure.", "imageSrc": "/brand/setup-process-02.jpg", "imageAlt": "Structuring"},
        {"step": "STEP 03", "title": "Registration", "desc": "We manage filings and government processes.", "imageSrc": "/brand/setup-process-03.jpg", "imageAlt": "Registration"},
        {"step": "STEP 04", "title": "Handover", "desc": "We coordinate your transition into banking.", "imageSrc": "/brand/setup-process-04.jpg", "imageAlt": "Handover"}
      ]
    },
    "whyUltron": {
      "introduction": "Most setup problems surface later, at the bank or at renewal. We structure for what comes after.",
      "points": [
        "Structures built with banking in mind from day one",
        "Direct involvement in registration, not outsourced",
        "Support continues after the company is formed"
      ]
    },
    "faqs": [
      {"q": "Which jurisdiction is right for me?", "a": "It depends on your activity and banking needs, we will assess and recommend."},
      {"q": "Can you restructure an existing company?", "a": "Yes, we regularly fix setups causing banking issues."},
      {"q": "How long does formation take?", "a": "It depends on jurisdiction, we will give a realistic timeline."},
      {"q": "Will I be able to open an account after setup?", "a": "Yes, we structure with banking in mind from the start."},
      {"q": "Do you handle visas too?", "a": "We ensure the structure supports visa processes correctly."}
    ],
    "cta": {
      "headline": "Start With a Structure That Works",
      "subtext": "Tell us about your business and we will map out the setup.",
      "buttonLabel": "Talk to Us"
    }
  }'::jsonb
),
(
  's3333333-3333-3333-3333-333333333333',
  'Business Finance',
  'business-finance',
  'Secured and unsecured business loans, matched to real lender appetite.',
  'Financing Matched to Lenders Who Actually Say Yes',
  'Secured and unsecured business loans, matched to real lender appetite.',
  'Talk to Us',
  '#contact',
  'Business Finance | Ultron Financials',
  'Secured and unsecured business loans, matched to real lender appetite.',
  'published',
  true,
  true,
  3,
  '{
    "benefits": [
      "Secured and unsecured facilities, including POS finance",
      "Working capital finance options",
      "Lender shortlisting based on real appetite",
      "Documentation structured for underwriting",
      "Managed through to funding"
    ],
    "advantages": {
      "headline": "How We Approach Business Financing",
      "subtext": "We narrow the field before we submit anything."
    },
    "process": {
      "headline": "How We Get a Facility Approved",
      "subtext": "A process built around lender fit.",
      "steps": [
        {"step": "STEP 01", "title": "Assessment", "desc": "We review your financing need and financials.", "imageSrc": "/brand/finance-process-01.jpg", "imageAlt": "Assessment"},
        {"step": "STEP 02", "title": "Structuring", "desc": "We prepare documentation for underwriting.", "imageSrc": "/brand/finance-process-02.jpg", "imageAlt": "Structuring"},
        {"step": "STEP 03", "title": "Matching", "desc": "We approach lenders that genuinely fit.", "imageSrc": "/brand/finance-process-03.jpg", "imageAlt": "Matching"},
        {"step": "STEP 04", "title": "Funding", "desc": "We manage the process through to disbursement.", "imageSrc": "/brand/finance-process-04.jpg", "imageAlt": "Funding"}
      ]
    },
    "whyUltron": {
      "introduction": "Financing outcomes come down to fit, not just financial strength.",
      "points": [
        "Lenders shortlisted by real appetite, not a mailout",
        "Documentation structured the way underwriting reads it",
        "Involvement through to disbursement"
      ]
    },
    "faqs": [
      {"q": "What financing do you arrange?", "a": "Secured and unsecured business loans and POS finance."},
      {"q": "Been declined before?", "a": "A decline often reflects lender mismatch, we reassess and refit."},
      {"q": "How much can I qualify for?", "a": "Depends on financials and sector, we will give a realistic range."},
      {"q": "How long does it take?", "a": "Varies by lender, a structured application moves faster."},
      {"q": "UAE lenders only?", "a": "Mostly, though we consider others where they genuinely fit."}
    ],
    "cta": {
      "headline": "Start With a Structure That Works",
      "subtext": "Tell us about your business and we will map out the setup.",
      "buttonLabel": "Talk to Us"
    }
  }'::jsonb
),
(
  's4444444-4444-4444-4444-444444444444',
  'Real Estate Mortgages',
  'real-estate-mortgages',
  'Residential, commercial and off plan mortgages, including cases stalled elsewhere.',
  'Mortgages for Cases That Don''t Fit a Standard Checklist',
  'Residential, commercial and off plan mortgages, including cases stalled elsewhere.',
  'Talk to Us',
  '#contact',
  'Real Estate Mortgages | Ultron Financials',
  'Residential, commercial and off plan mortgages, including cases stalled elsewhere.',
  'published',
  true,
  true,
  4,
  '{
    "benefits": [
      "Mortgages for residents and non-residents",
      "Commercial mortgages for offices, warehouses and retail units",
      "Off plan mortgages with staged disbursement",
      "Equity release and loan against property",
      "Repositioning of stalled cases"
    ],
    "advantages": {
      "headline": "Why Mortgage Cases Come to Us",
      "subtext": "Declines usually come down to presentation, not viability."
    },
    "process": {
      "headline": "How We Move a Mortgage Case Forward",
      "subtext": "A process built to fix what went wrong before.",
      "steps": [
        {"step": "STEP 01", "title": "Case Review", "desc": "We assess income, assets and prior flags.", "imageSrc": "/brand/process-consultation.webp", "imageAlt": "Case Review"},
        {"step": "STEP 02", "title": "Repositioning", "desc": "We restructure how the case is presented.", "imageSrc": "/brand/process-strategy.webp", "imageAlt": "Repositioning"},
        {"step": "STEP 03", "title": "Lender Matching", "desc": "We approach lenders that genuinely fit.", "imageSrc": "/brand/process-execution.webp", "imageAlt": "Lender Matching"},
        {"step": "STEP 04", "title": "Completion", "desc": "We manage the process through to disbursement.", "imageSrc": "/brand/process-support.webp", "imageAlt": "Completion"}
      ]
    },
    "whyUltron": {
      "introduction": "Mortgage cases fail on presentation, not qualification. We build for that.",
      "points": [
        "Cases reviewed for the specific reason they stalled",
        "Coverage across residential, commercial and off plan",
        "Managed through to disbursement"
      ]
    },
    "faqs": [
      {"q": "Declined before?", "a": "Yes we can help, we review why and restructure before reapplying."},
      {"q": "Do you work with non-residents?", "a": "Yes, this is a large part of what we handle."},
      {"q": "Off plan financing?", "a": "Yes, coordinated with developer documentation."},
      {"q": "Multi jurisdiction income?", "a": "Yes, we present it in a way lenders can assess."},
      {"q": "Commercial mortgages?", "a": "Yes, including offices, warehouses and retail units."}
    ],
    "cta": {
      "headline": "Start With a Structure That Works",
      "subtext": "Tell us about your business and we will map out the setup.",
      "buttonLabel": "Talk to Us"
    }
  }'::jsonb
),
(
  's5555555-5555-5555-5555-555555555555',
  'Trade Finance',
  'trade-finance',
  'Invoice discounting, letters of credit, bank guarantees and supplier payment finance.',
  'Trade Finance That Keeps Cash Flow Moving',
  'Invoice discounting, letters of credit, bank guarantees and supplier payment finance.',
  'Talk to Us',
  '#contact',
  'Trade Finance | Ultron Financials',
  'Invoice discounting, letters of credit, bank guarantees and supplier payment finance.',
  'published',
  true,
  true,
  5,
  '{
    "benefits": [
      "Invoice discounting against receivables",
      "Letters of credit for import and export",
      "Bank guarantees for contracts and tenders",
      "Supplier payment finance",
      "Overdraft facilities for working capital"
    ],
    "advantages": {
      "headline": "What Our Trade Finance Covers",
      "subtext": "Facilities matched to how your trade cycle actually runs."
    },
    "process": {
      "headline": "How We Structure a Trade Finance Facility",
      "subtext": "Built around your trade cycle, not a standard product.",
      "steps": [
        {"step": "STEP 01", "title": "Assessment", "desc": "We review your trade cycle and financing need.", "imageSrc": "/brand/process-consultation.webp", "imageAlt": "Assessment"},
        {"step": "STEP 02", "title": "Structuring", "desc": "We match the facility type to your requirement.", "imageSrc": "/brand/process-strategy.webp", "imageAlt": "Structuring"},
        {"step": "STEP 03", "title": "Lender Matching", "desc": "We approach institutions with trade finance appetite.", "imageSrc": "/brand/process-execution.webp", "imageAlt": "Lender Matching"},
        {"step": "STEP 04", "title": "Activation", "desc": "We manage the process through to activation.", "imageSrc": "/brand/process-support.webp", "imageAlt": "Activation"}
      ]
    },
    "whyUltron": {
      "introduction": "Trade finance only works if the facility matches the trade cycle. We structure for that fit.",
      "points": [
        "Facilities matched to how your trade cycle runs",
        "Coverage across LCs, guarantees and discounting",
        "Managed through to activation"
      ]
    },
    "faqs": [
      {"q": "What is invoice discounting?", "a": "Financing raised against unpaid invoices to release cash faster."},
      {"q": "Do you arrange import and export LCs?", "a": "Yes, both."},
      {"q": "What are bank guarantees used for?", "a": "Contracts, tenders and supplier commitments."},
      {"q": "Can you help with supplier payment terms?", "a": "Yes, we structure supplier payment finance facilities."},
      {"q": "Do you work with SMEs?", "a": "Yes, alongside larger trading operations."}
    ],
    "cta": {
      "headline": "Start With a Structure That Works",
      "subtext": "Tell us about your business and we will map out the setup.",
      "buttonLabel": "Talk to Us"
    }
  }'::jsonb
),
(
  's6666666-6666-6666-6666-666666666666',
  'Compliance & Regulatory Advisory',
  'compliance-regulatory-advisory',
  'AML, ESR, UBO compliance and transaction monitoring for UAE businesses.',
  'Compliance That Holds Up Under Scrutiny',
  'AML, ESR, UBO compliance and transaction monitoring for UAE businesses.',
  'Talk to Us',
  '#contact',
  'Compliance & Regulatory Advisory | Ultron Financials',
  'AML, ESR, UBO compliance and transaction monitoring for UAE businesses.',
  'published',
  true,
  true,
  6,
  '{
    "benefits": [
      "AML and CFT compliance reviews",
      "Economic Substance Regulations filings",
      "UBO declaration and compliance support",
      "Transaction monitoring frameworks",
      "Regulatory filing support and documentation"
    ],
    "advantages": {
      "headline": "What Our Compliance Advisory Covers",
      "subtext": "Built around your actual risk exposure, not a generic checklist."
    },
    "process": {
      "headline": "How We Manage Your Compliance Position",
      "subtext": "A structured review, not a one off filing.",
      "steps": [
        {"step": "STEP 01", "title": "Review", "desc": "We assess your current compliance position.", "imageSrc": "/brand/process-consultation.webp", "imageAlt": "Review"},
        {"step": "STEP 02", "title": "Gap Analysis", "desc": "We identify exposure and missing filings.", "imageSrc": "/brand/process-strategy.webp", "imageAlt": "Gap Analysis"},
        {"step": "STEP 03", "title": "Remediation", "desc": "We put the required framework in place.", "imageSrc": "/brand/process-execution.webp", "imageAlt": "Remediation"},
        {"step": "STEP 04", "title": "Ongoing Support", "desc": "We manage filings as they come due.", "imageSrc": "/brand/process-support.webp", "imageAlt": "Ongoing Support"}
      ]
    },
    "whyUltron": {
      "introduction": "Compliance gaps surface at the worst time, during a bank review or audit. We close them before that happens.",
      "points": [
        "Reviews based on your actual risk exposure",
        "Coverage across AML, ESR, UBO and transaction monitoring",
        "Ongoing support, not a one time filing"
      ]
    },
    "faqs": [
      {"q": "Do I need a BREA assessment?", "a": "It applies to certain regulated activities, we will confirm if it applies to you."},
      {"q": "Do you handle ESR filings?", "a": "Yes, including notification and reporting."},
      {"q": "What is UBO compliance?", "a": "Declaring your ultimate beneficial owners to the relevant authority."},
      {"q": "Can you help with an existing compliance gap?", "a": "Yes, we assess and remediate."},
      {"q": "Is this ongoing or one time?", "a": "Both, depending on your regulatory obligations."}
    ],
    "cta": {
      "headline": "Start With a Structure That Works",
      "subtext": "Tell us about your business and we will map out the setup.",
      "buttonLabel": "Talk to Us"
    }
  }'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Blog Posts
INSERT INTO public.blog_posts (id, title, slug, excerpt, content, featured_image_url, featured_image_alt, category, tags, author_name, status, is_featured, featured_position, published_at, seo_title, meta_description)
VALUES
(
  'b1111111-1111-1111-1111-111111111111',
  'Why UAE Bank Account Applications Get Rejected',
  'why-uae-bank-account-applications-get-rejected',
  'Understanding the hidden triggers behind account declines—from vague business activity descriptions to incomplete ultimate beneficial owner (UBO) documentation.',
  '<p>Navigating the financial and regulatory landscape in the United Arab Emirates requires strict adherence to institutional standards, comprehensive documentation, and proactive risk management.</p><h2>Key Advisory Considerations</h2><p>Whether you are establishing a new mainland presence, structuring a freezone holding company, or undergoing an annual compliance audit, banking underwriting officers look for transparency, proof of economic substance, and clear ultimate beneficial ownership (UBO) declaration.</p><ul><li>Clear identification of primary suppliers and client base.</li><li>Verified source of funds declarations with supporting audited accounts.</li><li>Alignment between registered trade license activities and actual transaction flows.</li></ul>',
  'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
  'UAE corporate banking setup documents and advisory meeting',
  'Banking Advisory',
  ARRAY['Banking', 'Compliance', 'UAE Setup'],
  'Ultron Advisory',
  'published',
  true,
  'left',
  '2026-08-02T10:00:00Z',
  'Why UAE Bank Account Applications Get Rejected | Ultron Insights',
  'Understanding the hidden triggers behind account declines—from vague business activity descriptions to incomplete ultimate beneficial owner documentation.'
),
(
  'b2222222-2222-2222-2222-222222222222',
  'What Founders Should Know Before Setting Up in Dubai',
  'what-founders-should-know-before-setting-up-in-dubai',
  'Key strategic choices regarding shareholding structures, physical office mandates, and operational licenses required prior to committing capital.',
  '<p>Setting up a company in Dubai is an exciting milestone, but strategic planning must precede any licensing commitments. Choosing the right jurisdiction and corporate structure impacts your long-term banking ease and regulatory overhead.</p>',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
  'Dubai skyline and financial district center',
  'Company Formation',
  ARRAY['Dubai', 'Company Setup', 'Founders'],
  'Ultron Advisory',
  'published',
  false,
  'left',
  '2026-07-28T10:00:00Z',
  'What Founders Should Know Before Setting Up in Dubai | Ultron Insights',
  'Key strategic choices regarding shareholding structures, physical office mandates, and operational licenses required prior to committing capital.'
),
(
  'b3333333-3333-3333-3333-333333333333',
  'How to Prepare for a Business Banking Compliance Review',
  'how-to-prepare-for-a-business-banking-compliance-review',
  'A step-by-step checklist for annual AML audits, transaction justification files, and source of funds verification required by UAE tier-1 banks.',
  '<p>Annual compliance reviews and AML checks are standard practice among UAE banks. Having clear transaction trails and counterparty contracts organized ensures uninterrupted banking operations.</p>',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  'Financial compliance review audit documents',
  'Compliance & AML',
  ARRAY['AML', 'Compliance', 'Banking'],
  'Ultron Advisory',
  'published',
  false,
  'left',
  '2026-07-21T10:00:00Z',
  'How to Prepare for a Business Banking Compliance Review | Ultron Insights',
  'A step-by-step checklist for annual AML audits, transaction justification files, and source of funds verification required by UAE tier-1 banks.'
),
(
  'b4444444-4444-4444-4444-444444444444',
  'Mainland vs Free Zone: Choosing the Right Structure',
  'mainland-vs-free-zone-choosing-the-right-structure',
  'Comparing tax implications, onshore trading rights, DIFC/ADGM common law benefits, and operational flexibility for scaling businesses.',
  '<p>Deciding between a Mainland entity and a Free Zone company depends on your target market, operational requirements, and physical office presence needs in the UAE.</p>',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  'Modern corporate architecture in Dubai international financial center',
  'Tax & Structuring',
  ARRAY['Mainland', 'Free Zone', 'Structuring'],
  'Ultron Advisory',
  'published',
  false,
  'left',
  '2026-07-14T10:00:00Z',
  'Mainland vs Free Zone: Choosing the Right Structure | Ultron Insights',
  'Comparing tax implications, onshore trading rights, DIFC/ADGM common law benefits, and operational flexibility for scaling businesses.'
),
(
  'b5555555-5555-5555-5555-555555555555',
  'What to Do When Your Business Account Is Flagged',
  'what-to-do-when-your-business-account-is-flagged',
  'How to navigate compliance inquiries, prevent account freezes, and present clear audit trails when facing unexpected bank requests.',
  '<p>If your bank account faces a compliance hold or flag, swift and structured communication is essential to prevent operational disruptions or account closure.</p>',
  'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  'Corporate financial advisor analyzing banking compliance files',
  'Banking Advisory',
  ARRAY['Banking', 'Compliance', 'Advisory'],
  'Ultron Advisory',
  'published',
  true,
  'right',
  '2026-07-05T10:00:00Z',
  'What to Do When Your Business Account Is Flagged | Ultron Insights',
  'How to navigate compliance inquiries, prevent account freezes, and present clear audit trails when facing unexpected bank requests.'
),
(
  'b6666666-6666-6666-6666-666666666666',
  'Understanding UAE Corporate Tax for Growing Businesses',
  'understanding-uae-corporate-tax-for-growing-businesses',
  'Navigating the 9% corporate tax threshold, Qualifying Free Zone Person (QFZP) status exemptions, and transfer pricing requirements.',
  '<p>The UAE Corporate Tax regime introduces standard 9% tax rates on taxable income exceeding AED 375,000. Maintaining proper accounting records and assessing QFZP status is mandatory.</p>',
  'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
  'Corporate tax calculations and financial planning spreadsheets',
  'Tax & Structuring',
  ARRAY['Corporate Tax', 'UAE Tax', 'Compliance'],
  'Ultron Advisory',
  'published',
  false,
  'left',
  '2026-06-26T10:00:00Z',
  'Understanding UAE Corporate Tax for Growing Businesses | Ultron Insights',
  'Navigating the 9% corporate tax threshold, Qualifying Free Zone Person (QFZP) status exemptions, and transfer pricing requirements.'
),
(
  'b7777777-7777-7777-7777-777777777777',
  'The Documents Banks Actually Review',
  'the-documents-banks-actually-review',
  'Beyond invoices and bank statements: how underwriters evaluate supplier contracts, proof of origin, and counterparty reputation.',
  '<p>Underwriters look beyond basic invoices. They evaluate the depth of counterparty relationships, logistics tracking, supplier background, and legitimate business substance.</p>',
  'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80',
  'Legal and banking document verification folder',
  'Banking Advisory',
  ARRAY['Banking', 'Documentation', 'Underwriting'],
  'Ultron Advisory',
  'published',
  false,
  'left',
  '2026-06-18T10:00:00Z',
  'The Documents Banks Actually Review | Ultron Insights',
  'Beyond invoices and bank statements: how underwriters evaluate supplier contracts, proof of origin, and counterparty reputation.'
),
(
  'b8888888-8888-8888-8888-888888888888',
  'How International Founders Can Build Banking Credibility',
  'how-international-founders-can-build-banking-credibility',
  'Establishing substance, local residency proof, and institutional transparency for seamless global expansion into the Middle East.',
  '<p>Building institutional credibility with UAE banks requires clear proof of business substance, personal background verification, and clear rationale for establishing Middle Eastern operations.</p>',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  'International business founders meeting in modern Dubai boardroom',
  'Company Formation',
  ARRAY['Founders', 'Credibility', 'Expansion'],
  'Ultron Advisory',
  'published',
  false,
  'left',
  '2026-06-10T10:00:00Z',
  'How International Founders Can Build Banking Credibility | Ultron Insights',
  'Establishing substance, local residency proof, and institutional transparency for seamless global expansion into the Middle East.'
)
ON CONFLICT (slug) DO NOTHING;

-- Seed Team Members
INSERT INTO public.team_members (id, full_name, job_title, profile_image_url, image_alt, bio, email, phone, linkedin_url, social_url, show_email_publicly, show_phone_publicly, is_visible, display_order)
VALUES
(
  't1111111-1111-1111-1111-111111111111',
  'Kuldeep',
  'Founder & Lead Advisor',
  '/brand/kuldeep.png',
  'Kuldeep - Founder & Lead Advisor',
  'Founder and senior strategic corporate advisor at Ultron Financials.',
  'kuldeep@ultronfinancials.com',
  '',
  '',
  '',
  false,
  false,
  true,
  1
),
(
  't2222222-2222-2222-2222-222222222222',
  'Raghuveer',
  'Banking Advisor',
  '/brand/raghuveer.png',
  'Raghuveer - Banking Advisor',
  'Corporate banking relationship specialist with deep regional underwriting insight.',
  'raghuveer@ultronfinancials.com',
  '',
  '',
  '',
  false,
  false,
  true,
  2
),
(
  't3333333-3333-3333-3333-333333333333',
  'Chanchal',
  'Operations & Client Relations',
  '/brand/chanchal.png',
  'Chanchal - Operations & Client Relations',
  'Head of client onboarding, operational compliance, and administration.',
  'chanchal@ultronfinancials.com',
  '',
  '',
  '',
  false,
  false,
  true,
  3
),
(
  't4444444-4444-4444-4444-444444444444',
  'Manoj',
  'Business Development',
  '/brand/manoj.jpeg',
  'Manoj - Business Development',
  'Business development lead focused on corporate setup, licensing strategy, and market entry.',
  'manoj@ultronfinancials.com',
  '',
  '',
  '',
  false,
  false,
  true,
  4
),
(
  't5555555-5555-5555-5555-555555555555',
  'Virendra',
  'Business Development',
  '/brand/viren.jpeg',
  'Virendra - Business Development',
  'Business development advisor assisting clients with company structuring and commercial licensing.',
  'virendra@ultronfinancials.com',
  '',
  '',
  '',
  false,
  false,
  true,
  5
)
ON CONFLICT (id) DO NOTHING;
