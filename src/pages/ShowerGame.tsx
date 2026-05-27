import React, { Suspense, useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float, MeshDistortMaterial, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';
import * as THREE from 'three';

const WATER_PARTICLE_COUNT = 300;

// Audio Controller using Web Audio API for procedural ASMR
class ASMRController {
  private audioContext: AudioContext | null = null;
  private noiseSource: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private initialized = false;

  init() {
    if (this.initialized) return;
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create white noise
    const bufferSize = 2 * this.audioContext.sampleRate;
    const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    this.noiseSource = this.audioContext.createBufferSource();
    this.noiseSource.buffer = noiseBuffer;
    this.noiseSource.loop = true;

    // Filter noise to sound like water
    this.filterNode = this.audioContext.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.value = 1000;
    this.filterNode.Q.value = 1;

    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = 0;

    this.noiseSource.connect(this.filterNode);
    this.filterNode.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);

    this.noiseSource.start();
    this.initialized = true;
  }

  setIntensity(intensity: number, frequency: number) {
    if (!this.gainNode || !this.filterNode || !this.audioContext) return;

    const now = this.audioContext.currentTime;
    this.gainNode.gain.setTargetAtTime(intensity * 0.15, now, 0.1);
    this.filterNode.frequency.setTargetAtTime(800 + (frequency * 1200), now, 0.1);
  }

  stop() {
    if (!this.gainNode || !this.audioContext) return;
    const now = this.audioContext.currentTime;
    this.gainNode.gain.setTargetAtTime(0, now, 0.05);
  }

  resume() {
    if (this.audioContext?.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  destroy() {
    if (this.audioContext) {
      this.audioContext.close();
      this.initialized = false;
    }
  }
}

const asmr = new ASMRController();

const WaterParticles = ({ parentRef, active }: { parentRef: React.RefObject<THREE.Group | null>, active: boolean }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    return Array.from({ length: WATER_PARTICLE_COUNT }).map(() => ({
      position: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      life: Math.random()
    }));
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!meshRef.current || !parentRef.current) return;

    if (!active) {
      asmr.setIntensity(0, 0);
      meshRef.current.visible = false;
      return;
    }

    meshRef.current.visible = true;
    const showerPos = new THREE.Vector3();
    parentRef.current.getWorldPosition(showerPos);

    // Audio modulation based on position
    const frequency = Math.min(1, Math.max(0, (showerPos.y + 2) / 4));
    asmr.setIntensity(1.0, frequency);

    particles.forEach((p, i) => {
      p.life -= delta * 0.5;

      if (p.life <= 0) {
        p.life = 1;
        p.position.set(
          showerPos.x + (Math.random() - 0.5) * 0.2,
          showerPos.y - 0.1,
          showerPos.z + (Math.random() - 0.5) * 0.2
        );
        p.velocity.set(
          (Math.random() - 0.5) * 0.05,
          -Math.random() * 5 - 2,
          (Math.random() - 0.5) * 0.05
        );
      }

      p.velocity.y -= 9.8 * delta;
      p.position.addScaledVector(p.velocity, delta);

      if (p.position.y < -2.5) {
        p.life = 0;
      }

      dummy.position.copy(p.position);
      dummy.scale.setScalar(p.life * 0.05);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, WATER_PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#7dd3fc" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const ShowerHead = ({ isWaterOn }: { isWaterOn: boolean }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport, mouse } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;

    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;

    meshRef.current.position.lerp(new THREE.Vector3(x, y + 1.5, 1), 0.1);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -Math.PI / 4, 0.1);
  });

  return (
    <>
      <group ref={meshRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.5, 16]} />
          <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.25, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.15, 0.1, 32]} />
          <meshStandardMaterial color="#aaa" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      <WaterParticles parentRef={meshRef} active={isWaterOn} />
    </>
  );
};

const TargetObject = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color="#ffcc00"
          speed={2}
          distort={0.3}
          radius={1}
        />
      </mesh>
    </Float>
  );
};

const Scene = ({ isWaterOn }: { isWaterOn: boolean }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <spotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={2} />

      <TargetObject />
      <ShowerHead isWaterOn={isWaterOn} />

      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={5}
      />
      <Environment preset="apartment" />
    </>
  );
};

export const ShowerGame = () => {
  const [isWaterOn, setIsWaterOn] = useState(false);

  useEffect(() => {
    return () => {
      asmr.destroy();
    };
  }, []);

  const toggleWater = () => {
    asmr.init();
    asmr.resume();
    setIsWaterOn(!isWaterOn);
  };

  return (
    <div className="h-screen w-full bg-gradient-to-b from-neutral-800 to-neutral-900 pt-20 flex flex-col overflow-hidden touch-none">
      <div className="flex-grow relative cursor-crosshair">
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Scene isWaterOn={isWaterOn} />
          </Suspense>
        </Canvas>

        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-display text-4xl tracking-tighter"
          >
            ASMR SHOWER
          </motion.h1>
          <p className="text-white/60 text-xs tracking-[0.3em] uppercase mt-2">Satisfying Sensory Experience</p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4">
          <button
            onClick={toggleWater}
            aria-label={isWaterOn ? "Turn off water" : "Turn on water"}
            aria-pressed={isWaterOn}
            className={`px-8 py-4 rounded-full backdrop-blur-md transition-all font-bold text-xs tracking-widest uppercase border ${
              isWaterOn
                ? 'bg-blue-500 text-white border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
            }`}
          >
            {isWaterOn ? 'Water On' : 'Water Off'}
          </button>
          <button
            onClick={() => window.location.reload()}
            aria-label="Reset game"
            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all font-bold text-xs tracking-widest uppercase border border-white/20"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowerGame;
