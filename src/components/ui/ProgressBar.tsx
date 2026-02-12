'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  label,
  className,
}: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div ref={ref} className={cn('w-full', className)}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-neutral-700 text-sm font-body">{label}</span>
          <span className="text-brand text-sm font-semibold">
            {clampedValue}%
          </span>
        </div>
      )}
      <div className="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${clampedValue}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-brand"
        />
      </div>
    </div>
  );
}
