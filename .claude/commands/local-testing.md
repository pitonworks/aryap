Local dev ortamini ayaga kaldir ve tum servisleri dogrula:

0. **Port temizligi** (ONCELIKLI):
   - Eski process'leri kontrol et ve temizle

1. **Build kontrolu**:
   - `pnpm build` calistir
   - Hata varsa raporla

2. **Lint kontrolu**:
   - `pnpm lint` calistir
   - Uyari/hata varsa listele

3. **TypeScript kontrolu**:
   - `npx tsc --noEmit` calistir

4. **Sayfa kontrolleri**:
   - Dev server calistir
   - Ana sayfa (/tr, /en) yukluyor mu?
   - Tum sayfalar 200 donuyor mu?
   - Dil degisimi calisiyor mu?

5. **Ozet rapor ver**:
   - Her servisin durumu (OK/FAIL)
   - Erisim URL'leri
   - "Test ortami hazir." veya bulunan hatalari bildir

NOT: Sunuculari arka planda baslatma — sadece build ve health check yap.
