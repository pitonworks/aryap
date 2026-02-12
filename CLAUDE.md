# Aryap Mutahitlik & Emlak - Website Projesi

## Proje Aciklamasi
Aryap Mutahitlik ve Emlak firmasi icin modern, interaktif bir websitesi. Koyu temali, altin/amber aksanli premium tasarim.

## Workspace
- **Framework**: Next.js 14+ (App Router) + TypeScript
- **Styling**: Tailwind CSS 3.x (koyu tema + altin aksanlar)
- **i18n**: next-intl (Turkce + Ingilizce)
- **Harita**: Mapbox GL JS + react-map-gl
- **360 Tur**: Photo Sphere Viewer
- **Animasyon**: Framer Motion (motion)
- **Ikonlar**: lucide-react
- **Paket Yoneticisi**: pnpm

## Temel Komutlar
```bash
pnpm dev          # Development server (localhost:3000)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm start        # Production server
```

## Dizin Yapisi
```
src/
  app/[locale]/        # Next.js App Router (locale-based routing)
  components/          # Ortak componentler
  data/                # Mock data (projeler, takim, iletisim)
  lib/                 # Utility fonksiyonlar
  messages/            # i18n ceviri dosyalari (tr.json, en.json)
```

## Conventions
- Turkce ve Ingilizce dil destegi zorunlu (next-intl)
- Tum sayfalarda koyu tema (#0a0a0a, #1a1a1a) + altin aksanlar (#d4a853)
- Component isimleri PascalCase, dosya isimleri kebab-case
- Tailwind utility-first yaklasim, custom CSS minimize
- Responsive-first tasarim (mobile-first)
- Image optimization icin next/image kullan

## Referans Dizinleri
- `aryap-tasks/` — Task tracking sistemi
- `aryap-config/` — Proje conventions ve workflow
- `aryap-docs/` — Memory ve changelog
- `aryap-plans/` — Uygulama planlari
