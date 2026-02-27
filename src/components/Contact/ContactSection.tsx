import { getTranslations } from 'next-intl/server'
import ContactForm from './ContactForm'

const ContactSection = async () => {
  const t = await getTranslations('contact')

  return (
    <section
      id="contact"
      className="bg-secondary my-8 grid scroll-mt-24 grid-cols-1 gap-16 rounded-4xl p-8 md:my-16 md:grid-cols-2 md:gap-8 lg:gap-12"
    >
      <div className="flex flex-col justify-between gap-8">
        <div>
          <h3 className="text-neutral text-3xl font-bold">{t('heading')}</h3>
          <h4 className="text-accent text-2xl font-bold md:text-3xl">{t('subheading')}</h4>
          <p className="text-neutral mt-8">{t('description')}</p>
        </div>
      </div>

      <ContactForm />
    </section>
  )
}

export default ContactSection
