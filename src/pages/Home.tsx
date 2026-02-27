import React from 'react';
import { motion } from 'motion/react';
import { FightingGame } from '../components/FightingGame';

export const Home = () => {
  return (
    <div className="pt-20 bg-neutral-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-7xl md:text-9xl text-white leading-none tracking-tighter mb-6">
              ULTRA <br />
              <span className="text-neon-green">PRECISION</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Experience the world's first fighting game running with 10,000 logic updates per second.
              Sub-millisecond input precision for the ultimate competitive experience.
            </p>
          </motion.div>

          <FightingGame />
        </div>

        {/* Floating Text */}
        <div className="absolute bottom-10 right-0 overflow-hidden whitespace-nowrap pointer-events-none opacity-5">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="font-display text-[20vh] text-white leading-none"
          >
            10000 FPS • HIGH PRECISION • ZERO LAG • ULTRA RESPONSIVE • COMPETITIVE •
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <h3 className="text-neon-green font-display text-3xl mb-4">10K LOGIC UPS</h3>
              <p className="text-neutral-400">Our custom engine processes 10,000 logic steps every second, ensuring every frame is perfectly calculated.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <h3 className="text-neon-green font-display text-3xl mb-4">SUB-MS LATENCY</h3>
              <p className="text-neutral-400">Inputs are sampled at ultra-high frequency, virtually eliminating input lag for pro-level play.</p>
            </div>
            <div className="p-8 border border-white/10 rounded-2xl bg-white/5">
              <h3 className="text-neon-green font-display text-3xl mb-4">CANVAS DRIVEN</h3>
              <p className="text-neutral-400">Hardware accelerated rendering using HTML5 Canvas for smooth visual performance across all devices.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
