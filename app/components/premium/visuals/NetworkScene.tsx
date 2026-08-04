"use client"

import { useMemo, useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Line } from "@react-three/drei"
import * as THREE from "three"
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion"

function NodeSphere({
  position,
  color,
  size = 0.12,
}: {
  position: [number, number, number]
  color: string
  size?: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const s = 1 + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.08
    ref.current.scale.setScalar(s)
  })
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.7}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  )
}

function NetworkMesh() {
  const group = useRef<THREE.Group>(null)

  const nodes = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2
      const r = 1.4 + (i % 3) * 0.35
      pts.push([Math.cos(a) * r, (i % 5) * 0.18 - 0.4, Math.sin(a) * r * 0.7])
    }
    pts.push([0, 0.2, 0])
    return pts
  }, [])

  const lines = useMemo(() => {
    const hub = nodes[nodes.length - 1]
    return nodes.slice(0, -1).map((p) => [hub, p] as [[number, number, number], [number, number, number]])
  }, [nodes])

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.12
  })

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
        {nodes.map((p, i) => (
          <NodeSphere
            key={i}
            position={p}
            color={i === nodes.length - 1 ? "#137fec" : i % 3 === 0 ? "#22d3ee" : "#60a5fa"}
            size={i === nodes.length - 1 ? 0.22 : 0.09}
          />
        ))}
        {lines.map((pts, i) => (
          <Line
            key={i}
            points={pts}
            color="#137fec"
            lineWidth={1}
            transparent
            opacity={0.35}
          />
        ))}
      </Float>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 2, 2]} intensity={1.2} color="#137fec" />
      <pointLight position={[-2, -1, 3]} intensity={0.6} color="#22d3ee" />
    </group>
  )
}

export default function NetworkScene({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div
        className={className}
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(19,127,236,0.25), transparent 60%)",
        }}
      />
    )
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.6, 4.2], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <NetworkMesh />
        </Suspense>
      </Canvas>
    </div>
  )
}
