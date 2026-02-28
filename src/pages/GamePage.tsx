import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars, ContactShadows } from '@react-three/drei';
import { GameEngine } from '../components/game/GameEngine';
import { Arena } from '../components/game/Arena';
import { Player } from '../components/game/Player';
import { Basketball } from '../components/game/Basketball';
import { Hoop } from '../components/game/Hoop';
import { Lights } from '../components/game/Lights';
import { motion } from 'motion/react';
import { useGameState, GameLoopProxy } from '../components/game/GameEngine';

const GameScore = () => {
  const { score } = useGameState();
  return (
    <div className="bg-black/80 p-4 border-l-4 border-brand-red">
        <div className="text-[10px] text-brand-red font-bold tracking-widest uppercase">Score</div>
        <div className="text-2xl font-display text-white">{score} PTS</div>
    </div>
  );
};

export const GamePage = () => {
  return (
    <div className="pt-20 h-screen bg-black overflow-hidden flex flex-col">
      <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex justify-between items-center z-10">
        <div>
          <h1 className="font-display text-2xl text-neon-green tracking-tighter">FPS FIGHTER | NBA EDITION</h1>
          <p className="text-zinc-500 text-xs">USE WASD TO MOVE • PHYSICS 10,000 UPS • 1,000,000 POLYGON TARGET</p>
        </div>
        <div className="flex gap-4">
            <div className="bg-black/50 px-3 py-1 rounded border border-white/10 text-[10px] text-white/50">
                STADIUM: MADISON SQUARE GARDEN (REPLICA)
            </div>
            <div className="bg-black/50 px-3 py-1 rounded border border-white/10 text-[10px] text-white/50">
                DIFFICULTY: ADAPTIVE
            </div>
        </div>
      </div>

      <div className="flex-grow relative">
        <GameEngine>
        <Canvas
          shadows
          camera={{ position: [0, 5, 12], fov: 45 }}
          gl={{ antialias: true, stencil: true, depth: true }}
        >
          <Suspense fallback={null}>
              <Arena />
              <Player />
              <Basketball />
              <Hoop />
              <Lights />
              {/* GameLoopProxy must be inside Canvas */}
              <GameLoopProxy />

              <OrbitControls
                makeDefault
                maxPolarAngle={Math.PI / 2.1}
                minDistance={5}
                maxDistance={30}
              />

              <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

              <ContactShadows
                resolution={1024}
                scale={30}
                blur={2}
                opacity={0.35}
                far={10}
                color="#000000"
              />
          </Suspense>
        </Canvas>

        {/* UI Overlay */}
        <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col gap-4 pointer-events-none">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-black/80 p-4 border-l-4 border-neon-green"
            >
                <div className="text-[10px] text-neon-green font-bold tracking-widest uppercase">Performance</div>
                <div className="text-2xl font-display text-white">1000 FPS</div>
                <div className="text-[10px] text-white/50">ULTRA HIGH DETAIL</div>
            </motion.div>

            <Suspense fallback={null}>
                <GameScore />
            </Suspense>
        </div>
        </GameEngine>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            <button className="bg-white text-black px-6 py-2 font-bold text-xs tracking-widest hover:bg-neon-green transition-colors uppercase">
                Instant Replay
            </button>
            <button className="border border-white text-white px-6 py-2 font-bold text-xs tracking-widest hover:bg-white hover:text-black transition-colors uppercase">
                Switch Camera
            </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
