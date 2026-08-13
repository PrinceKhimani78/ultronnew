import type { MetadataRoute } from 'next';

import { STATIC_ROUTES } from '@/content/site';
import { getPublishedBlogPosts, getPublishedServices } from '@/lib/cms-data';
import { absoluteUrl } from '@/lib/seo';

/**
 * Generated dynamically, incorporating static routes, published services, and published blog posts.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: 'monthly',
      priority,
    }),
  );

  const posts = await getPublishedBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blogs/${post.slug}`),
    lastModified: new Date(post.date || lastModified),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const services = await getPublishedServices();
  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries, ...serviceEntries];
}
