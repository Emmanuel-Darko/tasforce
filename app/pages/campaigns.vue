<template>
  <div>
    <section class="pg-hero pg-hero--padded">
      <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1400&q=80&auto=format&fit=crop" alt="Our Campaigns" class="pg-hero-bg" />
      <div class="pg-hero-overlay" />
      <div class="container pg-hero-inner">
        <div class="pg-hero-eyebrow">What We Fight For</div>
        <h1 class="pg-hero-title">Our Campaigns</h1>
        <p class="pg-hero-sub">Active campaigns driving change for women across the world.</p>
      </div>
    </section>

    <section style="padding:80px 0;">
      <div class="container">
        <div class="camp-grid">
          <div v-for="c in campaigns" :key="c.title" class="camp-card">
            <div class="camp-card-img">
              <img :src="c.img" :alt="c.title" />
              <span class="camp-badge"><span class="bdot" />Active</span>
            </div>
            <div class="camp-card-body">
              <div class="camp-card-icon">{{ c.icon }}</div>
              <h3>{{ c.title }}</h3>
              <p>{{ c.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pg-cta">
      <div class="container" style="text-align:center;">
        <h2 style="font-family:'Playfair Display',serif;font-size:clamp(24px,4vw,36px);color:var(--cream);margin-bottom:14px;">Support Our Campaigns</h2>
        <p style="color:rgba(255,255,255,0.6);font-size:17px;max-width:480px;margin:0 auto 28px;line-height:1.7;">Join the fight for justice. Every voice makes a difference.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <NuxtLink to="/auth/register" class="btn btn-gold btn-lg">Join the Movement</NuxtLink>
          <NuxtLink to="/donate" class="btn btn-outline-cream btn-lg">Donate Now</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const campaigns = [
  { icon:'⚖', title:'End Legal Corruption',       desc:'Challenging corrupt practices in legal institutions and demanding fair, transparent judicial processes for all women.',    img:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80&auto=format&fit=crop' },
  { icon:'✊', title:'Equal Rights for Women',      desc:'Advocating for legislative reforms that guarantee equal rights, protection and dignity for women in all spheres of life.', img:'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=600&q=80&auto=format&fit=crop' },
  { icon:'♡', title:'Support for Victims',          desc:'Providing practical and emotional support services to women who have experienced domestic violence and judicial injustice.', img:'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80&auto=format&fit=crop' },
  { icon:'📢', title:'Public Awareness Campaigns',  desc:'Raising public consciousness about women\'s rights through media, events, and educational outreach programs.',            img:'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=600&q=80&auto=format&fit=crop' },
  { icon:'🏛', title:'Judicial Reform Initiative',  desc:'Working with lawmakers and civil society to push for systemic reforms in how the legal system handles cases involving women.', img:'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=600&q=80&auto=format&fit=crop' },
  { icon:'🌍', title:'International Advocacy',       desc:'Connecting with global human rights organizations to bring international attention and pressure to local injustices.',       img:'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&q=80&auto=format&fit=crop' },
]
</script>

<style scoped>
.pg-hero { position:relative; min-height:340px; display:flex; align-items:center; overflow:hidden; }
.pg-hero-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.pg-hero-overlay { position:absolute; inset:0; background:linear-gradient(135deg, rgba(26,15,61,0.88), rgba(45,27,105,0.75)); }
.pg-hero-inner { position:relative; z-index:2; padding:60px 0; }
.pg-hero-eyebrow { font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
.pg-hero-title { font-family:'Playfair Display',serif; font-size:clamp(32px,5vw,48px); color:var(--cream); font-weight:900; margin-bottom:8px; }
.pg-hero-sub { font-size:17px; color:rgba(255,255,255,0.6); max-width:500px; }

.camp-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:28px; }
.camp-card {
  background:var(--white); border:1px solid var(--border-light); border-radius:16px;
  overflow:hidden; transition:transform 0.25s, box-shadow 0.25s;
}
.camp-card:hover { transform:translateY(-6px); box-shadow:var(--shadow); }
.camp-card-img { position:relative; height:200px; overflow:hidden; }
.camp-card-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
.camp-card:hover .camp-card-img img { transform:scale(1.05); }
.camp-badge {
  position:absolute; top:14px; right:14px; background:rgba(45,106,79,0.9); color:#fff;
  font-size:11px; font-weight:700; padding:5px 12px; border-radius:20px;
  display:flex; align-items:center; gap:5px; letter-spacing:0.06em;
}
.camp-card-body { padding:24px 28px; }
.camp-card-icon { font-size:28px; margin-bottom:10px; }
.camp-card-body h3 { font-family:'Playfair Display',serif; font-size:20px; color:var(--crimson); margin-bottom:10px; }
.camp-card-body p { font-size:15px; color:var(--muted); line-height:1.7; }

.pg-cta { padding:80px 0; background:linear-gradient(135deg, var(--crimson-deep), var(--crimson)); }

@media (max-width:768px) {
  .camp-grid { grid-template-columns:1fr; }
  .pg-hero { min-height:260px; }
}
@media (max-width: 600px) {
  .pg-hero--padded .pg-hero-inner {
    padding: 40px 18px !important;
  }
}
</style>
