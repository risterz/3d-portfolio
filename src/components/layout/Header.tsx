'use client'

import { useEffect, useState } from 'react'
import { useUniverse } from '@/context/UniverseContext'

const NAV_LINKS = [
  { id: 'work', label: 'WORK' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'journey', label: 'ABOUT' },
  { id: 'contact', label: 'CONTACT' },
]

export default function Header() {
  const { entered, activeSection, setCursor, resetCursor } = useUniverse()
  const [timeString, setTimeString] = useState('')
  const [showCenterWordmark, setShowCenterWordmark] = useState(false)

  useEffect(() => {
    const updateClock = () => {
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Kuala_Lumpur',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date())
      setTimeString(formatted)
    }
    updateClock()
    const id = window.setInterval(updateClock, 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowCenterWordmark(window.scrollY > window.innerHeight * 0.45)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 xl:px-9 xl:py-7 transition-opacity duration-1000 ${
        entered ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{
        zIndex: 'var(--z-header)',
        mixBlendMode: 'difference',
      }}
    >
      {/* Left: Availability + Quick Anchor Navigation */}
      <div className="flex items-center gap-5 xl:gap-8">
        <button
          type="button"
          onClick={() => scrollTo('contact')}
          onMouseEnter={() => setCursor({ big: true, text: 'HIRE' })}
          onMouseLeave={resetCursor}
          className="font-display text-[11px] xl:text-[13px] font-medium tracking-[1.8px] uppercase text-white flex items-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#d32941]" aria-hidden="true" />
          <span className="hidden sm:inline">WORK AVAILABLE</span>
          <span className="sm:hidden">OPEN</span>
          <span className="text-white/75">11/26</span>
        </button>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5">
          {NAV_LINKS.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setCursor({ big: true, outline: true })}
                onMouseLeave={resetCursor}
                className={`font-display text-[11px] tracking-[2px] uppercase transition-opacity ${
                  isActive ? 'text-white opacity-100 underline underline-offset-4' : 'text-white/60 hover:opacity-100'
                }`}
              >
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Center: Docked Brand Wordmark */}
      <button
        type="button"
        onClick={() => scrollTo('hero')}
        onMouseEnter={() => setCursor({ big: true, text: 'TOP' })}
        onMouseLeave={resetCursor}
        aria-label="Back to top"
        className={`absolute left-1/2 -translate-x-1/2 font-display font-bold text-[15px] md:text-[18px] tracking-[0.08em] uppercase text-white transition-all duration-500 ease-quart ${
          showCenterWordmark ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        HRZ<span className="text-[#d32941]">//</span>02
      </button>

      {/* Right: Live Malaysia Clock */}
      <div className="font-display text-[11px] xl:text-[13px] font-medium tracking-[1.5px] uppercase text-white tabular-nums">
        <span className="hidden sm:inline">PAHANG </span>
        {timeString || '00:00:00'}
      </div>
    </header>
  )
}
