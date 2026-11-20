'use client'

import { useEffect } from 'react'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  currentIndex: number
  onIndexChange: (index: number) => void
  title: string
}

export default function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  title,
}: ImageModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && currentIndex > 0) onIndexChange(currentIndex - 1)
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onIndexChange(currentIndex + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange])

  if (!isOpen || images.length === 0) return null

  const currentImage = images[currentIndex]
  const hasMultiple = images.length > 1

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 md:p-10 bg-[#1d1d1b]/95 backdrop-blur-md"
      style={{ zIndex: 'var(--z-modal)' }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
    >
      <div
        className="relative w-full max-w-6xl border border-white bg-[#1d1d1b] p-4 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/25 pb-4 mb-5">
          <div>
            <h3 className="font-display text-lg md:text-2xl font-semibold uppercase tracking-wide text-white">
              {title}
            </h3>
            {hasMultiple && (
              <p className="font-display text-[11px] tracking-[2px] uppercase text-white/60 mt-1">
                {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="frame-cta frame-cta-white h-9 px-4"
            aria-label="Close gallery"
          >
            CLOSE [ESC]
          </button>
        </div>

        {/* Main Image */}
        <div className="relative flex items-center justify-center bg-black/50 rounded-[20px] overflow-hidden min-h-[40vh] max-h-[68vh]">
          <img
            src={currentImage}
            alt={`${title} screenshot ${currentIndex + 1}`}
            className="max-w-full max-h-[68vh] object-contain"
          />

          {hasMultiple && currentIndex > 0 && (
            <button
              type="button"
              onClick={() => onIndexChange(currentIndex - 1)}
              aria-label="Previous image"
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 w-11 h-11 border border-white bg-[#1d1d1b]/80 text-white hover:bg-[#d32941] hover:border-[#d32941] transition-colors flex items-center justify-center font-display text-lg"
            >
              ←
            </button>
          )}

          {hasMultiple && currentIndex < images.length - 1 && (
            <button
              type="button"
              onClick={() => onIndexChange(currentIndex + 1)}
              aria-label="Next image"
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 w-11 h-11 border border-white bg-[#1d1d1b]/80 text-white hover:bg-[#d32941] hover:border-[#d32941] transition-colors flex items-center justify-center font-display text-lg"
            >
              →
            </button>
          )}
        </div>

        {/* Thumbnails */}
        {hasMultiple && (
          <div className="flex items-center justify-center gap-3 mt-5 overflow-x-auto pb-1">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => onIndexChange(i)}
                className={`w-20 h-12 overflow-hidden border transition-all flex-shrink-0 ${
                  i === currentIndex
                    ? 'border-[#d32941] opacity-100'
                    : 'border-white/25 opacity-50 hover:opacity-90'
                }`}
              >
                <img src={img} alt={`${title} thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
