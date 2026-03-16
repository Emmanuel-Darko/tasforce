<template>
  <section id="about" class="lv-about">
    <div class="lv-container">
      <div class="lv-grid">
        <!-- Image collage -->
        <div class="lv-images">
          <div class="lv-img-main">
            <img src="https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=800&q=85&auto=format&fit=crop" alt="Women empowerment" />
            <div class="lv-img-ribbon">Advocacy in Action</div>
          </div>
          <div class="lv-img-secondary">
            <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80&auto=format&fit=crop" alt="Community" />
          </div>
          <div class="lv-dots" />
          <div class="lv-years-badge">
            <span class="lv-years-num">8+</span>
            <span class="lv-years-lbl">Years of<br/>Service</span>
          </div>
        </div>

        <!-- Text -->
        <div class="lv-text">
          <span class="lv-eyebrow">About TAS-FORCE</span>
          <h2 class="lv-title">Fighting for Women's Rights Across Africa</h2>
          <p class="lv-p">TAS-FORCE is a fearless advocacy organization committed to supporting women facing injustice in society and marriage. We raise awareness, promote accountability, and challenge corruption in legal and judicial systems.</p>
          <p class="lv-p">We advocate for reforms that protect the rights and dignity of modern-day women — giving every woman a voice that cannot be silenced.</p>

          <div class="lv-stats">
            <div v-for="s in orgStats" :key="s.label" class="lv-stat">
              <span class="lv-stat-icon">{{ s.icon }}</span>
              <div>
                <div class="lv-stat-val">{{ s.value }}</div>
                <div class="lv-stat-lbl">{{ s.label }}</div>
              </div>
            </div>
          </div>

          <div class="lv-actions">
            <NuxtLink to="/about" class="lv-btn-crimson">Our Story</NuxtLink>
            <NuxtLink to="/get-involved" class="lv-btn-border">Get Involved</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const orgStats = [
  { icon: '⚖️', value: '5,000+', label: 'Lives Impacted'    },
  { icon: '📣', value: '12',     label: 'Active Campaigns'  },
  { icon: '⏳', value: '8+',     label: 'Years of Service'  },
  { icon: '🌐', value: '40+',    label: 'Countries Reached' },
]
</script>

<style scoped>
.lv-about { padding: 96px 0; background: var(--lv-bg); }
.lv-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.lv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }

.lv-images { position: relative; min-height: 500px; }
.lv-img-main { position: relative; z-index: 2; width: 72%; height: 400px; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 56px rgba(0,0,0,.5); }
.lv-img-main img { width: 100%; height: 100%; object-fit: cover; display: block; }
.lv-img-ribbon { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(90deg, var(--lv-crimson), hsl(348,85%,16%)); color: var(--lv-cream); text-align: center; font-size: 10px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; padding: 11px; }
.lv-img-secondary { position: absolute; bottom: -14px; right: 0; width: 56%; height: 275px; border-radius: 16px; overflow: hidden; border: 5px solid var(--lv-bg); box-shadow: 0 14px 42px rgba(0,0,0,.4); z-index: 3; }
.lv-img-secondary img { width: 100%; height: 100%; object-fit: cover; display: block; }
.lv-dots { position: absolute; bottom: 34px; left: -22px; z-index: 1; width: 90px; height: 90px; opacity: .25; background-image: radial-gradient(var(--lv-gold) 1.8px, transparent 1.8px); background-size: 13px 13px; }

.lv-years-badge { position: absolute; top: 16px; right: 14px; z-index: 5; width: 90px; height: 90px; border-radius: 50%; background: linear-gradient(135deg, var(--lv-gold), var(--lv-gold-bright)); display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 10px 32px hsla(43,60%,54%,.52); animation: yearsGlow 4s ease-in-out infinite; }
@keyframes yearsGlow { 0%,100% { box-shadow: 0 10px 32px hsla(43,60%,54%,.52); transform: scale(1); } 50% { box-shadow: 0 14px 44px hsla(43,60%,54%,.74); transform: scale(1.05); } }
.lv-years-num { font-family: var(--lv-font-d); font-size: 27px; font-weight: 900; color: var(--lv-crimson-d); line-height: 1; }
.lv-years-lbl { font-size: 9px; text-transform: uppercase; letter-spacing: .06em; color: var(--lv-crimson-d); text-align: center; line-height: 1.35; margin-top: 3px; }

.lv-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .2em; color: var(--lv-gold); margin-bottom: 12px; display: block; }
.lv-title   { font-family: var(--lv-font-d); font-size: clamp(26px,3.5vw,38px); font-weight: 700; color: var(--lv-fg); margin-bottom: 18px; line-height: 1.15; }
.lv-p { font-size: 16px; color: rgba(232,220,200,.55); line-height: 1.85; margin-bottom: 16px; }

.lv-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 28px 0 10px; }
.lv-stat  { display: flex; align-items: center; gap: 14px; background: var(--lv-surface); border: 1px solid var(--lv-border); border-radius: 14px; padding: 16px 18px; transition: transform .18s, box-shadow .18s; }
.lv-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,.3); }
.lv-stat-icon { font-size: 24px; flex-shrink: 0; }
.lv-stat-val  { font-family: var(--lv-font-d); font-size: 24px; font-weight: 700; color: var(--lv-gold); line-height: 1; }
.lv-stat-lbl  { font-size: 12px; color: var(--lv-muted); margin-top: 2px; }

.lv-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }
.lv-btn-crimson { display: inline-flex; align-items: center; padding: 13px 28px; border-radius: 12px; background: var(--lv-crimson); color: var(--lv-cream); font-size: 15px; font-weight: 600; text-decoration: none; transition: all .2s; }
.lv-btn-crimson:hover { transform: translateY(-2px); filter: brightness(1.1); }
.lv-btn-border  { display: inline-flex; align-items: center; padding: 13px 28px; border-radius: 12px; background: transparent; color: rgba(232,220,200,.7); font-size: 15px; font-weight: 600; text-decoration: none; border: 1.5px solid var(--lv-border); transition: all .2s; }
.lv-btn-border:hover { background: var(--lv-surface); transform: translateY(-2px); color: var(--lv-fg); }

@media (max-width: 960px) { .lv-grid { grid-template-columns: 1fr; gap: 52px; } .lv-images { max-width: 480px; min-height: 380px; } }
@media (max-width: 640px) {
  .lv-about { padding: 64px 0; }
  .lv-img-main { width: 80%; height: 265px; }
  .lv-img-secondary { width: 52%; height: 186px; }
  .lv-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
  .lv-years-badge { width: 78px; height: 78px; }
  .lv-years-num { font-size: 22px; }
}
</style>