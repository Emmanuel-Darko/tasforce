<template>
  <div>
    <div class="topbar no-print">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
        <h1 class="topbar-title">My Membership Card</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-crimson btn-sm no-print" @click="printCard">🖨 Print Card</button>
      </div>
    </div>

    <div class="page-body">
      <div v-if="user?.status !== 'active'" class="notice notice-warn no-print">
        <span>⚠</span><span>Your membership card is not available until your application is approved.</span>
      </div>

      <template v-else>
        <p class="no-print" style="font-size:15px;color:var(--muted);margin-bottom:28px;">
          Your official TAS-FORCE digital membership card. Present the QR code or barcode for identity verification.
        </p>

        <div style="display:flex;gap:32px;align-items:flex-start;flex-wrap:wrap;">
          <!-- Card — this is what gets printed -->
          <div id="print-card-area">
            <MembershipCard :member="user" />
          </div>

          <div class="no-print" style="flex:1;min-width:240px;">
            <div class="card" style="margin-bottom:16px;">
              <div class="card-header"><h3 class="card-title">Card Details</h3></div>
              <div class="card-body">
                <div v-for="[k,v] in cardDetails" :key="k" class="detail-row">
                  <span class="detail-key">{{ k }}</span>
                  <span class="detail-value">{{ v }}</span>
                </div>
              </div>
            </div>
            <div class="notice notice-info">
              <span>ℹ</span>
              <div>
                <strong>Verification:</strong> Scan the QR code on the back or visit:<br/>
                <code style="font-size:12px;">tas-force.org/verify/{{ user?.memberId }}</code>
              </div>
            </div>
            <button class="btn btn-gold btn-block" style="margin-top:14px;" @click="printCard">
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

