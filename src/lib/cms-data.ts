import { ABOUT_PAGE } from '@/content/about-page';
import { BLOG_POSTS, type BlogPost } from '@/content/blogs';
import { SERVICES, type Service } from '@/content/services';
import { SITE } from '@/content/site';
import { createClient } from '@/lib/supabase/server';
import type {
  BlogPostRecord,
  ServiceRecord,
  TeamMemberRecord,
  WebsiteSettingRecord,
} from '@/lib/supabase/types';

export type PublicSiteSettings = typeof SITE;

const INITIAL_STATIC_POSTS = [
  {
    id: 'b1111111-1111-1111-1111-111111111111',
    title: 'Why UAE Bank Account Applications Get Rejected',
    slug: 'why-uae-bank-account-applications-get-rejected',
    excerpt:
      'Understanding the hidden triggers behind account declines—from vague business activity descriptions to incomplete ultimate beneficial owner (UBO) documentation.',
    content:
      '<p>Navigating the financial and regulatory landscape in the United Arab Emirates requires strict adherence to institutional standards, comprehensive documentation, and proactive risk management.</p><h2>Key Advisory Considerations</h2><p>Whether you are establishing a new mainland presence, structuring a freezone holding company, or undergoing an annual compliance audit, banking underwriting officers look for transparency, proof of economic substance, and clear ultimate beneficial ownership (UBO) declaration.</p><ul><li>Clear identification of primary suppliers and client base.</li><li>Verified source of funds declarations with supporting audited accounts.</li><li>Alignment between registered trade license activities and actual transaction flows.</li></ul>',
    featured_image_url:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    featured_image_alt:
      'UAE corporate banking setup documents and advisory meeting',
    category: 'Banking Advisory',
    tags: ['Banking', 'Compliance', 'UAE Setup'],
    author_name: 'Ultron Advisory',
    status: 'published' as const,
    is_featured: true,
    featured_position: 'left' as const,
    published_at: '2026-08-02T10:00:00Z',
    seo_title:
      'Why UAE Bank Account Applications Get Rejected | Ultron Insights',
    meta_description:
      'Understanding the hidden triggers behind account declines—from vague business activity descriptions to incomplete ultimate beneficial owner documentation.',
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    title: 'What Founders Should Know Before Setting Up in Dubai',
    slug: 'what-founders-should-know-before-setting-up-in-dubai',
    excerpt:
      'Key strategic choices regarding shareholding structures, physical office mandates, and operational licenses required prior to committing capital.',
    content:
      '<p>Setting up a company in Dubai is an exciting milestone, but strategic planning must precede any licensing commitments. Choosing the right jurisdiction and corporate structure impacts your long-term banking ease and regulatory overhead.</p>',
    featured_image_url:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    featured_image_alt: 'Dubai skyline and financial district center',
    category: 'Company Formation',
    tags: ['Dubai', 'Company Setup', 'Founders'],
    author_name: 'Ultron Advisory',
    status: 'published' as const,
    is_featured: false,
    featured_position: 'left' as const,
    published_at: '2026-07-28T10:00:00Z',
    seo_title:
      'What Founders Should Know Before Setting Up in Dubai | Ultron Insights',
    meta_description:
      'Key strategic choices regarding shareholding structures, physical office mandates, and operational licenses required prior to committing capital.',
  },
  {
    id: 'b3333333-3333-3333-3333-333333333333',
    title: 'How to Prepare for a Business Banking Compliance Review',
    slug: 'how-to-prepare-for-a-business-banking-compliance-review',
    excerpt:
      'A step-by-step checklist for annual AML audits, transaction justification files, and source of funds verification required by UAE tier-1 banks.',
    content:
      '<p>Annual compliance reviews and AML checks are standard practice among UAE banks. Having clear transaction trails and counterparty contracts organized ensures uninterrupted banking operations.</p>',
    featured_image_url:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    featured_image_alt: 'Financial compliance review audit documents',
    category: 'Compliance & AML',
    tags: ['AML', 'Compliance', 'Banking'],
    author_name: 'Ultron Advisory',
    status: 'published' as const,
    is_featured: false,
    featured_position: 'left' as const,
    published_at: '2026-07-21T10:00:00Z',
    seo_title:
      'How to Prepare for a Business Banking Compliance Review | Ultron Insights',
    meta_description:
      'A step-by-step checklist for annual AML audits, transaction justification files, and source of funds verification required by UAE tier-1 banks.',
  },
  {
    id: 'b4444444-4444-4444-4444-444444444444',
    title: 'Mainland vs Free Zone: Choosing the Right Structure',
    slug: 'mainland-vs-free-zone-choosing-the-right-structure',
    excerpt:
      'Comparing tax implications, onshore trading rights, DIFC/ADGM common law benefits, and operational flexibility for scaling businesses.',
    content:
      '<p>Deciding between a Mainland entity and a Free Zone company depends on your target market, operational requirements, and physical office presence needs in the UAE.</p>',
    featured_image_url:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    featured_image_alt:
      'Modern corporate architecture in Dubai international financial center',
    category: 'Tax & Structuring',
    tags: ['Mainland', 'Free Zone', 'Structuring'],
    author_name: 'Ultron Advisory',
    status: 'published' as const,
    is_featured: false,
    featured_position: 'left' as const,
    published_at: '2026-07-14T10:00:00Z',
    seo_title:
      'Mainland vs Free Zone: Choosing the Right Structure | Ultron Insights',
    meta_description:
      'Comparing tax implications, onshore trading rights, DIFC/ADGM common law benefits, and operational flexibility for scaling businesses.',
  },
  {
    id: 'b5555555-5555-5555-5555-555555555555',
    title: 'What to Do When Your Business Account Is Flagged',
    slug: 'what-to-do-when-your-business-account-is-flagged',
    excerpt:
      'How to navigate compliance inquiries, prevent account freezes, and present clear audit trails when facing unexpected bank requests.',
    content:
      '<p>If your bank account faces a compliance hold or flag, swift and structured communication is essential to prevent operational disruptions or account closure.</p>',
    featured_image_url:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    featured_image_alt:
      'Corporate financial advisor analyzing banking compliance files',
    category: 'Banking Advisory',
    tags: ['Banking', 'Compliance', 'Advisory'],
    author_name: 'Ultron Advisory',
    status: 'published' as const,
    is_featured: true,
    featured_position: 'right' as const,
    published_at: '2026-07-05T10:00:00Z',
    seo_title:
      'What to Do When Your Business Account Is Flagged | Ultron Insights',
    meta_description:
      'How to navigate compliance inquiries, prevent account freezes, and present clear audit trails when facing unexpected bank requests.',
  },
  {
    id: 'b6666666-6666-6666-6666-666666666666',
    title: 'Understanding UAE Corporate Tax for Growing Businesses',
    slug: 'understanding-uae-corporate-tax-for-growing-businesses',
    excerpt:
      'Navigating the 9% corporate tax threshold, Qualifying Free Zone Person (QFZP) status exemptions, and transfer pricing requirements.',
    content:
      '<p>The UAE Corporate Tax regime introduces standard 9% tax rates on taxable income exceeding AED 375,000. Maintaining proper accounting records and assessing QFZP status is mandatory.</p>',
    featured_image_url:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    featured_image_alt:
      'Corporate tax calculations and financial planning spreadsheets',
    category: 'Tax & Structuring',
    tags: ['Corporate Tax', 'UAE Tax', 'Compliance'],
    author_name: 'Ultron Advisory',
    status: 'published' as const,
    is_featured: false,
    featured_position: 'left' as const,
    published_at: '2026-06-26T10:00:00Z',
    seo_title:
      'Understanding UAE Corporate Tax for Growing Businesses | Ultron Insights',
    meta_description:
      'Navigating the 9% corporate tax threshold, Qualifying Free Zone Person (QFZP) status exemptions, and transfer pricing requirements.',
  },
  {
    id: 'b7777777-7777-7777-7777-777777777777',
    title: 'The Documents Banks Actually Review',
    slug: 'the-documents-banks-actually-review',
    excerpt:
      'Beyond invoices and bank statements: how underwriters evaluate supplier contracts, proof of origin, and counterparty reputation.',
    content:
      '<p>Underwriters look beyond basic invoices. They evaluate the depth of counterparty relationships, logistics tracking, supplier background, and legitimate business substance.</p>',
    featured_image_url:
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80',
    featured_image_alt: 'Legal and banking document verification folder',
    category: 'Banking Advisory',
    tags: ['Banking', 'Documentation', 'Underwriting'],
    author_name: 'Ultron Advisory',
    status: 'published' as const,
    is_featured: false,
    featured_position: 'left' as const,
    published_at: '2026-06-18T10:00:00Z',
    seo_title: 'The Documents Banks Actually Review | Ultron Insights',
    meta_description:
      'Beyond invoices and bank statements: how underwriters evaluate supplier contracts, proof of origin, and counterparty reputation.',
  },
  {
    id: 'b8888888-8888-8888-8888-888888888888',
    title: 'How International Founders Can Build Banking Credibility',
    slug: 'how-international-founders-can-build-banking-credibility',
    excerpt:
      'Establishing substance, local residency proof, and institutional transparency for seamless global expansion into the Middle East.',
    content:
      '<p>Building institutional credibility with UAE banks requires clear proof of business substance, personal background verification, and clear rationale for establishing Middle Eastern operations.</p>',
    featured_image_url:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    featured_image_alt:
      'International business founders meeting in modern Dubai boardroom',
    category: 'Company Formation',
    tags: ['Founders', 'Credibility', 'Expansion'],
    author_name: 'Ultron Advisory',
    status: 'published' as const,
    is_featured: false,
    featured_position: 'left' as const,
    published_at: '2026-06-10T10:00:00Z',
    seo_title:
      'How International Founders Can Build Banking Credibility | Ultron Insights',
    meta_description:
      'Establishing substance, local residency proof, and institutional transparency for seamless global expansion into the Middle East.',
  },
];

