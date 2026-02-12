'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CardProps {
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  image,
  imageAlt = '',
  title,
  subtitle,
  className,
  onClick,
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
      className={cn(
        'bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl overflow-hidden shadow-glass',
        'hover:border-white/60 hover:shadow-glass-lg transition-all duration-300',
        onClick && 'cursor-pointer',
        className
      )}
    >
      {image && (
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src={image}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="font-heading text-xl text-neutral-900 mb-1">{title}</h3>
        )}
        {subtitle && (
          <p className="text-neutral-500 text-sm mb-4">{subtitle}</p>
        )}
        {children}
      </div>
    </motion.div>
  );
}
