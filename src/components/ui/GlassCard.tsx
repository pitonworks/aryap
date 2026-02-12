'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  variant?: 'glass' | 'solid' | 'dark';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<string, string> = {
  glass: 'bg-white/70 backdrop-blur-xl border border-white/40 shadow-glass',
  solid: 'bg-white/90 backdrop-blur-xl border border-neutral-200/60 shadow-soft',
  dark: 'bg-brand-dark/80 backdrop-blur-xl border border-white/10 shadow-glass',
};

const paddingStyles: Record<string, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function GlassCard({
  children,
  variant = 'glass',
  hover = false,
  padding = 'md',
  className,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        'rounded-3xl',
        variantStyles[variant],
        paddingStyles[padding],
        hover && 'hover:shadow-glass-lg hover:border-white/60 transition-all duration-300',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  );
}
