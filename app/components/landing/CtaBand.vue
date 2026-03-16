<template>
  <section id="join" class="lv-cta">
    <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1800&q=80&auto=format&fit=crop&crop=top" alt="" class="lv-photo" />
    <div class="lv-overlay" />
    <div class="lv-noise" />
    <div class="lv-container lv-inner">
      <div class="lv-pill">Become a Member</div>
      <h2 class="lv-title">
        Stand with Us.<br/>
        <em>Make a Difference.</em>
      </h2>
      <p class="lv-body">Join TAS-FORCE. Receive your official digital membership card and stand united for justice.</p>
      <div class="lv-actions">
        <NuxtLink to="/auth/register" class="lv-btn-primary">
          Become a Member
          <svg class="lv-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </NuxtLink>
        <NuxtLink to="/get-involved" class="lv-btn-ghost">Volunteer With Us</NuxtLink>
      </div>
      <div class="lv-proof">
        <div class="lv-faces">
          <img v-for="(p, i) in memberPhotos" :key="i" :src="p" :alt="`Member ${i+1}`" />
        </div>
        <span class="lv-proof-lbl">+4,800 advocates worldwide</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const memberPhotos = [
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=80&q=80&auto=format&fit=crop&crop=face',
]
</script>

<style scoped>
.lv-cta { position: relative; overflow: hidden; padding: 120px 0; background: var(--lv-crimson-d); text-align: center; }
.lv-photo   { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 35%; opacity: .18; }
.lv-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.97) 0%, hsla(348,100%,14%,.88) 50%, hsla(348,100%,6%,.95) 100%); }
.lv-noise   { position: absolute; inset: 0; pointer-events: none; opacity: .3; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
.lv-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.lv-inner { position: relative; z-index: 2; }

.lv-pill  { display: inline-flex; font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--lv-gold); background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.28); border-radius: 999px; padding: 7px 18px; margin-bottom: 24px; }
.lv-title { font-family: var(--lv-font-d); font-size: clamp(30px,5.5vw,58px); font-weight: 900; color: var(--lv-cream); line-height: 1.1; margin-bottom: 20px; letter-spacing: -.01em; }
.lv-title em { font-style: italic; background: linear-gradient(120deg, var(--lv-gold), var(--lv-gold-bright)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.lv-body  { font-size: 17px; color: rgba(232,220,200,.44); max-width: 520px; margin: 0 auto 38px; line-height: 1.78; }

.lv-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
.lv-btn-primary { display: inline-flex; align-items: center; gap: 10px; padding: 15px 34px; border-radius: 12px; background: linear-gradient(135deg, var(--lv-gold), var(--lv-gold-bright)); color: var(--lv-crimson-d); font-size: 16px; font-weight: 700; text-decoration: none; border: none; cursor: pointer; box-shadow: 0 4px 28px hsla(43,60%,54%,.35); transition: transform .26s, box-shadow .26s; white-space: nowrap; }
.lv-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 42px hsla(43,60%,54%,.50); }
.lv-arrow { width: 16px; height: 16px; flex-shrink: 0; transition: transform .24s; }
.lv-btn-primary:hover .lv-arrow { transform: translateX(4px); }
.lv-btn-ghost { display: inline-flex; align-items: center; padding: 15px 30px; border-radius: 12px; background: rgba(255,255,255,.05); color: rgba(232,220,200,.7); font-size: 16px; font-weight: 600; text-decoration: none; border: 1.5px solid rgba(255,255,255,.1); transition: all .22s; white-space: nowrap; }
.lv-btn-ghost:hover { background: rgba(255,255,255,.1); border-color: rgba(255,255,255,.25); color: #fff; transform: translateY(-2px); }

.lv-proof { display: flex; align-items: center; justify-content: center; gap: 14px; }
.lv-faces { display: flex; align-items: center; }
.lv-faces img { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 2.5px solid var(--lv-crimson-d); margin-left: -9px; }
.lv-faces img:first-child { margin-left: 0; }
.lv-proof-lbl { font-size: 13px; color: rgba(232,220,200,.34); }

@media (max-width: 640px) {
  .lv-cta { padding: 84px 0; }
  .lv-actions { flex-direction: column; gap: 10px; }
  .lv-btn-primary, .lv-btn-ghost { width: 100%; justify-content: center; }
}
</style>