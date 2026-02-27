import { footerLinks } from '@/appData'
import { socials } from '@/appData/personal'
import { getTranslations } from 'next-intl/server'
import Logo from '../Navbar/Logo'

const Footer = async () => {
  const t = await getTranslations('footer')
  const tNav = await getTranslations('nav')
  const currentYear = new Date().getFullYear()

  const translatedLinks = footerLinks.map((link) => {
    const keyMap: Record<string, string> = {
      About: 'about',
      Projects: 'projects',
      Experience: 'experience',
      Education: 'education',
      Contact: 'contact',
    }
    return {
      ...link,
      title: tNav(keyMap[link.title] || link.title),
    }
  })

  return (
    <footer className="bg-secondary relative overflow-hidden px-4 py-10 md:px-14 md:py-12">
      <div className="relative z-20 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <h5 className="mb-3 flex items-center gap-2">
            <Logo width={24} height={20} />
            <span className="text-neutral text-base font-medium">Rafael Rodriguez</span>
          </h5>
          <p className="text-tertiary-content text-sm">{t('bio')}</p>
        </div>

        <div className="flex flex-wrap gap-8">
          {translatedLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              className="text-tertiary-content hover:text-neutral text-sm transition-colors duration-300 hover:underline"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-1 text-sm">
          <a
            href="mailto:rafaelrdgz2003@gmail.com"
            className="text-tertiary-content hover:text-neutral transition-colors duration-300"
          >
            rafaelrdgz2003@gmail.com
          </a>
          <address className="text-tertiary-content not-italic">{t('location')}</address>
        </div>
      </div>

      <div className="border-neutral/10 relative z-20 mt-8 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between">
        <ul className="flex gap-4">
          {socials.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="text-neutral hover:text-neutral/50 transition-colors duration-300"
              >
                {item.icon}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-tertiary-content text-xs">{t('copyright', { year: currentYear })}</p>
      </div>

      <div className="bg-neutral/4 absolute top-1/2 -right-[40%] z-0 h-[120dvw] w-[120dvw] -translate-y-1/2 rounded-full p-14 md:top-auto md:-right-[255px] md:-bottom-[600px] md:size-[900px] md:-translate-y-0 md:p-20">
        <div className="bg-neutral/4 size-full rounded-full p-14 md:p-20">
          <div className="bg-neutral/5 size-full rounded-full" />
        </div>
      </div>
    </footer>
  )
}

export default Footer
