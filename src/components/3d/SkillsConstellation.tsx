'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text, OrbitControls } from '@react-three/drei'
import { Group, Mesh } from 'three'
import { skills } from '@/data/skills'
import { trackEvent } from '@/lib/analytics'
import useKeycapGeometry from './KeycapGeometry'

// Get display text for keycaps (shorter versions)
function getKeycapText(skill: typeof skills[0]) {
  const textMap: { [key: string]: string } = {
    'Python': 'PY',
    'JavaScript': 'JS',
    'HTML/CSS': 'HTML',
    'Next.js': 'NEXT',
    'React.js': 'REACT',
    'Node.js': 'NODE',
    'VS Code': 'VSC',
    'Bahasa Malaysia': 'BM',
    'English': 'EN'
  }
  
  return textMap[skill.name] || skill.name.substring(0, 4).toUpperCase()
}

export default function SkillsConstellation() {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle auto-rotation when not being controlled by user
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <>
      {/* Orbit Controls for user interaction - Mobile optimized */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        autoRotate={false}
        autoRotateSpeed={0.5}
        dampingFactor={0.1}
        enableDamping={true}
        // Mobile-specific settings
        touches={{
          ONE: 2, // TOUCH.ROTATE
          TWO: 1  // TOUCH.DOLLY_PAN
        }}
        mouseButtons={{
          LEFT: 2,  // MOUSE.ROTATE
          MIDDLE: 1, // MOUSE.DOLLY
          RIGHT: 0   // MOUSE.PAN
        }}
        rotateSpeed={0.5}
        zoomSpeed={0.8}
        panSpeed={0.8}
      />
      
      <group ref={groupRef}>
        {skills.map((skill) => (
          <FloatingKeycap
            key={skill.id}
            skill={skill}
            onInteraction={() => trackEvent('skill_hover', { skill_id: skill.id, skill_name: skill.name })}
          />
        ))}
      </group>
    </>
  )
}

interface FloatingKeycapProps {
  skill: typeof skills[0]
  onInteraction: () => void
}

function FloatingKeycap({ skill, onInteraction }: FloatingKeycapProps) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Get display text
  const displayText = getKeycapText(skill)
  const textColor = hovered ? '#ffffff' : (skill.name === 'Next.js' ? '#ffffff' : skill.color)
  
  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp({ x: scale, y: scale, z: scale } as any, 0.1)
      
      // Floating animation
      const time = state.clock.elapsedTime
      const floatY = Math.sin(time * 0.8 + skill.proficiency * 0.1) * 0.3
      const floatX = Math.cos(time * 0.6 + skill.proficiency * 0.05) * 0.15
      
      meshRef.current.position.y = floatY
      meshRef.current.position.x = floatX
      
      // Gentle rotation
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.1
      meshRef.current.rotation.z = Math.cos(time * 0.4) * 0.05
    }
  })

  const position: [number, number, number] = [
    skill.position.x, 
    skill.position.y, 
    skill.position.z
  ]

  // Responsive keycap dimensions - smaller on mobile
  const baseWidth = displayText.length > 3 ? 1.5 : 1.2
  const width = isMobile ? baseWidth * 0.8 : baseWidth
  const height = isMobile ? 0.6 : 0.8
  const depth = isMobile ? 0.15 : 0.2

  // Create keycap geometry
  const { geometry: keycapGeometry, frontZ } = useKeycapGeometry({
    width,
    height,
    depth,
    cornerRadius: Math.min(width, height) * 0.18,
    bevel: Math.min(width, height) * 0.06,
    bevelSegments: 3,
    topScale: 0.9,
    dishDepth: Math.min(width, height) * 0.06,
    dishRadiusScale: 0.95,
    curveSegments: 12
  })

  return (
    <group position={position}>
      {/* Main keycap body */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => {
          setHovered(true)
          onInteraction()
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'pointer'
          }
        }}
        onPointerLeave={() => {
          setHovered(false)
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'auto'
          }
        }}
      >
        <primitive attach="geometry" object={keycapGeometry} />
        <meshStandardMaterial
          color={hovered ? skill.color : '#2a2a2a'}
          roughness={0.3}
          metalness={0.7}
        />

        {/* Keycap text (now parented to mesh so it stays centered) */}
        <Text
          position={[0, 0, (frontZ ?? depth/2) + 0.01]}
          fontSize={isMobile ? 0.15 : 0.2}
          color={textColor}
          anchorX="center"
          anchorY="middle"
        >
          {displayText}
        </Text>
      </mesh>
      
      {/* Hover information */}
      {hovered && (
        <>
          <Text
            position={[0, height/2 + (isMobile ? 0.4 : 0.5), 0]}
            fontSize={isMobile ? 0.1 : 0.12}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {skill.name}
          </Text>
          <Text
            position={[0, height/2 + (isMobile ? 0.25 : 0.3), 0]}
            fontSize={isMobile ? 0.08 : 0.1}
            color="#aaa"
            anchorX="center"
            anchorY="middle"
          >
            {skill.proficiency}% proficiency
          </Text>
        </>
      )}
    </group>
  )
}