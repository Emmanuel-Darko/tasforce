<template>
  <section class="lv-hero">
    <div class="lv-hero-bg">
      <div class="lv-mesh" />
      <div class="lv-noise" />
    </div>
    <div class="lv-orbs" aria-hidden="true">
      <div class="lv-orb lv-orb-gold" />
      <div class="lv-orb lv-orb-deep" />
    </div>

    <div class="lv-hero-grid">
      <!-- LEFT -->
      <div class="lv-copy lv-fade-up">
        <div class="lv-eyebrow">
          <span class="lv-eyebrow-dot" />
          Advocacy for African Women
        </div>
        <h1 class="lv-h1">
          <span class="lv-h1-top">Justice</span>
          <em class="lv-h1-em">for Her.</em>
        </h1>
        <p class="lv-kicker">Accountability for All.</p>
        <p class="lv-body">
          We stand with women facing injustice in marriage and society — raising awareness,
          demanding accountability, and challenging corruption across Africa and beyond.
        </p>
        <div class="lv-ctas">
          <NuxtLink to="/auth/register" class="lv-btn-primary">
            Join the Movement
            <svg class="lv-arrow-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </NuxtLink>
          <NuxtLink to="/about" class="lv-btn-ghost">Our Story</NuxtLink>
        </div>
        <div class="lv-proof">
          <div class="lv-proof-faces">
            <img v-for="(p, i) in memberPhotos" :key="i" :src="p" :alt="`Member ${i+1}`" />
          </div>
          <p class="lv-proof-text">
            <strong>5,000+</strong> advocates · <strong>40+</strong> countries
          </p>
        </div>
      </div>

      <!-- RIGHT -->
      <div class="lv-visual lv-fade-right">
        <div class="lv-card-scene">
          <div class="lv-card lv-card-back">
            <img src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=700&q=80&auto=format&fit=crop&crop=faces" alt="" />
          </div>
          <div class="lv-card lv-card-front">
            <img src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=900&q=90&auto=format&fit=crop&crop=faces,top" alt="African women advocates" />
            <span class="lv-corner lv-corner-tl" />
            <span class="lv-corner lv-corner-br" />
            <div class="lv-card-gloss" />
          </div>
          <div class="lv-card-accent" />
          <div class="lv-badge lv-badge-1">
            <span class="lv-badge-icon">⚖️</span>
            <div><div class="lv-badge-val">12</div><div class="lv-badge-lbl">Campaigns</div></div>
          </div>
          <div class="lv-badge lv-badge-2">
            <span class="lv-badge-icon">🌍</span>
            <div><div class="lv-badge-val">40+</div><div class="lv-badge-lbl">Countries</div></div>
          </div>
          <div class="lv-badge lv-badge-3">
            <span class="lv-badge-icon">✊</span>
            <div><div class="lv-badge-val">8+</div><div class="lv-badge-lbl">Years</div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="lv-scroll" aria-hidden="true">
      <div class="lv-scroll-track"><div class="lv-scroll-dot" /></div>
      <span class="lv-scroll-label">Scroll</span>
    </div>
  </section>
</template>

<script setup lang="ts">
const memberPhotos = [
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&q=80&auto=format&fit=crop&crop=face',
]
</script>

<style scoped>
.lv-hero {
  position: relative; min-height: 100svh;
  display: flex; align-items: center;
  overflow: hidden; background: var(--lv-crimson-d);
}
.lv-hero-bg { position: absolute; inset: 0; }
.lv-mesh {
  position: absolute; inset: -30%; width: 160%; height: 160%;
  background:
    radial-gradient(ellipse at 18% 48%, hsla(348,80%,24%,.95) 0%, transparent 52%),
    radial-gradient(ellipse at 72% 28%, hsla(348,100%,14%,.80) 0%, transparent 48%),
    radial-gradient(ellipse at 55% 78%, hsla(43,60%,54%,.14)   0%, transparent 44%),
    radial-gradient(ellipse at 30% 15%, hsl(348,100%,5%)        0%, transparent 58%);
  animation: meshDrift 16s ease-in-out infinite alternate;
}
@keyframes meshDrift { from { transform: translate(0,0) scale(1); } to { transform: translate(-2%,1.5%) scale(1.04); } }
.lv-noise { position: absolute; inset: 0; opacity: .4; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }

