# Aktif Session Notlari

## Tarih: 2026-02-25

### Yapilan Isler
- Turkce karakter son duzeltmeleri (Eskisehir→Eskişehir, Tepebasi→Tepebaşı, Gokmeydan→Gökmeydan)
- FeaturedProjects ve InsightsSection'a guclu golgeleme eklendi
- StatsSection olusturuldu — animated count-up, dark bg, grid overlay
- ProcessSection olusturuldu — 4 adim kartlari, numarali daireler, dotted connector
- globals.css'e btn-primary, btn-secondary, btn-brand, filter-tab shadow sistemi eklendi
- Performance optimizasyonu: dynamic imports, AVIF/WebP, 30 gun cache
- Homepage eksikleri giderildi: InsightsSection geri eklendi, tum sectionlara shadow takviyesi
- useDragScroll hook olusturuldu — mouse drag + touch swipe + momentum physics
- FeaturedProjects ve InsightsSection'a drag-to-scroll + scroll progress bar eklendi
- Ic sayfa kontrolu: Map ve Virtual Tour'daki eski glassmorphic siniflar temizlendi
- GlassCard, Card, Button, ProjectShowcase bilesenlerindeki eski siniflar guncellendi
- useDragScroll yeniden yazildi — yumusak momentum (4 sample ortalama, max hiz siniri, yuksek friction)
- ProcessSection icon hover efekti kaldirildi

### Yarim Kalan Isler
- Yok — tum istenen duzeltmeler tamamlandi

### Bir Sonraki Session
- Kullanici feedback'e gore ince tasarim ayarlari
- next-intl deprecation uyarisi cozumu (i18n.ts → i18n/request.ts)
- Gercek proje gorselleri ve partner logolari eklenmesi
- SEO meta tag'leri ve Open Graph optimizasyonu
- Production deploy hazirlik (Vercel/hosting)

### Dikkat Edilecek Noktalar
- `.next` cache silinince ilk compile ~130 saniye suruyor (normal)
- GlassCard, Card, Button, ProjectShowcase bileşenleri hicbir yerde import edilmiyor — ileride temizlenebilir
- next-intl deprecation uyarilari devam ediyor (fonksiyonel etki yok)
- Dev server `http://localhost:3000` uzerinde calisiyor
