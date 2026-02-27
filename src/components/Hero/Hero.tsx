'use client'
import useRoleSwitcher from '@/hooks/useRoleSwitcher'
import { GithubIcon, LinkedIn } from '@/utils/icons'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('hero')

  const role = useRoleSwitcher({
    roles: [t('roles.fullstack'), t('roles.software'), t('roles.engineer')],
  })

  return (
    <section className="bg-primary bg-small-glow bg-small-glow-position md:bg-large-glow-position lg:bg-large-glow min-h-[calc(dvh-4rem)] bg-no-repeat">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1>
            <span className="text-neutral mb-3 block text-4xl font-bold lg:text-5xl">
              {t('greeting')}
            </span>
            <span className="text-accent block text-[1.75rem] font-bold lg:text-4xl">
              {role}
              <span className="animate-blink ml-0.5 inline-block select-none">|</span>
            </span>
          </h1>

          <p className="text-neutral mt-5 max-w-[34rem] text-base lg:text-lg">{t('tagline')}</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
            <a
              href="#"
              aria-label={t('resumeAriaLabel')}
              className="bg-accent flex min-w-32 cursor-pointer items-center justify-center gap-2 rounded-lg px-[14px] py-[10px] text-center text-sm font-medium text-[#00071E]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <polyline points="9 14 12 17 15 14" />
              </svg>
              {t('resume')}
            </a>
            <a
              href="https://github.com/rafaelrdgz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('githubAriaLabel')}
              className="text-neutral hover:text-accent transition-colors duration-150"
            >
              <GithubIcon width={28} height={28} />
            </a>
            <a
              href="https://www.linkedin.com/in/rafaelrdgz-dev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('linkedinAriaLabel')}
              className="text-neutral hover:text-accent transition-colors duration-150"
            >
              <LinkedIn width={28} height={28} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-8 lg:py-0">
          <h2 className="text-primary-content text-2xl font-bold tracking-wider">
            {t('aboutTitle')}
          </h2>
          <p className="text-tertiary-content text-sm leading-7 lg:text-base lg:leading-8">
            {t('aboutParagraph1')}
          </p>
          <p className="text-tertiary-content text-sm leading-7 lg:text-base lg:leading-8">
            {t('aboutParagraph2')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
