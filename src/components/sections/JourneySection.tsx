'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Draggable } from 'gsap/Draggable'
import { personalInfo } from '@/data/personal'
import { timelineEntries } from '@/data/timeline'
import { useUniverse } from '@/context/UniverseContext'

gsap.registerPlugin(ScrollTrigger, Draggable)

export default function JourneySection() {
  const { randomness, scrollVelocityRef, setCursor, resetCursor } = useUniverse()
  const sectionRef = useRef<HTMLElement>(null)
  const skewRef = useRef<HTMLDivElement>(null)
  const stickerRef = useRef<HTMLDivElement>(null)
  const bioContainerRef = useRef<HTMLDivElement>(null)

  const featuredEntries = timelineEntries.filter((entry) => entry.featured)

  // Scroll-velocity .rotable skew (scaled by the 93° randomness slider)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || window.innerWidth < 1100) return

    let currentSkew = 0
    let rafId = 0
    const setSkew = skewRef.current ? gsap.quickSetter(skewRef.current, 'skewY', 'deg') : null

    const tick = () => {
      const target = Math.max(-6, Math.min(6, scrollVelocityRef.current * 0.045 * (0.6 + randomness * 0.2)))
      currentSkew += (target - currentSkew) * 0.14
      if (setSkew) setSkew(currentSkew)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafId)
      if (setSkew) setSkew(0)
    }
  }, [randomness, scrollVelocityRef])

  // Draggable 93° studio sticker + gradient-clip bio & timeline parallax
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let draggables: Draggable[] = []

    if (stickerRef.current && bioContainerRef.current) {
      draggables = Draggable.create(stickerRef.current, {
        bounds: bioContainerRef.current,
      })
    }

    if (prefersReduced) {
      return () => draggables.forEach((d) => d.kill())
    }

    const ctx = gsap.context(() => {
      gsap.to('.about-bio-reveal', {
        backgroundPositionY: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-bio-reveal',
          start: 'top 82%',
          end: 'top 38%',
          scrub: true,
        },
      })

      gsap.utils.toArray<HTMLElement>('.timeline-row').forEach((row) => {
        gsap.fromTo(
          row,
          { y: 40, opacity: 0.25 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      draggables.forEach((d) => d.kill())
    }
  }, [])

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative py-28 md:py-44 px-5 md:px-10 xl:px-14 border-t border-white/10"
      style={{ zIndex: 'var(--z-content)' }}
    >
      <div ref={skewRef} className="max-w-6xl mx-auto will-change-transform">
        {/* About Hero Statement */}
        <div className="text-center mb-24 md:mb-36">
          <p className="font-display text-xs md:text-lg tracking-[8px] uppercase text-white/75 mb-4">
            HRZ // 02 · HARIS AL-HARRAZ
          </p>
          <h2 className="font-display font-bold uppercase text-[#d32941] text-[clamp(2.5rem,9vw,7.5rem)] leading-[0.86] tracking-tight">
            CREATIVITY
            <br />
            &amp; ENGINEERING
          </h2>
          <p className="mt-6 font-display font-light text-base md:text-3xl text-white uppercase tracking-wide">
            Crafting <span className="text-[#d32941] font-normal text-[1.15em]">software</span>{' '}
            <u className="decoration-1 underline-offset-4">experiences</u> that matter
          </p>
        </div>

        {/* Bio Block + Draggable Studio Sticker */}
        <div
          ref={bioContainerRef}
          className="relative max-w-4xl mx-auto mb-28 md:mb-40 p-6 md:p-10 rounded-[24px] bg-[#1d1d1b]/60 backdrop-blur-[4px] border border-white/10"
        >
          <h3 className="font-display font-semibold text-2xl md:text-4xl xl:text-[46px] leading-[1.06] text-[#d32941] mb-8 max-w-3xl">
            Passionate about designing &amp; engineering web products, desktop tools, and scalable systems.
          </h3>

          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            <div className="max-w-xl space-y-5">
              <p className="about-bio-reveal gradient-reveal-text font-display text-base md:text-[18px] leading-[1.5]">
                {personalInfo.bio}
              </p>
              <div className="flex flex-wrap gap-6 pt-4 border-t border-white/20 font-display text-xs tracking-[2px] uppercase text-white/75">
                <span>{personalInfo.university.name}</span>
                <span className="text-[#d32941]">CGPA {personalInfo.university.cgpa}</span>
                <span>{personalInfo.university.period}</span>
              </div>
            </div>

            {/* Draggable HRZ // 02 Studio Stamp */}
            <div
              ref={stickerRef}
              onMouseEnter={() => setCursor({ big: true, text: 'DRAG' })}
              onMouseLeave={resetCursor}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border border-[#d32941] bg-[#1d1d1b]/95 flex flex-col items-center justify-center text-center select-none cursor-grab active:cursor-grabbing shrink-0 shadow-[0_0_24px_rgba(211,41,65,0.28)]"
              title="Drag me"
            >
              <span className="absolute inset-1.5 rounded-full border border-white/15 pointer-events-none" aria-hidden="true" />
              <span className="font-display font-bold text-2xl md:text-[26px] tracking-[2px] text-[#d32941] leading-none">
                HRZ.02
              </span>
              <span className="font-display text-[9px] tracking-[2.5px] uppercase text-white/75 mt-1.5">
                DRAG STAMP
              </span>
            </div>
          </div>
        </div>

        {/* Hairline Architectural Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between border-b border-white pb-5 mb-2">
            <div>
              <p className="font-display text-[11px] tracking-[4px] uppercase text-[#d32941] mb-1">
                CHRONOLOGY
              </p>
              <h3 className="font-display font-bold text-2xl md:text-4xl uppercase text-white">
                Experience &amp; Milestones
              </h3>
            </div>
            <span className="font-display text-xs tracking-[2px] uppercase text-white/55">
              2020 — PRESENT
            </span>
          </div>

          <div className="divide-y divide-white/20 bg-[#1d1d1b]/55 backdrop-blur-[3px] px-5 md:px-8 rounded-[20px] border border-white/10">
            {featuredEntries.map((entry) => (
              <div
                key={entry.id}
                className="timeline-row py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                <div className="md:col-span-3">
                  <span className="font-display text-xs tracking-[2px] uppercase text-[#d32941] block">
                    {entry.startDate} — {entry.endDate || 'Present'}
                  </span>
                  <span className="font-display text-[10px] tracking-[2px] uppercase text-white/55 mt-1 block">
                    {entry.type} · {entry.location}
                  </span>
                </div>

                <div className="md:col-span-9">
                  <h4 className="font-display font-semibold text-xl md:text-2xl uppercase text-white leading-snug">
                    {entry.title}
                  </h4>
                  <p className="font-editorial text-xs md:text-sm uppercase tracking-[1.5px] text-white/60 mt-1 mb-3">
                    {entry.organization}
                  </p>
                  <p className="font-display text-sm md:text-base text-white/80 leading-relaxed max-w-2xl">
                    {entry.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right-Aligned Process Statement */}
        <div className="max-w-5xl mx-auto mt-24 md:mt-36 text-right">
          <p className="font-display font-bold text-2xl md:text-4xl xl:text-[48px] leading-[1.06] text-[#d32941] ml-auto max-w-3xl">
            Whether it&apos;s a full-time engineering role, a collaboration, or a bold product build, let&apos;s talk.
          </p>
        </div>
      </div>
    </section>
  )
}
