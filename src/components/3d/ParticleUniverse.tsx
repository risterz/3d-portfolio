'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useUniverse } from '@/context/UniverseContext'

const VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  uniform float uRandomness;
  uniform float uScroll;
  uniform float uVelocity;
  uniform float uPulse;
  uniform float uScale;
  uniform float uEntry;
  uniform float uPixelRatio;
  uniform float uPointScale;
  uniform float uCameraZ;
  uniform vec2 uMouse;
  uniform vec3 uOffset;

  // Smooth morph weights for 5 distinct per-section 3D formations
  uniform float uWOrb;
  uniform float uWRing;
  uniform float uWWave;
  uniform float uWHelix;
  uniform float uWDunes;

  attribute vec3 aRingPos;
  attribute vec3 aWavePos;
  attribute vec3 aHelixPos;
  attribute vec3 aDunesPos;
  attribute vec3 aRandom;
  attribute float aSize;

  varying float vDepth;
  varying float vMix;
  varying float vSpark;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    float chaos = (uRandomness - 1.0) / 9.0;
    float t = uTime * (0.32 + chaos * 0.9);

    // 1. Blend between the 5 sculptural formations
    vec3 orbPos = position;
    vec3 ringPos = aRingPos;
    vec3 wavePos = aWavePos;
    vec3 helixPos = aHelixPos;
    vec3 dunesPos = aDunesPos;

    // Animate wave & dunes ridges smoothly in real time
    wavePos.y += sin(wavePos.x * 1.15 + t * 1.2) * 0.34 + cos(wavePos.z * 1.1 - t * 0.9) * 0.28;
    dunesPos.y += sin(dunesPos.x * 0.85 + t * 0.7) * 0.42 + cos(dunesPos.z * 0.95 + t * 0.5) * 0.25;

    // Slowly spin the halo ring and helix for hypnotic motion
    float rAng = t * 0.28;
    ringPos.xy = mat2(cos(rAng), -sin(rAng), sin(rAng), cos(rAng)) * ringPos.xy;
    float hAng = t * 0.45;
    helixPos.xz = mat2(cos(hAng), -sin(hAng), sin(hAng), cos(hAng)) * helixPos.xz;

    vec3 morphed =
      orbPos * uWOrb +
      ringPos * uWRing +
      wavePos * uWWave +
      helixPos * uWHelix +
      dunesPos * uWDunes;

    // Thermometer vertical capsule before entry completes
    vec3 loaderPos = vec3(position.x * 0.14, position.y * 1.12, position.z * 0.14);

    // Organic curl flow + breathing pulse
    float breath = sin(t * 0.95) * 0.045 + uPulse * 0.12;
    float n1 = snoise(morphed * (0.75 + chaos * 0.8) + vec3(t * 0.28, -t * 0.18, t * 0.14));
    float n2 = snoise(morphed * 1.65 - vec3(t * 0.2, t * 0.32, -t * 0.15));
    vec3 flow = vec3(n1, n2, snoise(morphed * 1.1 + vec3(-t * 0.15, t * 0.22, t * 0.2)));

    vec3 cloudPos = morphed * (1.0 + breath) + flow * (0.18 + chaos * 0.52 + abs(uVelocity) * 0.045);

    // Gentle scroll twist on the orb
    float orbTwist = uScroll * 1.8 * uWOrb;
    float ct = cos(orbTwist);
    float st = sin(orbTwist);
    cloudPos.xz = mat2(ct, -st, st, ct) * cloudPos.xz;

    cloudPos = cloudPos * uScale + uOffset;

    // Mouse magnetic lean & crisp localized ripple
    vec3 mouseWorld = vec3(uMouse.x * 3.1, uMouse.y * 2.1, uOffset.z + 0.6);
    vec3 toMouse = cloudPos - mouseWorld;
    float mDist = length(toMouse);
    float mForce = smoothstep(2.1, 0.0, mDist) * (0.52 + chaos * 0.35);
    cloudPos += normalize(toMouse + vec3(0.0001)) * mForce;
    cloudPos.xy += uMouse * 0.2;

    vec3 finalPos = mix(loaderPos, cloudPos, smoothstep(0.0, 1.0, uEntry));

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Crisp luminous sparks (large enough to shimmer vividly, fine enough never to blur text)
    float sizePx = aSize * (9.5 + chaos * 4.0) * uPixelRatio * uPointScale;
    gl_PointSize = clamp(sizePx * (3.2 / max(-mvPosition.z, 1.0)), 1.5, 13.0);

    // Depth relative to camera Z so portrait pullback keeps full vivid brightness
    float depthStart = uCameraZ - 3.5;
    vDepth = clamp((-mvPosition.z - depthStart) / 8.5, 0.0, 1.0);
    vMix = clamp(0.5 + n1 * 0.7 + aRandom.x * 0.25, 0.0, 1.0);
    vSpark = aRandom.y;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uChaos1;
  uniform vec3 uChaos2;
  uniform float uRandomness;
  uniform float uOpacity;

  varying float vDepth;
  varying float vMix;
  varying float vSpark;

  void main() {
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);
    if (dist > 0.5) discard;

    // Bright pinpoint core + smooth crimson/neon halo
    float core = smoothstep(0.32, 0.0, dist);
    float halo = smoothstep(0.5, 0.1, dist);
    float chaos = clamp((uRandomness - 1.0) / 9.0, 0.0, 1.0);

    vec3 c1 = mix(uColor1, uChaos1, chaos * 0.85);
    vec3 c2 = mix(uColor2, uChaos2, chaos * 0.85);
    vec3 col = mix(c1, c2, vMix);

    // Subtle bright highlight on occasional hero sparks
    col += mix(vec3(0.0), vec3(0.28, 0.18, 0.2), core * step(0.72, vSpark));

    // Depth lighting keeps rich 3D volume
    float light = mix(1.25, 0.35, vDepth);
    col *= light;

    float alpha = halo * uOpacity * mix(0.92, 0.28, vDepth);
    gl_FragColor = vec4(col, alpha);
  }