export const INITIAL_STATIC_SERVICES: ServiceRecord[] = SERVICES.map(
  (s, idx) => ({
    id: `s${idx + 1}${idx + 1}${idx + 1}${idx + 1}${idx + 1}${idx + 1}${idx + 1}${idx + 1}-1111-1111-1111-111111111111`,
    name: s.title,
    slug: s.slug,
    short_description: s.description,
    hero_title: s.headline,
    hero_description: s.tagline,
    hero_image_url: null,
    icon_url: null,
    cta_label: s.cta.buttonLabel || 'Talk to Us',
    cta_url: '#contact',
    seo_title: `${s.title} | Ultron Financials`,
    meta_description: s.description,
    status: 'published' as const,
    show_in_navigation: true,
    show_on_homepage: true,
    display_order: idx + 1,
    content_blocks: JSON.parse(
      JSON.stringify({
        benefits: s.benefits,
        advantages: s.advantages,
        process: s.process,
        whyUltron: s.whyUltron,
        faqs: s.faqs,
        cta: s.cta,
        highlights: s.highlights ?? {},
      }),
    ),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    updated_by: null,
    archived_at: null,
  }),
);

export const INITIAL_STATIC_TEAM: TeamMemberRecord[] = [
  {
    id: 't1111111-1111-1111-1111-111111111111',
    full_name: 'Kuldeep',
    job_title: 'Founder & Lead Advisor',
    profile_image_url: '/brand/kuldeep.png',
    image_alt: 'Kuldeep - Founder & Lead Advisor',
    bio: 'Founder and senior strategic corporate advisor at Ultron Financials.',
    email: 'kuldeep@ultronfinancials.com',
    phone: null,
    linkedin_url: null,
    social_url: null,
    show_email_publicly: false,
    show_phone_publicly: false,
    is_visible: true,
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    updated_by: null,
    archived_at: null,
  },
  {
    id: 't2222222-2222-2222-2222-222222222222',
    full_name: 'Raghuveer',
    job_title: 'Banking Advisor',
    profile_image_url: '/brand/raghuveer.png',
    image_alt: 'Raghuveer - Banking Advisor',
    bio: 'Corporate banking relationship specialist with deep regional underwriting insight.',
    email: 'raghuveer@ultronfinancials.com',
    phone: null,
    linkedin_url: null,
    social_url: null,
    show_email_publicly: false,
    show_phone_publicly: false,
    is_visible: true,
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    updated_by: null,
    archived_at: null,
  },
  {
    id: 't3333333-3333-3333-3333-333333333333',
    full_name: 'Chanchal',
    job_title: 'Operations & Client Relations',
    profile_image_url: '/brand/chanchal.png',
    image_alt: 'Chanchal - Operations & Client Relations',
    bio: 'Head of client onboarding, operational compliance, and administration.',
    email: 'chanchal@ultronfinancials.com',
    phone: null,
    linkedin_url: null,
    social_url: null,
    show_email_publicly: false,
    show_phone_publicly: false,
    is_visible: true,
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: null,
    updated_by: null,
    archived_at: null,
  },
];

