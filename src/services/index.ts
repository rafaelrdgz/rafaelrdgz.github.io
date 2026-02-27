import type {
  Experience,
  LocalizedString,
  Project,
  RawExperience,
  RawProject,
  Testimonial,
} from '@/lib/types'
import { promises as fs } from 'fs'
import path from 'path'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Resolve a bilingual field to a single string for the given locale. */
const resolve = (field: LocalizedString, locale: string): string => field[locale] ?? field.en ?? ''

/**
 * Resolve an optional bilingual field. Returns `undefined` when the raw value
 * is missing, empty-string, or not an object (backward-compat for plain strings).
 */
const resolveOptional = (
  field: LocalizedString | string | undefined,
  locale: string,
): string | undefined => {
  if (field === undefined || field === '') return undefined
  if (typeof field === 'string') return field // plain string fallback
  const resolved = field[locale] ?? field.en ?? ''
  return resolved || undefined
}

/** Format an ISO 8601 date string (e.g. "2024-03-01") as "Mar 2024" / "mar 2024". */
const formatDate = (isoDate: string, locale: string): string => {
  const date = new Date(isoDate + 'T00:00:00') // avoid timezone shift
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' }).format(date)
}

/** Return the translated label for "Present" (current position). */
const presentLabel = (locale: string): string => {
  const labels: Record<string, string> = { en: 'Present', es: 'Presente' }
  return labels[locale] ?? labels.en
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

const getAllProjects = async (locale: string): Promise<Project[]> => {
  try {
    const projectsPath = path.join(process.cwd(), '/content/projects')
    const fileNames = await fs.readdir(projectsPath)

    const projects = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(projectsPath, fileName)
        const raw: RawProject = JSON.parse(await fs.readFile(filePath, 'utf8'))

        const project: Project = {
          title: raw.title,
          shortDescription: resolve(raw.shortDescription, locale),
          priority: raw.priority,
          cover: raw.cover,
          livePreview: raw.livePreview,
          githubLink: raw.githubLink || undefined,
          visitors: resolveOptional(raw.visitors, locale),
          earned: resolveOptional(raw.earned, locale),
          githubStars: resolveOptional(raw.githubStars, locale),
          ratings: raw.ratings,
          numberOfSales: resolveOptional(raw.numberOfSales, locale),
          type: resolveOptional(raw.type, locale),
          siteAge: resolveOptional(raw.siteAge, locale),
        }

        return project
      }),
    )

    projects.sort((a, b) => a.priority - b.priority)
    return projects
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// ---------------------------------------------------------------------------
// Experiences
// ---------------------------------------------------------------------------

const getAllExperiences = async (locale: string): Promise<Experience[]> => {
  try {
    const experiencesPath = path.join(process.cwd(), '/content/experience')
    const fileNames = await fs.readdir(experiencesPath)

    const experiences = await Promise.all(
      fileNames.map(async (fileName) => {
        const filePath = path.join(experiencesPath, fileName)
        const raw: RawExperience = JSON.parse(await fs.readFile(filePath, 'utf8'))

        const experience: Experience = {
          order: raw.order,
          company: raw.company,
          position: resolve(raw.position, locale),
          startDate: formatDate(raw.startDate, locale),
          endDate: raw.endDate ? formatDate(raw.endDate, locale) : presentLabel(locale),
          location: raw.location,
          keywords: raw.keywords.map((kw) => resolve(kw, locale)),
          activities: raw.activities.map((act) => resolve(act, locale)),
          technologies: raw.technologies,
        }

        return experience
      }),
    )

    experiences.sort((a, b) => a.order - b.order)
    return experiences
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

// ---------------------------------------------------------------------------
// Testimonials (unchanged — no bilingual fields yet)
// ---------------------------------------------------------------------------

const getAllTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const testimonialsPath = path.join(process.cwd(), '/content/testimonials')
    const testimonialsName = await fs.readdir(testimonialsPath)

    const testimonials = await Promise.all(
      testimonialsName.map(async (projectName) => {
        const filePath = path.join(testimonialsPath, projectName)
        const projectDetails = await fs.readFile(filePath, 'utf8')
        return JSON.parse(projectDetails)
      }),
    )

    testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    return testimonials
  } catch (error) {
    console.error('Error:', error)
    return []
  }
}

export { getAllExperiences, getAllProjects, getAllTestimonials }
