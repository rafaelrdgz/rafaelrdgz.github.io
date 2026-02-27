'use client'

import { Link, usePathname, useRouter } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useLayoutEffect, useState } from 'react'
import { BurgerIcon, CloseIcon, MoonIcon, SunIcon } from '../../utils/icons'
import Logo from './Logo'

const SCROLL_RESTORE_KEY = 'localeScrollY'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [theme, setTheme] = useState('dark')
  const t = useTranslations('nav')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { label: t('about'), href: '/' as const, scrollTop: true },
    { label: t('projects'), href: '/#projects' },
    { label: t('experience'), href: '/#experience' },
    { label: t('contact'), href: '/#contact' },
  ]

  useEffect(() => {
    setTheme(localStorage.getItem('theme') ?? 'dark')
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Restore scroll position after locale change
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(SCROLL_RESTORE_KEY)
    if (saved !== null) {
      sessionStorage.removeItem(SCROLL_RESTORE_KEY)
      document.documentElement.scrollTop = parseInt(saved, 10)
    }
  }, [locale])

  const toggleMenu = () => setIsVisible((v) => !v)

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'es' : 'en'
    sessionStorage.setItem(SCROLL_RESTORE_KEY, String(window.scrollY))
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <nav className="bg-primary border-border h-16 border-b">
      <div className="mx-auto flex h-full w-dvw max-w-[1200px] items-center justify-between px-4 py-1">
        <Link href="/" className="md:flex-1">
          <div className="animate-fade-up text-primary-content relative flex items-center gap-3 transition-all duration-300 md:static">
            <Logo />
            <span className="text-primary-content whitespace-nowrap">Rafael Rodriguez</span>
          </div>
        </Link>

        {/* Mobile controls: locale + theme + burger */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={switchLocale}
            className="text-primary-content hover:text-neutral cursor-pointer text-sm font-medium transition-colors duration-150"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={t('toggleTheme')}
            className="text-primary-content cursor-pointer"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button onClick={toggleMenu} aria-label={t('toggleMenu')}>
            {isVisible ? (
              <CloseIcon className="text-primary-content" />
            ) : (
              <BurgerIcon className="text-primary-content" />
            )}
          </button>
        </div>

        {/* Nav items */}
        <ul
          className={`${isVisible ? 'flex' : 'hidden'} animate-fade-in bg-primary absolute top-16 left-0 z-10 h-dvh w-dvw flex-col md:static md:top-0 md:flex md:h-full md:flex-1 md:flex-row md:justify-center`}
        >
          {navItems.map(({ label, href, scrollTop }) => (
            <li
              key={href}
              onClick={() => setIsVisible(false)}
              className="border-border flex items-center border-b px-4 text-2xl md:border-y-0 md:border-e md:text-base md:first:border-s lg:px-8"
            >
              {scrollTop ? (
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-primary-content hover:text-neutral w-full cursor-pointer py-7 text-left whitespace-nowrap transition-all duration-150 md:py-0"
                >
                  {label}
                </button>
              ) : (
                <Link
                  href={href}
                  className="text-primary-content hover:text-neutral w-full py-7 whitespace-nowrap transition-all duration-150 md:py-0"
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop: locale switcher + theme toggle */}
        <div className="hidden items-center gap-4 md:flex md:flex-1 md:justify-end">
          <button
            onClick={switchLocale}
            className="text-primary-content hover:text-neutral cursor-pointer text-sm font-medium transition-colors duration-150"
          >
            {locale === 'en' ? 'ES' : 'EN'}
          </button>
          <button
            onClick={toggleTheme}
            aria-label={t('toggleTheme')}
            className="text-primary-content cursor-pointer"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
