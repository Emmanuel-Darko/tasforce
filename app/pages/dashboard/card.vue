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
        <h1 class="topbar-title">My Membership Card</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-crimson btn-sm no-print" @click="printCard()">🖨 Print Card</button>
      </div>
    </div>

    <div class="page-body">
      <div v-if="user?.status !== 'active'" class="dc-notice-warn no-print">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2L2 17h16L10 2z"/><line x1="10" y1="9" x2="10" y2="12"/><circle cx="10" cy="15" r=".5" fill="currentColor"/></svg>
        Your membership card is not available until your application is approved.
      </div>

      <template v-else>
        <p class="no-print dc-intro">
          Your official TAS-FORCE digital membership card. Present the QR code or barcode for identity verification.
        </p>

        <div class="dc-layout">
          <div>
            <div class="dc-card-label no-print">Preview</div>
            <div id="print-card-area">
              <MembershipCard :member="user" />
            </div>
          </div>

          <div class="no-print dc-sidebar">
            <div class="card" style="margin-bottom:16px;">
              <div class="card-header"><h3 class="card-title">Card Details</h3></div>
              <div class="card-body">
                <div v-for="[k,v] in cardDetails" :key="k" class="detail-row">
                  <span class="detail-key">{{ k }}</span>
                  <span class="detail-value">{{ v }}</span>
                </div>
              </div>
            </div>
            <div class="dc-info-box">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="9" x2="10" y2="14"/><circle cx="10" cy="6.5" r=".5" fill="currentColor"/></svg>
              <div>
                <strong>Verification:</strong> Scan the QR code on the back or visit:<br/>
                <code style="font-size:12px;">tas-force.org/verify/{{ user?.memberId }}</code>
              </div>
            </div>
            <button class="btn btn-gold btn-block" style="margin-top:14px;" @click="printCard()">
              🖨 Print My Card
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
const { user } = useAuth()
const toggleSidebar = inject<() => void>('toggleSidebar')

const cardDetails = computed(() => [
  ['Member ID',    user.value?.memberId],
  ['Full Name',    `${user.value?.firstName} ${user.value?.lastName}`],
  ['Position',     user.value?.position],
  ['Country',      user.value?.country],
  ['Member Since', user.value?.memberSince],
  ['Card Issued',  user.value?.cardIssuedAt ? new Date(user.value.cardIssuedAt).toLocaleDateString('en-GB') : '—'],
])

