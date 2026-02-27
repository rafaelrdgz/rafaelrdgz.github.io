import { skillList } from '@/appData'
import ContactSection from '@/components/Contact/ContactSection'
import EducationSection from '@/components/Education/EducationSection'
import ExperienceSection from '@/components/Experience/ExperienceSection'
import Hero from '@/components/Hero/Hero'
import ProjectSection from '@/components/Projects/ProjectSection'
import Skills from '@/components/Skills/Skills'
import { getAllEducations, getAllExperiences, getAllProjects } from '@/services'
import { setRequestLocale } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)

  const projects = await getAllProjects(locale)
  const experiences = await getAllExperiences(locale)
  const educations = await getAllEducations(locale)

  return (
    <main>
      <Hero />
      <Skills skills={skillList} />
      <div className="mx-auto my-8 max-w-[1200px] px-4 md:my-[3.75rem]">
        <ProjectSection projects={projects} />
        <ExperienceSection experiences={experiences} />
        <EducationSection educations={educations} />
        <ContactSection />
      </div>
    </main>
  )
}
