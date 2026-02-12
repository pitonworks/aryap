import { MetadataRoute } from 'next';
import { locales } from '@/i18n';
import { projects } from '@/data/projects';

const baseUrl = 'https://aryap.com.tr';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/projects', '/contact', '/map', '/virtual-tour'];

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  const projectEntries = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: `${baseUrl}/${locale}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  );

  return [...staticEntries, ...projectEntries];
}
