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

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>TAS-FORCE Membership Card — ${user.value?.firstName} ${user.value?.lastName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Pro:wght@400;600&display=swap" rel="stylesheet"/>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #FAF5EE;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      font-family: 'Crimson Pro', Georgia, serif;
      padding: 40px 20px;
    }
    body > p {
      font-family: 'Crimson Pro', serif;
      font-size: 12px;
      color: #7A5060;
      margin-top: 20px;
      letter-spacing: 0.04em;
    }
    @media print {
      body { background: white; padding: 0; min-height: auto; }
      body > p { display: none; }
      @page { size: A4; margin: 20mm; }
    }
  </style>
</head>
<body>
  ${area.innerHTML}
  <p>TAS-FORCE Official Membership Card — tas-force.org</p>
  <script>window.onload = () => { window.print(); }<\/script>
</body>
</html>`

  const win = window.open('', '_blank', 'width=700,height=600')
  if (!win) return
  win.document.write(html)
  win.document.close()
}
</script>

<style>
/* Only hide things on print — never applied to card itself */
@media print {
  .no-print { display: none !important; }
  .app-shell, .sidebar, .topbar, .app-content { all: unset; }
  body * { visibility: hidden; }
  #print-card-area, #print-card-area * { visibility: visible; }
  #print-card-area {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
  }
}
</style>