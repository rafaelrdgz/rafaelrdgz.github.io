import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!

  const locales = ['en', 'es']
  const sections = ['', '/#projects', '/#experience', '/#contact']

  return locales.flatMap((locale) =>
    sections.map((section, i) => ({
      url: `${baseUrl}/${locale}${section}`,
      lastModified: new Date(),
      changeFrequency: (i === 2 ? 'monthly' : 'weekly') as 'monthly' | 'weekly',
      priority: i === 0 ? 1 : 0.8,
    })),
  )
}
