'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUniverse } from '@/context/UniverseContext'
import { personalInfo } from '@/data/personal'
import { projects } from '@/data/projects'

gsap.registerPlugin(ScrollTrigger)

const PORTALS = [
  {
    id: 'work',
    index: '01',
    label: 'WORK',
    caption: `${String(projects.length).padStart(2, '0')} SHIPPED SYSTEMS`,
    image: '/images/projects/freefetch-main.png',
    desktopStartY: 40,
    desktopEndY: -45,
    stairClass: 'md:mt-0',
  },
  {
    id: 'skills',
    index: '02',
    label: 'SKILLS',
    caption: '3D KEYCAP LAB & STACK',
    image: '/images/portal-skills.jpg',
    desktopStartY: 85,
    desktopEndY: -10,
    stairClass: 'md:mt-12',
  },
  {
    id: 'journey',
    index: '03',
    label: 'ABOUT',
    caption: 'EXPERIENCE & CONTACT',
    image: '/images/portal-about.jpg',
    desktopStartY: 130,
    desktopEndY: 25,
    stairClass: 'md:mt-24',
  },
]

export default function HeroSection() {
  const { entered, setCursor, resetCursor } = useUniverse()
  const sectionRef = useRef<HTMLElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const subRef = useRef<HTMLDivElement>(null)
  const portalRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      if (wordmarkRef.current && sectionRef.current) {
        gsap.to(wordmarkRef.current, {
          rotateX: 42,
          y: -120,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '48% top',
            scrub: true,
          },
        })
      }

      if (subRef.current && sectionRef.current) {
        gsap.to(subRef.current, {
          y: -70,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: '5% top',
            end: '42% top',
            scrub: true,
          },
        })
      }

      // Stair-down parallax on desktop/tablet only; mobile keeps uniform equal spacing
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        portalRefs.current.forEach((card, idx) => {
          if (!card || !sectionRef.current) return
          gsap.fromTo(
            card,
            { y: PORTALS[idx].desktopStartY },
            {
              y: PORTALS[idx].desktopEndY,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: '15% top',
                end: 'bottom top',
                scrub: true,
              },
            }
          )
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Pointer 3D tilt on desktop hero wordmark
  useEffect(() => {
    const el = wordmarkRef.current
    if (!el || window.innerWidth < 1100) return

    const rx = gsap.quickTo(el, 'rotateY', { duration: 0.6, ease: 'power2.out' })
    const tx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power2.out' })

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      rx(nx * 7)
      tx(nx * -18)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[185vh] flex flex-col justify-between pt-28 pb-32 px-5 md:px-10 xl:px-16"
      style={{ zIndex: 'var(--z-content)' }}
    >
      {/* Opening Viewport Stage */}
      <div className="min-h-[82vh] flex flex-col items-center justify-center text-center [perspective:900px]">
        <div
          ref={wordmarkRef}
          className={`will-change-transform transition-all duration-1000 ease-quart ${
            entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="font-display text-[11px] md:text-[15px] tracking-[6px] md:tracking-[8px] uppercase text-[#d32941] mb-4 md:mb-6">
            HRZ // 02 · {personalInfo.location} · DESIGN &amp; DEVELOP
          </p>

          <h1 className="font-display font-bold uppercase text-white leading-[0.86] tracking-[-0.03em] text-[clamp(3.1rem,11.5vw,10.5rem)]">
            HARIS<span className="text-[#d32941]">.</span>
            <span className="block text-[clamp(1.6rem,5.4vw,4.8rem)] font-semibold tracking-[0.06em] mt-2 text-white/95">
              AL-HARRAZ
            </span>
          </h1>
        </div>

        <div
          ref={subRef}
          className={`mt-8 md:mt-12 max-w-2xl mx-auto transition-all duration-1000 delay-200 ease-quart ${
            entered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="font-display font-light text-base md:text-2xl text-white/85 leading-snug">
            Building <span className="text-[#d32941] font-medium">interactive web worlds</span>,{' '}
            <u className="decoration-1 underline-offset-4">Rust desktop tools</u> &amp; scalable full-stack software.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('work')}
              onMouseEnter={() => setCursor({ big: true, text: 'VIEW' })}
              onMouseLeave={resetCursor}
              className="frame-cta"
            >
              Explore Work
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              onMouseEnter={() => setCursor({ big: true, text: 'MAIL' })}
              onMouseLeave={resetCursor}
              className="frame-cta frame-cta-white"
            >
              Get In Touch
            </button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 flex flex-col items-center gap-2 text-white/50">
          <span className="font-display text-[10px] tracking-[3px] uppercase">Scroll to explore</span>
          <span className="w-[1px] h-10 bg-gradient-to-b from-white/70 to-transparent" aria-hidden="true" />
        </div>
      </div>

      {/* 3D-Inspired Parallax Portal Cards */}
      <div className="max-w-7xl mx-auto w-full pt-12 md:pt-20 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-6 md:gap-8">
          {PORTALS.map((portal, idx) => (
            <button
              key={portal.id}
              ref={(el) => {
                portalRefs.current[idx] = el
              }}
              type="button"
              onClick={() => scrollTo(portal.id)}
              onMouseEnter={() => setCursor({ big: true, icon: true })}
              onMouseLeave={resetCursor}
              className={`group relative h-[300px] md:h-[390px] w-full rounded-[28px] overflow-hidden bg-[#141413] border border-white/35 hover:border-[#d32941] shadow-[0_24px_60px_rgba(0,0,0,0.85)] transition-all duration-500 text-left will-change-transform ${portal.stairClass}`}
            >
              <img
                src={portal.image}
                alt={`${portal.label} preview`}
                className="w-full h-full object-cover scale-105 brightness-110 contrast-110 saturate-[0.75] group-hover:saturate-100 group-hover:brightness-125 group-hover:scale-110 transition-all duration-700 ease-quart"
              />
              {/* Edge-focused dark scrim: crisp top/bottom labels, clear vivid preview in the middle */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#111110]/85 via-[#111110]/20 to-[#111110]/95 group-hover:via-[#d32941]/10 transition-colors duration-500" />

              <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
                <span className="font-display text-[11px] font-semibold tracking-[2px] text-white bg-[#141413]/85 border border-white/25 px-2.5 py-1">
                  {portal.index}
                </span>
                <span className="font-display text-[10px] font-medium tracking-[2px] uppercase text-white/95 bg-[#141413]/85 border border-white/20 px-2.5 py-1">
                  {portal.caption}
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <span className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                  {portal.label}
                </span>
                <span className="font-display text-2xl text-white group-hover:text-[#d32941] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                  ↗
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