`

function detectParticleBudget(): number {
  if (typeof window === 'undefined') return 14000
  if (window.innerWidth < 768) return 9000
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl')
    const ext = gl?.getExtension('WEBGL_debug_renderer_info')
    const renderer = ext ? String(gl?.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '') : ''
    if (/intel|uhd|iris|swiftshader|llvmpipe|apple gpu/i.test(renderer)) {
      return 15000
    }
  } catch {
    return 14000
  }
  return 24000
}

function ParticleCloud() {
  const { entered, randomness, particleTheme, scrollProgressRef, scrollVelocityRef, ambientPulse } =
    useUniverse()
  const { gl, camera, size } = useThree()

  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const starsRef = useRef<THREE.Points>(null)
  const mouseTarget = useRef(new THREE.Vector2(0, 0))
  const mouseSmooth = useRef(new THREE.Vector2(0, 0))
  const entryVal = useRef(0)

  const smoothColor1 = useRef(new THREE.Color(particleTheme.color1))
  const smoothColor2 = useRef(new THREE.Color(particleTheme.color2))
  const targetColor1 = useRef(new THREE.Color(particleTheme.color1))
  const targetColor2 = useRef(new THREE.Color(particleTheme.color2))
  const smoothOpacity = useRef(particleTheme.opacity)
  const smoothScale = useRef(particleTheme.scale)
  const smoothOffset = useRef(new THREE.Vector3(...(particleTheme.offset ?? [0, 0, -0.3])))
  const targetOffset = useRef(new THREE.Vector3(...(particleTheme.offset ?? [0, 0, -0.3])))

  // Smooth morph weights for the 5 section shapes
  const weights = useRef([1, 0, 0, 0, 0])

  useEffect(() => {
    targetColor1.current.set(particleTheme.color1)
    targetColor2.current.set(particleTheme.color2)
    if (particleTheme.offset) {
      targetOffset.current.set(...particleTheme.offset)
    }
  }, [particleTheme.color1, particleTheme.color2, particleTheme.offset])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseTarget.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseTarget.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const { geometry, starGeo } = useMemo(() => {
    const count = detectParticleBudget()
    const orbPositions = new Float32Array(count * 3)
    const ringPositions = new Float32Array(count * 3)
    const wavePositions = new Float32Array(count * 3)
    const helixPositions = new Float32Array(count * 3)
    const dunesPositions = new Float32Array(count * 3)
    const randoms = new Float32Array(count * 3)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const idx = i * 3

      // Shape 0: Hero Volumetric Crimson Orb
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 0.7 + Math.pow(Math.random(), 0.5) * 1.45
      orbPositions[idx] = r * Math.sin(phi) * Math.cos(theta)
      orbPositions[idx + 1] = r * Math.sin(phi) * Math.sin(theta)
      orbPositions[idx + 2] = r * Math.cos(phi)

      // Shape 1: Work Wide Hollow Halo Torus (frames projects cleanly around outer viewport!)
      const tA = Math.random() * Math.PI * 2
      const tB = Math.random() * Math.PI * 2
      const majorR = 2.85 + (Math.random() - 0.5) * 0.45
      const minorR = 0.35 + Math.random() * 0.48
      ringPositions[idx] = (majorR + minorR * Math.cos(tB)) * Math.cos(tA) * 1.25
      ringPositions[idx + 1] = (majorR + minorR * Math.cos(tB)) * Math.sin(tA) * 0.85
      ringPositions[idx + 2] = minorR * Math.sin(tB) - 0.6

      // Shape 2: Skills 3D Flowing Particle Terrain Wave (lower viewport sweep)
      const wx = (Math.random() - 0.5) * 9.5
      const wz = (Math.random() - 0.5) * 5.2
      wavePositions[idx] = wx
      wavePositions[idx + 1] = -1.35 + (Math.random() - 0.5) * 0.35
      wavePositions[idx + 2] = wz - 0.8

      // Shape 3: Journey Sculptural Double-Helix Nebula (pushed right so left copy is crisp!)
      const strand = i % 2 === 0 ? 0 : Math.PI
      const hy = (Math.random() - 0.5) * 5.2
      const hAngle = hy * 1.35 + strand
      const hRad = 0.85 + Math.random() * 0.55
      helixPositions[idx] = Math.cos(hAngle) * hRad + 1.85
      helixPositions[idx + 1] = hy
      helixPositions[idx + 2] = Math.sin(hAngle) * hRad - 0.5

      // Shape 4: Contact Rising Horizon Dunes Wave (sweeping crimson ridge)
      const dx = (Math.random() - 0.5) * 10.5
      const dz = (Math.random() - 0.5) * 4.8
      dunesPositions[idx] = dx
      dunesPositions[idx + 1] = -1.15 - Math.abs(dx) * 0.08 + (Math.random() - 0.5) * 0.45
      dunesPositions[idx + 2] = dz - 0.6

      randoms[idx] = Math.random()
      randoms[idx + 1] = Math.random()
      randoms[idx + 2] = Math.random()
      sizes[i] = 0.45 + Math.random() * 1.05
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(orbPositions, 3))
    geo.setAttribute('aRingPos', new THREE.BufferAttribute(ringPositions, 3))
    geo.setAttribute('aWavePos', new THREE.BufferAttribute(wavePositions, 3))
    geo.setAttribute('aHelixPos', new THREE.BufferAttribute(helixPositions, 3))
    geo.setAttribute('aDunesPos', new THREE.BufferAttribute(dunesPositions, 3))
    geo.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3))
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))

    // Ambient cosmic starfield
    const starCount = 850
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 28
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 22
      starPos[i * 3 + 2] = -5 - Math.random() * 14
    }
    const sGeo = new THREE.BufferGeometry()
    sGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))

    return { geometry: geo, starGeo: sGeo }
  }, [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRandomness: { value: 1 },
      uScroll: { value: 0 },
      uVelocity: { value: 0 },
      uPulse: { value: 0 },
      uScale: { value: 1 },
      uEntry: { value: 0 },
      uPixelRatio: { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2) },
      uPointScale: { value: 1 },
      uCameraZ: { value: 5.5 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOffset: { value: new THREE.Vector3(0, 0, -0.3) },
      uWOrb: { value: 1 },
      uWRing: { value: 0 },
      uWWave: { value: 0 },
      uWHelix: { value: 0 },
      uWDunes: { value: 0 },
      uColor1: { value: new THREE.Color('#d32941') },
      uColor2: { value: new THREE.Color('#ff3b57') },
      uChaos1: { value: new THREE.Color('#00faf0') },
      uChaos2: { value: new THREE.Color('#fa00d0') },
      uOpacity: { value: 0.95 },
    }),
    []
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    mouseSmooth.current.lerp(mouseTarget.current, dt * 4.5)

    const targetEntry = entered ? 1 : 0.04
    entryVal.current += (targetEntry - entryVal.current) * Math.min(1, dt * 1.65)

    smoothColor1.current.lerp(targetColor1.current, dt * 2.8)
    smoothColor2.current.lerp(targetColor2.current, dt * 2.8)
    smoothOpacity.current += (particleTheme.opacity - smoothOpacity.current) * dt * 2.5
    smoothScale.current += (particleTheme.scale - smoothScale.current) * dt * 2.5
    smoothOffset.current.lerp(targetOffset.current, dt * 2.2)

    // Smoothly morph formation weights toward active section shape
    const activeShape = particleTheme.shape ?? 0
    let sum = 0
    for (let i = 0; i < 5; i++) {
      const target = i === activeShape ? 1 : 0
      weights.current[i] += (target - weights.current[i]) * Math.min(1, dt * 2.6)
      sum += weights.current[i]
    }
    const invSum = sum > 0.0001 ? 1 / sum : 1

    const scroll = scrollProgressRef.current
    const velocity = scrollVelocityRef.current

    // Portrait mobile camera pullback & horizontal framing (desktop aspect >= 1 untouched)
    const aspect = size.width / Math.max(size.height, 1)
    const isPortrait = aspect < 1.0
    const portraitFactor = isPortrait ? Math.min(1, Math.max(0, 1.0 - aspect)) : 0
    const targetCameraZ = isPortrait ? 5.5 + portraitFactor * 7.2 : 5.5
    const responsiveScale = isPortrait ? smoothScale.current * (0.72 + aspect * 0.24) : smoothScale.current
    const responsiveOffsetX = isPortrait ? smoothOffset.current.x * 0.35 : smoothOffset.current.x
    const responsivePointScale = isPortrait ? (targetCameraZ / 5.5) * 0.92 : 1.0

    camera.position.x += (mouseSmooth.current.x * (isPortrait ? 0.15 : 0.42) - camera.position.x) * dt * 2.4
    camera.position.y += (mouseSmooth.current.y * (isPortrait ? 0.12 : 0.28) - camera.position.y) * dt * 2.4
    camera.position.z += (targetCameraZ - camera.position.z) * dt * 2.4
    camera.lookAt(0, 0, 0)

    if (materialRef.current) {
      const u = materialRef.current.uniforms
      u.uTime.value = state.clock.elapsedTime
      u.uRandomness.value = randomness
      u.uScroll.value = scroll
      u.uVelocity.value = velocity
      u.uPulse.value = ambientPulse ? Math.pow(Math.sin(state.clock.elapsedTime * 2.2) * 0.5 + 0.5, 3) : 0
      u.uScale.value = responsiveScale
      u.uEntry.value = entryVal.current
      u.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2)
      u.uPointScale.value = responsivePointScale
      u.uCameraZ.value = camera.position.z
      u.uMouse.value.copy(mouseSmooth.current)
      u.uOffset.value.set(responsiveOffsetX, smoothOffset.current.y, smoothOffset.current.z)
      u.uWOrb.value = weights.current[0] * invSum
      u.uWRing.value = weights.current[1] * invSum
      u.uWWave.value = weights.current[2] * invSum
      u.uWHelix.value = weights.current[3] * invSum
      u.uWDunes.value = weights.current[4] * invSum
      u.uColor1.value.copy(smoothColor1.current)
      u.uColor2.value.copy(smoothColor2.current)
      u.uOpacity.value = smoothOpacity.current
    }

    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.012 + scroll * 0.25
      starsRef.current.rotation.x = mouseSmooth.current.y * 0.04
    }
  })

  return (
    <>
      <points ref={starsRef} geometry={starGeo} frustumCulled={false}>
        <pointsMaterial
          size={0.03}
          color="#ffffff"
          transparent
          opacity={0.42}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={materialRef}
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

export default function ParticleUniverse() {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 'var(--z-webgl)' }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50, near: 0.1, far: 40 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <ParticleCloud />
      </Canvas>
    </div>
  )
}
