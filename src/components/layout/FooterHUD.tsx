'use client'

import { useEffect, useRef, useState } from 'react'
import { useUniverse } from '@/context/UniverseContext'
import { personalInfo } from '@/data/personal'

export default function FooterHUD() {
  const {
    entered,
    broken,
    toggleBroken,
    flux,
    setFlux,
    scrollProgressRef,
    ambientPulse,
    toggleAmbientPulse,
    setCursor,
    resetCursor,
  } = useUniverse()

  const progressBarRef = useRef<HTMLDivElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Smoothly update scroll hairline without React re-renders
  useEffect(() => {
    let rafId = 0
    const sync = () => {
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${scrollProgressRef.current})`
      }
      rafId = requestAnimationFrame(sync)
    }
    rafId = requestAnimationFrame(sync)
    return () => cancelAnimationFrame(rafId)
  }, [scrollProgressRef])

  const sliderRatio = flux

  return (
    <footer
      aria-label="Global controls and credits"
      className={`fixed bottom-4 right-3 md:bottom-0 md:left-0 md:right-0 w-max max-w-[calc(100vw-52px)] md:w-auto md:max-w-none flex flex-col-reverse md:flex-row md:items-center gap-3 md:gap-0 px-3 py-3.5 md:px-5 md:py-2.5 xl:px-9 xl:py-5 rounded-[15px] md:rounded-none border border-white/15 md:border-0 md:border-t md:border-white transition-all duration-500 ${
        entered ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } ${
        mobileOpen
          ? 'translate-x-0'
          : 'translate-x-[calc(100%+12px)] md:translate-x-0'
      }`}
      style={{
        zIndex: 'var(--z-footer)',
        backgroundColor: 'rgba(29, 29, 27, 0.72)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      {/* Mobile drawer pull-tab */}
      <button
        type="button"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label={mobileOpen ? 'Close controls drawer' : 'Open controls drawer'}
        aria-expanded={mobileOpen}
        className="md:hidden absolute right-full top-1/2 -translate-y-1/2 w-8 h-11 rounded-l-xl bg-[#1d1d1b]/95 border border-r-0 border-white/50 flex items-center justify-center text-white shadow-lg"
      >
        <svg
          width="7"
          height="14"
          viewBox="0 0 7 14"
          fill="none"
          className="transition-transform duration-300"
          style={{ transform: mobileOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <path
            d="M6.47 13L0.63 7.16L6.47 1.31"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Left: Credits & Quick Links */}
      <div className="md:mr-auto flex flex-col gap-1.5">
        <div className="flex items-center gap-4 font-display text-[10px] xl:text-[11px] tracking-[2px] uppercase">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursor({ big: true, icon: true })}
            onMouseLeave={resetCursor}
            className="hover:text-[#d32941] transition-colors"
          >
            GitHub
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setCursor({ big: true, icon: true })}
            onMouseLeave={resetCursor}
            className="hover:text-[#d32941] transition-colors"
          >
            LinkedIn
          </a>
        </div>
        <span className="font-display text-[8px] xl:text-[10px] tracking-[2px] uppercase text-white/65">
          ALL RIGHTS RESERVED © 2026 | HARIS AL-HARRAZ
        </span>
      </div>

      {/* Center: 130px Live Scroll Progress Track (Desktop) */}
      <div
        className="hidden xl:block relative w-[130px] h-[1px] bg-white/30 mr-8"
        aria-hidden="true"
      >
        <div
          ref={progressBarRef}
          className="absolute inset-0 bg-white origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Controls Row: DON'T TOUCH + 93° Chaos Slider */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-3 xl:gap-6">
        <button
          type="button"
          onClick={toggleBroken}
          data-variant="crimson"
          data-active={broken === true ? 'true' : 'false'}
          onMouseEnter={() => setCursor({ big: true, text: broken ? 'FIX' : 'CHAOS' })}
          onMouseLeave={resetCursor}
          className="hud-pill !px-3 md:!px-[18px] xl:!px-5 shrink-0"
        >
          {broken ? 'RESTORE' : "DON'T TOUCH"}
        </button>

        {/* Accessible 0%–100% Flux / Stability Slider */}
        <div
          className="relative h-6 w-[126px] sm:w-[158px] border border-white rounded-[48px] flex items-center justify-between px-2.5 sm:px-3 shrink-0"
          onMouseEnter={() => setCursor({ big: true, text: 'FLUX' })}
          onMouseLeave={resetCursor}
        >
          <div className="relative w-[68px] sm:w-[82px] h-[14px] flex items-center">
            {/* Graduated 10-bar SVG masked by current flux */}
            <svg
              width="82"
              height="14"
              viewBox="0 0 83 15"
              fill="none"
              aria-hidden="true"
              className="w-full h-full"
              style={{
                maskImage: `linear-gradient(to right, black ${sliderRatio}%, rgba(0,0,0,0.18) ${sliderRatio}%)`,
                WebkitMaskImage: `linear-gradient(to right, black ${sliderRatio}%, rgba(0,0,0,0.18) ${sliderRatio}%)`,
              }}
            >
              {Array.from({ length: 10 }).map((_, idx) => (
                <rect
                  key={idx}
                  x={idx * 8.3 + 0.8}
                  y="0.8"
                  width="6.4"
                  height="13.4"
                  rx="0.8"
                  fill="white"
                  fillOpacity={(idx + 1) * 0.1}
                />
              ))}
            </svg>
            <input
              type="range"
              min={0}
              max={100}
              value={flux}
              onChange={(e) => setFlux(Number(e.target.value))}
              aria-label="Particle stability flux from 0 percent chaos to 100 percent calm"
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>
          <span className="font-display text-[11px] font-medium tabular-nums text-white select-none">
            {flux}%
          </span>
        </div>

        {/* Equalizer Pulse Toggle */}
        <button
          type="button"
          onClick={toggleAmbientPulse}
          onMouseEnter={() => setCursor({ big: true, text: ambientPulse ? 'STILL' : 'PULSE' })}
          onMouseLeave={resetCursor}
          aria-label={ambientPulse ? 'Pause particle pulse' : 'Resume particle pulse'}
          aria-pressed={ambientPulse}
          className="w-7 h-7 flex items-center justify-center rounded-full"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={ambientPulse ? 'eq-active' : ''}
          >
            <circle cx="12" cy="12" r="11.2" stroke="white" strokeWidth="1" />
            <path d="M6.5 9.5V14.5" stroke="white" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M9.2 8V16" stroke="white" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M12 6.8V17.2" stroke="white" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M14.8 8V16" stroke="white" strokeLinecap="round" strokeWidth="1.2" />
            <path d="M17.5 9.5V14.5" stroke="white" strokeLinecap="round" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
