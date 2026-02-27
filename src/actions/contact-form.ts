'use server'

import { getLocale, getTranslations } from 'next-intl/server'

const action = async (_: { success: boolean; message: string } | null, formData: FormData) => {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'contact' })

  try {
    const name = formData.get('name')
    if (!name)
      return {
        success: false,
        message: t('validationName'),
      }

    const email = formData.get('email')
    if (!email)
      return {
        success: false,
        message: t('validationEmail'),
      }

    const subject = formData.get('subject')
    if (!subject)
      return {
        success: false,
        message: t('validationSubject'),
      }

    const message = formData.get('message')
    if (!message)
      return {
        success: false,
        message: t('validationMessage'),
      }

    const res = await fetch(process.env.CONTACT_FORM_ACTION_URL!, {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    })

    if (res.ok) {
      return { success: true, message: t('success') }
    } else {
      const data = await res.json()
      console.error(data?.error)

      return {
        success: false,
        message: t('error'),
      }
    }
  } catch (error) {
    console.error('Contact form submission error: ' + error)
    return {
      success: false,
      message: t('error'),
    }
  }
}

export default action