/**
 * Fetches published blog posts from Supabase database.
 * Idempotently auto-seeds the 8 static posts if missing in database.
 */
export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  try {
    const supabase = await createClient();
    const { data: dbData, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .is('archived_at', null)
      .order('published_at', { ascending: false });

    if (error) {
      return BLOG_POSTS as unknown as BlogPost[];
    }

    const currentPosts = (dbData || []) as BlogPostRecord[];
    const existingSlugs = new Set(currentPosts.map((p) => p.slug));
    const missingPosts = INITIAL_STATIC_POSTS.filter(
      (sp) => !existingSlugs.has(sp.slug),
    );

    // Auto-seed missing static posts into Supabase if database table exists
    if (missingPosts.length > 0) {
      try {
        await supabase
          .from('blog_posts')
          .upsert(missingPosts, { onConflict: 'slug', ignoreDuplicates: true });

        // Re-fetch after seeding
        const { data: reFetched } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .is('archived_at', null)
          .order('published_at', { ascending: false });

        if (reFetched && reFetched.length > 0) {
          return (reFetched as BlogPostRecord[]).map(formatBlogPostRecord);
        }
      } catch {
        // Fallback to in-memory merge if write fails
      }
    }

    if (currentPosts.length === 0) {
      return BLOG_POSTS as unknown as BlogPost[];
    }

    return currentPosts.map(formatBlogPostRecord);
  } catch {
    return BLOG_POSTS as unknown as BlogPost[];
  }
}

