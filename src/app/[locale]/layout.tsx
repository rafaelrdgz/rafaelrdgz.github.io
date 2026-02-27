import type { Metadata } from 'next'
import './globals.css'

import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { routing } from '@/i18n/routing'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Fira_Code } from 'next/font/google'
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
  const url = process.env.NEXT_PUBLIC_SITE_URL

  return {
    title: t('title'),
    description: t('description'),
    category: 'technology',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
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
      canonical: url,
      languages: {
        en: `${url}/en`,
        es: `${url}/es`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url,
      siteName: t('siteName'),
      type: 'website',
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      card: 'summary_large_image',
    },
  }
}

export default async function RootLayout({
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

  return (
    <html lang={locale} data-theme="dark">
      <body className={`${firaCode.className}`}>
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
