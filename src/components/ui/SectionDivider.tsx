'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

interface SectionDividerProps {
  variant?: 'light' | 'dark';
}

export function SectionDivider({ variant = 'light' }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const lineColor =
    variant === 'dark'
      ? 'from-transparent via-white/15 to-transparent'
      : 'from-transparent via-brand/15 to-transparent';

  const dotColor = variant === 'dark' ? 'bg-white/25' : 'bg-brand/25';

  return (
    <div ref={ref} className="relative flex items-center justify-center py-1">
      {/* Animated gradient line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full h-px bg-gradient-to-r ${lineColor}`}
      />

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`absolute w-1.5 h-1.5 rounded-full ${dotColor}`}
      />
    </div>
  );
}

export default SectionDivider;
