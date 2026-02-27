import { ImageResponse } from 'next/og'
import { getTranslations } from 'next-intl/server'

export const runtime = 'edge'

export const alt = 'Rafael Rodriguez - Fullstack Developer'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return new ImageResponse(
    <div
      style={{
        background: '#011627',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <h1 style={{ fontSize: 32, color: '#18f2e5', margin: 0 }}>{t('title')}</h1>
      <h2 style={{ fontSize: 40, color: 'white', marginTop: 30 }}>{t('description')}</h2>
    </div>,
    {
      ...size,
    },
  )
}
