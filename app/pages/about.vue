<template>
  <div class="pg">

    <!-- HERO -->
    <section class="ph">
      <img src="https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=1600&q=85&auto=format&fit=crop&crop=top" alt="About TAS-FORCE" class="ph-bg" />
      <div class="ph-overlay" />
      <div class="ph-noise" />
      <div class="container ph-inner">
        <div class="ph-eyebrow">Who We Are</div>
        <h1 class="ph-title">About TAS-FORCE</h1>
        <p class="ph-sub">Truth and Advocacy for Serwah &amp; Women Empowerment</p>
      </div>
    </section>

    <!-- MISSION -->
    <section class="pg-section">
      <div class="container">
        <div class="pg-split">

          <!-- Text -->
          <div>
            <div class="pg-eyebrow">Our Mission</div>
            <h2 class="pg-title">Who We Are</h2>
            <p class="pg-body">TAS-FORCE is a fearless advocacy organization committed to supporting women facing injustice in society and marriage. We raise awareness, promote accountability, and challenge corruption in legal and judicial systems.</p>
            <p class="pg-body">Our mission is to fight for reforms that protect the rights and dignity of modern-day women — giving every woman a voice that cannot be silenced.</p>

            <blockquote class="pg-blockquote">
              "Justice delayed is justice denied — we fight to ensure no woman faces injustice alone."
            </blockquote>

            <h3 class="pg-subheading">Our Core Values</h3>
            <div class="pg-values">
              <div v-for="v in values" :key="v.title" class="pg-value">
                <div class="pg-value-icon">{{ v.icon }}</div>
                <div>
                  <div class="pg-value-title">{{ v.title }}</div>
                  <div class="pg-value-desc">{{ v.desc }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Media -->
          <div class="pg-media">
            <div class="pg-img-stack">
              <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80&auto=format&fit=crop" alt="TAS-FORCE advocacy" class="pg-img-main" />
              <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=500&q=80&auto=format&fit=crop" alt="Community" class="pg-img-float" />
              <div class="pg-img-dots" />
            </div>
            <div class="pg-stats-grid">
              <div v-for="s in stats" :key="s.label" class="pg-stat">
                <div class="pg-stat-val">{{ s.value }}</div>
                <div class="pg-stat-label">{{ s.label }}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- WHAT WE DO -->
    <section class="pg-section pg-section--alt">
      <div class="container">
        <div class="pg-section-head">
          <div class="pg-eyebrow">What We Do</div>
          <h2 class="pg-title">Our Work</h2>
        </div>
        <div class="pg-cards-3">
          <div v-for="w in work" :key="w.title" class="pg-feature-card">
            <div class="pg-feature-icon">{{ w.icon }}</div>
            <h3>{{ w.title }}</h3>
            <p>{{ w.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="pg-cta-band">
      <div class="pg-cta-overlay" />
      <div class="container pg-cta-inner">
        <div class="pg-cta-pill">Join the Movement</div>
        <h2 class="pg-cta-title">Become Part of the Fight</h2>
        <p class="pg-cta-body">Become an official member, receive your card, and stand with thousands of advocates worldwide.</p>
        <NuxtLink to="/auth/register" class="pg-cta-btn">
          Apply for Membership
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const values = [
  { icon:'⚖', title:'Truth',          desc:'Committed to exposing injustice through facts and evidence.' },
  { icon:'🤝', title:'Solidarity',     desc:'Standing united with every woman facing unfair treatment.' },
  { icon:'📢', title:'Accountability', desc:'Demanding responsibility from those who abuse power.' },
  { icon:'✊', title:'Dignity',         desc:'Every woman deserves respect, justice, and equality.' },
]
const stats = [
  { value:'5,000+', label:'Lives Impacted'    },
  { value:'12',     label:'Active Campaigns'  },
  { value:'8+',     label:'Years of Service'  },
  { value:'40+',    label:'Countries Reached' },
]
const work = [
  { icon:'⚖', title:'Legal Advocacy',           desc:'We challenge corrupt legal practices and advocate for fair treatment in courts and legal institutions.' },
  { icon:'✊', title:"Women's Rights Education",  desc:'We empower women with knowledge about their rights through workshops, campaigns, and outreach programs.' },
  { icon:'♡', title:'Support Services',           desc:'We provide emotional and practical support to women in crisis or facing unjust treatment.' },
]
</script>

<style scoped>
.pg { background: var(--lv-bg, #0a0a0a); color: var(--lv-fg, #e8dcc8); font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif; }

/* HERO */
.ph { position: relative; min-height: 400px; display: flex; align-items: center; overflow: hidden; }
.ph-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; opacity: .35; }
.ph-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.97) 0%, hsla(348,85%,16%,.88) 60%, hsla(348,100%,6%,.92) 100%); }
.ph-noise { position: absolute; inset: 0; opacity: .35; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
.ph-inner { position: relative; z-index: 2; padding: 80px 0; }
.ph-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--lv-gold, #c9a84c); margin-bottom: 14px; }
.ph-title   { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(32px,5vw,54px); font-weight: 900; color: var(--lv-cream, #f5e6d0); margin-bottom: 10px; line-height: 1.05; }
.ph-sub     { font-size: 17px; color: rgba(232,220,200,.55); max-width: 520px; line-height: 1.7; }

/* SECTIONS */
.pg-section { padding: 96px 0; background: var(--lv-bg, #0a0a0a); }
.pg-section--alt { background: var(--lv-surface, #111111); }
.pg-section-head { text-align: center; margin-bottom: 52px; }
.pg-eyebrow  { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .2em; color: var(--lv-gold, #c9a84c); margin-bottom: 10px; display: block; }
.pg-title    { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(26px,3.5vw,38px); font-weight: 700; color: var(--lv-fg, #e8dcc8); margin-bottom: 18px; line-height: 1.15; }
.pg-subheading { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 20px; color: var(--lv-gold, #c9a84c); margin: 28px 0 14px; }
.pg-body     { font-size: 16px; color: rgba(232,220,200,.55); line-height: 1.85; margin-bottom: 16px; }

.pg-blockquote {
  background: rgba(201,168,76,.08);
  border-left: 3px solid var(--lv-gold, #c9a84c);
  border-radius: 0 12px 12px 0;
  padding: 20px 24px; margin: 24px 0;
  font-family: 'Fraunces', 'Playfair Display', serif;
  font-style: italic; font-size: 17px;
  color: var(--lv-gold, #c9a84c); line-height: 1.6;
}

/* Split layout */
.pg-split { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: start; }

/* Values */
.pg-values { display: flex; flex-direction: column; gap: 16px; }
.pg-value   { display: flex; gap: 16px; align-items: flex-start; padding: 16px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06); border-radius: 12px; transition: background .18s; }
.pg-value:hover { background: rgba(201,168,76,.06); border-color: rgba(201,168,76,.15); }
.pg-value-icon  { font-size: 22px; flex-shrink: 0; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: rgba(201,168,76,.1); border-radius: 10px; border: 1px solid rgba(201,168,76,.2); }
.pg-value-title { font-weight: 700; font-size: 15px; color: var(--lv-fg, #e8dcc8); margin-bottom: 3px; }
.pg-value-desc  { font-size: 13px; color: rgba(232,220,200,.5); line-height: 1.6; }

/* Image stack */
.pg-media { position: relative; }
.pg-img-stack { position: relative; margin-bottom: 24px; }
.pg-img-main  { width: 100%; height: 380px; object-fit: cover; border-radius: 18px; box-shadow: 0 20px 56px rgba(0,0,0,.5); }
.pg-img-float { position: absolute; bottom: -20px; right: -12px; width: 55%; height: 210px; object-fit: cover; border-radius: 14px; border: 4px solid var(--lv-bg, #0a0a0a); box-shadow: 0 12px 40px rgba(0,0,0,.45); }
.pg-img-dots  { position: absolute; bottom: 30px; left: -18px; z-index: -1; width: 80px; height: 80px; opacity: .2; background-image: radial-gradient(#c9a84c 1.8px, transparent 1.8px); background-size: 13px 13px; }

/* Stats */
.pg-stats-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-top: 36px; }
.pg-stat { background: var(--lv-surface, #111); border: 1px solid rgba(255,255,255,.07); border-radius: 14px; padding: 20px; text-align: center; transition: transform .2s, box-shadow .2s; }
.pg-stat:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(0,0,0,.35); }
.pg-stat-val   { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 28px; font-weight: 700; color: var(--lv-gold, #c9a84c); line-height: 1; margin-bottom: 4px; }
.pg-stat-label { font-size: 12px; color: rgba(232,220,200,.45); }

/* Feature cards */
.pg-cards-3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.pg-feature-card {
  background: var(--lv-bg, #0a0a0a); border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px; padding: 36px 28px; text-align: center;
  transition: transform .25s, box-shadow .25s, border-color .25s;
}
.pg-feature-card:hover { transform: translateY(-8px); box-shadow: 0 20px 52px rgba(0,0,0,.5); border-color: rgba(201,168,76,.2); }
.pg-feature-icon { font-size: 38px; margin-bottom: 18px; width: 68px; height: 68px; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.2); border-radius: 18px; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
.pg-feature-card h3 { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 19px; color: var(--lv-fg, #e8dcc8); margin-bottom: 10px; }
.pg-feature-card p  { font-size: 15px; color: rgba(232,220,200,.5); line-height: 1.7; }

/* CTA BAND */
.pg-cta-band  { position: relative; overflow: hidden; padding: 96px 0; background: hsl(348,100%,6%); text-align: center; }
.pg-cta-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.98) 0%, hsla(348,85%,16%,.9) 50%, hsla(0,80%,28%,.85) 100%); }
.pg-cta-inner { position: relative; z-index: 2; }
.pg-cta-pill  { display: inline-flex; font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--lv-gold, #c9a84c); background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.28); border-radius: 999px; padding: 7px 18px; margin-bottom: 20px; }
.pg-cta-title { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(26px,4.5vw,46px); font-weight: 900; color: hsl(40,30%,92%); margin-bottom: 14px; line-height: 1.15; }
.pg-cta-body  { font-size: 17px; color: rgba(245,230,208,.45); max-width: 480px; margin: 0 auto 32px; line-height: 1.75; }
.pg-cta-btn   {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 36px; border-radius: 12px;
  background: linear-gradient(135deg, #c9a84c, #e0c06a);
  color: hsl(348,100%,6%); font-weight: 700; font-size: 16px;
  text-decoration: none; border: none; cursor: pointer;
  box-shadow: 0 4px 28px hsla(43,60%,54%,.38);
  transition: transform .26s, box-shadow .26s;
}
.pg-cta-btn svg { width: 16px; height: 16px; transition: transform .24s; }
.pg-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 42px hsla(43,60%,54%,.55); }
.pg-cta-btn:hover svg { transform: translateX(4px); }

/* RESPONSIVE */
@media (max-width: 900px) {
  .pg-split { grid-template-columns: 1fr; gap: 48px; }
  .pg-cards-3 { grid-template-columns: 1fr 1fr; gap: 18px; }
  .pg-section { padding: 72px 0; }
}
@media (max-width: 640px) {
  .ph { min-height: 300px; }
  .ph-inner { padding: 56px 16px; }
  .pg-cards-3 { grid-template-columns: 1fr; }
  .pg-section { padding: 56px 0; }
  .pg-stats-grid { grid-template-columns: 1fr 1fr; }
  .pg-img-float { position: static; width: 100%; margin-top: 16px; height: 200px; border: none; }
  .pg-cta-band { padding: 72px 0; }
}
</style>