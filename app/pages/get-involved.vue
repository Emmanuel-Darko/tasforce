<template>
  <div class="pg">
    <!-- HERO -->
    <section class="ph">
      <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1600&q=85&auto=format&fit=crop" alt="Get Involved" class="ph-bg" />
      <div class="ph-overlay" />
      <div class="ph-noise" />
      <div class="container ph-inner">
        <div class="ph-eyebrow">Take Action</div>
        <h1 class="ph-title">Get Involved</h1>
        <p class="ph-sub">There are many ways to support our mission and make a real difference.</p>
      </div>
    </section>

    <!-- OPTIONS GRID -->
    <section class="pg-section">
      <div class="container">
        <div class="gi-head">
          <h2 class="gi-title">Ways to Make an Impact</h2>
          <p class="gi-lead">Choose how you want to contribute. Every action counts.</p>
        </div>
        <div class="gi-grid">
          <div v-for="o in options" :key="o.title" class="gi-card">
            <div class="gi-icon">{{ o.icon }}</div>
            <h3 class="gi-card-title">{{ o.title }}</h3>
            <p class="gi-card-desc">{{ o.desc }}</p>
            <NuxtLink :to="o.link" class="gi-cta">{{ o.cta }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="pg-cta-band">
      <div class="pg-cta-overlay" />
      <div class="container pg-cta-inner">
        <div class="pg-cta-pill">Ready to Act</div>
        <h2 class="pg-cta-title">Ready to Make a Difference?</h2>
        <p class="pg-cta-body">Join thousands of advocates standing up for justice across the world.</p>
        <NuxtLink to="/auth/register" class="pg-cta-btn">
          Become a Member
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const options = [
  { icon:'🤝', title:'Become a Member',   desc:'Join TAS-FORCE officially, receive your membership card and stand united for justice.',     link:'/auth/register', cta:'Register Now'  },
  { icon:'💪', title:'Volunteer With Us', desc:'Give your time and skills to support our campaigns, events and outreach programs.',          link:'/contact',       cta:'Get in Touch'  },
  { icon:'❤',  title:'Donate',            desc:'Your financial support funds our legal advocacy work, campaigns and support services.',      link:'/donate',        cta:'Donate Now'    },
  { icon:'📢', title:'Spread the Word',   desc:"Share our campaigns on social media and help amplify the voices of women in need.",          link:'/',              cta:'Learn How'     },
  { icon:'⚖',  title:'Legal Support',    desc:'If you are a legal professional, volunteer your expertise to support our advocacy work.',    link:'/contact',       cta:'Contact Us'    },
  { icon:'✍',  title:'Share Your Story', desc:'Have you faced injustice? Your story could help others and strengthen our campaigns.',        link:'/contact',       cta:'Get in Touch'  },
]
</script>

<style scoped>
.pg { background: var(--lv-bg, #0a0a0a); color: var(--lv-fg, #e8dcc8); font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif; }

.ph { position: relative; min-height: 380px; display: flex; align-items: center; overflow: hidden; }
.ph-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .3; }
.ph-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.97) 0%, hsla(348,85%,16%,.88) 60%, hsla(348,100%,6%,.92) 100%); }
.ph-noise { position: absolute; inset: 0; opacity: .35; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
.ph-inner { position: relative; z-index: 2; padding: 80px 0; }
.ph-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 14px; }
.ph-title   { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(32px,5vw,54px); font-weight: 900; color: hsl(40,30%,92%); margin-bottom: 10px; line-height: 1.05; }
.ph-sub     { font-size: 17px; color: rgba(232,220,200,.55); max-width: 520px; line-height: 1.7; }

.pg-section { padding: 96px 0; }
.gi-head { text-align: center; margin-bottom: 56px; }
.gi-title { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(26px,3.5vw,38px); font-weight: 700; color: var(--lv-fg, #e8dcc8); margin-bottom: 12px; }
.gi-lead  { font-size: 16px; color: rgba(232,220,200,.5); max-width: 480px; margin: 0 auto; line-height: 1.7; }

.gi-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.gi-card {
  background: var(--lv-surface, #111); border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px; padding: 36px 28px;
  text-align: center; display: flex; flex-direction: column; align-items: center;
  gap: 0; transition: transform .3s, box-shadow .3s, border-color .3s;
}
.gi-card:hover { transform: translateY(-8px); box-shadow: 0 20px 52px rgba(0,0,0,.5); border-color: rgba(201,168,76,.2); }
.gi-icon { font-size: 36px; width: 72px; height: 72px; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.2); border-radius: 18px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.gi-card-title { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: var(--lv-fg, #e8dcc8); margin-bottom: 10px; }
.gi-card-desc  { font-size: 14px; color: rgba(232,220,200,.5); line-height: 1.72; margin-bottom: 22px; flex: 1; }
.gi-cta { display: inline-flex; align-items: center; justify-content: center; padding: 10px 24px; border-radius: 10px; background: var(--lv-crimson, hsl(0,80%,28%)); color: hsl(40,30%,92%); font-size: 14px; font-weight: 600; text-decoration: none; transition: all .2s; margin-top: auto; }
.gi-cta:hover { filter: brightness(1.15); transform: translateY(-2px); }

.pg-cta-band   { position: relative; overflow: hidden; padding: 96px 0; text-align: center; background: hsl(348,100%,6%); }
.pg-cta-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.98) 0%, hsla(348,85%,16%,.9) 50%, hsl(0,80%,28%) 100%); }
.pg-cta-inner  { position: relative; z-index: 2; }
.pg-cta-pill   { display: inline-flex; font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #c9a84c; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.28); border-radius: 999px; padding: 7px 18px; margin-bottom: 20px; }
.pg-cta-title  { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(26px,4.5vw,46px); font-weight: 900; color: hsl(40,30%,92%); margin-bottom: 14px; }
.pg-cta-body   { font-size: 17px; color: rgba(245,230,208,.45); max-width: 480px; margin: 0 auto 32px; line-height: 1.75; }
.pg-cta-btn    { display: inline-flex; align-items: center; gap: 10px; padding: 15px 36px; border-radius: 12px; background: linear-gradient(135deg,#c9a84c,#e0c06a); color: hsl(348,100%,6%); font-weight: 700; font-size: 16px; text-decoration: none; box-shadow: 0 4px 28px hsla(43,60%,54%,.38); transition: transform .26s, box-shadow .26s; }
.pg-cta-btn svg { width: 16px; height: 16px; transition: transform .24s; }
.pg-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 42px hsla(43,60%,54%,.55); }
.pg-cta-btn:hover svg { transform: translateX(4px); }

@media (max-width: 768px) { .gi-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 640px) { .ph { min-height: 300px; } .ph-inner { padding: 56px 16px; } .pg-section { padding: 64px 0; } .gi-grid { grid-template-columns: 1fr; } .pg-cta-band { padding: 72px 0; } }
</style>