'use client'

import Image from 'next/image'
import { useState } from 'react'
import { DesktopIcon, EyeIcon, MobileIcon } from '../../utils/icons'
import ProjectPreviewModal from './ProjectPreviewModal'

interface ProjectImageWrapperProps {
  cover: string
  desktopImage?: string
  mobileImage?: string
  title: string
  alt: string
}

const ProjectImageWrapper: React.FC<ProjectImageWrapperProps> = ({
  cover,
  desktopImage,
  mobileImage,
  title,
  alt,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const hasPreviewImages = desktopImage || mobileImage

  return (
    <>
      <figure className="flex justify-end overflow-hidden">
        <button
          onClick={() => hasPreviewImages && setIsModalOpen(true)}
          className={`relative cursor-pointer transition-transform ${hasPreviewImages ? 'hover:scale-105' : ''}`}
          disabled={!hasPreviewImages}
          title={hasPreviewImages ? 'Click to preview' : undefined}
        >
          <Image
            src={cover}
            width={150}
            height={80}
            alt={alt}
            className="h-[80px] w-[150px] rounded-md object-cover shadow-[0px_1.66px_3.74px_-1.25px_#18274B1F]"
          />
          {hasPreviewImages && (
            <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/60 opacity-0 transition-opacity hover:opacity-100">
              <EyeIcon className="size-6 text-white" />
            </div>
          )}
          {hasPreviewImages && (
            <div className="absolute right-1 bottom-1 flex gap-0.5">
              {desktopImage && <DesktopIcon className="size-3 text-white drop-shadow-md" />}
              {mobileImage && <MobileIcon className="size-3 text-white drop-shadow-md" />}
            </div>
          )}
        </button>
      </figure>

      {isModalOpen && (
        <ProjectPreviewModal
          desktopImage={desktopImage}
          mobileImage={mobileImage}
          title={title}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}

export default ProjectImageWrapper
