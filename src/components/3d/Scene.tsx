'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

interface SceneProps {
  children: React.ReactNode
  className?: string
  cameraPosition?: [number, number, number]
  cameraFov?: number
}

export default function Scene({
  children,
  className = 'w-full h-full',
  cameraPosition = [0, 0, 5.5],
  cameraFov = 65,
}: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{
          position: cameraPosition,
          fov: cameraFov,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 10, 6]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-8, -6, 6]} intensity={1.4} color="#d32941" />
          <pointLight position={[8, 6, -6]} intensity={0.8} color="#ffffff" />
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