function formatBlogPostRecord(dbPost: BlogPostRecord): BlogPost {
  return {
    id: dbPost.id,
    slug: dbPost.slug,
    title: dbPost.title,
    category: dbPost.category,
    date: dbPost.published_at
      ? new Date(dbPost.published_at).toLocaleDateString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
        })
      : 'Recent',
    readTime: '5 min read',
    excerpt: dbPost.excerpt,
    imageUrl: dbPost.featured_image_url || '/brand/kuldeep.png',
    imageAlt: dbPost.featured_image_alt || dbPost.title,
    featured: dbPost.is_featured,
    featuredPosition: dbPost.featured_position || 'left',
    content: dbPost.content,
  };
}

/**
 * Fetches single published blog post by slug.
 */
export async function getBlogPostBySlug(
  slug: string,
): Promise<(BlogPost & { content?: string }) | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .is('archived_at', null)
      .single();

    if (error || !data) {
      const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
      return staticPost ? (staticPost as BlogPost) : null;
    }

    return formatBlogPostRecord(data as BlogPostRecord);
  } catch {
    const staticPost = BLOG_POSTS.find((p) => p.slug === slug);
    return staticPost ? (staticPost as BlogPost) : null;
  }
}

/**
 * Fetches published services with fallback to static `SERVICES`.
 * Auto-seeds missing static services into Supabase database.
 */
export async function getPublishedServices(): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data: dbData, error } = await supabase
      .from('services')
      .select('*')
      .eq('status', 'published')
      .is('archived_at', null)
      .order('display_order', { ascending: true });

    if (error) {
      return SERVICES as unknown as Service[];
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

        const { data: reFetched } = await supabase
          .from('services')
          .select('*')
          .eq('status', 'published')
          .is('archived_at', null)
          .order('display_order', { ascending: true });

        if (reFetched && reFetched.length > 0) {
          return (reFetched as ServiceRecord[]).map(formatServiceRecord);
        }
      } catch {
        // Fallback
      }
    }

    if (currentServices.length === 0) {
      return SERVICES as unknown as Service[];
    }

    return currentServices.map(formatServiceRecord);
  } catch {
    return SERVICES as unknown as Service[];
  }
}

function formatServiceRecord(dbService: ServiceRecord, index: number): Service {
  const content = (dbService.content_blocks || {}) as Record<string, unknown>;
  const staticMatch = SERVICES.find((s) => s.slug === dbService.slug);

  // Pull highlights from CMS content_blocks, fall back to static data
  const dbHighlights = content.highlights as
    import('@/content/services').ServiceHighlights | undefined;

  return {
    slug: dbService.slug,
    number: (dbService.display_order || index + 1).toString(),
    title: dbService.name,
    headline: dbService.hero_title || staticMatch?.headline || dbService.name,
    tagline: dbService.short_description || staticMatch?.tagline || '',
    description: dbService.short_description || staticMatch?.description || '',
    benefits:
      (content.benefits as readonly string[]) || staticMatch?.benefits || [],
    advantages: (content.advantages as { headline: string; subtext: string }) ||
      staticMatch?.advantages || { headline: '', subtext: '' },
    process: (content.process as {
      headline: string;
      subtext: string;
      steps: readonly {
        step: string;
        title: string;
        description: string;
        imageSrc: string;
        imageAlt: string;
      }[];
    }) ||
      staticMatch?.process || { headline: '', subtext: '', steps: [] },
    whyUltron: (content.whyUltron as {
      introduction: string;
      points: readonly string[];
    }) ||
      staticMatch?.whyUltron || { introduction: '', points: [] },
    faqs:
      (content.faqs as readonly { question: string; answer: string }[]) ||
      (content.faqs as readonly { q: string; a: string }[])?.map((item) => ({
        question: item.q,
        answer: item.a,
      })) ||
      staticMatch?.faqs ||
      [],
    cta: {
      headline:
        (content.cta as { headline?: string })?.headline ||
        staticMatch?.cta.headline ||
        'Start With a Structure That Works',
      subtext:
        (content.cta as { subtext?: string })?.subtext ||
        staticMatch?.cta.subtext ||
        'Tell us about your business',
      buttonLabel: dbService.cta_label || 'Talk to Us',
    },
    // CMS highlights override static defaults; only use static when CMS has no entry
    highlights:
      dbHighlights && Object.keys(dbHighlights).length > 0
        ? dbHighlights
        : staticMatch?.highlights,
  } as unknown as Service;
}

