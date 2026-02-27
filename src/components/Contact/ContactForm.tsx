'use client'

import { useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

type Status = { success: boolean; message: string } | null

const ContactForm = () => {
  const t = useTranslations('contact')
  const [status, setStatus] = useState<Status>(null)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get('name')
    if (!name) return setStatus({ success: false, message: t('validationName') })

    const email = formData.get('email')
    if (!email) return setStatus({ success: false, message: t('validationEmail') })

    const subject = formData.get('subject')
    if (!subject) return setStatus({ success: false, message: t('validationSubject') })

    const message = formData.get('message')
    if (!message) return setStatus({ success: false, message: t('validationMessage') })

    setIsPending(true)
    setStatus(null)

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CONTACT_FORM_ACTION_URL!, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus({ success: true, message: t('success') })
        form.reset()
      } else {
        setStatus({ success: false, message: t('error') })
      }
    } catch {
      setStatus({ success: false, message: t('error') })
    } finally {
      setIsPending(false)
    }
  }

  if (status?.success) {
    return (
      <p className="text-accent self-center text-center text-2xl font-medium">{status.message}</p>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label={t('nameLabel')}
        id="name"
        name="name"
        placeholder={t('namePlaceholder')}
        required
      />
      <Input
        label={t('emailLabel')}
        id="email"
        type="email"
        name="email"
        placeholder={t('emailPlaceholder')}
        required
      />
      <Input
        label={t('subjectLabel')}
        id="subject"
        name="subject"
        placeholder={t('subjectPlaceholder')}
      />
      <Textarea
        label={t('messageLabel')}
        id="message"
        name="message"
        placeholder={t('messagePlaceholder')}
        rows={7}
        required
      />
      {!status?.success && status?.message && (
        <p className="my-2 font-light text-red-600">{status.message}</p>
      )}
      <Button text={isPending ? t('submitting') : t('submit')} disabled={isPending} />
    </form>
  )
}

export default ContactForm
