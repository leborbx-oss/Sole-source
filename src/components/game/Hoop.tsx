import React from 'react';
import * as THREE from 'three';

export const Hoop = () => {
  return (
    <group position={[0, 3.05, -7.5]}> {/* NBA Rim Height: 10ft = 3.05m */}
      {/* Backboard */}
      <mesh position={[0, 0.5, -0.05]}>
        <boxGeometry args={[1.8, 1.05, 0.05]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.6} roughness={0.1} />
      </mesh>

      {/* Rim */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.4]}>
        <torusGeometry args={[0.225, 0.015, 16, 32]} />
        <meshStandardMaterial color="#FF4500" />
      </mesh>

      {/* Post */}
      <mesh position={[0, -1.52, -0.6]}>
        <boxGeometry args={[0.2, 3.05, 0.2]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  );
};
