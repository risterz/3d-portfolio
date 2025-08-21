'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface FloatingGeometryProps {
  position?: [number, number, number]
  color?: string
  wireframe?: boolean
  scale?: number
  geometry?: 'icosahedron' | 'octahedron' | 'dodecahedron' | 'tetrahedron'
}

export default function FloatingGeometry({ 
  position = [0, 0, 0], 
  color = "#00ffff",
  wireframe = true,
  scale = 1,
  geometry = 'icosahedron'
}: FloatingGeometryProps) {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.8) * 0.3
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.6) * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      
      // Pulsing effect
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      meshRef.current.scale.setScalar(scale * pulseScale)
    }
  })

  const getGeometry = () => {
    switch (geometry) {
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />
      default:
        return <icosahedronGeometry args={[1, 0]} />
    }
  }

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      {getGeometry()}
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.8 : 0.6}
        emissive={color}
        emissiveIntensity={0.2}
        roughness={0.3}
        metalness={0.7}
      />
    </mesh>
  )
}
