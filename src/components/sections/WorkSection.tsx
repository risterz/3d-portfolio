'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects, Project } from '@/data/projects'
import { useUniverse } from '@/context/UniverseContext'
import ImageModal from '@/components/ui/ImageModal'
import { trackEvent } from '@/lib/analytics'

gsap.registerPlugin(ScrollTrigger)

const PROJECT_COLORS = [
  { c1: '#ee0000', c2: '#d32941' },
  { c1: '#ddd248', c2: '#fadb48' },
  { c1: '#46dbdd', c2: '#00faf0' },
  { c1: '#e8ccdd', c2: '#d52a42' },
  { c1: '#fadb48', c2: '#ee0000' },
  { c1: '#ababff', c2: '#46dbdd' },
  { c1: '#d52a42', c2: '#fd2a42' },
  { c1: '#ff7a45', c2: '#d32941' },
]

const FILTERS = ['ALL', '3D & WEBGL', 'WEB & EDITORIAL', 'TOOLS & AI', 'SYSTEMS & GAMES'] as const
type FilterType = (typeof FILTERS)[number]

function matchesFilter(project: Project, filter: FilterType) {
  if (filter === 'ALL') return true
  if (filter === '3D & WEBGL') return project.category === '3D & WebGL'
  if (filter === 'WEB & EDITORIAL') return project.category === 'Web & Editorial'
  if (filter === 'TOOLS & AI') return project.category === 'Tools & AI'
  return project.category === 'Desktop & Systems' || project.category === 'Game & Edge'
}

const INITIAL_ALL_COUNT = 8

