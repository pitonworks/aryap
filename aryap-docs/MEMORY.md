# Aryap - Project Memory

## Proje Bilgileri
- Firma: Aryap Mutahitlik & Emlak (Eskisehir/Bursa, 2005)
- Website: Modern, interaktif, clean editorial tasarim
- Diller: Turkce (varsayilan) + Ingilizce
- Tema: Beyaz/acik arkaplan, brand (#1B3A4B), accent (#E8A838), neutral grays
- Font: Poppins (heading + body)
- 8 gercek proje: Lotus, Mest, Ozone, Zeydanlar, Nefes, Vitrin, Camlica 144, Konfor

## Teknik Kararlar
- Next.js 14 App Router + pnpm
- Tailwind CSS ile styling
- next-intl ile i18n ([locale] routing)
- Framer Motion animasyonlar icin
- Mapbox GL JS harita icin (token gerekli, demo mode destegi)
- Photo Sphere Viewer 360 tur icin
- Dynamic imports + AVIF/WebP + 30 gun cache (perf optimizasyonu)

## Onemli Notlar
- Mapbox token olmadan placeholder/demo mode gosterilmeli
- 360 tur icin ornek panorama gorselleri kullanilacak
- Tum mock data src/data/ altinda
- GlassCard, Card, Button, ProjectShowcase bilesenlerini hicbir sey import etmiyor — temizlenebilir
- next-intl deprecation uyarisi: i18n.ts → i18n/request.ts gecisi yapilmali
