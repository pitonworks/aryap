# Local Testing - Aryap Projesi

Yerel test suite'ini calistir:

1. **Lint kontrolu**: `pnpm lint`
2. **Build testi**: `pnpm build`
3. **TypeScript kontrolu**: `npx tsc --noEmit`
4. **Sayfa kontrolleri**:
   - Ana sayfa (/) yukluyor mu?
   - Dil degisimi (/tr, /en) calisiyor mu?
   - Tum sayfalar 404 vermiyor mu?
5. **Responsive kontrol**: Mobil gorunumlerde bozukluk var mi?
6. Sonuclari raporla ve hatalari listele
