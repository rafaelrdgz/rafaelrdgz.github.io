import { Education } from '@/lib/types'
import { getTranslations } from 'next-intl/server'
import SectionHeading from '../SectionHeading/SectionHeading'
import EducationCard from './EducationCard'

interface EducationSectionProps {
  educations: Education[]
}

const EducationSection: React.FC<EducationSectionProps> = async ({ educations }) => {
  const t = await getTranslations('education')

  return (
    <section id="education" className="my-8 scroll-mt-24 md:my-16">
      <SectionHeading title={t('heading')} />

      <div className="relative mt-8 md:mt-12 md:ml-6">
        {/* Timeline line — desktop only */}
        <div className="bg-accent/30 absolute top-0 bottom-0 left-0 hidden w-px md:block" />

        <div className="flex flex-col gap-8">
          {educations.map((education) => (
            <div key={education.order} className="relative md:pl-8">
              {/* Timeline dot — desktop only */}
              <div className="bg-accent absolute top-6 left-0 hidden size-2.5 -translate-x-1/2 rounded-full md:block" />
              <EducationCard data={education} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EducationSection