.lv-orbs { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.lv-orb  { position: absolute; border-radius: 50%; filter: blur(100px); }
.lv-orb-gold { width: 500px; height: 500px; background: radial-gradient(circle, hsla(43,60%,54%,.22) 0%, transparent 68%); top: -12%; left: -8%; animation: orbDrift 15s ease-in-out infinite alternate; }
.lv-orb-deep { width: 360px; height: 360px; background: radial-gradient(circle, hsla(348,100%,6%,.9) 0%, transparent 68%); bottom: 5%; right: 5%; animation: orbDrift 11s ease-in-out infinite alternate-reverse; }
@keyframes orbDrift { from { transform: translate(0,0) scale(1); } to { transform: translate(22px,-18px) scale(1.08); } }

.lv-hero-grid {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto;
  padding: 130px 24px 90px;
  display: grid; grid-template-columns: 1.1fr .9fr;
  gap: 56px; align-items: center; width: 100%;
}

.lv-eyebrow {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 10px; font-weight: 700; letter-spacing: .24em;
  text-transform: uppercase; color: var(--lv-gold);
  background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.28);
  border-radius: 999px; padding: 8px 18px; margin-bottom: 28px;
}
.lv-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--lv-gold); flex-shrink: 0; box-shadow: 0 0 8px var(--lv-gold); animation: dotPulse 2.6s ease-in-out infinite; }
@keyframes dotPulse { 0%,100% { opacity:1;transform:scale(1); } 50% { opacity:.3;transform:scale(.65); } }

.lv-h1 { font-family: var(--lv-font-d); font-size: clamp(50px,7.8vw,96px); font-weight: 900; line-height: .95; letter-spacing: -.025em; margin: 0 0 10px; }
.lv-h1-top { display: block; color: var(--lv-fg); }
.lv-h1-em  { display: block; font-style: italic; background: linear-gradient(120deg, var(--lv-gold) 0%, var(--lv-gold-bright) 55%, #f5e070 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.lv-kicker { font-family: var(--lv-font-d); font-size: clamp(18px,2.8vw,27px); font-style: italic; font-weight: 400; color: hsla(43,60%,54%,.5); margin-bottom: 24px; }
.lv-body   { font-size: clamp(15px,1.7vw,17px); color: rgba(232,220,200,.42); line-height: 1.85; margin-bottom: 36px; max-width: 500px; }

.lv-ctas { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
.lv-btn-primary {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 34px; border-radius: 12px;
  background: linear-gradient(135deg, var(--lv-gold), var(--lv-gold-bright));
  color: var(--lv-crimson-d); font-size: 16px; font-weight: 700;
  text-decoration: none; border: none; cursor: pointer;
  box-shadow: 0 4px 28px hsla(43,60%,54%,.35);
  transition: transform .26s, box-shadow .26s; white-space: nowrap;
}
.lv-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 42px hsla(43,60%,54%,.50); }
.lv-arrow-icon { width: 16px; height: 16px; flex-shrink: 0; transition: transform .24s; }
.lv-btn-primary:hover .lv-arrow-icon { transform: translateX(4px); }

.lv-btn-ghost {
  display: inline-flex; align-items: center; padding: 15px 30px; border-radius: 12px;
  background: rgba(255,255,255,.05); color: rgba(232,220,200,.7);
  font-size: 16px; font-weight: 600; text-decoration: none;
  border: 1.5px solid rgba(255,255,255,.1); transition: all .22s; white-space: nowrap;
}
.lv-btn-ghost:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.25); color: #fff; transform: translateY(-2px); }

.lv-proof { display: flex; align-items: center; gap: 14px; }
.lv-proof-faces { display: flex; align-items: center; }
.lv-proof-faces img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2.5px solid var(--lv-crimson-d); margin-left: -9px; }
.lv-proof-faces img:first-child { margin-left: 0; }
.lv-proof-text { font-size: 13px; color: rgba(232,220,200,.36); }
.lv-proof-text strong { color: var(--lv-gold); font-weight: 600; }

