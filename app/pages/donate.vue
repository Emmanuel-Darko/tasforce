<template>
  <div class="pg">
    <!-- HERO -->
    <section class="ph">
      <div class="ph-overlay" />
      <div class="ph-mesh" />
      <div class="container ph-inner">
        <div class="ph-eyebrow">Support Our Work</div>
        <h1 class="ph-title">Donate</h1>
        <p class="ph-sub">Your support helps us fight for justice and empower women across Africa.</p>
      </div>
    </section>

    <!-- DONATE CONTENT -->
    <section class="pg-section">
      <div class="container dn-wrap">

        <div class="dn-notice">
          <div class="dn-notice-icon">ℹ</div>
          <div>
            <div class="dn-notice-title">Donation Processing Coming Soon</div>
            <div class="dn-notice-sub">Thank you for your interest in supporting TAS-FORCE. Contact us to donate directly.</div>
          </div>
        </div>

        <h2 class="dn-subheading">Choose a Gift Amount</h2>
        <div class="dn-amounts">
          <div
            v-for="a in amounts" :key="a"
            class="dn-amount-card"
            :class="{ 'dn-amount-card--active': selected === a }"
            @click="selected = a"
          >
            <div class="dn-amount-val">GH₵{{ a }}</div>
            <div class="dn-amount-lbl">One-time gift</div>
          </div>
        </div>

        <div v-if="selected" class="dn-selected-msg">
          You selected <strong>GH₵{{ selected }}</strong> — thank you for your generosity!
        </div>

        <NuxtLink to="/contact" class="dn-cta-btn">
          Contact Us to Donate
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </NuxtLink>

        <div class="dn-trust">
          <div v-for="t in trust" :key="t.text" class="dn-trust-item">
            <span>{{ t.icon }}</span>
            <span>{{ t.text }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const amounts  = [25, 50, 100, 250, 500, 1000]
const selected = ref<number|null>(null)
const trust = [
  { icon:'🔒', text:'Secure & confidential' },
  { icon:'♡',  text:'100% supports our mission' },
  { icon:'🌍', text:'Helping women across Africa' },
]
</script>

<style scoped>
.pg { background: var(--lv-bg, #0a0a0a); color: var(--lv-fg, #e8dcc8); font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif; }

/* HERO */
.ph { position: relative; min-height: 320px; display: flex; align-items: center; overflow: hidden; background: hsl(348,100%,6%); }
.ph-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.98) 0%, hsla(348,85%,16%,.9) 50%, hsl(0,80%,28%) 100%); }
.ph-mesh { position: absolute; inset: -20%; width: 140%; height: 140%; background: radial-gradient(ellipse at 20% 50%, hsla(348,80%,24%,.7) 0%, transparent 52%), radial-gradient(ellipse at 80% 30%, hsla(43,60%,54%,.1) 0%, transparent 48%); animation: meshDrift 14s ease-in-out infinite alternate; pointer-events: none; }
@keyframes meshDrift { from { transform: translate(0,0); } to { transform: translate(-2%,1.5%); } }
.ph-inner { position: relative; z-index: 2; padding: 80px 0; }
.ph-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 14px; }
.ph-title   { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(32px,5vw,54px); font-weight: 900; color: hsl(40,30%,92%); margin-bottom: 10px; }
.ph-sub     { font-size: 17px; color: rgba(232,220,200,.55); max-width: 520px; line-height: 1.7; }

.pg-section { padding: 96px 0; }
.dn-wrap { max-width: 680px; }

/* Notice */
.dn-notice { display: flex; align-items: flex-start; gap: 16px; padding: 20px 24px; background: rgba(59,130,246,.1); border: 1.5px solid rgba(59,130,246,.25); border-radius: 14px; margin-bottom: 48px; }
.dn-notice-icon { width: 36px; height: 36px; background: rgba(59,130,246,.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; color: #93c5fd; }
.dn-notice-title { font-weight: 700; font-size: 15px; color: var(--lv-fg, #e8dcc8); margin-bottom: 3px; }
.dn-notice-sub   { font-size: 13px; color: rgba(232,220,200,.5); line-height: 1.55; }

.dn-subheading { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--lv-fg, #e8dcc8); margin-bottom: 20px; }

/* Amounts */
.dn-amounts { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 28px; }
.dn-amount-card {
  background: var(--lv-surface, #111); border: 1.5px solid rgba(255,255,255,.08);
  border-radius: 14px; padding: 22px 16px; text-align: center;
  cursor: pointer; transition: all .22s;
}
.dn-amount-card:hover { border-color: rgba(201,168,76,.35); transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,.4); }
.dn-amount-card--active { border-color: #c9a84c; background: rgba(201,168,76,.1); box-shadow: 0 0 0 2px rgba(201,168,76,.25); }
.dn-amount-val { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #c9a84c; line-height: 1; margin-bottom: 5px; }
.dn-amount-lbl { font-size: 12px; color: rgba(232,220,200,.42); }

.dn-selected-msg { font-size: 14px; color: rgba(201,168,76,.75); background: rgba(201,168,76,.08); border: 1px solid rgba(201,168,76,.2); border-radius: 10px; padding: 12px 16px; margin-bottom: 24px; }
.dn-selected-msg strong { color: #c9a84c; }

.dn-cta-btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 36px; border-radius: 12px; background: linear-gradient(135deg,#c9a84c,#e0c06a); color: hsl(348,100%,6%); font-weight: 700; font-size: 16px; text-decoration: none; box-shadow: 0 4px 28px hsla(43,60%,54%,.38); transition: transform .26s, box-shadow .26s; margin-bottom: 40px; }
.dn-cta-btn svg { width: 15px; height: 15px; transition: transform .24s; }
.dn-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 42px hsla(43,60%,54%,.55); }
.dn-cta-btn:hover svg { transform: translateX(4px); }

.dn-trust { display: flex; gap: 24px; flex-wrap: wrap; }
.dn-trust-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: rgba(232,220,200,.42); }

@media (max-width: 640px) { .ph-inner { padding: 56px 16px; } .pg-section { padding: 64px 0; } .dn-amounts { grid-template-columns: 1fr 1fr; } .dn-trust { flex-direction: column; gap: 12px; } .dn-cta-btn { width: 100%; justify-content: center; } }
</style>