/** Bilingual string stored in JSON content files: { "en": "...", "es": "..." } */
export type LocalizedString = Record<string, string>

// ---------------------------------------------------------------------------
// Raw JSON shapes (what lives on disk in content/*.json)
// ---------------------------------------------------------------------------

export interface RawProject {
  title: string
  shortDescription: LocalizedString
  priority: number
  cover: string
  livePreview?: string
  githubLink?: string
  visitors?: LocalizedString
  earned?: LocalizedString
  githubStars?: LocalizedString
  ratings?: string
  numberOfSales?: LocalizedString
  type?: LocalizedString
  siteAge?: LocalizedString
}

export interface RawExperience {
  order: number
  company: string
  position: LocalizedString
  /** ISO 8601 date, e.g. "2024-03-01" */
  startDate: string
  /** ISO 8601 date or null for current position */
  endDate: string | null
  location: string
  keywords: LocalizedString[]
  activities: LocalizedString[]
  technologies: string[]
}

// ---------------------------------------------------------------------------
// Resolved shapes (what components consume — all strings, single locale)
// ---------------------------------------------------------------------------

export interface Project {
  title: string
  shortDescription: string
  priority: number
  cover: string
  livePreview?: string
  githubLink?: string
  visitors?: string
  earned?: string
  githubStars?: string
  ratings?: string
  numberOfSales?: string
  type?: string
  siteAge?: string
}

export interface Experience {
  order: number
  company: string
  position: string
  startDate: string
  endDate: string
  location: string
  keywords: string[]
  activities: string[]
  technologies: string[]
}

// ---------------------------------------------------------------------------
// Other shared types
// ---------------------------------------------------------------------------

export interface Heading {
  id: string
  title: string
  items: Heading[]
}

export interface Testimonial {
  name: string
  title?: string
  feedback: string
  image: string
  stars: number
  createdAt: string
}
