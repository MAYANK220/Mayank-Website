'use client';

import { motion, MotionValue, useTransform } from 'framer-motion';

interface OverlayProps {
  progress: MotionValue<number>;
}

export default function Overlay({ progress }: OverlayProps) {
  // Section 1: Hero (0% to 15%) - Fades out before Section 2 starts
  const opacity1 = useTransform(progress, [0, 0.1, 0.15, 1], [1, 1, 0, 0]);
  const y1 = useTransform(progress, [0, 0.15, 1], [0, -50, -50]);

  // Section 2: Patterns (25% to 40%) - Isolated from Section 1 and 3
  const opacity2 = useTransform(progress, [0, 0.2, 0.25, 0.35, 0.4, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(progress, [0, 0.2, 0.4, 1], [50, 50, -50, -50]);

  // Section 3: Gamer, Builder, Thinker (50% to 65%)
  const opacity3 = useTransform(progress, [0, 0.45, 0.5, 0.6, 0.65, 1], [0, 0, 1, 1, 0, 0]);
  const y3 = useTransform(progress, [0, 0.45, 0.65, 1], [50, 50, -50, -50]);

  // Section 4: Mindset (75% to 100%)
  const opacity4 = useTransform(progress, [0, 0.7, 0.75, 1], [0, 0, 1, 1]);
  const y4 = useTransform(progress, [0, 0.7, 1], [50, 50, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-6 md:px-24 text-white z-20">
      
      {/* Section 1 - Center */}
      <motion.div 
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Mayank Sharma
        </h1>
        <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide">
          I don&apos;t follow systems. I build my own.
        </p>
      </motion.div>

      {/* Section 2 - Left */}
      <motion.div 
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col items-start justify-center text-left px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
          I see patterns before they exist.
        </h2>
      </motion.div>

      {/* Section 3 - Right */}
      <motion.div 
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col items-end justify-center text-right px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4 max-w-3xl">
          Gamer. Builder. Strategic thinker.
        </h2>
        <p className="text-xl md:text-2xl text-neutral-400 font-light mt-2 max-w-lg">
          I don&apos;t just play the game — I understand it.
        </p>
      </motion.div>

      {/* Section 4 - Center fade-in */}
      <motion.div 
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 md:px-24"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-white bg-clip-text text-transparent max-w-5xl">
          I play to win. Not just the game — the thinking behind it.
        </h2>
        <p className="text-neutral-400 font-medium uppercase mt-4 tracking-[0.3em] text-sm">
          Chess. Code. Decisions. Same mindset.
        </p>
      </motion.div>

    </div>
  );
}
