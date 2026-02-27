'use client'

import { useEffect } from 'react'

const SetHtmlLang = ({ locale }: { locale: string }) => {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return null
}

export default SetHtmlLang
