"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import type * as THREE from "three"

interface PetMeshProps {
  petType: string
  mood: string
  size: string
  animation?: string
  onClick?: () => void
}

function PetMesh({ petType, mood, size, animation, onClick }: PetMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Get size multiplier
  const getSizeMultiplier = () => {
    switch (size) {
      case "baby":
        return 0.6
      case "young":
        return 0.8
      case "adult":
        return 1.0
      case "elder":
        return 1.2
      default:
        return 1.0
    }
  }

  // Get pet color based on type
  const getPetColor = () => {
    switch (petType) {
      case "dog":
        return "#8B4513" // Brown
      case "cat":
        return "#FFA500" // Orange
      case "panda":
        return "#000000" // Black
      case "penguin":
        return "#000000" // Black
      case "bunny":
        return "#FFFFFF" // White
      case "hamster":
        return "#DEB887" // Burlywood
      default:
        return "#8B4513"
    }
  }

  // Get mood-based animation
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()
    const sizeMultiplier = getSizeMultiplier()

    // Base scale
    meshRef.current.scale.setScalar(sizeMultiplier)

    // Mood-based animations
    if (mood === "happy" || mood === "excited") {
      meshRef.current.position.y = Math.sin(time * 2) * 0.1
      meshRef.current.rotation.z = Math.sin(time * 4) * 0.1
    } else if (mood === "sad") {
      meshRef.current.position.y = -0.1
      meshRef.current.rotation.x = 0.2
    } else if (mood === "sleeping") {
      meshRef.current.rotation.z = Math.PI / 6
      meshRef.current.position.y = -0.2
    }

    // Animation overrides
    if (animation === "bounce") {
      meshRef.current.position.y = Math.abs(Math.sin(time * 8)) * 0.3
    } else if (animation === "wiggle") {
      meshRef.current.rotation.y = Math.sin(time * 10) * 0.3
    }

    // Hover effect
    if (hovered) {
      meshRef.current.scale.setScalar(sizeMultiplier * 1.1)
    }
  })

  // Create pet geometry based on type
  const createPetGeometry = () => {
    switch (petType) {
      case "dog":
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <capsuleGeometry args={[0.3, 0.6, 4, 8]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.5, 0.2]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            {/* Ears */}
            <mesh position={[-0.15, 0.7, 0.1]} rotation={[0, 0, -0.5]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            <mesh position={[0.15, 0.7, 0.1]} rotation={[0, 0, 0.5]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            {/* Tail */}
            <mesh position={[0, 0.2, -0.4]} rotation={[0.5, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.08, 0.3, 8]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.08, 0.55, 0.35]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.08, 0.55, 0.35]}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Nose */}
            <mesh position={[0, 0.45, 0.4]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        )

      case "cat":
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <capsuleGeometry args={[0.25, 0.5, 4, 8]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.4, 0.2]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            {/* Ears - pointed */}
            <mesh position={[-0.12, 0.55, 0.1]}>
              <coneGeometry args={[0.06, 0.15, 6]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            <mesh position={[0.12, 0.55, 0.1]}>
              <coneGeometry args={[0.06, 0.15, 6]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            {/* Tail - long and curved */}
            <mesh position={[0, 0.3, -0.4]} rotation={[0.8, 0, 0]}>
              <cylinderGeometry args={[0.03, 0.05, 0.6, 8]} />
              <meshStandardMaterial color={getPetColor()} />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.06, 0.45, 0.3]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color="#00FF00" />
            </mesh>
            <mesh position={[0.06, 0.45, 0.3]}>
              <sphereGeometry args={[0.025, 8, 8]} />
              <meshStandardMaterial color="#00FF00" />
            </mesh>
            {/* Nose */}
            <mesh position={[0, 0.38, 0.35]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial color="#FF69B4" />
            </mesh>
          </group>
        )

      case "panda":
        return (
          <group>
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.35, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Head */}
            <mesh position={[0, 0.5, 0.2]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Ears - black */}
            <mesh position={[-0.15, 0.7, 0.1]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.15, 0.7, 0.1]}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Eye patches - black */}
            <mesh position={[-0.08, 0.55, 0.3]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.08, 0.55, 0.3]}>
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            {/* Eyes */}
            <mesh position={[-0.08, 0.55, 0.35]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            <mesh position={[0.08, 0.55, 0.35]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
            {/* Nose */}
            <mesh position={[0, 0.45, 0.4]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        )

      default:
        return createPetGeometry() // Default to dog
    }
  }

  return (
    <mesh
      ref={meshRef}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
      receiveShadow
    >
      {createPetGeometry()}
    </mesh>
  )
}

interface Realistic3DPetsProps {
  petType: string
  mood: string
  size: string
  interactive?: boolean
  animation?: string
  className?: string
}

export function Realistic3DPets({
  petType,
  mood,
  size,
  interactive = false,
  animation,
  className,
}: Realistic3DPetsProps) {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    if (interactive) {
      setClicked(true)
      setTimeout(() => setClicked(false), 1000)
    }
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 2], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.3} />

        <PetMesh
          petType={petType}
          mood={mood}
          size={size}
          animation={clicked ? "bounce" : animation}
          onClick={handleClick}
        />

        {interactive && (
          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 4} />
        )}

        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