function buildPrintHtml(cards: Array<{ frontHtml: string; backHtml: string; name: string; imgSrcMap: Record<string, string> }>) {
  const cardPages = cards.map(({ frontHtml, backHtml, name, imgSrcMap }) => `
    <!-- FRONT -->
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
      <div class="card-stage front-stage" data-src-map='${JSON.stringify(imgSrcMap)}'>
        ${frontHtml}
      </div>
      <div class="page-footer">
        <span class="footer-left">Front · ${name}</span>
        <span class="footer-center">tas-force.org</span>
        <span class="footer-right">Official Membership Card</span>
      </div>
    </div>

    <!-- BACK -->
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
      <div class="card-stage back-stage" data-src-map='${JSON.stringify(imgSrcMap)}'>
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
  <title>TAS-FORCE Membership Card</title>
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

    /* ── Page layout ────────────────────────────── */
    .print-page {
      width: 210mm; min-height: 297mm;
      background: radial-gradient(ellipse at 50% 20%, #2a0a0a 0%, #0d0000 100%);
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 20mm 15mm;
      page-break-after: always;
      position: relative;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .print-page::before {
      content: '';
      position: absolute; inset: 8mm;
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 2px;
      pointer-events: none;
    }
    .print-page::after {
      content: '';
      position: absolute; inset: 10mm;
      border: 1px solid rgba(201,168,76,0.08);
      border-radius: 2px;
      pointer-events: none;
    }

    /* ── Ornament header ────────────────────────── */
    .page-ornament {
      display: flex; align-items: center; gap: 16px;
      margin-bottom: 24mm; width: 100%; max-width: 170mm;
    }
    .ornament-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent); }
    .ornament-crest { display: flex; align-items: center; gap: 10px; white-space: nowrap; }
    .crest-icon { color: var(--gold); font-size: 14px; }
    .crest-text { font-family: 'Playfair Display', serif; font-size: 10px; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(201,168,76,0.85); }

    /* ── Card stage ─────────────────────────────── */
    .card-stage {
      display: flex; align-items: center; justify-content: center;
      /* Exact card dimensions + breathing room */
      width: 420px; height: 270px;
      position: relative;
    }

    /* ── Footer ─────────────────────────────────── */
    .page-footer {
      margin-top: 24mm; width: 100%; max-width: 170mm;
      display: flex; justify-content: space-between; align-items: center;
      border-top: 1px solid rgba(201,168,76,0.2);
      padding-top: 4mm;
    }
    .page-footer span { font-size: 8px; letter-spacing: 0.1em; color: rgba(201,168,76,0.45); font-family: 'Crimson Pro', serif; }
    .footer-center { text-align: center; }

    /* ── Card base (exact copy from component) ──── */
    .tf-card {
      width: 400px; height: 252px; border-radius: 16px; position: relative;
      font-family: 'Crimson Pro', serif;
      background: linear-gradient(135deg, #4A0010 0%, #6B0F1A 45%, #3D0000 100%);
      /* NO box-shadow in print — causes dark halo artefact */
    }
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

    /* ── Card: overflow visible so ribbon corner shows fully ── */
    .tf-card { overflow: visible !important; }

    /* Inner elements keep the visual border-radius clipping */
    .tf-card-texture,
    .tf-card-glow,
    .tf-card-gold-bar,
    .tf-card-content { border-radius: 16px; overflow: hidden; }

    /* Ribbon wrapper + ribbon */
    .tf-card-ribbon-wrap {
      position: absolute;
      bottom: 0; right: 0;
      width: 120px; height: 120px;
      overflow: visible;
      pointer-events: none;
      z-index: 20;
    }
    .tf-card-ribbon {
      position: absolute;
      bottom: 28px; right: -30px;
      width: 140px;
      background: linear-gradient(90deg, var(--gold-dark), var(--gold2), var(--gold));
      transform: rotate(-45deg);
      transform-origin: center center;
      text-align: center;
      padding: 6px 0;
      font-family: 'Playfair Display', serif; font-weight: 900;
      font-size: 9px; letter-spacing: 0.14em;
      color: var(--crimson-deep); text-transform: uppercase;
      white-space: nowrap;
    }

    /* ── Back ───────────────────────────────────── */
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

    /* ── Print overrides ────────────────────────── */
    @media print {
      html, body { background: white !important; }
      .print-page {
        background: white !important;
        width: 210mm; min-height: 297mm;
        padding: 15mm;
      }
      /* Dark card backgrounds must still print */
      .tf-card, .tf-card-back { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      /* Absolutely no shadows in print */
      * { box-shadow: none !important; text-shadow: none !important; filter: none !important; }
      @page { size: A4 portrait; margin: 0; }
    }
  </style>
</head>
<body>
  ${cardPages}
  <script>
    // Restore image srcs (data URIs survive the window.open transfer)
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

function extractCardSides(area: HTMLElement) {
  // Capture all image srcs before innerHTML cloning
  const images = area.querySelectorAll('img')
  const imgSrcMap: Record<string, string> = {}
  images.forEach((img, i) => {
    imgSrcMap[`img-${i}`] = img.src
    img.setAttribute('data-print-idx', String(i))
  })

  // MembershipCard component renders .tf-card elements
  // First .tf-card = front, second = back (the component must render both)
  const cards = area.querySelectorAll<HTMLElement>('.tf-card')
  const frontHtml = cards[0]?.outerHTML ?? area.innerHTML
  const backHtml  = cards[1]?.outerHTML ?? ''

  return { frontHtml, backHtml, imgSrcMap }
}

function printCard() {
  const area = document.getElementById('print-card-area')
  if (!area) return

  const { frontHtml, backHtml, imgSrcMap } = extractCardSides(area)
  const name = `${user.value?.firstName} ${user.value?.lastName}`

  const html = buildPrintHtml([{ frontHtml, backHtml, name, imgSrcMap }])
  const win = window.open('', '_blank', 'width=900,height=700')
  if (!win) return
  win.document.write(html)
  win.document.close()
}
</script>


<style scoped>
.dc-intro { font-size: 15px; color: var(--muted); margin-bottom: 28px; }
.dc-layout { display: flex; gap: 32px; align-items: flex-start; flex-wrap: wrap; }
.dc-card-label { font-size: 10px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: var(--muted2); margin-bottom: 8px; }
.dc-sidebar { flex: 1; min-width: 240px; }
.dc-notice-warn { display: flex; align-items: center; gap: 12px; padding: 13px 18px; background: #fef9ec; border: 1.5px solid #f0d060; border-radius: 12px; font-size: 14px; color: #6b4800; margin-bottom: 20px; }
.dc-notice-warn svg { width: 18px; height: 18px; flex-shrink: 0; }
.dc-info-box { display: flex; align-items: flex-start; gap: 10px; padding: 13px 16px; background: #f0f4ff; border: 1.5px solid #c0d0f8; border-radius: 10px; font-size: 14px; color: #1a3a80; line-height: 1.6; }
.dc-info-box svg { width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; }
@media print { .no-print { display: none !important; } }
</style>