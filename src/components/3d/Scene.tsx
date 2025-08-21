'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

interface SceneProps {
  children: React.ReactNode
  className?: string
  enableControls?: boolean
  cameraPosition?: [number, number, number]
  cameraFov?: number
}

export default function Scene({ 
  children, 
  className = "w-full h-full", 
  enableControls = false,
  cameraPosition = [0, 0, 5],
  cameraFov = 75
}: SceneProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ 
          position: cameraPosition, 
          fov: cameraFov 
        }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00ffff" />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#8b5cf6" />
          
          {children}
          
          {enableControls && (
            <mesh>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}