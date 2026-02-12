# Changelog

## [1.1.0] - 2026-02-12
### Changed
- Glassmorphic UI/UX transformation: backdrop-blur, yari-seffaf kartlar, buzlu cam efektleri
- Yeni design system token'lari: glass shadow'lar, 4xl/5xl radius, shimmer/float animasyonlari
- Mobile-first bottom navigation bar (Home, Projects, Map, Tour, Contact)
- Hero section: mimarlik gorseli + glass overlay tasarim
- Featured Projects: mobilde horizontal scroll, glass kartlar, info icon'lar
- Stats/CTA/WhyUs section'lari glass container'lar ile yenilendi
- Tum ic sayfalar glassmorphic styling: filter-pill, info-chip, glass-input, status-badge
- MapView ve PanoramaViewer glass container'lar
- Header/Footer glass treatment, gradient background
- @supports fallback (backdrop-filter desteklemeyen browserlar icin)

### Added
- `src/components/ui/GlassCard.tsx` — Reusable glass card (glass/solid/dark variants)
- `src/components/layout/BottomNav.tsx` — Mobile bottom nav, animated active indicator
- Yeni Button variant'lari: `glass`, `accent`

## [1.0.0] - 2026-02-12
### Added
- Phase 0: Proje yapisi, CLAUDE.md, task tracking, config dosyalari, slash commands
- Phase 1: Next.js 14 App Router, Tailwind CSS 3, next-intl (TR/EN), layout (Header/Footer), ortak componentler, fontlar
- Phase 2: Homepage (Hero, Featured Projects, Stats, WhyUs, CTA), About, Projects (filtreleme), Project Detail, Contact, 404, Loading
- Phase 3: Mapbox GL harita entegrasyonu (demo mode destegi), Photo Sphere Viewer 360 sanal tur, Virtual Tour sayfasi
- Phase 4: SEO meta tags, sitemap.xml, robots.txt, responsive tasarim, build optimizasyonu
