import React from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export const Arena = () => {
  // Court dimensions (approximate NBA size: 94ft x 50ft = ~28.65m x 15.24m)
  const courtWidth = 28.65;
  const courtHeight = 15.24;

  return (
    <group>
      {/* Court floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
        <planeGeometry args={[courtWidth, courtHeight]} />
        <meshStandardMaterial
          color="#d2b48c" // Wood-like tan color
          roughness={0.15} // Shiny wood floor
          metalness={0.05}
        />
      </mesh>

      {/* NBA Court Markings */}
      {/* 3-Point Line (Simplified arc) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -7.1]}>
        <ringGeometry args={[6.7, 6.75, 64, 1, 0, Math.PI]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Mid Court Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={[courtWidth, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Free Throw Line */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -2.5]}>
        <planeGeometry args={[4.8, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Arena environment: basic dark room/stadium effect */}
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050505" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
