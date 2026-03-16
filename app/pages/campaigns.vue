<template>
  <div class="pg">
    <!-- HERO -->
    <section class="ph">
      <img src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=1600&q=85&auto=format&fit=crop&crop=top" alt="Campaigns" class="ph-bg" />
      <div class="ph-overlay" />
      <div class="ph-noise" />
      <div class="container ph-inner">
        <div class="ph-eyebrow">What We Fight For</div>
        <h1 class="ph-title">Our Campaigns</h1>
        <p class="ph-sub">Active campaigns driving change for women across the world.</p>
      </div>
    </section>

    <!-- CAMPAIGNS GRID -->
    <section class="pg-section">
      <div class="container">
        <div class="camp-grid">
          <div v-for="(c, i) in campaigns" :key="c.title" class="camp-card" :class="{ 'camp-card--featured': i === 0 }">
            <div class="camp-img-wrap">
              <img :src="c.img" :alt="c.title" class="camp-img" />
              <span class="camp-active-badge">
                <span class="camp-badge-dot" /> Active
              </span>
              <span class="camp-num">0{{ i + 1 }}</span>
            </div>
            <div class="camp-body">
              <div class="camp-icon">{{ c.icon }}</div>
              <h3 class="camp-title">{{ c.title }}</h3>
              <p class="camp-desc">{{ c.desc }}</p>
              <NuxtLink to="/get-involved" class="camp-link">
                Get Involved
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="pg-cta-band">
      <div class="pg-cta-overlay" />
      <div class="container pg-cta-inner">
        <div class="pg-cta-pill">Support Our Work</div>
        <h2 class="pg-cta-title">Stand with Us</h2>
        <p class="pg-cta-body">Join the fight for justice. Every voice makes a difference.</p>
        <div class="pg-cta-actions">
          <NuxtLink to="/auth/register" class="pg-cta-btn">
            Join the Movement
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
          </NuxtLink>
          <NuxtLink to="/donate" class="pg-cta-btn-ghost">Donate Now</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const campaigns = [
  { icon:'⚖', title:'End Legal Corruption',      desc:'Challenging corrupt practices in legal institutions and demanding fair, transparent judicial processes for all women.',    img:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=700&q=85&auto=format&fit=crop' },
  { icon:'✊', title:'Equal Rights for Women',    desc:'Advocating for legislative reforms that guarantee equal rights, protection and dignity for women in all spheres of life.', img:'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=700&q=80&auto=format&fit=crop' },
  { icon:'♡', title:'Support for Victims',        desc:'Providing practical and emotional support services to women who have experienced domestic violence and judicial injustice.', img:'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80&auto=format&fit=crop' },
  { icon:'📢', title:'Public Awareness',          desc:'Raising public consciousness about women\'s rights through media, events, and educational outreach programs.',            img:'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=700&q=80&auto=format&fit=crop' },
  { icon:'🏛', title:'Judicial Reform Initiative',desc:'Working with lawmakers and civil society to push for systemic reforms in how the legal system handles cases involving women.',img:'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=700&q=80&auto=format&fit=crop' },
  { icon:'🌍', title:'International Advocacy',    desc:'Connecting with global human rights organizations to bring international attention and pressure to local injustices.',       img:'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=700&q=80&auto=format&fit=crop' },
]
</script>

<style scoped>
.pg { background: var(--lv-bg, #0a0a0a); color: var(--lv-fg, #e8dcc8); font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif; }

.ph { position: relative; min-height: 400px; display: flex; align-items: center; overflow: hidden; }
.ph-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center 30%; opacity: .32; }
.ph-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.97) 0%, hsla(348,85%,16%,.88) 60%, hsla(348,100%,6%,.92) 100%); }
.ph-noise { position: absolute; inset: 0; opacity: .35; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
.ph-inner  { position: relative; z-index: 2; padding: 80px 0; }
.ph-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: var(--lv-gold, #c9a84c); margin-bottom: 14px; }
.ph-title   { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(32px,5vw,54px); font-weight: 900; color: hsl(40,30%,92%); margin-bottom: 10px; line-height: 1.05; }
.ph-sub     { font-size: 17px; color: rgba(232,220,200,.55); max-width: 520px; line-height: 1.7; }

.pg-section { padding: 96px 0; }

/* Campaign grid — masonry-feel 2 cols */
.camp-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 24px; }

.camp-card {
  background: var(--lv-surface, #111); border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px; overflow: hidden;
  transition: transform .3s, box-shadow .3s, border-color .3s;
}
.camp-card:hover { transform: translateY(-8px); box-shadow: 0 24px 56px rgba(0,0,0,.55); border-color: rgba(201,168,76,.2); }
.camp-card--featured .camp-img-wrap { height: 280px; }

.camp-img-wrap { position: relative; height: 220px; overflow: hidden; }
.camp-img { width: 100%; height: 100%; object-fit: cover; opacity: .8; transition: transform .55s, opacity .4s; }
.camp-card:hover .camp-img { transform: scale(1.06); opacity: .65; }

.camp-active-badge {
  position: absolute; top: 14px; right: 14px;
  background: rgba(45,106,79,.92); color: #fff;
  font-size: 10px; font-weight: 700; padding: 5px 12px;
  border-radius: 20px; display: flex; align-items: center; gap: 6px;
  letter-spacing: .06em; backdrop-filter: blur(4px);
}
.camp-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #5de89a; flex-shrink: 0; }

.camp-num { position: absolute; bottom: 14px; left: 16px; font-family: 'Fraunces', 'Playfair Display', serif; font-size: 11px; font-weight: 700; letter-spacing: .22em; color: rgba(201,168,76,.7); }

.camp-body { padding: 26px 28px; }
.camp-icon  { font-size: 30px; width: 54px; height: 54px; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.2); border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
.camp-title { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 21px; font-weight: 700; color: var(--lv-fg, #e8dcc8); margin-bottom: 10px; }
.camp-desc  { font-size: 15px; color: rgba(232,220,200,.52); line-height: 1.75; margin-bottom: 18px; }
.camp-link  { display: inline-flex; align-items: center; gap: 7px; font-size: 14px; font-weight: 700; color: var(--lv-gold, #c9a84c); text-decoration: none; transition: gap .2s; }
.camp-link svg { width: 14px; height: 14px; transition: transform .2s; }
.camp-link:hover { gap: 10px; }
.camp-link:hover svg { transform: translateX(3px); }

/* CTA */
.pg-cta-band   { position: relative; overflow: hidden; padding: 96px 0; text-align: center; background: hsl(348,100%,6%); }
.pg-cta-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.98) 0%, hsla(348,85%,16%,.9) 50%, hsl(0,80%,28%) 100%); }
.pg-cta-inner  { position: relative; z-index: 2; }
.pg-cta-pill   { display: inline-flex; font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #c9a84c; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.28); border-radius: 999px; padding: 7px 18px; margin-bottom: 20px; }
.pg-cta-title  { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(26px,4.5vw,46px); font-weight: 900; color: hsl(40,30%,92%); margin-bottom: 14px; }
.pg-cta-body   { font-size: 17px; color: rgba(245,230,208,.45); max-width: 480px; margin: 0 auto 32px; line-height: 1.75; }
.pg-cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.pg-cta-btn    { display: inline-flex; align-items: center; gap: 10px; padding: 15px 36px; border-radius: 12px; background: linear-gradient(135deg,#c9a84c,#e0c06a); color: hsl(348,100%,6%); font-weight: 700; font-size: 16px; text-decoration: none; box-shadow: 0 4px 28px hsla(43,60%,54%,.38); transition: transform .26s, box-shadow .26s; }
.pg-cta-btn svg { width: 16px; height: 16px; transition: transform .24s; }
.pg-cta-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 42px hsla(43,60%,54%,.55); }
.pg-cta-btn:hover svg { transform: translateX(4px); }
.pg-cta-btn-ghost { display: inline-flex; align-items: center; padding: 15px 32px; border-radius: 12px; background: rgba(255,255,255,.05); color: rgba(232,220,200,.7); font-weight: 600; font-size: 16px; text-decoration: none; border: 1.5px solid rgba(255,255,255,.12); transition: all .22s; }
.pg-cta-btn-ghost:hover { background: rgba(255,255,255,.1); color: #fff; transform: translateY(-2px); }

@media (max-width: 768px) { .camp-grid { grid-template-columns: 1fr; } .ph { min-height: 300px; } }
@media (max-width: 640px) { .ph-inner { padding: 56px 16px; } .pg-section { padding: 64px 0; } .pg-cta-band { padding: 72px 0; } .pg-cta-actions { flex-direction: column; } .pg-cta-btn, .pg-cta-btn-ghost { width: 100%; justify-content: center; } }
</style>