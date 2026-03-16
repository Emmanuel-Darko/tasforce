<template>
  <div class="auth-root">

    <!-- LEFT BRAND PANEL -->
    <div class="auth-brand">
      <div class="auth-brand-mesh" />
      <div class="auth-brand-noise" />

      <div class="auth-brand-inner">
        <NuxtLink to="/" class="auth-logo">
          <div class="auth-logo-mark">TF</div>
          <div>
            <div class="auth-logo-name">TAS-FORCE</div>
            <div class="auth-logo-sub">Truth &amp; Advocacy for Women</div>
          </div>
        </NuxtLink>

        <h2 class="auth-brand-headline">
          Justice for Her.<br/>
          <em class="auth-brand-em">Accountability for All.</em>
        </h2>
        <p class="auth-brand-desc">Fighting for the rights of women facing injustice in society and marriage across Africa and beyond.</p>

        <ul class="auth-feats">
          <li v-for="f in features" :key="f" class="auth-feat">
            <div class="auth-feat-dot" />
            <span>{{ f }}</span>
          </li>
        </ul>

        <NuxtLink to="/" class="auth-back-link">← Back to website</NuxtLink>
      </div>
    </div>

    <!-- RIGHT FORM PANEL -->
    <div class="auth-form-panel">
      <slot />
    </div>

  </div>
</template>

<script setup lang="ts">
const features = [
  'Official digital membership card with QR verification',
  'Secure member portal & profile management',
  'Access to campaigns, resources & updates',
  'Stand united in the fight for justice',
]
</script>

<style scoped>
.auth-root {
  display: flex; min-height: 100svh;
  font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif;
  background: var(--lv-bg, #0a0a0a);
}

/* BRAND PANEL */
.auth-brand {
  flex: 0 0 42%;
  position: relative; overflow: hidden;
  background: hsl(348,100%,6%);
  padding: 52px 48px;
  display: flex; flex-direction: column; justify-content: center;
}
.auth-brand-mesh {
  position: absolute; inset: -20%; width: 140%; height: 140%;
  background:
    radial-gradient(ellipse at 20% 50%, hsla(348,80%,24%,.8) 0%, transparent 52%),
    radial-gradient(ellipse at 80% 20%, hsla(43,60%,54%,.1) 0%, transparent 48%);
  pointer-events: none;
  animation: meshDrift 14s ease-in-out infinite alternate;
}
@keyframes meshDrift { from { transform: translate(0,0) scale(1); } to { transform: translate(-2%,1.5%) scale(1.04); } }
.auth-brand-noise {
  position: absolute; inset: 0; pointer-events: none; opacity: .35;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
}
.auth-brand-inner { position: relative; z-index: 2; }

/* Logo */
.auth-logo { display: inline-flex; align-items: center; gap: 12px; margin-bottom: 36px; text-decoration: none; }
.auth-logo-mark { width: 46px; height: 46px; border-radius: 12px; background: linear-gradient(135deg, #c9a84c, #e0c06a); display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', 'Playfair Display', serif; font-weight: 900; font-size: 15px; color: hsl(348,100%,6%); box-shadow: 0 4px 18px hsla(43,60%,54%,.35); flex-shrink: 0; }
.auth-logo-name { font-family: 'Fraunces', 'Playfair Display', serif; font-weight: 900; font-size: 19px; color: hsl(40,30%,92%); letter-spacing: .05em; line-height: 1; }
.auth-logo-sub  { font-size: 9px; color: rgba(201,168,76,.5); letter-spacing: .1em; text-transform: uppercase; margin-top: 3px; }

/* Headline */
.auth-brand-headline { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(22px,3vw,32px); font-weight: 700; color: hsl(40,30%,92%); line-height: 1.25; margin-bottom: 12px; }
.auth-brand-em { font-style: italic; background: linear-gradient(120deg,#c9a84c,#e0c06a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.auth-brand-desc { font-size: 14px; color: rgba(232,220,200,.45); line-height: 1.72; margin-bottom: 32px; max-width: 340px; }

/* Features */
.auth-feats { list-style: none; display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; }
.auth-feat  { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: rgba(232,220,200,.58); line-height: 1.5; }
.auth-feat-dot {
  width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0; margin-top: 1px;
  background: rgba(201,168,76,.2); border: 1px solid rgba(201,168,76,.4);
  display: flex; align-items: center; justify-content: center;
}
.auth-feat-dot::after { content: ''; width: 7px; height: 7px; border-radius: 50%; background: #c9a84c; }

.auth-back-link { font-size: 13px; color: rgba(232,220,200,.3); text-decoration: none; transition: color .18s; }
.auth-back-link:hover { color: rgba(201,168,76,.7); }

/* FORM PANEL */
.auth-form-panel {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  padding: 48px 36px;
  background: var(--lv-surface, #111111);
  overflow-y: auto;
}

/* RESPONSIVE */
@media (max-width: 860px) {
  .auth-root { flex-direction: column; }
  .auth-brand { flex: none; padding: 36px 24px 28px; min-height: auto; }
  .auth-feats { display: none; }
  .auth-back-link { display: none; }
}
@media (max-width: 640px) {
  .auth-form-panel { padding: 32px 20px; align-items: flex-start; }
  .auth-brand { padding: 28px 20px; }
}
</style>