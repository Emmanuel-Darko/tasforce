<template>
  <div>
    <div class="topbar no-print">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" width="24" height="24">
            <line x1="2" y1="5" x2="18" y2="5"/>
            <line x1="2" y1="10" x2="18" y2="10"/>
            <line x1="2" y1="15" x2="18" y2="15"/>
          </svg>
        </button>
        <h1 class="topbar-title">Membership Cards</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-crimson btn-sm" :disabled="!members.length" @click="printAll">
          🖨 Print All ({{ members.length }})
        </button>
      </div>
    </div>

    <div class="page-body">
      <p class="no-print ac-intro">View, print and manage membership cards for all active members.</p>

      <div v-if="loading" class="ac-loading">
        <div class="ac-spinner" />
        Loading cards…
      </div>

      <div v-else-if="!members.length" class="ac-empty-notice">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="9" x2="10" y2="14"/><circle cx="10" cy="6.5" r=".5" fill="currentColor"/></svg>
        No active members with cards yet. Approve some registrations first.
      </div>

      <div v-else class="ac-grid">
        <div v-for="m in members" :key="m.id" class="ac-card-tile">
          <div class="ac-preview-wrap">
            <div style="transform:scale(0.58);transform-origin:top center;margin-bottom:-92px;">
              <MembershipCard :member="m" />
            </div>
          </div>
          <div class="ac-card-meta">
            <div class="ac-card-id">{{ m.memberId }}</div>
            <div class="ac-card-name">{{ m.firstName }} {{ m.lastName }}</div>
            <button class="btn btn-crimson btn-sm ac-print-btn" @click="printSingle(m)">🖨 Print</button>
          </div>
        </div>
      </div>

      <!-- Hidden render pool -->
      <div id="hidden-card-pool" style="position:absolute;left:-9999px;top:0;visibility:hidden;pointer-events:none;">
        <div v-for="m in members" :key="`pool-${m.id}`" :id="`card-pool-${m.id}`">
          <MembershipCard :member="m" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth', 'admin'] })
const toggleSidebar = inject<() => void>('toggleSidebar')
const loading = ref(false)
const members = ref<any[]>([])

onMounted(async () => {
  loading.value = true
  try {
    const d: any = await $fetch('/api/admin/members', { params: { status: 'active', limit: 100 } })
    members.value = d.data
  } finally {
    loading.value = false
  }
})

// ── Shared print HTML builder ──────────────────────────────────────────────