function printCard() {
  const area = document.getElementById('print-card-area')
  if (!area) return

  // Capture the current src of QR and barcode images so they appear in the print window
  const images = area.querySelectorAll('img')
  const imgSrcMap: Record<string, string> = {}
  images.forEach((img, i) => {
    imgSrcMap[`img-${i}`] = img.src
    img.setAttribute('data-print-idx', `${i}`)
  })

  const cardHtml = area.innerHTML

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>TAS-FORCE Membership Card — ${user.value?.firstName} ${user.value?.lastName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --crimson:      #6B0F1A;
      --crimson2:     #8B1A28;
      --crimson-deep: #2D0008;
      --crimson-mid:  #4A0010;
      --gold:         #C9A84C;
      --gold2:        #E0C06A;
      --gold-dark:    #9A7A2A;
      --gold-pale:    #F5EDD0;
      --cream:        #F5E6D0;
      --cream2:       #EDD9BB;
      --parchment:    #FAF5EE;
    }

    body {
      background: var(--parchment);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: 'Crimson Pro', Georgia, serif;
      padding: 40px 20px;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Card stack */
    .tf-card-stack { display: flex; flex-direction: column; align-items: center; gap: 20px; }

    /* Card base */
    .tf-card {
      width: 400px; height: 252px; border-radius: 16px; position: relative;
      overflow: hidden; font-family: 'Crimson Pro', serif;
      background: linear-gradient(135deg, #4A0010 0%, #6B0F1A 45%, #3D0000 100%);
      box-shadow: 0 12px 48px rgba(61,0,0,0.45), 0 3px 12px rgba(61,0,0,0.3);
    }
    .tf-card-texture {
      position: absolute; inset: 0; pointer-events: none;
      background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px);
      mix-blend-mode: overlay;
    }
    .tf-card-glow {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.14) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.07) 0%, transparent 45%);
    }
    .tf-card-gold-bar { position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #7A5A1A, var(--gold2), var(--gold), var(--gold2), #7A5A1A); }
    .tf-card-content  { position: relative; z-index: 2; padding: 18px 20px 14px; height: 100%; display: flex; flex-direction: column; }
    .tf-card-header   { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
    .tf-card-logo     { display: flex; align-items: center; gap: 9px; }
    .tf-card-logo-circle { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-dark), var(--gold2)); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 11px; color: var(--crimson-deep); box-shadow: 0 2px 8px rgba(201,168,76,0.5); }
    .tf-card-org      { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 15px; color: var(--cream); letter-spacing: 0.07em; line-height: 1; }
    .tf-card-tagline  { font-size: 7px; color: rgba(201,168,76,0.75); letter-spacing: 0.05em; margin-top: 2px; }
    .tf-card-type-badge { background: rgba(201,168,76,0.25); border: 1px solid rgba(201,168,76,0.5); border-radius: 4px; padding: 4px 10px; }
    .tf-card-type-label { font-size: 8px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gold2); font-weight: 700; }
    .tf-card-type-val   { font-size: 9px; color: var(--cream); font-weight: 600; margin-top: 1px; text-transform: capitalize; }
    .tf-card-body     { display: flex; gap: 14px; flex: 1; align-items: flex-start; }
    .tf-card-info     { flex: 1; min-width: 0; }
    .tf-card-field    { margin-bottom: 7px; }
    .tf-card-fl       { font-size: 7.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(201,168,76,0.8); line-height: 1; }
    .tf-card-fv       { font-size: 13px; color: var(--cream); font-weight: 600; line-height: 1.2; margin-top: 2px; }
    .tf-card-name     { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: 700; color: var(--cream); margin: 8px 0 2px; line-height: 1; }
    .tf-card-since    { font-size: 10px; color: rgba(245,230,208,0.45); }
    .tf-card-photo    { width: 72px; height: 88px; border-radius: 8px; border: 2px solid rgba(201,168,76,0.55); flex-shrink: 0; background: rgba(201,168,76,0.1); display: flex; align-items: center; justify-content: center; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
    .tf-card-photo img { width: 100%; height: 100%; object-fit: cover; }
    .tf-card-footer   { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid rgba(201,168,76,0.2); margin-top: auto; }
    .tf-card-website  { font-size: 9px; color: rgba(201,168,76,0.55); letter-spacing: 0.08em; }
    .tf-card-ribbon   { position: absolute; bottom: 26px; right: -22px; width: 115px; background: linear-gradient(90deg, var(--gold-dark), var(--gold2), var(--gold)); transform: rotate(-45deg); transform-origin: right center; text-align: center; padding: 5px 0; font-family: 'Playfair Display', serif; font-weight: 900; font-size: 10px; letter-spacing: 0.16em; color: var(--crimson-deep); text-transform: uppercase; box-shadow: 0 3px 10px rgba(61,0,0,0.5); }
    /* Back */
    .tf-card-back { background: linear-gradient(135deg, #2D0008 0%, #4A0010 50%, #3D0000 100%); }
    .tf-card-stripe { width: 100%; height: 36px; background: #0D0008; margin: 6px 0 10px; display: flex; align-items: center; padding: 0 12px; }
    .tf-card-stripe-text { font-size: 8px; color: rgba(255,255,255,0.1); letter-spacing: 0.1em; }
    .tf-card-back-body { display: flex; align-items: center; gap: 14px; }
    .tf-card-qr    { width: 68px; height: 68px; flex-shrink: 0; border-radius: 6px; overflow: hidden; background: var(--cream); padding: 4px; }
    .tf-card-qr img { width: 100%; height: 100%; object-fit: contain; display: block; }
    .tf-card-barcode-wrap { flex: 1; min-width: 0; }
    .tf-card-barcode { background: #0D0008; border-radius: 4px; padding: 6px 8px; }
    .tf-card-barcode img { width: 100%; height: 38px; object-fit: fill; display: block; }
    .tf-card-barcode canvas { width: 100%; height: 38px; display: block; }
    .tf-card-bid   { font-size: 8px; color: rgba(245,230,208,0.3); letter-spacing: 0.1em; text-align: center; margin-top: 4px; font-family: monospace; }
    .tf-card-back-note { margin-top: 10px; font-size: 8px; color: rgba(245,230,208,0.25); line-height: 1.55; }
    .tf-card-qr canvas { width: 100%; height: 100%; display: block; }

    /* Page label */
    .print-label {
      font-family: 'Crimson Pro', serif;
      font-size: 11px;
      color: #aaa;
      margin-top: 12px;
      letter-spacing: 0.05em;
    }

    @media print {
      body { background: white; padding: 0; min-height: auto; justify-content: flex-start; padding-top: 20mm; }
      .print-label { display: none; }
      @page { size: A4; margin: 15mm; }
    }
  </style>
</head>
<body>
  ${cardHtml}
  <p class="print-label">TAS-FORCE Official Membership Card · tas-force.org</p>
  <script>
    // Restore all image srcs after DOM is ready (they may be data URIs)
    const srcMap = ${JSON.stringify(imgSrcMap)};
    document.querySelectorAll('img[data-print-idx]').forEach(img => {
      const idx = img.getAttribute('data-print-idx');
      if (srcMap['img-' + idx]) img.src = srcMap['img-' + idx];
    });
    // Auto-print once fonts + images load
    window.onload = () => {
      // Small delay for Google Fonts
      setTimeout(() => { window.print(); }, 800);
    };
  <\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=700,height=700')
  if (!win) return
  win.document.write(html)
  win.document.close()
}
</script>

<style>
@media print {
  .no-print { display: none !important; }
}
</style>