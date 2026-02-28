import React, { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameState } from './GameEngine';

export const Player = () => {
  const meshRef = useRef<THREE.Group>(null);
  const { playerPos } = useGameState();

  // Basic keyboard state tracking (for local player controls)
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

  useFrame(() => {
    if (meshRef.current) {
      // Sync player mesh with current position from state/ref (in a real app, this would be physics-driven)
      // playerPos is from the GameEngine (refs passed as state)
      // For visual feedback, using meshRef.current.position.set(...)
      // but it's more common to have the ref in GameEngine be used directly by the mesh
    }
  });

  return (
    <group ref={meshRef} position={playerPos}>
      {/* Human player model - Jersey/Torso */}
      <mesh castShadow receiveShadow position={[0, 1.1, 0]}>
        <capsuleGeometry args={[0.32, 0.8, 32, 64]} />
        <meshStandardMaterial color="#FF0000" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Human player model - Shorts */}
      <mesh castShadow receiveShadow position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.33, 0.33, 0.4, 32]} />
        <meshStandardMaterial color="#000000" roughness={0.6} />
      </mesh>

      {/* Human player model - Head (High detail skin) */}
      <mesh castShadow position={[0, 2.0, 0]}>
        <sphereGeometry args={[0.22, 128, 128]} />
        <meshStandardMaterial color="#D2B48C" roughness={0.3} metalness={0.05} />
      </mesh>

      {/* Arms (NBA length) */}
      <mesh position={[0.48, 1.3, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.08, 0.9, 16, 32]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      <mesh position={[-0.48, 1.3, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.08, 0.9, 16, 32]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>

      {/* Legs (NBA height) */}
      <mesh position={[0.15, 0.3, 0]}>
        <capsuleGeometry args={[0.1, 0.6, 16, 32]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
      <mesh position={[-0.15, 0.3, 0]}>
        <capsuleGeometry args={[0.1, 0.6, 16, 32]} />
        <meshStandardMaterial color="#D2B48C" />
      </mesh>
    </group>
  );
};
