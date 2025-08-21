'use client'

import { useMemo } from 'react'
import { BufferGeometry, ExtrudeGeometry, Shape, Vector2 } from 'three'

export interface KeycapGeometryParams {
	width: number
	height: number
	depth: number
	cornerRadius?: number
	bevel?: number
	bevelSegments?: number
	topScale?: number
	dishDepth?: number
	dishRadiusScale?: number
	curveSegments?: number
}

function createRoundedRectShape(width: number, height: number, radius: number, curveSegments: number) {
	const w = width
	const h = height
	const r = Math.min(radius, Math.min(w, h) * 0.49)
	const shape = new Shape()

	// Corners are built using absarc for smooth circular arcs
	const x0 = -w / 2
	const y0 = -h / 2
	const x1 = w / 2
	const y1 = h / 2

	shape.moveTo(x0 + r, y0)
	shape.lineTo(x1 - r, y0)
	shape.absarc(x1 - r, y0 + r, r, -Math.PI / 2, 0, false)
	shape.lineTo(x1, y1 - r)
	shape.absarc(x1 - r, y1 - r, r, 0, Math.PI / 2, false)
	shape.lineTo(x0 + r, y1)
	shape.absarc(x0 + r, y1 - r, r, Math.PI / 2, Math.PI, false)
	shape.lineTo(x0, y0 + r)
	shape.absarc(x0 + r, y0 + r, r, Math.PI, 1.5 * Math.PI, false)

	shape.autoClose = true
	shape.curveSegments = curveSegments
	return shape
}

export function useKeycapGeometry(params: KeycapGeometryParams): { geometry: BufferGeometry, frontZ: number } {
	const {
		width,
		height,
		depth,
		cornerRadius = Math.min(width, height) * 0.18,
		bevel = Math.min(width, height) * 0.06,
		bevelSegments = 3,
		topScale = 0.9,
		dishDepth = Math.min(width, height) * 0.06,
		dishRadiusScale = 0.95,
		curveSegments = 12
	} = params

	return useMemo(() => {
		// 1) Base rounded rectangle extrude (centered on XY)
		const shape = createRoundedRectShape(width, height, cornerRadius, curveSegments)
		const base = new ExtrudeGeometry(shape, {
			depth,
			bevelEnabled: true,
			bevelThickness: bevel,
			bevelSize: bevel,
			bevelSegments,
			steps: 1,
			curveSegments
		})

		// Center geometry so z is in [-depth/2, +depth/2]
		base.translate(0, 0, -depth / 2)

		// 2) Taper: scale XY linearly from bottom (1) to top (topScale)
		const pos = base.attributes.position
		const array = pos.array as unknown as number[]
		let minZ = Infinity
		let maxZ = -Infinity
		for (let i = 0; i < array.length; i += 3) {
			const z = array[i + 2]
			if (z < minZ) minZ = z
			if (z > maxZ) maxZ = z
		}
		const depthSpan = maxZ - minZ || 1

		for (let i = 0; i < array.length; i += 3) {
			const x = array[i]
			const y = array[i + 1]
			const z = array[i + 2]
			const t = (z - minZ) / depthSpan
			const s = 1 - (1 - topScale) * t
			array[i] = x * s
			array[i + 1] = y * s
		}

		// 3) Concave top dish using an elliptical paraboloid
		// Only affect vertices close to the top surface
		const topThreshold = maxZ - depth * 0.35
		const a = (width * topScale * dishRadiusScale) / 2
		const b = (height * topScale * dishRadiusScale) / 2
		const a2 = a * a
		const b2 = b * b

		for (let i = 0; i < array.length; i += 3) {
			const x = array[i]
			const y = array[i + 1]
			const z = array[i + 2]
			if (z >= topThreshold) {
				const r2 = (x * x) / a2 + (y * y) / b2
				if (r2 <= 1.0) {
					// Paraboloid: zOffset = -dishDepth * (1 - r2)
					const zOffset = -dishDepth * (1 - r2)
					array[i + 2] = z + zOffset
				}
			}
		}

		pos.needsUpdate = true
		base.computeVertexNormals()
		base.computeBoundingBox()
		base.computeBoundingSphere()
		const maxZComputed = base.boundingBox ? base.boundingBox.max.z : depth / 2
		return { geometry: base as unknown as BufferGeometry, frontZ: maxZComputed }
	}, [
		width,
		height,
		depth,
		cornerRadius,
		bevel,
		bevelSegments,
		topScale,
		dishDepth,
		dishRadiusScale,
		curveSegments
	])
}

export default useKeycapGeometry