.lv-visual { display: flex; justify-content: center; align-items: center; }
.lv-card-scene { position: relative; width: 100%; max-width: 420px; height: 500px; }
.lv-card { position: absolute; border-radius: 20px; overflow: hidden; box-shadow: 0 28px 72px rgba(0,0,0,.58); }
.lv-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.lv-card-back  { width: 78%; height: 86%; bottom: 0; right: 0; transform: rotate(5deg); opacity: .55; border: 2px solid rgba(201,168,76,.18); z-index: 1; }
.lv-card-front { width: 84%; height: 92%; top: 0; left: 0; transform: perspective(800px) rotateY(-8deg) rotateX(4deg); transition: transform .55s; border: 2.5px solid rgba(201,168,76,.32); z-index: 2; overflow: visible; }
.lv-card-front:hover { transform: perspective(800px) rotateY(-2deg) rotateX(1deg) scale(1.02); }
.lv-corner { position: absolute; width: 32px; height: 32px; z-index: 3; pointer-events: none; }
.lv-corner-tl { top: 14px; left: 14px; border-top: 2px solid rgba(201,168,76,.72); border-left: 2px solid rgba(201,168,76,.72); border-radius: 6px 0 0 0; }
.lv-corner-br { bottom: 14px; right: 14px; border-bottom: 2px solid rgba(201,168,76,.72); border-right: 2px solid rgba(201,168,76,.72); border-radius: 0 0 6px 0; }
.lv-card-gloss { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(145deg, rgba(255,255,255,.11) 0%, transparent 38%, rgba(0,0,0,.1) 100%); }
.lv-card-accent { position: absolute; bottom: 12px; left: 10px; width: 50%; height: 4px; background: linear-gradient(90deg, var(--lv-gold), transparent); border-radius: 2px; z-index: 3; }

.lv-badge { position: absolute; z-index: 5; display: flex; align-items: center; gap: 10px; padding: 11px 16px; border-radius: 14px; background: hsla(348,100%,6%,.76); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(201,168,76,.30); box-shadow: 0 10px 38px rgba(0,0,0,.38); white-space: nowrap; }
.lv-badge-icon { font-size: 20px; flex-shrink: 0; }
.lv-badge-val  { font-family: var(--lv-font-d); font-size: 20px; font-weight: 700; color: var(--lv-gold); line-height: 1; }
.lv-badge-lbl  { font-size: 9px; color: rgba(232,220,200,.48); text-transform: uppercase; letter-spacing: .09em; margin-top: 2px; }
.lv-badge-1 { top: 9%;   right: -16px; animation: badgeFloat 5.2s ease-in-out infinite; }
.lv-badge-2 { bottom: 22%; left: -18px; animation: badgeFloat 6.8s ease-in-out infinite 1.4s; }
.lv-badge-3 { bottom: 5%;  right: 12%;  animation: badgeFloat 4.6s ease-in-out infinite 2.8s; }
@keyframes badgeFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-11px); } }

.lv-scroll { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 8px; }
.lv-scroll-track { width: 24px; height: 40px; border: 2px solid rgba(201,168,76,.3); border-radius: 12px; display: flex; justify-content: center; padding-top: 7px; }
.lv-scroll-dot   { width: 4px; height: 9px; border-radius: 2px; background: var(--lv-gold); animation: scrollBounce 2.2s ease-in-out infinite; }
@keyframes scrollBounce { 0%,100% { transform:translateY(0);opacity:1; } 50% { transform:translateY(12px);opacity:.25; } }
.lv-scroll-label { font-size: 9px; letter-spacing: .2em; text-transform: uppercase; color: rgba(201,168,76,.38); }

@keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeRight { from { opacity:0; transform:translateX(36px); } to { opacity:1; transform:translateX(0); } }
.lv-fade-up    { animation: fadeUp    .8s cubic-bezier(.4,0,.2,1) both; }
.lv-fade-right { animation: fadeRight .9s .2s cubic-bezier(.4,0,.2,1) both; }

@media (max-width: 960px) {
  .lv-hero-grid { grid-template-columns: 1fr; padding-top: 108px; gap: 48px; text-align: center; }
  .lv-body { max-width: 100%; }
  .lv-ctas, .lv-proof { justify-content: center; }
  .lv-visual { max-width: 340px; margin: 0 auto; }
  .lv-card-scene { max-width: 340px; height: 420px; }
}
@media (max-width: 640px) {
  .lv-hero-grid { padding: 88px 16px 60px; gap: 36px; }
  .lv-h1 { font-size: clamp(42px,13vw,56px); }
  .lv-ctas { flex-direction: column; gap: 10px; }
  .lv-btn-primary, .lv-btn-ghost { width: 100%; justify-content: center; }
  .lv-card-scene { max-width: 280px; height: 350px; }
  .lv-badge { padding: 8px 12px; border-radius: 10px; }
  .lv-badge-val { font-size: 16px; }
  .lv-badge-1 { right: -10px; }
  .lv-badge-2 { left: -8px; }
  .lv-scroll { display: none; }
}
</style>