export default function WorkSection() {
  const { setParticleTheme, setCursor, resetCursor } = useUniverse()
  const sectionRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<FilterType>('ALL')
  const [showAll, setShowAll] = useState(false)
  const [modalState, setModalState] = useState<{
    isOpen: boolean
    images: string[]
    currentIndex: number
    title: string
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: '',
  })

  const filteredProjects = projects.filter((p) => matchesFilter(p, filter))
  const visibleProjects =
    filter === 'ALL' && !showAll ? filteredProjects.slice(0, INITIAL_ALL_COUNT) : filteredProjects
  const hasMore = filter === 'ALL' && filteredProjects.length > INITIAL_ALL_COUNT

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const frames = gsap.utils.toArray<HTMLElement>('.work-parallax-frame')
      frames.forEach((frame) => {
        gsap.fromTo(
          frame,
          { scale: 0.9, opacity: 0.7 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frame,
              start: 'top 92%',
              toggleActions: 'play none none reverse',
            },
          }
        )

        const img = frame.querySelector('img')
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: 'none',
              scrollTrigger: {
                trigger: frame,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        }
      })

      const reveals = gsap.utils.toArray<HTMLElement>('.work-gradient-reveal')
      reveals.forEach((el) => {
        gsap.to(el, {
          backgroundPositionY: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 86%',
            end: 'top 42%',
            scrub: true,
          },
        })
      })
    }, sectionRef)

    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [filter, showAll])

  const openModal = (project: Project) => {
    const images = project.images?.length ? project.images : project.image ? [project.image] : []
    setModalState({
      isOpen: true,
      images,
      currentIndex: 0,
      title: project.title,
    })
  }

  const handleImagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.innerWidth < 1100) return
    const img = e.currentTarget.querySelector('img')
    if (!img) return
    const rect = e.currentTarget.getBoundingClientRect()
    const rx = (e.clientX - rect.left) / rect.width - 0.5
    const ry = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(img, {
      x: rx * 22,
      y: ry * 18,
      scale: 1.15,
      duration: 0.35,
      ease: 'power3.out',
    })
  }

  const handleImagePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const img = e.currentTarget.querySelector('img')
    if (!img) return
    gsap.to(img, {
      x: 0,
      y: 0,
      scale: 1.07,
      duration: 0.45,
      ease: 'power3.out',
    })
  }

  const totalLabel = String(projects.length).padStart(2, '0')

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-28 md:py-44 border-t border-white/10"
      style={{ zIndex: 'var(--z-content)' }}
    >
      {/* Solid + Hollow Dual Editorial Marquee */}
      <div className="overflow-hidden border-y border-white/20 py-6 md:py-9 mb-16 md:mb-28 select-none">
        <div className="animate-marquee items-center gap-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0 pr-12">
              <span className="font-display font-bold uppercase text-5xl md:text-8xl xl:text-[116px] leading-none text-white">
                SELECTED WORK
              </span>
              <span className="font-display font-bold uppercase text-5xl md:text-8xl xl:text-[116px] leading-none text-hollow-white">
                {totalLabel} PROJECTS
              </span>
              <span className="text-[#d32941] font-display font-bold text-4xl md:text-6xl">//</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-14 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-display text-[11px] tracking-[4px] uppercase text-[#d32941] mb-2">
            GITHUB INDEX 2025 — 2026 · {filteredProjects.length} SHOWN
          </p>
          <h2 className="font-display font-bold text-3xl md:text-5xl uppercase text-white leading-tight">
            Shipped Products &amp; Systems
          </h2>
        </div>

        <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Filter projects">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              data-active={filter === item ? 'true' : 'false'}
              onClick={() => {
                setFilter(item)
                if (item !== 'ALL') setShowAll(true)
              }}
              onMouseEnter={() => setCursor({ big: true, outline: true })}
              onMouseLeave={resetCursor}
              className="hud-pill"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Asymmetric Parallax Editorial Project Showcases */}
      <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-14 space-y-24 md:space-y-36">
        {visibleProjects.map((project, idx) => {
          const palette = PROJECT_COLORS[idx % PROJECT_COLORS.length]
          const isReversed = idx % 2 === 1
          const shotCount = project.images?.length || (project.image ? 1 : 0)

          return (
            <article
              key={project.id}
              onMouseEnter={() =>
                setParticleTheme({
                  color1: palette.c1,
                  color2: palette.c2,
                  opacity: 0.9,
                  scale: 1.04,
                  shape: 1,
                  offset: [0, 0, -0.35],
                })
              }
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Parallax Media Column */}
              <div className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => openModal(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openModal(project)
                    }
                  }}
                  onPointerMove={handleImagePointerMove}
                  onPointerLeave={(e) => {
                    handleImagePointerLeave(e)
                    resetCursor()
                  }}
                  onMouseEnter={() => setCursor({ big: true, text: 'VIEW' })}
                  aria-label={`Open ${project.title} screenshot gallery`}
                  className="work-parallax-frame media-frame aspect-[16/10] border border-white/20 hover:border-[#d32941] transition-colors duration-500 cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover scale-[1.07] will-change-transform"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1b]/75 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none">
                    <span className="font-display text-[11px] tracking-[2px] uppercase bg-[#141413]/85 border border-white/30 px-3 py-1">
                      {String(idx + 1).padStart(2, '0')} / {project.period}
                    </span>
                    {shotCount > 1 && (
                      <span className="font-display text-[10px] tracking-[2px] uppercase bg-[#141413]/85 border border-white/30 px-3 py-1">
                        {String(shotCount).padStart(2, '0')} SHOTS
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                    <span className="font-display text-[11px] tracking-[2.5px] uppercase text-white/90 bg-[#141413]/80 px-2.5 py-1 border border-white/15">
                      {project.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Editorial Info Column */}
              <div
                className={`lg:col-span-5 flex flex-col p-6 md:p-8 rounded-[24px] bg-[#1d1d1b]/65 backdrop-blur-[4px] border border-white/15 ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <div className="flex items-center gap-3 font-display text-[11px] tracking-[2.5px] uppercase text-[#d32941] mb-3">
                  <span>{project.period}</span>
                  <span>/</span>
                  <span>{project.category}</span>
                </div>

                <h3 className="font-display font-bold text-2xl md:text-4xl xl:text-[38px] leading-[1.06] uppercase text-white mb-5">
                  {project.title}
                </h3>

                <p className="work-gradient-reveal gradient-reveal-text font-display text-base md:text-[17px] leading-[1.48] mb-7">
                  {project.longDescription || project.description}
                </p>

                {/* Uppercase Editorial Stack List */}
                <div className="border-t border-white/25 pt-5 mb-8">
                  <p className="font-display text-[10px] tracking-[2.5px] uppercase text-white/55 mb-3">
                    STACK &amp; DELIVERABLES
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 font-editorial text-xs md:text-sm font-medium uppercase tracking-[0.06em] text-white/90">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tech} className="inline-flex items-center gap-4">
                        {tech}
                        {tIdx < project.technologies.length - 1 && (
                          <span className="text-[#d32941]" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex flex-wrap items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_demo_click', { project: project.title })}
                      onMouseEnter={() => setCursor({ big: true, text: 'LIVE' })}
                      onMouseLeave={resetCursor}
                      className="frame-cta"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('project_github_click', { project: project.title })}
                      onMouseEnter={() => setCursor({ big: true, text: 'CODE' })}
                      onMouseLeave={resetCursor}
                      className="frame-cta frame-cta-white"
                    >
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Expand / Collapse All 21 Projects */}
      {hasMore && (
        <div className="max-w-7xl mx-auto px-5 md:px-10 xl:px-14 mt-20 md:mt-28 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            onMouseEnter={() => setCursor({ big: true, text: showAll ? 'LESS' : 'ALL' })}
            onMouseLeave={resetCursor}
            className="frame-cta h-12 px-10"
          >
            {showAll
              ? 'Show Featured 08'
              : `View All ${totalLabel} GitHub Projects (+${filteredProjects.length - INITIAL_ALL_COUNT})`}
          </button>
        </div>
      )}

      <ImageModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        images={modalState.images}
        currentIndex={modalState.currentIndex}
        onIndexChange={(index) => setModalState((prev) => ({ ...prev, currentIndex: index }))}
        title={modalState.title}
      />
    </section>
  )
}
