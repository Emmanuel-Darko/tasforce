<template>
  <div class="tf-card-stack">

    <!-- ══ FRONT ══ -->
    <div class="tf-card">
      <div class="tf-card-texture" />
      <div class="tf-card-glow" />
      <div class="tf-card-gold-bar" />
      <div class="tf-card-content">

        <!-- Header row -->
        <div class="tf-card-header">
          <div class="tf-card-logo">
            <div class="tf-card-logo-circle">TF</div>
            <div>
              <div class="tf-card-org">TAS-FORCE</div>
              <div class="tf-card-tagline">Truth and Advocacy for Serwah &amp; Women Empowerment</div>
            </div>
          </div>
          <div class="tf-card-type-badge">
            <div class="tf-card-type-label">Member Type</div>
            <div class="tf-card-type-val">{{ member.membershipType || 'Advocate' }}</div>
          </div>
        </div>

        <!-- Body -->
        <div class="tf-card-body">
          <div class="tf-card-info">
            <div class="tf-card-field">
              <div class="tf-card-fl">Position</div>
              <div class="tf-card-fv" style="text-transform:capitalize;">{{ member.position || 'Advocate' }}</div>
            </div>
            <div class="tf-card-field">
              <div class="tf-card-fl">Country</div>
              <div class="tf-card-fv">{{ member.country || '—' }}</div>
            </div>
            <div class="tf-card-field">
              <div class="tf-card-fl">Member ID</div>
              <div class="tf-card-fv" style="letter-spacing:0.1em;font-family:monospace;font-size:11px;">{{ member.memberId || 'Pending Approval' }}</div>
            </div>
            <div class="tf-card-name">{{ member.firstName }} {{ member.lastName }}</div>
            <div class="tf-card-since">Member Since {{ member.memberSince || '—' }}</div>
          </div>

          <!-- Photo -->
          <div class="tf-card-photo">
            <img
              v-if="member.photoUrl"
              :src="member.photoUrl"
              :alt="`${member.firstName} photo`"
            />
            <img
              v-else
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&auto=format&fit=crop&crop=face"
              alt="Member"
            />
          </div>
        </div>

        <!-- Footer -->
        <div class="tf-card-footer">
          <span class="tf-card-website">www.tas-force.org</span>
          <span style="font-size:8px;color:rgba(201,168,76,0.35);letter-spacing:0.08em;font-family:monospace;">OFFICIAL DOCUMENT</span>
        </div>
      </div>
      <div class="tf-card-ribbon">Member</div>
    </div>

    <!-- ══ BACK ══ -->
    <div class="tf-card tf-card-back" style="margin-top:16px;">
      <div class="tf-card-texture" />
      <div class="tf-card-gold-bar" />
      <div class="tf-card-content">

        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;">
          <span style="font-family:'Playfair Display',serif;font-weight:900;font-size:11px;color:rgba(245,230,208,0.65);letter-spacing:0.1em;">TAS-FORCE MEMBERSHIP CARD</span>
          <span style="font-size:7px;color:rgba(201,168,76,0.4);letter-spacing:0.08em;">OFFICIAL DOCUMENT</span>
        </div>

        <!-- Magnetic stripe -->
        <div class="tf-card-stripe">
          <span class="tf-card-stripe-text">■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■</span>
        </div>

        <div class="tf-card-back-body">

          <!-- QR Code: use stored server-generated code, fallback to client-generated -->
          <div class="tf-card-qr">
            <img
              v-if="resolvedQr"
              :src="resolvedQr"
              alt="QR Code"
              style="width:100%;height:100%;object-fit:contain;display:block;"
            />
            <canvas v-else ref="qrCanvas" style="width:100%;height:100%;display:block;" />
          </div>

          <!-- Barcode: use stored server-generated code, fallback to client-generated -->
          <div class="tf-card-barcode-wrap">
            <div class="tf-card-barcode" style="border-radius:6px;overflow:hidden;">
              <img
                v-if="resolvedBarcode"
                :src="resolvedBarcode"
                alt="Barcode"
                style="width:100%;height:44px;object-fit:fill;display:block;"
              />
              <canvas v-else ref="barcodeCanvas" style="width:100%;height:44px;display:block;" />
            </div>
            <div class="tf-card-bid">{{ member.memberId || 'PENDING' }}</div>
            <div class="tf-card-back-note">
              Scan QR to verify · <span style="color:rgba(201,168,76,0.5);">tas-force.org/verify/{{ member.memberId || '…' }}</span>
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px;">
          <span style="font-size:7px;color:rgba(245,230,208,0.18);">If found: info@tas-force.org</span>
          <span style="font-size:7px;color:rgba(201,168,76,0.3);">
            Issued: {{ member.cardIssuedAt ? new Date(member.cardIssuedAt).toLocaleDateString('en-GB') : '—' }}
          </span>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ member: Record<string, any> }>()

const qrCanvas      = ref<HTMLCanvasElement | null>(null)
const barcodeCanvas = ref<HTMLCanvasElement | null>(null)

// Prefer server-generated codes stored on member, fall back to client generation
const resolvedQr      = computed(() => props.member.qrCode      || null)
const resolvedBarcode = computed(() => props.member.barcode      || null)

// If neither server code exists, draw fallback on canvas client-side
onMounted(async () => {
  if (!props.member.memberId) return

  // QR Code fallback (only if no server-stored qrCode)
  if (!resolvedQr.value && qrCanvas.value) {
    try {
      // Use a lightweight inline QR generator via Google Charts API
      // (avoids bundling a heavy QR lib client-side)
      const verifyUrl = `https://tas-force.org/verify/${props.member.memberId}`
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        if (qrCanvas.value) {
          const ctx = qrCanvas.value.getContext('2d')
          qrCanvas.value.width  = 200
          qrCanvas.value.height = 200
          ctx?.drawImage(img, 0, 0, 200, 200)
        }
      }
      img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(verifyUrl)}&color=2D0008&bgcolor=F5E6D0&margin=1`
    } catch (e) { /* silent */ }
  }

  // Barcode fallback (only if no server-stored barcode)
  if (!resolvedBarcode.value && barcodeCanvas.value) {
    try {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        if (barcodeCanvas.value) {
          const ctx = barcodeCanvas.value.getContext('2d')
          barcodeCanvas.value.width  = 400
          barcodeCanvas.value.height = 80
          ctx?.drawImage(img, 0, 0, 400, 80)
        }
      }
      img.src = `https://barcode.tec-it.com/barcode.ashx?DATA=${encodeURIComponent(props.member.memberId)}&TYPE=Code128&UNIT=Fit&WIDTH=400&HEIGHT=80&TRANSPARENTBG=True&BACKCOLOR=2D0008&BARCOLOR=F5E6D0&TEXTCOLOR=F5E6D0`
    } catch (e) { /* silent */ }
  }
})
</script>

<style scoped>
.tf-card-stack { display: flex; flex-direction: column; }

.tf-card-qr-placeholder {
  width: 100%; height: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1.5px;
  padding: 3px;
  background: var(--cream);
}
</style>