'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { UniverseProvider, useUniverse } from '@/context/UniverseContext'
import Preloader from '@/components/layout/Preloader'
import Header from '@/components/layout/Header'
import FooterHUD from '@/components/layout/FooterHUD'
import CustomCursor from '@/components/layout/CustomCursor'
import HeroSection from '@/components/sections/HeroSection'
import WorkSection from '@/components/sections/WorkSection'
import SkillsSection from '@/components/sections/SkillsSection'
import JourneySection from '@/components/sections/JourneySection'
import ContactSection from '@/components/sections/ContactSection'
import { trackPageView } from '@/lib/analytics'

gsap.registerPlugin(ScrollTrigger)

const ParticleUniverse = dynamic(() => import('@/components/3d/ParticleUniverse'), {
  ssr: false,
})

const SECTION_THEMES: Record<
  string,
  {
    color1: string
    color2: string
    opacity: number
    scale: number
    shape: number
    offset: [number, number, number]
  }
> = {
  // 0: Hero — Vibrant Living Crimson Orb
  hero: { color1: '#d32941', color2: '#ff3b57', opacity: 0.95, scale: 1.02, shape: 0, offset: [0, 0, -0.3] },
  // 1: Work — Wide Hollow Glowing Ring (open dark center behind project copy, colorful edges!)
  work: { color1: '#fadb48', color2: '#d32941', opacity: 0.85, scale: 1.0, shape: 1, offset: [0, 0, -0.4] },
  // 2: Skills — Flowing 3D Crimson Particle Terrain Wave across lower viewport
  skills: { color1: '#d32941', color2: '#ff5268', opacity: 0.88, scale: 1.0, shape: 2, offset: [0, 0.1, -0.2] },
  // 3: Journey — Sculptural Right-Flank Double Helix in Crimson + Ember Gold (zero white-on-white clash!)
  journey: { color1: '#d32941', color2: '#ff7a45', opacity: 0.9, scale: 1.0, shape: 3, offset: [0.3, 0, -0.3] },
  // 4: Contact — Sweeping Crimson Horizon Dunes Ridge
  contact: { color1: '#fd2a42', color2: '#d32941', opacity: 0.92, scale: 1.05, shape: 4, offset: [0, 0.2, -0.2] },
}

function PortfolioShell() {
  const {
    broken,
    scrollProgressRef,
    scrollVelocityRef,
    setActiveSection,
    setParticleTheme,
  } = useUniverse()

  useEffect(() => {
    trackPageView('home')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
    })

    lenis.on('scroll', (e: { progress?: number; velocity?: number }) => {
      ScrollTrigger.update()
      scrollProgressRef.current = typeof e.progress === 'number' ? e.progress : 0
      scrollVelocityRef.current = typeof e.velocity === 'number' ? e.velocity : 0
    })

    const onTick = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [scrollProgressRef, scrollVelocityRef])

  // Sync active section & WebGL particle palette on scroll
  useEffect(() => {
    const ids = ['hero', 'work', 'skills', 'journey', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setActiveSection(id)
            if (SECTION_THEMES[id]) {
              setParticleTheme(SECTION_THEMES[id])
            }
          }
        })
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: 0.01 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setActiveSection, setParticleTheme])

  return (
    <div
      className="universe-shell"
      data-custom-cursor="true"
      data-broken={broken === null ? undefined : broken ? 'true' : 'false'}
    >
      <Preloader />
      <ParticleUniverse />
      <Header />

      <main className="relative" style={{ zIndex: 'var(--z-content)' }}>
        <HeroSection />
        <WorkSection />
        <SkillsSection />
        <JourneySection />
        <ContactSection />
      </main>

      <FooterHUD />
      <CustomCursor />
    </div>
  )
}

export default function Home() {
  return (
    <UniverseProvider>
      <PortfolioShell />
    </UniverseProvider>
  )
}
