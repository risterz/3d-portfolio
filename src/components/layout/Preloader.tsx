'use client'

import { useEffect, useState } from 'react'
import { useUniverse } from '@/context/UniverseContext'

export default function Preloader() {
  const { entered, setEntered, setCursor, resetCursor } = useUniverse()
  const [percent, setPercent] = useState(0)
  const [ready, setReady] = useState(false)
  const [dismissing, setDismissing] = useState(false)
  const [unmounted, setUnmounted] = useState(false)

  useEffect(() => {
    if (entered) {
      setUnmounted(true)
      return
    }

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setPercent(100)
      setReady(true)
      return
    }

    let current = 0
    const timer = window.setInterval(() => {
      current += current < 75 ? 4 : 2
      if (current >= 100) {
        setPercent(100)
        setReady(true)
        window.clearInterval(timer)
      } else {
        setPercent(current)
      }
    }, 30)

    return () => window.clearInterval(timer)
  }, [entered])

  const handleEnter = () => {
    if (dismissing) return
    setDismissing(true)
    resetCursor()
    setEntered(true)
    window.setTimeout(() => setUnmounted(true), 900)
  }

  useEffect(() => {
    if (!ready || dismissing || unmounted) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleEnter()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ready, dismissing, unmounted])

  if (unmounted) return null

  const progressRatio = percent / 100
  const trackHeight = 224
  const dashOffset = trackHeight * (1 - progressRatio)

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ease-quart ${
        dismissing ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        zIndex: 'var(--z-loader)',
        backgroundColor: 'rgba(29, 29, 27, 0.9)',
        backdropFilter: 'blur(6px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label="HRZ 02 portfolio preloader"
    >
      <div className="relative flex flex-col items-center">
        {/* Outlined percentage counter at top */}
        <span
          className={`absolute top-5 left-1/2 -translate-x-1/2 font-display text-[2.2rem] font-semibold leading-none text-hollow-crimson tabular-nums transition-opacity duration-500 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
          aria-live="polite"
        >
          {percent < 10 ? `0${percent}` : percent}
        </span>

        {/* HRZ // 02 Vertical Monogram Core Pillar */}
        <svg
          width="104"
          height="360"
          viewBox="0 0 104 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-all duration-700"
          style={{
            filter: ready ? 'drop-shadow(0 0 8px rgba(211,41,65,0.85)) saturate(1.3)' : 'none',
          }}
        >
          {/* Architectural chamfered outer frame */}
          <path
            d="M18 1H86L103 18V342L86 359H18L1 342V18L18 1Z"
            stroke="#D32941"
            strokeWidth="1.8"
          />

          {/* Inner corner brackets */}
          <path d="M12 64H92" stroke="#D32941" strokeWidth="1" strokeOpacity="0.45" />
          <path d="M12 312H92" stroke="#D32941" strokeWidth="1" strokeOpacity="0.45" />

          {/* HRZ Monogram fades in at 100% */}
          <text
            x="52"
            y="43"
            textAnchor="middle"
            fill="none"
            stroke="#D32941"
            strokeWidth="1.3"
            fontFamily="Clash Display, sans-serif"
            fontWeight="700"
            fontSize="24"
            letterSpacing="3"
            style={{
              opacity: ready ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          >
            HRZ
          </text>

          {/* Vertical core rail */}
          <rect
            x="47"
            y="78"
            width="10"
            height="224"
            stroke="#D32941"
            strokeWidth="1.5"
            strokeOpacity="0.55"
          />

          {/* Rising crimson core beam */}
          <line
            x1="52"
            y1="302"
            x2="52"
            y2="78"
            stroke="#D32941"
            strokeWidth="6"
            strokeDasharray={trackHeight}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />

          {/* Precision telemetry ticks left & right */}
          {Array.from({ length: 19 }).map((_, i) => {
            const y = 296 - i * 11.8
            const major = i % 3 === 0
            return (
              <g key={i} stroke="#D32941" strokeWidth={major ? '1.8' : '1.1'} strokeOpacity={major ? '1' : '0.6'}>
                <line x1={major ? 16 : 26} y1={y} x2="40" y2={y} />
                <line x1="64" y1={y} x2={major ? 88 : 78} y2={y} />
              </g>
            )
          })}

          {/* Bottom signature stamp // 02 */}
          <text
            x="52"
            y="341"
            textAnchor="middle"
            fill="#D32941"
            fontFamily="Clash Display, sans-serif"
            fontWeight="600"
            fontSize="13"
            letterSpacing="4"
          >
            // 02
          </text>
        </svg>

        {/* Sharp Crimson Frame CTA */}
        <button
          type="button"
          onClick={handleEnter}
          onMouseEnter={() => setCursor({ big: true, text: 'GO' })}
          onMouseLeave={resetCursor}
          disabled={!ready}
          className={`frame-cta mt-8 transition-all duration-700 ease-quart ${
            ready
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-5 pointer-events-none'
          }`}
        >
          Enter HRZ // 02
        </button>

        <button
          type="button"
          onClick={handleEnter}
          className="mt-4 font-display text-[10px] tracking-[2px] uppercase text-white/45 hover:text-white transition-colors"
        >
          Skip intro
        </button>
      </div>
    </div>
  )
}
