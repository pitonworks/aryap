'use client';

type ColorToken = 'white' | 'brand' | 'neutral';

const colorMap: Record<ColorToken, string> = {
  white: 'rgb(255, 255, 255)',
  brand: 'rgb(15, 38, 52)',      // brand-dark
  neutral: 'rgb(250, 250, 250)',  // neutral-50
};

interface SectionTransitionProps {
  from: ColorToken;
  to: ColorToken;
}

export function SectionTransition({ from, to }: SectionTransitionProps) {
  return (
    <div
      className="relative -my-12 md:-my-16 h-24 md:h-32 z-20 pointer-events-none"
      aria-hidden="true"
      style={{
        background: `linear-gradient(to bottom, ${colorMap[from]}, ${colorMap[to]})`,
      }}
    />
  );
}
