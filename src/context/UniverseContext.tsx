'use client'

import React, { createContext, useContext, useState, useCallback, useRef } from 'react'

export interface CursorConfig {
  big?: boolean
  text?: string
  icon?: boolean
  outline?: boolean
  hidden?: boolean
}

export interface ParticleTheme {
  color1: string
  color2: string
  opacity: number
  scale: number
  shape: number // 0=Orb, 1=HaloRing, 2=TerrainWave, 3=RightHelix, 4=HorizonDunes
  offset?: [number, number, number]
}

interface UniverseContextValue {
  entered: boolean
  setEntered: (v: boolean) => void
  broken: boolean | null
  toggleBroken: () => void
  flux: number
  setFlux: (val: number) => void
  randomness: number
  particleTheme: ParticleTheme
  setParticleTheme: (theme: ParticleTheme) => void
  cursor: CursorConfig
  setCursor: (c: CursorConfig) => void
  resetCursor: () => void
  scrollProgressRef: React.MutableRefObject<number>
  scrollVelocityRef: React.MutableRefObject<number>
  activeSection: string
  setActiveSection: (s: string) => void
  ambientPulse: boolean
  toggleAmbientPulse: () => void
}

const DEFAULT_THEME: ParticleTheme = {
  color1: '#d32941',
  color2: '#ff3b57',
  opacity: 0.95,
  scale: 1.0,
  shape: 0,
  offset: [0, 0, -0.3],
}

const UniverseContext = createContext<UniverseContextValue | null>(null)

export function UniverseProvider({ children }: { children: React.ReactNode }) {
  const [entered, setEntered] = useState(false)
  const [broken, setBroken] = useState<boolean | null>(null)
  const [flux, setFluxState] = useState(100)
  const [particleTheme, setParticleTheme] = useState<ParticleTheme>(DEFAULT_THEME)
  const [cursor, setCursorState] = useState<CursorConfig>({})
  const [activeSection, setActiveSection] = useState('hero')
  const [ambientPulse, setAmbientPulse] = useState(true)

  const scrollProgressRef = useRef(0)
  const scrollVelocityRef = useRef(0)

  const toggleBroken = useCallback(() => {
    setBroken((prev) => (prev === true ? false : true))
  }, [])

  const setFlux = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(100, Math.round(val)))
    setFluxState(clamped)
  }, [])

  // Maps 100% (ordered, randomness = 1) down to 0% (max neon chaos, randomness = 10)
  const randomness = Number((1 + ((100 - flux) / 100) * 9).toFixed(2))

  const setCursor = useCallback((c: CursorConfig) => {
    setCursorState(c)
  }, [])

  const resetCursor = useCallback(() => {
    setCursorState({})
  }, [])

  const toggleAmbientPulse = useCallback(() => {
    setAmbientPulse((prev) => !prev)
  }, [])

  return (
    <UniverseContext.Provider
      value={{
        entered,
        setEntered,
        broken,
        toggleBroken,
        flux,
        setFlux,
        randomness,
        particleTheme,
        setParticleTheme,
        cursor,
        setCursor,
        resetCursor,
        scrollProgressRef,
        scrollVelocityRef,
        activeSection,
        setActiveSection,
        ambientPulse,
        toggleAmbientPulse,
      }}
    >
      {children}
    </UniverseContext.Provider>
  )
}

export function useUniverse() {
  const ctx = useContext(UniverseContext)
  if (!ctx) throw new Error('useUniverse must be used inside UniverseProvider')
  return ctx
}
