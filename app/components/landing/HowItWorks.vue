<template>
  <section class="lv-hiw">
    <div class="lv-container">
      <div class="lv-head">
        <span class="lv-eyebrow">Get Involved</span>
        <h2 class="lv-title">How It Works</h2>
        <p class="lv-lead">Four simple steps to join our global movement.</p>
      </div>
      <div class="lv-grid">
        <div class="lv-line" />
        <div v-for="(step, i) in steps" :key="step.label" class="lv-step">
          <div class="lv-step-num">{{ i + 1 }}</div>
          <span class="lv-step-icon">{{ step.icon }}</span>
          <h4 class="lv-step-label">{{ step.label }}</h4>
          <p class="lv-step-sub">{{ step.sub }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { icon: '📝', label: 'Register',      sub: 'Fill out your application online in minutes.' },
  { icon: '✅', label: 'Get Approved',  sub: 'Our team reviews and verifies your application.' },
  { icon: '🪪', label: 'Get Your Card', sub: 'Receive your official digital membership card.' },
  { icon: '✊', label: 'Advocate',      sub: 'Join campaigns and our global community.' },
]
</script>

<style scoped>
.lv-hiw { padding: 96px 0; background: var(--lv-bg); }
.lv-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.lv-head { text-align: center; margin-bottom: 56px; }
.lv-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .2em; color: var(--lv-gold); margin-bottom: 12px; display: block; }
.lv-title { font-family: var(--lv-font-d); font-size: clamp(26px,3.5vw,38px); font-weight: 700; color: var(--lv-fg); margin-bottom: 10px; line-height: 1.15; }
.lv-lead  { font-size: 17px; color: var(--lv-muted); max-width: 440px; margin: 0 auto; line-height: 1.7; }

.lv-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; position: relative; }
.lv-line { position: absolute; top: 46px; left: 12.5%; right: 12.5%; border-top: 2px dashed rgba(201,168,76,.14); pointer-events: none; }

.lv-step { background: var(--lv-surface); border: 1px solid var(--lv-border); border-radius: 20px; padding: 32px 22px 28px; text-align: center; position: relative; z-index: 1; transition: transform .26s, box-shadow .26s; }
.lv-step:hover { transform: translateY(-9px); box-shadow: 0 20px 52px rgba(0,0,0,.5); }
.lv-step-num   { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, var(--lv-crimson), hsl(348,85%,16%)); color: var(--lv-cream); font-family: var(--lv-font-d); font-size: 17px; font-weight: 900; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; box-shadow: 0 6px 16px hsla(0,80%,28%,.38); position: relative; z-index: 1; }
.lv-step-icon  { font-size: 34px; margin-bottom: 12px; display: block; }
.lv-step-label { font-family: var(--lv-font-d); font-size: 17px; font-weight: 700; color: var(--lv-gold); margin-bottom: 8px; }
.lv-step-sub   { font-size: 14px; color: var(--lv-muted); line-height: 1.65; }

@media (max-width: 960px) { .lv-grid { grid-template-columns: 1fr 1fr; gap: 16px; } .lv-line { display: none; } }
@media (max-width: 640px) { .lv-hiw { padding: 64px 0; } .lv-grid { grid-template-columns: 1fr; gap: 14px; } }
</style>