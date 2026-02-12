# Aryap - Conventions

## Dosya Isimlendirme
- Component dosyalari: PascalCase (`HeroSection.tsx`)
- Utility dosyalari: camelCase (`formatDate.ts`)
- Sayfa dosyalari: Next.js App Router convention (`page.tsx`, `layout.tsx`)
- Style dosyalari: kebab-case (`globals.css`)

## Component Yapisi
- Her component kendi dizininde (gerektiginde)
- Props interface'i component dosyasinda tanimlanir
- "use client" sadece gerektiginde eklenir

## Styling
- Tailwind CSS utility-first
- Custom CSS sadece Tailwind ile yapilamayan durumlar icin
- Renk paleti: Tailwind config'de tanimli
- Dark theme varsayilan

## i18n
- Tum kullanici-gorunur text'ler ceviri dosyalarinda
- Namespace bazli organizasyon (common, home, about, projects, contact)
- Varsayilan dil: Turkce (tr)
