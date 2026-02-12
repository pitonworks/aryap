# Aryap Mutahitlik & Emlak

## Proje
Aryap Mutahitlik ve Emlak firmasi icin modern, interaktif websitesi. Acik/beyaz tema, brand mavi-teal (#1B3A4B) renk paleti.

- **GitHub**: https://github.com/pitonworks/aryap

## Slash Commandlar

| Command | Ne yapar |
|---------|----------|
| `/cold-start` | Session baslangici — projeyi oku, durumu raporla |
| `/git-full` | Stage, commit, push — task durumlarini guncelle |
| `/local-testing` | Tum servisleri ayaga kaldir ve dogrula |
| `/turn-off` | Session notu yaz, tasklari isaretle, push, kapat |

---

## Mevcut Durum

**Progress**: Phase 4 tamamlandi — Site canli, tum sayfalar calisiyor.

> Her yeni session'da `aryap-tasks/task-index.md` oku veya `/cold-start` calistir.

---

## Workspace

```
src/
  app/[locale]/        # Next.js App Router (locale-based routing)
    about/             # Hakkimizda sayfasi
    contact/           # Iletisim sayfasi
    map/               # Proje haritasi (Mapbox)
    projects/          # Proje listesi + detay
    virtual-tour/      # 360 sanal tur
  components/          # UI, layout, sections, map, tour
  data/                # Mock data (projeler, takim, iletisim, turlar)
  lib/                 # Utility fonksiyonlar
  messages/            # i18n ceviri dosyalari (tr.json, en.json)
```

## Temel Komutlar

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm start        # Production server
```

---

## Code Conventions (Kisa)

- **TypeScript**: strict, `any` minimize
- **Dosya**: Component PascalCase, diger kebab-case
- **Renk Paleti**: brand (#1B3A4B), accent (#E8A838), neutral grays, beyaz arkaplan
- **Font**: Poppins (heading + body)
- **Commit**: `feat(TASK-XXX): aciklama` + `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`

Detaylar → `aryap-config/conventions.md`

## Parallel Agent Orchestration

Birden fazla sub-agent paralel calistirilirken:
- Her agent sadece kendi modul dizininde dosya duzenler (dizin izolasyonu)
- Paket kurulumu sadece ana agent (orchestrator) tarafindan yapilir
- Paylasilan dosyalarda retry pattern uygulanir
- Bagimli task'lar sirali, bagimsiz olanlar paralel calistirilir

Detaylar → `aryap-config/agent-instructions.md`

---

## Referans Dizinleri

| Dizin | Icerik |
|-------|--------|
| `aryap-tasks/` | Task takip — dashboard + tum task'lar |
| `aryap-tasks/task-index.md` | Master task listesi |
| `aryap-tasks/phases/` | Phase bazli detayli task aciklamalari |
| `aryap-tasks/active/session-notes.md` | Session notlari |
| `aryap-config/workflow.md` | Task workflow kurallari |
| `aryap-config/conventions.md` | Kod standartlari |
| `aryap-config/tech-stack.md` | Teknolojiler + versiyonlar |
| `aryap-config/agent-instructions.md` | Sub-agent sorumluluklari |
| `aryap-docs/MEMORY.md` | Kalici hafiza |
| `aryap-docs/CHANGELOG.md` | Degisiklik kaydi |
| `aryap-plans/` | Uygulama planlari |

---

## Hooks (Otomatik Kurallar)

| Hook | Tetikleyici | Ne yapar |
|------|------------|----------|
| `protect-files.sh` | PreToolUse (Edit/Write) | .env, lock files, .git/ duzenlemeyi bloklar |

---

## Notlar

- Hafiza dosyasi `aryap-docs/MEMORY.md`'de — her session'da oku, gerektiginde guncelle
- Sirket: Eskisehir/Bursa merkezli, 2005'te kurulmus
- 8 gercek proje: Lotus, Mest, Ozone, Zeydanlar, Nefes, Vitrin, Camlica 144, Konfor
