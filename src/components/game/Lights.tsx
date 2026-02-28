import React from 'react';

export const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.4} />

      {/* Overhead arena lights (directional, simulating stadium floodlights) */}
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      <directionalLight
        position={[-10, 20, -10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />

      {/* Spotlight for dramatic effect (e.g., center court or following ball) */}
      <spotLight
        position={[0, 15, 0]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Rim light for player highlights */}
      <pointLight
        position={[0, 5, 0]}
        intensity={0.8}
        distance={20}
        color="#ffffff"
      />
    </>
  );
};
