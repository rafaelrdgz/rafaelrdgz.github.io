import { Experience } from '@/lib/types'

interface ExperienceCardProps {
  data: Experience
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ data }) => {
  const { company, position, startDate, endDate, location, keywords, activities, technologies } =
    data

  return (
    <div className="bg-secondary border-border rounded-[14px] border p-5 md:p-6">
      {/* Header: company, position, dates, location */}
      <div className="flex flex-col gap-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <h3 className="text-neutral text-lg font-semibold">{company}</h3>
          <span className="text-primary-content text-sm">
            {startDate} &ndash; {endDate}
          </span>
        </div>
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <span className="text-accent text-base font-medium">{position}</span>
          <span className="text-primary-content text-sm">{location}</span>
        </div>
      </div>

      {/* Keywords */}
      {keywords.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {keywords.map((keyword) => (
            <span
              key={keyword}
              className="border-border bg-primary text-primary-content rounded-md border px-2.5 py-1 text-xs"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      {/* Activities */}
      <ul className="mt-4 space-y-2 pl-4">
        {activities.map((activity, i) => (
          <li
            key={i}
            className="text-tertiary-content list-disc text-sm leading-relaxed md:text-base"
          >
            {activity}
          </li>
        ))}
      </ul>

      {/* Technologies */}
      {technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="text-accent rounded-md bg-[#FFFFFF1A] px-2.5 py-1 text-xs backdrop-blur-[80px]"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceCard
