import '@/app/globals.css'

import type { Metadata } from 'next'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { routing } from '@/i18n/routing'
import { Fira_Code } from 'next/font/google'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'

const firaCode = Fira_Code({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/+$/, '')
  const localeUrl = `${baseUrl}/${locale}`

  return {
    title: t('title'),
    description: t('description'),
    category: 'technology',
    metadataBase: new URL(baseUrl),
    manifest: '/manifest.json',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
        { url: '/icon.png', sizes: '48x48', type: 'image/png' },
        { url: '/icon1.png', sizes: '16x16', type: 'image/png' },
        { url: '/icon2.png', sizes: '32x32', type: 'image/png' },
      ],
    },
    authors: [{ name: 'Rafael Rodriguez' }],
    keywords: [
      'Rafael Rodriguez',
      'Fullstack Developer',
      'Software Developer',
      'Software Engineer',
      'Computer Engineer',
      'Web Developer',
      'Frontend Developer',
      'Backend Developer',
      'React Developer',
      'Next.js Developer',
      'Node.js Developer',
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Node.js',
      'Express.js',
      'REST API',
      'Portfolio',
      'Professional Experience',
    ],
    alternates: {
      canonical: localeUrl,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: localeUrl,
      siteName: t('siteName'),
      type: 'website',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      images: [
        {
          url: `${baseUrl}/opengraph-image.png`,
          width: 1817,
          height: 825,
          alt: t('ogAlt'),
        },
      ],
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      card: 'summary_large_image',
      images: [
        {
          url: `${baseUrl}/twitter-image.png`,
          width: 1817,
          height: 825,
          alt: t('ogAlt'),
        },
      ],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'metadata' })
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/+$/, '')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: t('siteName'),
        url: baseUrl,
        inLanguage: [locale === 'es' ? 'es' : 'en'],
      },
      {
        '@type': 'Person',
        name: 'Rafael Rodriguez',
        jobTitle: 'Fullstack Developer',
        url: baseUrl,
        sameAs: ['https://github.com/rafaelrdgz', 'https://www.linkedin.com/in/rafaelrdgz-dev/'],
      },
    ],
  }

  return (
    <html lang={locale} data-theme="dark" suppressHydrationWarning>
      <body className={firaCode.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider>
          <header className="sticky top-0 z-50">
            <Navbar />
          </header>
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
