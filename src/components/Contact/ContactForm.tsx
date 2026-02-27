'use client'

import action from '@/actions/contact-form'
import { useTranslations } from 'next-intl'
import { useActionState } from 'react'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Textarea from '../UI/Textarea'

const ContactForm = () => {
  const t = useTranslations('contact')
  const [status, formAction, isPending] = useActionState(action, null)

  if (status?.success) {
    return (
      <p className="text-accent self-center text-center text-2xl font-medium">{status.message}</p>
    )
  }

  return (
    <form action={formAction}>
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
      {!status?.success && <p className="my-2 font-light text-red-600">{status?.message}</p>}
      <Button text={isPending ? t('submitting') : t('submit')} disabled={isPending} />
    </form>
  )
}

export default ContactForm
