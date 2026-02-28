import { Project } from '@/lib/types'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Earning, GithubIcon, Likes, PreviewIcon, Star } from '../../utils/icons'
import ProjectImageWrapper from './ProjectImageWrapper'

const IconText: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex gap-2">
    <Image src={icon} alt={text} className="size-[18px] md:size-5" />
    <span className="text-neutral text-sm">{text}</span>
  </li>
)

interface ProjectCardProps {
  data: Project
}

const ProjectCard: React.FC<ProjectCardProps> = async ({ data }) => {
  const t = await getTranslations('projects')

  const {
    title,
    shortDescription,
    visitors,
    earned,
    ratings,
    githubStars,
    numberOfSales,
    livePreview,
    githubLink,
    type,
    cover,
    desktopImage,
    mobileImage,
    techStack,
  } = data

  return (
    <div className="bg-secondary border-border flex flex-col justify-between rounded-[14px] border p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="flex flex-col gap-3">
            <h3 className="text-secondary-content text-lg font-medium md:font-semibold">{title}</h3>
            {type && (
              <span
                className={`h-7 w-fit rounded-md bg-[#FFFFFF1A] p-1 text-sm ${type === 'New' ? 'animate-blink text-tag' : 'text-accent'} backdrop-blur-[80px]`}
              >
                {type}
              </span>
            )}
          </div>
          <ul className="mt-3 flex flex-col flex-wrap gap-2 sm:flex-row sm:gap-4">
            {techStack && techStack.length > 0 && (
              <>
                {techStack.map((tech) => (
                  <li key={tech} className="flex gap-2">
                    <span className="bg-accent/10 text-accent rounded-full px-3 py-1 text-xs font-medium">
                      {tech}
                    </span>
                  </li>
                ))}
              </>
            )}
            {(visitors || numberOfSales) && (
              <IconText text={(visitors || numberOfSales)?.toString() || ''} icon={Likes} />
            )}
            {earned && <IconText text={earned} icon={Earning} />}
            {(ratings || githubStars) && (
              <IconText text={(ratings || githubStars)?.toString() || ''} icon={Star} />
            )}
          </ul>
        </div>
        <ProjectImageWrapper
          cover={cover}
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          title={title}
          alt={t('coverAlt')}
        />
      </div>

      <div>
        <div className="bg-primary text-primary-content my-4 h-[140px] overflow-scroll rounded-2xl px-4 py-2">
          <p className="text-[14px] font-normal md:text-base">{shortDescription}</p>
        </div>
        <div className="flex gap-5">
          {livePreview && (
            <a
              href={livePreview}
              className="text-accent flex gap-2 text-sm underline underline-offset-[3px] transition-all duration-75 ease-linear hover:scale-105 md:text-base"
              target="_blank"
            >
              <PreviewIcon className="h-auto w-[18px] md:w-5" />
              <span>{t('livePreview')}</span>
            </a>
          )}
          {githubLink && (
            <a
              href={githubLink}
              className="text-accent flex gap-2 text-sm underline underline-offset-[3px] transition-all duration-75 ease-linear hover:scale-105 md:text-base"
              target="_blank"
            >
              <GithubIcon className="w-[18px] md:w-5" />
              <span>{t('githubLink')}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
