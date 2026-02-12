import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  showAccent?: boolean;
  id?: string;
}

export default function Section({
  children,
  title,
  subtitle,
  className,
  showAccent = true,
  id,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-20 md:py-28', className)}>
      {(title || subtitle) && (
        <div className="text-center mb-14">
          {showAccent && (
            <div className="w-12 h-1 bg-brand mx-auto mb-6 rounded-full" />
          )}
          {title && (
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-neutral-900 mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
