'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useUniverse } from '@/context/UniverseContext'

export default function CustomCursor() {
  const { cursor } = useUniverse()
  const elRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.22, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.22, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="blend-cursor"
      data-big={cursor.big ? 'true' : 'false'}
      data-outline={cursor.outline ? 'true' : 'false'}
      data-hidden={cursor.hidden ? 'true' : 'false'}
    >
      {cursor.big && cursor.text && (
        <span className="font-display text-[12px] font-bold tracking-[1.5px] uppercase text-white select-none">
          {cursor.text}
        </span>
      )}
      {cursor.big && cursor.icon && !cursor.text && (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 17L17 7M17 7H9M17 7V15"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}
