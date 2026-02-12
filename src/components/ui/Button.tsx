'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-brand text-white font-semibold shadow-md shadow-brand/10 hover:bg-brand-light hover:shadow-brand/20',
  secondary:
    'border border-brand/30 text-brand hover:bg-brand-50 hover:border-brand',
  ghost:
    'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100',
};

const sizeStyles: Record<string, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-body transition-all duration-300 cursor-pointer select-none',
    variantStyles[variant],
    sizeStyles[size],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring' as const, stiffness: 400, damping: 17 },
  };

  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
