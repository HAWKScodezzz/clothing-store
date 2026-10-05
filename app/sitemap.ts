import { MetadataRoute } from 'next';
import { PRODUCTS } from '@/data/products';
import { COLLECTIONS } from '@/data/collections';
import { POLICIES } from '@/data/policies';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ellane.store';

  const productUrls = PRODUCTS.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionUrls = COLLECTIONS.map((c) => ({
    url: `${baseUrl}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  const policyUrls = Object.keys(POLICIES).map((slug) => ({
    url: `${baseUrl}/policies/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/track-order`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pages/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: new Date(),
      changeFrequency: 'always' as const,
      priority: 0.4,
    },
  ];

  return [...staticUrls, ...collectionUrls, ...productUrls, ...policyUrls];
}
