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

          <!-- Real QR Code -->
          <div class="tf-card-qr">
            <img
              v-if="member.qrCode"
              :src="member.qrCode"
              alt="QR Code"
              style="width:100%;height:100%;object-fit:contain;display:block;"
            />
            <!-- Placeholder grid when no QR issued yet -->
            <div v-else class="tf-card-qr-placeholder">
              <div v-for="n in 49" :key="n"
                :style="`background:${qrPlaceholder.includes(n) ? 'var(--crimson-deep)' : 'var(--cream)'};border-radius:1px;`"
              />
            </div>
          </div>

          <!-- Real Barcode -->
          <div class="tf-card-barcode-wrap">
            <div class="tf-card-barcode" style="border-radius:6px;overflow:hidden;">
              <img
                v-if="member.barcode"
                :src="member.barcode"
                alt="Barcode"
                style="width:100%;height:44px;object-fit:fill;display:block;"
              />
              <!-- Placeholder bars when not yet issued -->
              <div v-else style="display:flex;gap:1.5px;align-items:stretch;height:44px;background:#2D0008;padding:5px 8px;">
                <div v-for="n in 38" :key="n"
                  :style="`flex:${thickBars.includes(n) ? 3 : 1};background:rgba(245,230,208,${thickBars.includes(n) ? 0.85 : 0.12});border-radius:1px;`"
                />
              </div>
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
defineProps<{ member: Record<string, any> }>()

// Decorative placeholder QR pattern (positions 1–49 in a 7×7 grid)
const qrPlaceholder = [1,2,3,4,5,6,7,8,14,15,21,22,28,29,35,36,42,43,44,45,46,47,48,49,9,16,23,25,32,39,4,25,46]

// Decorative barcode thick bars
const thickBars = [2,5,9,13,17,21,25,28,32,36]
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