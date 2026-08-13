export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  featuredPosition?: 'left' | 'right';
  content?: string;
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    id: 'post-1',
    slug: 'why-uae-bank-account-applications-get-rejected',
    title: 'Why UAE Bank Account Applications Get Rejected',
    category: 'Banking Advisory',
    date: 'August 02, 2026',
    readTime: '6 min read',
    excerpt:
      'Understanding the hidden triggers behind account declines—from vague business activity descriptions to incomplete ultimate beneficial owner (UBO) documentation.',
    imageUrl:
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'UAE corporate banking setup documents and advisory meeting',
    featured: true,
    featuredPosition: 'left',
  },
  {
    id: 'post-2',
    slug: 'what-founders-should-know-before-setting-up-in-dubai',
    title: 'What Founders Should Know Before Setting Up in Dubai',
    category: 'Company Formation',
    date: 'July 28, 2026',
    readTime: '5 min read',
    excerpt:
      'Key strategic choices regarding shareholding structures, physical office mandates, and operational licenses required prior to committing capital.',
    imageUrl:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Dubai skyline and financial district center',
  },
  {
    id: 'post-3',
    slug: 'how-to-prepare-for-a-business-banking-compliance-review',
    title: 'How to Prepare for a Business Banking Compliance Review',
    category: 'Compliance & AML',
    date: 'July 21, 2026',
    readTime: '7 min read',
    excerpt:
      'A step-by-step checklist for annual AML audits, transaction justification files, and source of funds verification required by UAE tier-1 banks.',
    imageUrl:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Financial compliance review audit documents',
  },
  {
    id: 'post-4',
    slug: 'mainland-vs-free-zone-choosing-the-right-structure',
    title: 'Mainland vs Free Zone: Choosing the Right Structure',
    category: 'Tax & Structuring',
    date: 'July 14, 2026',
    readTime: '8 min read',
    excerpt:
      'Comparing tax implications, onshore trading rights, DIFC/ADGM common law benefits, and operational flexibility for scaling businesses.',
    imageUrl:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageAlt:
      'Modern corporate architecture in Dubai international financial center',
  },
  {
    id: 'post-5',
    slug: 'what-to-do-when-your-business-account-is-flagged',
    title: 'What to Do When Your Business Account Is Flagged',
    category: 'Banking Advisory',
    date: 'July 05, 2026',
    readTime: '6 min read',
    excerpt:
      'How to navigate compliance inquiries, prevent account freezes, and present clear audit trails when facing unexpected bank requests.',
    imageUrl:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Corporate financial advisor analyzing banking compliance files',
    featured: true,
    featuredPosition: 'right',
  },
  {
    id: 'post-6',
    slug: 'understanding-uae-corporate-tax-for-growing-businesses',
    title: 'Understanding UAE Corporate Tax for Growing Businesses',
    category: 'Tax & Structuring',
    date: 'June 26, 2026',
    readTime: '7 min read',
    excerpt:
      'Navigating the 9% corporate tax threshold, Qualifying Free Zone Person (QFZP) status exemptions, and transfer pricing requirements.',
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Corporate tax calculations and financial planning spreadsheets',
  },
  {
    id: 'post-7',
    slug: 'the-documents-banks-actually-review',
    title: 'The Documents Banks Actually Review',
    category: 'Banking Advisory',
    date: 'June 18, 2026',
    readTime: '4 min read',
    excerpt:
      'Beyond invoices and bank statements: how underwriters evaluate supplier contracts, proof of origin, and counterparty reputation.',
    imageUrl:
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Legal and banking document verification folder',
  },
  {
    id: 'post-8',
    slug: 'how-international-founders-can-build-banking-credibility',
    title: 'How International Founders Can Build Banking Credibility',
    category: 'Company Formation',
    date: 'June 10, 2026',
    readTime: '5 min read',
    excerpt:
      'Establishing substance, local residency proof, and institutional transparency for seamless global expansion into the Middle East.',
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    imageAlt:
      'International business founders meeting in modern Dubai boardroom',
  },
] as const;
