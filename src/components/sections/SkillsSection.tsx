'use client'

import { Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scene from '@/components/3d/Scene'
import SkillsConstellation from '@/components/3d/SkillsConstellation'
import { skillCategories } from '@/data/skills'
import { useUniverse } from '@/context/UniverseContext'

gsap.registerPlugin(ScrollTrigger)

const DISCIPLINES = [
  'FULL-STACK WEB ENGINEERING',
  'INTERACTIVE 3D & WEBGL',
  'DESKTOP SYSTEMS (RUST / TAURI)',
  'AI WORKFLOW INTEGRATION',
  'CLOUD & DATA INFRASTRUCTURE',
]

export default function SkillsSection() {
  const { setCursor, resetCursor } = useUniverse()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.discipline-line')
      gsap.fromTo(
        items,
        { opacity: 0.2, color: '#868686', x: 24 },
        {
          opacity: 1,
          color: '#ffffff',
          x: 0,
          stagger: 0.12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.disciplines-block',
            start: 'top 82%',
            end: 'top 32%',
            scrub: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 md:py-44 px-5 md:px-10 xl:px-14 border-t border-white/10"
      style={{ zIndex: 'var(--z-content)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* 93GRADOS-Style Two-Column "WHAT I DO" Block */}
        <div className="disciplines-block max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-20 mb-24 md:mb-36">
          <div className="shrink-0">
            <p className="font-display font-light text-xl xl:text-[32px] leading-[1.3] uppercase text-white whitespace-nowrap">
              WHAT I DO
            </p>
            <span className="block mt-2 font-display text-[11px] tracking-[3px] uppercase text-[#d32941]">
              CORE CAPABILITIES
            </span>
          </div>

          <div className="flex flex-col gap-2 font-editorial font-medium uppercase text-2xl sm:text-3xl xl:text-[42px] leading-[1.05]">
            {DISCIPLINES.map((line) => (
              <span key={line} className="discipline-line">
                {line}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive 3D Mechanical Keycap Stage */}
        <div className="mb-20 md:mb-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <p className="font-display text-[11px] tracking-[4px] uppercase text-[#d32941] mb-2">
                INTERACTIVE 3D LAB
              </p>
              <h2 className="font-display font-bold text-3xl md:text-5xl uppercase text-white">
                Keycap Stack Constellation
              </h2>
            </div>
            <p className="font-display text-xs tracking-[2px] uppercase text-white/60">
              Drag to orbit · Scroll to zoom · Hover keycaps
            </p>
          </div>

          <div
            onMouseEnter={() => setCursor({ hidden: true })}
            onMouseLeave={resetCursor}
            className="relative h-[360px] md:h-[460px] rounded-[30px] border border-white/25 bg-[#1d1d1b]/65 backdrop-blur-sm overflow-hidden"
          >
            <Scene cameraPosition={[0, 0, 6.2]}>
              <Suspense fallback={null}>
                <SkillsConstellation />
              </Suspense>
            </Scene>
          </div>
        </div>

        {/* Hairline Architectural Skill Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-white/30">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="py-8 md:px-6 border-b md:border-b-0 lg:border-r last:border-r-0 border-white/20"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-[11px] tracking-[2px] text-[#d32941]">
                  0{idx + 1}
                </span>
                <span className="font-display text-[10px] tracking-[2px] uppercase text-white/50">
                  {category.skills.length} ITEMS
                </span>
              </div>

              <h3 className="font-display font-semibold text-xl uppercase text-white mb-2">
                {category.title}
              </h3>
              <p className="font-display text-xs text-white/55 mb-6 leading-relaxed">
                {category.description}
              </p>

              <ul className="space-y-2.5">
                {category.skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="flex items-center justify-between py-1.5 border-b border-white/10 font-editorial text-sm uppercase tracking-wide text-white/85 hover:text-[#d32941] transition-colors"
                  >
                    <span>{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