/**
 * Fetches single published service by slug.
 */
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getPublishedServices();
  const found = services.find((s) => s.slug === slug);
  if (found) return found;
  const staticFound = SERVICES.find((s) => s.slug === slug);
  return staticFound ? (staticFound as Service) : null;
}

/**
 * Fetches visible team members with fallback to static team.
 * Auto-seeds missing team members into Supabase database.
 */
export async function getVisibleTeamMembers() {
  try {
    const supabase = await createClient();
    const { data: dbData, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('is_visible', true)
      .is('archived_at', null)
      .order('display_order', { ascending: true });

    if (error) {
      return ABOUT_PAGE.team.members;
    }

    const currentTeam = (dbData || []) as TeamMemberRecord[];
    const existingIds = new Set(currentTeam.map((tm) => tm.id));
    const missingTeam = INITIAL_STATIC_TEAM.filter(
      (st) => !existingIds.has(st.id),
    );

    if (missingTeam.length > 0) {
      try {
        await supabase
          .from('team_members')
          .upsert(missingTeam, { onConflict: 'id', ignoreDuplicates: true });

        const { data: reFetched } = await supabase
          .from('team_members')
          .select('*')
          .eq('is_visible', true)
          .is('archived_at', null)
          .order('display_order', { ascending: true });

        if (reFetched && reFetched.length > 0) {
          return (reFetched as TeamMemberRecord[]).map(formatTeamMemberRecord);
        }
      } catch {
        // Fallback
      }
    }

    if (currentTeam.length === 0) {
      return ABOUT_PAGE.team.members;
    }

    return currentTeam.map(formatTeamMemberRecord);
  } catch {
    return ABOUT_PAGE.team.members;
  }
}

function formatTeamMemberRecord(tm: TeamMemberRecord) {
  return {
    id: tm.id,
    name: tm.full_name,
    role: tm.job_title,
    image: tm.profile_image_url || '/brand/kuldeep.png',
    linkedin: tm.linkedin_url || undefined,
    email: tm.show_email_publicly ? tm.email || undefined : undefined,
    phone: tm.show_phone_publicly ? tm.phone || undefined : undefined,
  };
}

/**
 * Fetches website settings with fallback to static `SITE`.
 */
export async function getSiteSettings() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('website_settings').select('*');

    if (error || !data || data.length === 0) {
      return SITE;
    }

    const settingsMap: Record<string, Record<string, string>> = {};
    (data as WebsiteSettingRecord[]).forEach((row) => {
      settingsMap[row.setting_key] = (row.setting_value || {}) as Record<
        string,
        string
      >;
    });

    const companyInfo = settingsMap.company_info || {};
    const socialLinks = settingsMap.social_links || {};
    const contactDetails = settingsMap.contact_details || {};

    return {
      name: companyInfo.business_name || SITE.name,
      legalName: companyInfo.legal_name || SITE.legalName,
      tagline: companyInfo.tagline || SITE.tagline,
      description: companyInfo.short_description || SITE.description,
      email:
        contactDetails.header_email || companyInfo.primary_email || SITE.email,
      telephone:
        contactDetails.header_phone ||
        companyInfo.primary_phone ||
        SITE.telephone,
      address: {
        streetAddress: companyInfo.office_address || SITE.address.streetAddress,
        locality: companyInfo.city || SITE.address.locality,
        region: companyInfo.state_emirate || SITE.address.region,
        postalCode: companyInfo.postal_code || SITE.address.postalCode,
        country: companyInfo.country || SITE.address.country,
      },
      social: {
        linkedin: socialLinks.linkedin_url || SITE.social.linkedin,
      },
      builtBy: SITE.builtBy,
    };
  } catch {
    return SITE;
  }
}
