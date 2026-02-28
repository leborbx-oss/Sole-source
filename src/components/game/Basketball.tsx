import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGameState } from './GameEngine';

export const Basketball = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { ballPos } = useGameState();

  useFrame(() => {
    if (meshRef.current) {
        // meshRef.current.position.set(...) would be physics-driven
    }
  });

  return (
    <mesh ref={meshRef} castShadow receiveShadow position={ballPos}>
      {/* High-poly basketball (128 segments for ultra-smooth curve) */}
      <sphereGeometry args={[0.12, 128, 128]} />
      <meshStandardMaterial
        color="#ee6730" // NBA ball orange
        roughness={0.8}
        metalness={0.05}
      />
    </mesh>
  );
};
