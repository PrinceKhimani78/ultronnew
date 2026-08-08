import { FAQ_ITEMS } from '@/content/faq';
import { SERVICES } from '@/content/services';
import { SITE } from '@/content/site';
import { absoluteUrl } from '@/lib/seo';

/**
 * schema.org builders.
 *
 * Split out of `lib/seo.ts` rather than added to it: metadata and structured
 * data change for different reasons and at different times, and PROJECT.md
 * treats a file that needs section headers to navigate as a file that wants
 * splitting.
 *
 * These exist for business goal #3 — being the source an AI engine cites.
 * Entity clarity is the whole point, so the firm is given one stable `@id`
 * that every other node references rather than being re-described each time.
 */

const ORGANIZATION_ID = absoluteUrl('/#organization');
const WEBSITE_ID = absoluteUrl('/#website');

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: SITE.address.streetAddress,
  addressLocality: SITE.address.locality,
  addressRegion: SITE.address.region,
  postalCode: SITE.address.postalCode,
  addressCountry: SITE.address.country,
};

/**
 * `ProfessionalService` is a subtype of both `Organization` and `LocalBusiness`,
 * so one node satisfies the Organization and Local requirements in PROJECT.md
 * without publishing two nodes that describe the same firm — which is precisely
 * the ambiguity that stops an engine treating us as one entity.
 */
export function organizationSchema() {
  return {
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    description: SITE.description,
    url: absoluteUrl('/'),
    email: SITE.email,
    telephone: SITE.telephone,
    address: postalAddress,
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'AdministrativeArea', name: 'Dubai' },
    ],
    knowsAbout: SERVICES.map((service) => service.title),
    sameAs: [SITE.social.linkedin],
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: absoluteUrl('/'),
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'en-GB',
  };
}

/** One `Service` node per catalogue entry, each pointing back at the firm. */
export function servicesSchema() {
  return SERVICES.map((service) => ({
    '@type': 'Service',
    '@id': absoluteUrl(`/#service-${service.slug}`),
    name: service.title,
    description: service.description,
    serviceType: service.title,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
  }));
}

export function faqSchema() {
  return {
    '@type': 'FAQPage',
    '@id': absoluteUrl('/#faq'),
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/**
 * Every node for the home page, in a single `@graph`.
 *
 * One graph rather than five sibling `<script>` tags: it lets the nodes
 * cross-reference by `@id`, and it is the form Google's own documentation
 * recommends for a page describing several related entities.
 *
 * Deliberately absent: `Review` and `AggregateRating`. The testimonials are
 * placeholders, and marking up invented reviews is a search-policy violation
 * that risks a manual action against the domain. See `content/testimonials.ts`.
 */
export function homePageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      websiteSchema(),
      ...servicesSchema(),
      faqSchema(),
    ],
  };
}

/**
 * Breadcrumb trail. `position` is 1-based, and the current page is included as
 * the final item — Google expects the full path, not just the ancestors.
 */
export function breadcrumbSchema(
  trail: readonly { name: string; path: string }[],
) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/**
 * Every node for the About route.
 *
 * An `AboutPage`, not a second `Organization` — the firm's own entity node is
 * `organizationSchema()`, referenced here by `@id` rather than re-described,
 * for the same reason the Services route's `CollectionPage` does.
 */
export function aboutPageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'AboutPage',
        '@id': absoluteUrl('/about'),
        name: 'About',
        url: absoluteUrl('/about'),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  };
}

/**
 * Every node for the Services route.
 *
 * The `Service` nodes keep the same `@id`s they carry on the home page. That is
 * deliberate: they are the same six services, and minting a second set of
 * identifiers for the same entities is precisely what stops an engine treating
 * them as one thing. The `ItemList` references them by `@id` rather than
 * restating them.
 */
export function servicesPageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'CollectionPage',
        '@id': absoluteUrl('/services'),
        name: 'Services',
        url: absoluteUrl('/services'),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
      },
      ...servicesSchema(),
      {
        '@type': 'ItemList',
        '@id': absoluteUrl('/services#catalogue'),
        name: 'Services offered',
        numberOfItems: SERVICES.length,
        itemListElement: SERVICES.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': absoluteUrl(`/#service-${service.slug}`) },
        })),
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    ],
  };
}

/**
 * Every node for the Partner route.
 */
export function partnerPageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'WebPage',
        '@id': absoluteUrl('/partner'),
        name: 'Partner with Ultron',
        url: absoluteUrl('/partner'),
        isPartOf: { '@id': WEBSITE_ID },
        about: { '@id': ORGANIZATION_ID },
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Partner', path: '/partner' },
      ]),
    ],
  };
}

/**
 * Every node for the Blog route.
 */
export function blogPageGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationSchema(),
      {
        '@type': 'Blog',
        '@id': absoluteUrl('/blogs'),
        name: 'Ultron Insights',
        url: absoluteUrl('/blogs'),
        isPartOf: { '@id': WEBSITE_ID },
        publisher: { '@id': ORGANIZATION_ID },
      },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blogs', path: '/blogs' },
      ]),
    ],
  };
}
