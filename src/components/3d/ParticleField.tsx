'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, BufferGeometry, Color } from 'three'

interface ParticleFieldProps {
  count?: number
  size?: number
  colors?: string[]
  range?: number
}

export default function ParticleField({ 
  count = 3000, 
  size = 0.015, 
  colors = ["#00ffff", "#8b5cf6", "#ec4899", "#10b981"],
  range = 25
}: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null)
  
  const [positions, colorArray] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colorArray = new Float32Array(count * 3)
    const colorObjects = colors.map(color => new Color(color))
    
    for (let i = 0; i < count; i++) {
      // Positions
      positions[i * 3] = (Math.random() - 0.5) * range
      positions[i * 3 + 1] = (Math.random() - 0.5) * range
      positions[i * 3 + 2] = (Math.random() - 0.5) * range
      
      // Colors
      const colorIndex = Math.floor(Math.random() * colorObjects.length)
      const color = colorObjects[colorIndex]
      colorArray[i * 3] = color.r
      colorArray[i * 3 + 1] = color.g
      colorArray[i * 3 + 2] = color.b
    }
    return [positions, colorArray]
  }, [count, range, colors])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
      
      // Gentle floating motion
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colorArray}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        vertexColors
        blending={2} // AdditiveBlending
      />
    </points>
  )
}