function buildPrintHtml(cards: Array<{ frontHtml: string; backHtml: string; name: string; imgSrcMap: Record<string, string> }>) {
  const cardPages = cards.map(({ frontHtml, backHtml, name, imgSrcMap }) => `
    <div class="print-page">
      <div class="page-ornament">
        <div class="ornament-line"></div>
        <div class="ornament-crest">
          <span class="crest-icon">⚜</span>
          <span class="crest-text">TAS-FORCE OFFICIAL ID</span>
          <span class="crest-icon">⚜</span>
        </div>
        <div class="ornament-line"></div>
      </div>
      <div class="card-stage" data-src-map='${JSON.stringify(imgSrcMap)}'>
        ${frontHtml}
      </div>
      <div class="page-footer">
        <span class="footer-left">Front · ${name}</span>
        <span class="footer-center">tas-force.org</span>
        <span class="footer-right">Official Membership Card</span>
      </div>
    </div>

    <div class="print-page">
      <div class="page-ornament">
        <div class="ornament-line"></div>
        <div class="ornament-crest">
          <span class="crest-icon">⚜</span>
          <span class="crest-text">TAS-FORCE OFFICIAL ID</span>
          <span class="crest-icon">⚜</span>
        </div>
        <div class="ornament-line"></div>
      </div>
      <div class="card-stage" data-src-map='${JSON.stringify(imgSrcMap)}'>
        ${backHtml}
      </div>
      <div class="page-footer">
        <span class="footer-left">Back · ${name}</span>
        <span class="footer-center">tas-force.org/verify</span>
        <span class="footer-right">Scan QR to Verify</span>
      </div>
    </div>
  `).join('')

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>TAS-FORCE Membership Cards</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --crimson: #6B0F1A; --crimson2: #8B1A28; --crimson-deep: #2D0008;
      --crimson-mid: #4A0010; --gold: #C9A84C; --gold2: #E0C06A;
      --gold-dark: #9A7A2A; --gold-pale: #F5EDD0; --cream: #F5E6D0;
      --cream2: #EDD9BB; --parchment: #FAF5EE;
    }
    html, body { margin: 0; padding: 0; background: #1a0a0a; font-family: 'Crimson Pro', Georgia, serif; }

    .print-page {
      width: 210mm; min-height: 297mm;
      background: radial-gradient(ellipse at 50% 20%, #2a0a0a 0%, #0d0000 100%);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 20mm 15mm;
      page-break-after: always;
      position: relative;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .print-page::before {
      content: ''; position: absolute; inset: 8mm;
      border: 1px solid rgba(201,168,76,0.2); border-radius: 2px; pointer-events: none;
    }
    .print-page::after {
      content: ''; position: absolute; inset: 10mm;
      border: 1px solid rgba(201,168,76,0.08); border-radius: 2px; pointer-events: none;
    }

    .page-ornament { display: flex; align-items: center; gap: 16px; margin-bottom: 24mm; width: 100%; max-width: 170mm; }
    .ornament-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent); }
    .ornament-crest { display: flex; align-items: center; gap: 10px; white-space: nowrap; }
    .crest-icon { color: var(--gold); font-size: 14px; }
    .crest-text { font-family: 'Playfair Display', serif; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(201,168,76,0.85); }

    .card-stage { display: flex; align-items: center; justify-content: center; width: 420px; height: 270px; position: relative; }

    .page-footer { margin-top: 24mm; width: 100%; max-width: 170mm; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(201,168,76,0.2); padding-top: 4mm; }
    .page-footer span { font-size: 8px; letter-spacing: 0.1em; color: rgba(201,168,76,0.45); font-family: 'Crimson Pro', serif; }

    /* Card styles */
    .tf-card { width: 400px; height: 252px; border-radius: 16px; position: relative; font-family: 'Crimson Pro', serif; background: linear-gradient(135deg, #4A0010 0%, #6B0F1A 45%, #3D0000 100%); }
    .tf-card-texture { position: absolute; inset: 0; pointer-events: none; background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px); mix-blend-mode: overlay; }
    .tf-card-glow { position: absolute; inset: 0; pointer-events: none; background: radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.14) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.07) 0%, transparent 45%); }
    .tf-card-gold-bar { position: absolute; top: 0; left: 0; right: 0; height: 5px; border-radius: 16px 16px 0 0; background: linear-gradient(90deg, #7A5A1A, var(--gold2), var(--gold), var(--gold2), #7A5A1A); }
    .tf-card-content { position: relative; z-index: 2; padding: 18px 20px 14px; height: 100%; display: flex; flex-direction: column; }
    .tf-card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
    .tf-card-logo { display: flex; align-items: center; gap: 9px; }
    .tf-card-logo-circle { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-dark), var(--gold2)); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 11px; color: var(--crimson-deep); }
    .tf-card-org { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 15px; color: var(--cream); letter-spacing: 0.07em; line-height: 1; }
    .tf-card-tagline { font-size: 7px; color: rgba(201,168,76,0.75); letter-spacing: 0.05em; margin-top: 2px; }
    .tf-card-type-badge { background: rgba(201,168,76,0.25); border: 1px solid rgba(201,168,76,0.5); border-radius: 4px; padding: 4px 10px; }
    .tf-card-type-label { font-size: 8px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold2); font-weight: 700; }
    .tf-card-type-val { font-size: 9px; color: var(--cream); font-weight: 600; margin-top: 1px; text-transform: capitalize; }
    .tf-card-body { display: flex; gap: 14px; flex: 1; align-items: flex-start; }
    .tf-card-info { flex: 1; min-width: 0; }
    .tf-card-field { margin-bottom: 7px; }
    .tf-card-fl { font-size: 7.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(201,168,76,0.8); line-height: 1; }
    .tf-card-fv { font-size: 13px; color: var(--cream); font-weight: 600; line-height: 1.2; margin-top: 2px; }
    .tf-card-name { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--cream); margin: 8px 0 2px; line-height: 1; }
    .tf-card-since { font-size: 10px; color: rgba(245,230,208,0.45); }
    .tf-card-photo { width: 72px; height: 88px; border-radius: 8px; border: 2px solid rgba(201,168,76,0.55); flex-shrink: 0; background: rgba(201,168,76,0.1); display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .tf-card-photo img { width: 100%; height: 100%; object-fit: cover; }
    .tf-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(201,168,76,0.2); margin-top: auto; }
    .tf-card-website { font-size: 9px; color: rgba(201,168,76,0.55); letter-spacing: 0.08em; }

    /* Card: overflow visible so ribbon corner is never clipped */
    .tf-card { overflow: visible !important; }
    .tf-card-texture,
    .tf-card-glow,
    .tf-card-gold-bar,
    .tf-card-content { border-radius: 16px; overflow: hidden; }

    /* Ribbon */
    .tf-card-ribbon-wrap { position: absolute; bottom: 0; right: 0; width: 120px; height: 120px; overflow: visible; pointer-events: none; z-index: 20; }
    .tf-card-ribbon { position: absolute; bottom: 28px; right: -30px; width: 140px; background: linear-gradient(90deg, var(--gold-dark), var(--gold2), var(--gold)); transform: rotate(-45deg); transform-origin: center center; text-align: center; padding: 6px 0; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 9px; letter-spacing: 0.14em; color: var(--crimson-deep); text-transform: uppercase; white-space: nowrap; }

    .tf-card-back { background: linear-gradient(135deg, #2D0008 0%, #4A0010 50%, #3D0000 100%); }
    .tf-card-stripe { width: 100%; height: 36px; background: #0D0008; margin: 6px 0 10px; display: flex; align-items: center; padding: 0 12px; }
    .tf-card-stripe-text { font-size: 8px; color: rgba(255,255,255,0.1); letter-spacing: 0.1em; }
    .tf-card-back-body { display: flex; align-items: center; gap: 14px; }
    .tf-card-qr { width: 68px; height: 68px; flex-shrink: 0; border-radius: 6px; overflow: hidden; background: var(--cream); padding: 4px; }
    .tf-card-qr img, .tf-card-qr canvas { width: 100%; height: 100%; object-fit: contain; display: block; }
    .tf-card-barcode-wrap { flex: 1; min-width: 0; }
    .tf-card-barcode { background: #0D0008; border-radius: 4px; padding: 6px 8px; }
    .tf-card-barcode img, .tf-card-barcode canvas { width: 100%; height: 38px; object-fit: fill; display: block; }
    .tf-card-bid { font-size: 8px; color: rgba(245,230,208,0.3); letter-spacing: 0.1em; text-align: center; margin-top: 4px; font-family: monospace; }
    .tf-card-back-note { margin-top: 10px; font-size: 8px; color: rgba(245,230,208,0.25); line-height: 1.55; }

    @media print {
      html, body { background: white !important; }
      .print-page { background: white !important; width: 210mm; min-height: 297mm; padding: 15mm; }
      .tf-card, .tf-card-back { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      * { box-shadow: none !important; text-shadow: none !important; filter: none !important; }
      @page { size: A4 portrait; margin: 0; }
    }
  </style>
</head>
<body>
  ${cardPages}
  <script>
    document.querySelectorAll('.card-stage').forEach(stage => {
      try {
        const map = JSON.parse(stage.getAttribute('data-src-map') || '{}');
        stage.querySelectorAll('img[data-print-idx]').forEach(img => {
          const src = map['img-' + img.getAttribute('data-print-idx')];
          if (src) img.src = src;
        });
      } catch(e) {}
    });
    window.onload = () => setTimeout(() => window.print(), 900);
  <\/script>
</body>
</html>`
}

function extractFromPool(memberId: string) {
  const container = document.getElementById(`card-pool-${memberId}`)
  if (!container) return null

  const images = container.querySelectorAll<HTMLImageElement>('img')
  const imgSrcMap: Record<string, string> = {}
  images.forEach((img, i) => {
    imgSrcMap[`img-${i}`] = img.src
    img.setAttribute('data-print-idx', String(i))
  })

  const cards = container.querySelectorAll<HTMLElement>('.tf-card')
  return {
    frontHtml: cards[0]?.outerHTML ?? container.innerHTML,
    backHtml:  cards[1]?.outerHTML ?? '',
    imgSrcMap,
  }
}

function openPrintWindow(html: string) {
  const win = window.open('', '_blank', 'width=900,height=700')
  if (!win) { alert('Please allow pop-ups to print cards.'); return }
  win.document.write(html)
  win.document.close()
}

function printSingle(m: any) {
  const extracted = extractFromPool(m.id)
  if (!extracted) return
  const html = buildPrintHtml([{ ...extracted, name: `${m.firstName} ${m.lastName}` }])
  openPrintWindow(html)
}

function printAll() {
  const cardData = members.value.map(m => {
    const extracted = extractFromPool(m.id)
    if (!extracted) return null
    return { ...extracted, name: `${m.firstName} ${m.lastName}` }
  }).filter(Boolean) as any[]

  if (!cardData.length) return
  const html = buildPrintHtml(cardData)
  openPrintWindow(html)
}
</script>

<style>
.ac-intro { font-size: 15px; color: var(--muted); margin-bottom: 24px; }
.ac-loading { display: flex; align-items: center; justify-content: center; gap: 12px; padding: 60px; color: var(--muted); font-size: 15px; }
.ac-spinner { width: 24px; height: 24px; border: 2.5px solid var(--border); border-top-color: var(--crimson); border-radius: 50%; animation: spin .7s linear infinite; flex-shrink: 0; }
@keyframes spin { to { transform: rotate(360deg); } }
.ac-empty-notice { display: flex; align-items: center; gap: 12px; padding: 16px 20px; background: #f0f4ff; border: 1.5px solid #c0d0f8; border-radius: 12px; font-size: 14px; color: #1a3a80; }
.ac-empty-notice svg { width: 18px; height: 18px; flex-shrink: 0; }
.ac-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); gap: 20px; }
.ac-card-tile { background: var(--white); border: 1px solid var(--border-light); border-radius: 16px; overflow: hidden; box-shadow: var(--shadow-sm); transition: box-shadow .2s, transform .2s; }
.ac-card-tile:hover { box-shadow: var(--shadow-card); transform: translateY(-3px); }
.ac-preview-wrap { background: var(--parchment); padding: 16px 16px 0; overflow: hidden; height: 160px; }
.ac-card-meta { padding: 14px 16px 16px; text-align: center; }
.ac-card-id   { font-family: monospace; font-size: 11px; color: var(--muted2); margin-bottom: 4px; }
.ac-card-name { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 600; color: var(--crimson); margin-bottom: 12px; }
.ac-print-btn { width: 100%; justify-content: center; }
@media print { .no-print { display: none !important; } }
@media (max-width: 640px) { .ac-grid { grid-template-columns: 1fr 1fr; gap: 14px; } }
</style>