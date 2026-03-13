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

      <!--
        Ribbon is OUTSIDE .tf-card-content but still inside .tf-card.
        The wrapper uses overflow:visible so the rotated ribbon is never clipped.
      -->
      <div class="tf-card-ribbon-wrap">
        <div class="tf-card-ribbon">{{ member.position || 'Member' }}</div>
      </div>
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

          <!-- QR Code -->
          <div class="tf-card-qr">
            <img
              v-if="resolvedQr"
              :src="resolvedQr"
              alt="QR Code"
              style="width:100%;height:100%;object-fit:contain;display:block;"
            />
            <canvas v-else ref="qrCanvas" style="width:100%;height:100%;display:block;" />
          </div>

          <!-- Barcode -->
          <div class="tf-card-barcode-wrap">
            <div class="tf-card-barcode">
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

const resolvedQr      = computed(() => props.member.qrCode  || null)
const resolvedBarcode = computed(() => props.member.barcode || null)

onMounted(async () => {
  if (!props.member.memberId) return

  if (!resolvedQr.value && qrCanvas.value) {
    try {
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
.tf-card-stack {
  display: flex;
  flex-direction: column;
}

/* ── Card base ─────────────────────────────────────────────── */
.tf-card {
  width: 400px;
  height: 252px;
  border-radius: 16px;
  position: relative;
  /* overflow must be VISIBLE so the ribbon corner is not clipped */
  overflow: visible;
  font-family: 'Crimson Pro', serif;
  background: linear-gradient(135deg, #4A0010 0%, #6B0F1A 45%, #3D0000 100%);
  box-shadow: 0 12px 48px rgba(61,0,0,0.45), 0 3px 12px rgba(61,0,0,0.3);
}

/*
  Inner clip: apply border-radius clipping to the card visuals
  WITHOUT clipping the ribbon that sticks out of the corner.
  We achieve this with a pseudo-element mask on the card content.
*/
.tf-card-texture,
.tf-card-glow,
.tf-card-gold-bar,
.tf-card-content {
  border-radius: 16px;
  overflow: hidden;
}

.tf-card-texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    45deg,
    transparent, transparent 2px,
    rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px
  );
  mix-blend-mode: overlay;
}

.tf-card-glow {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 30% 20%, rgba(201,168,76,0.14) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 80%, rgba(201,168,76,0.07) 0%, transparent 45%);
}

.tf-card-gold-bar {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 5px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(90deg, #7A5A1A, #E0C06A, #C9A84C, #E0C06A, #7A5A1A);
}

.tf-card-content {
  position: relative;
  z-index: 2;
  padding: 18px 20px 14px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* ── Header ────────────────────────────────────────────────── */
.tf-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 10px;
}
.tf-card-logo { display: flex; align-items: center; gap: 9px; }
.tf-card-logo-circle {
  width: 34px; height: 34px; border-radius: 50%;
  background: linear-gradient(135deg, #9A7A2A, #E0C06A);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-weight: 900;
  font-size: 11px; color: #2D0008;
  box-shadow: 0 2px 8px rgba(201,168,76,0.5);
  flex-shrink: 0;
}
.tf-card-org {
  font-family: 'Playfair Display', serif; font-weight: 900;
  font-size: 15px; color: #F5E6D0; letter-spacing: 0.07em; line-height: 1;
}
.tf-card-tagline {
  font-size: 7px; color: rgba(201,168,76,0.75);
  letter-spacing: 0.05em; margin-top: 2px;
}
.tf-card-type-badge {
  background: rgba(201,168,76,0.25);
  border: 1px solid rgba(201,168,76,0.5);
  border-radius: 4px; padding: 4px 10px;
  flex-shrink: 0;
}
.tf-card-type-label {
  font-size: 8px; letter-spacing: 0.12em; text-transform: uppercase;
  color: #E0C06A; font-weight: 700;
}
.tf-card-type-val {
  font-size: 9px; color: #F5E6D0; font-weight: 600;
  margin-top: 1px; text-transform: capitalize;
}

/* ── Body ──────────────────────────────────────────────────── */
.tf-card-body { display: flex; gap: 14px; flex: 1; align-items: flex-start; }
.tf-card-info { flex: 1; min-width: 0; }
.tf-card-field { margin-bottom: 7px; }
.tf-card-fl {
  font-size: 7.5px; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: rgba(201,168,76,0.8); line-height: 1;
}
.tf-card-fv {
  font-size: 13px; color: #F5E6D0; font-weight: 600;
  line-height: 1.2; margin-top: 2px;
}
.tf-card-name {
  font-family: 'Playfair Display', serif; font-size: 17px;
  font-weight: 700; color: #F5E6D0; margin: 8px 0 2px; line-height: 1;
}
.tf-card-since { font-size: 10px; color: rgba(245,230,208,0.45); }

.tf-card-photo {
  width: 72px; height: 88px; border-radius: 8px;
  border: 2px solid rgba(201,168,76,0.55); flex-shrink: 0;
  background: rgba(201,168,76,0.1);
  display: flex; align-items: center; justify-content: center;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.3);
}
.tf-card-photo img { width: 100%; height: 100%; object-fit: cover; }

/* ── Footer ────────────────────────────────────────────────── */
.tf-card-footer {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 10px; border-top: 1px solid rgba(201,168,76,0.2);
  margin-top: auto;
}
.tf-card-website {
  font-size: 9px; color: rgba(201,168,76,0.55); letter-spacing: 0.08em;
}

/* ── Ribbon ────────────────────────────────────────────────── */
/*
  Wrapper sits at bottom-right of the card, z-index above card content.
  overflow:visible lets the rotated ribbon extend past card bounds.
*/
.tf-card-ribbon-wrap {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 120px;
  height: 120px;
  overflow: visible;
  pointer-events: none;
  z-index: 20;
}

.tf-card-ribbon {
  position: absolute;
  /* Position the ribbon diagonal across the bottom-right corner */
  bottom: 28px;
  right: -30px;
  width: 140px;
  background: linear-gradient(90deg, #9A7A2A, #E0C06A, #C9A84C);
  transform: rotate(-45deg);
  transform-origin: center center;
  text-align: center;
  padding: 6px 0;
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 9px;
  letter-spacing: 0.14em;
  color: #2D0008;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(61,0,0,0.4);
}

/* ── Back ──────────────────────────────────────────────────── */
.tf-card-back {
  background: linear-gradient(135deg, #2D0008 0%, #4A0010 50%, #3D0000 100%);
}
.tf-card-stripe {
  width: 100%; height: 36px;
  background: #0D0008;
  margin: 6px 0 10px;
  display: flex; align-items: center; padding: 0 12px;
}
.tf-card-stripe-text { font-size: 8px; color: rgba(255,255,255,0.1); letter-spacing: 0.1em; }

.tf-card-back-body { display: flex; align-items: center; gap: 14px; }

.tf-card-qr {
  width: 68px; height: 68px; flex-shrink: 0;
  border-radius: 6px; overflow: hidden;
  background: #F5E6D0; padding: 4px;
}

.tf-card-barcode-wrap { flex: 1; min-width: 0; }
.tf-card-barcode {
  background: #0D0008;
  border-radius: 6px;
  overflow: hidden;
  padding: 6px 8px;
}
.tf-card-bid {
  font-size: 8px; color: rgba(245,230,208,0.3);
  letter-spacing: 0.1em; text-align: center;
  margin-top: 4px; font-family: monospace;
}
.tf-card-back-note {
  margin-top: 4px; font-size: 8px;
  color: rgba(245,230,208,0.25); line-height: 1.55;
}
</style>