'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { CloseIcon, DesktopIcon, MobileIcon } from '../../utils/icons'

interface ProjectPreviewModalProps {
  desktopImage?: string
  mobileImage?: string
  title: string
  onClose: () => void
}

const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  desktopImage,
  mobileImage,
  title,
  onClose,
}) => {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.matchMedia('(min-width: 768px)').matches)
    }
    checkDevice()
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const hasBothImages = desktopImage && mobileImage

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-secondary border-border relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border">
        <button
          onClick={onClose}
          className="text-secondary-content hover:bg-accent/20 absolute top-4 right-4 z-10 rounded-full p-2 transition-colors"
        >
          <CloseIcon className="size-6" />
        </button>

        <div className="p-6">
          <h3 className="text-secondary-content mb-4 text-xl font-semibold">{title}</h3>

          {hasBothImages && (
            <div className="mb-4 flex justify-center">
              <div className="bg-primary/50 flex items-center gap-2 rounded-full p-1">
                <button
                  onClick={() => setIsDesktop(true)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    isDesktop
                      ? 'bg-secondary text-secondary-content shadow-md'
                      : 'text-neutral hover:text-secondary-content'
                  }`}
                >
                  <DesktopIcon className="size-4" />
                  Desktop
                </button>
                <button
                  onClick={() => setIsDesktop(false)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    !isDesktop
                      ? 'bg-secondary text-secondary-content shadow-md'
                      : 'text-neutral hover:text-secondary-content'
                  }`}
                >
                  <MobileIcon className="size-4" />
                  Mobile
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <div
              className={`transition-opacity duration-300 ${
                hasBothImages ? (isDesktop ? 'opacity-100' : 'absolute opacity-0') : ''
              }`}
            >
              {desktopImage && (
                <Image
                  src={desktopImage}
                  alt={`${title} desktop view`}
                  width={1000}
                  height={600}
                  className="max-h-[60vh] w-auto rounded-lg object-contain"
                />
              )}
            </div>
            <div
              className={`transition-opacity duration-300 ${
                hasBothImages ? (!isDesktop ? 'opacity-100' : 'absolute opacity-0') : ''
              }`}
            >
              {mobileImage && (
                <Image
                  src={mobileImage}
                  alt={`${title} mobile view`}
                  width={320}
                  height={640}
                  className="max-h-[60vh] w-auto rounded-lg object-contain"
                />
              )}
            </div>
            {!hasBothImages && desktopImage && (
              <Image
                src={desktopImage}
                alt={`${title} view`}
                width={1000}
                height={600}
                className="max-h-[60vh] w-auto rounded-lg object-contain"
              />
            )}
            {!hasBothImages && !desktopImage && mobileImage && (
              <Image
                src={mobileImage}
                alt={`${title} view`}
                width={320}
                height={640}
                className="max-h-[60vh] w-auto rounded-lg object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectPreviewModal
