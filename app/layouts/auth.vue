<template>
  <div class="auth-shell">

    <!-- LEFT: brand panel (dark crimson) -->
    <div class="auth-brand">
      <div class="auth-brand-pattern" />
      <div class="auth-brand-glow" />
      <div class="auth-brand-inner">
        <NuxtLink to="/" class="auth-logo-link">
          <div class="pub-logo-icon" style="width:46px;height:46px;font-size:15px;">TF</div>
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
            <div class="auth-feat-dot"></div>
            <span>{{ f }}</span>
          </li>
        </ul>

        <!-- Stats row -->
        <div class="auth-stats">
          <div v-for="s in authStats" :key="s.label" class="auth-stat">
            <div class="auth-stat-val">{{ s.val }}</div>
            <div class="auth-stat-lbl">{{ s.label }}</div>
          </div>
        </div>

        <NuxtLink to="/" class="auth-back-link">← Back to website</NuxtLink>
      </div>
    </div>

    <!-- RIGHT: form panel (light parchment) -->
    <div class="auth-form">
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
const authStats = [
  { val: '5,000+', label: 'Members' },
  { val: '40+',    label: 'Countries' },
  { val: '8+',     label: 'Years' },
]
</script>

<style scoped>
.auth-shell {
  display: flex;
  min-height: 100svh;
  font-family: 'Crimson Pro', Georgia, serif;
}

/* BRAND PANEL */
.auth-brand {
  flex: 0 0 42%;
  background: var(--crimson-deep);
  padding: 52px 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.auth-brand-pattern {
  position: absolute;
  inset: 0;
  opacity: 1;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A84C' stroke-opacity='0.07' stroke-width='1'%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='20'/%3E%3Ccircle cx='40' cy='40' r='10'/%3E%3Cline x1='10' y1='40' x2='70' y2='40'/%3E%3Cline x1='40' y1='10' x2='40' y2='70'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 80px 80px;
}
.auth-brand-glow {
  position: absolute;
  bottom: -60px;
  right: -60px;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(201,168,76,.18) 0%, transparent 70%);
  pointer-events: none;
}
.auth-brand-inner {
  position: relative;
  z-index: 2;
}

/* Logo */
.auth-logo-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 40px;
  text-decoration: none;
}
.auth-logo-name {
  font-family: 'Playfair Display', serif;
  font-weight: 900;
  font-size: 20px;
  color: var(--cream);
  letter-spacing: .05em;
  line-height: 1;
}
.auth-logo-sub {
  font-size: 8px;
  color: rgba(201,168,76,.65);
  letter-spacing: .1em;
  text-transform: uppercase;
  margin-top: 3px;
}

/* Headline */
.auth-brand-headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(22px, 2.8vw, 30px);
  color: var(--cream);
  font-weight: 700;
  line-height: 1.25;
  margin-bottom: 12px;
}
.auth-brand-em {
  font-style: italic;
  color: var(--gold);
}
.auth-brand-desc {
  font-size: 14px;
  color: rgba(245,230,208,.5);
  line-height: 1.75;
  margin-bottom: 32px;
  max-width: 340px;
}

/* Features */
.auth-feats {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;
}
.auth-feat {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  color: rgba(245,230,208,.62);
  line-height: 1.5;
}
.auth-feat-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(201,168,76,.18);
  border: 1px solid rgba(201,168,76,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 1px;
}
.auth-feat-dot::after {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
}

/* Stats */
.auth-stats {
  display: flex;
  gap: 24px;
  padding: 18px 0;
  border-top: 1px solid rgba(201,168,76,.15);
  border-bottom: 1px solid rgba(201,168,76,.15);
  margin-bottom: 28px;
}
.auth-stat-val {
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 3px;
}
.auth-stat-lbl {
  font-size: 11px;
  color: rgba(245,230,208,.4);
  text-transform: uppercase;
  letter-spacing: .08em;
}

.auth-back-link {
  font-size: 13px;
  color: rgba(245,230,208,.3);
  text-decoration: none;
  transition: color .18s;
}
.auth-back-link:hover {
  color: rgba(245,230,208,.7);
}

/* FORM PANEL — light background, forms clearly visible */
.auth-form {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
  background: var(--parchment);
  overflow-y: auto;
}

/* RESPONSIVE */
@media (max-width: 860px) {
  .auth-shell { flex-direction: column; }
  .auth-brand {
    flex: none;
    padding: 32px 24px 28px;
  }
  .auth-brand-desc { display: none; }
  .auth-feats { display: none; }
  .auth-stats { gap: 16px; }
  .auth-back-link { display: none; }
}
@media (max-width: 640px) {
  .auth-form { padding: 32px 20px; align-items: flex-start; }
  .auth-brand { padding: 24px 20px; }
  .auth-stats { display: none; }
}
</style>