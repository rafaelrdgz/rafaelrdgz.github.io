import { Education } from '@/lib/types'

interface EducationCardProps {
  data: Education
}

const EducationCard: React.FC<EducationCardProps> = ({ data }) => {
  const { entity, title, startDate, endDate, location } = data

  return (
    <div className="bg-secondary border-border rounded-[14px] border p-5 md:p-6">
      <div className="flex flex-col gap-1">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <h3 className="text-neutral text-lg font-semibold">{entity}</h3>
          <span className="text-primary-content text-sm">
            {startDate} &ndash; {endDate}
          </span>
        </div>
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <span className="text-accent text-base font-medium">{title}</span>
          <span className="text-primary-content text-sm">{location}</span>
        </div>
      </div>
    </div>
  )
}

export default EducationCard
