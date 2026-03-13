<template>
  <div>
    <!-- Hero Banner -->
    <section class="pg-hero">
      <img src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1400&q=80&auto=format&fit=crop" alt="About TAS-FORCE" class="pg-hero-bg" />
      <div class="pg-hero-overlay" />
      <div class="container pg-hero-inner">
        <div class="pg-hero-eyebrow">Who We Are</div>
        <h1 class="pg-hero-title">About Tas-Force</h1>
        <p class="pg-hero-sub">Truth and Advocacy for Serwah &amp; Women Empowerment</p>
      </div>
    </section>

    <!-- Mission -->
    <section style="padding:80px 0;">
      <div class="container">
        <div class="pg-split">
          <div class="pg-split-text">
            <div class="section-eyebrow">Our Mission</div>
            <h2 class="section-title" style="margin-bottom:20px;">Who We Are</h2>
            <p class="pg-body">TAS-FORCE is an advocacy organization committed to supporting women facing injustice in society and marriage. We raise awareness, promote accountability, and challenge corruption in legal and judicial systems.</p>
            <p class="pg-body">Our mission is to fight for reforms that protect the rights and dignity of modern-day women — giving every woman a voice that cannot be silenced.</p>
            <blockquote class="pg-quote">
              "Justice delayed is justice denied — we fight to ensure no woman faces injustice alone."
            </blockquote>
            <h3 style="font-family:'Playfair Display',serif;font-size:20px;color:var(--crimson);margin:28px 0 14px;">Our Core Values</h3>
            <div class="pg-values">
              <div v-for="v in values" :key="v.title" class="pg-value-item">
                <div class="pg-value-icon">{{ v.icon }}</div>
                <div>
                  <div class="pg-value-title">{{ v.title }}</div>
                  <div class="pg-value-desc">{{ v.desc }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="pg-split-media">
            <div class="pg-img-stack">
              <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=500&q=80&auto=format&fit=crop" alt="TAS-FORCE advocacy" class="pg-img-main" />
              <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80&auto=format&fit=crop" alt="Community" class="pg-img-float" />
            </div>
            <div class="pg-stats-row">
              <div v-for="s in stats" :key="s.label" class="pg-stat">
                <div class="pg-stat-val">{{ s.value }}</div>
                <div class="pg-stat-label">{{ s.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do -->
    <section style="padding:80px 0;background:var(--parchment);">
      <div class="container">
        <div style="text-align:center;margin-bottom:48px;">
          <div class="section-eyebrow center">What We Do</div>
          <h2 class="section-title">Our Work</h2>
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

    <!-- CTA -->
    <section class="pg-cta">
      <div class="container" style="text-align:center;">
        <h2 style="font-family:'Playfair Display',serif;font-size:clamp(24px,4vw,36px);color:var(--cream);margin-bottom:14px;">Join Our Movement</h2>
        <p style="color:rgba(255,255,255,0.6);font-size:17px;max-width:480px;margin:0 auto 28px;line-height:1.7;">Become an official member, receive your card, and stand with thousands of advocates worldwide.</p>
        <NuxtLink to="/auth/register" class="btn btn-gold btn-lg">Apply for Membership</NuxtLink>
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
  { value:'5,000+', label:'Lives Impacted' },
  { value:'12',     label:'Active Campaigns' },
  { value:'8+',     label:'Years of Service' },
  { value:'40+',    label:'Countries Reached' },
]
const work = [
  { icon:'⚖', title:'Legal Advocacy',         desc:'We challenge corrupt legal practices and advocate for fair treatment in courts and legal institutions.' },
  { icon:'✊', title:"Women's Rights Education", desc:'We empower women with knowledge about their rights through workshops, campaigns, and outreach programs.' },
  { icon:'♡', title:'Support Services',         desc:'We provide emotional and practical support to women in crisis or facing unjust treatment.' },
]
</script>

<style scoped>
/* ── PAGE HERO ── */
.pg-hero { position:relative; min-height:340px; display:flex; align-items:center; overflow:hidden; }
.pg-hero-bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.pg-hero-overlay { position:absolute; inset:0; background:linear-gradient(135deg, rgba(26,15,61,0.88), rgba(45,27,105,0.75)); }
.pg-hero-inner { position:relative; z-index:2; padding:60px 0; }
.pg-hero-eyebrow { font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:var(--gold); margin-bottom:12px; }
.pg-hero-title { font-family:'Playfair Display',serif; font-size:clamp(32px,5vw,48px); color:var(--cream); font-weight:900; margin-bottom:8px; }
.pg-hero-sub { font-size:17px; color:rgba(255,255,255,0.6); max-width:500px; }

/* ── SPLIT LAYOUT ── */
.pg-split { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
.pg-body { font-size:16px; color:var(--muted); line-height:1.85; margin-bottom:16px; }
.pg-quote {
  background:var(--parchment); border-left:4px solid var(--gold); border-radius:0 12px 12px 0;
  padding:20px 24px; margin:24px 0; font-family:'Playfair Display',serif; font-style:italic;
  font-size:17px; color:var(--crimson); line-height:1.6;
}

/* Values */
.pg-values { display:flex; flex-direction:column; gap:14px; }
.pg-value-item { display:flex; gap:14px; align-items:flex-start; }
.pg-value-icon { font-size:22px; flex-shrink:0; margin-top:2px; }
.pg-value-title { font-weight:700; font-size:15px; color:var(--text); }
.pg-value-desc { font-size:14px; color:var(--muted); line-height:1.6; }

/* Image stack */
.pg-split-media { position: relative; }
.pg-img-stack { position:relative; margin-bottom:20px; }
.pg-img-main { width:100%; height:360px; object-fit:cover; border-radius:16px; box-shadow:var(--shadow); }
.pg-img-float { position:absolute; bottom:-20px; right:-10px; width:55%; height:200px; object-fit:cover; border-radius:12px; border:4px solid var(--white); box-shadow:var(--shadow); }

/* Stats */
.pg-stats-row { display:grid; grid-template-columns:repeat(2,1fr); gap:12px; margin-top:32px; }
.pg-stat { background:var(--white); border:1px solid var(--border); border-radius:12px; padding:18px; text-align:center; transition:transform 0.2s; }
.pg-stat:hover { transform:translateY(-3px); box-shadow:var(--shadow-sm); }
.pg-stat-val { font-family:'Playfair Display',serif; font-size:26px; font-weight:700; color:var(--crimson); }
.pg-stat-label { font-size:12px; color:var(--muted); margin-top:2px; }

/* Feature cards */
.pg-cards-3 { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
.pg-feature-card {
  background:var(--white); border:1px solid var(--border-light); border-radius:16px;
  padding:36px 28px; text-align:center; transition:transform 0.25s, box-shadow 0.25s;
}
.pg-feature-card:hover { transform:translateY(-6px); box-shadow:var(--shadow); }
.pg-feature-icon { font-size:36px; margin-bottom:16px; }
.pg-feature-card h3 { font-family:'Playfair Display',serif; font-size:19px; color:var(--crimson); margin-bottom:10px; }
.pg-feature-card p { font-size:15px; color:var(--muted); line-height:1.7; }

/* CTA */
.pg-cta { padding:80px 0; background:linear-gradient(135deg, var(--crimson-deep), var(--crimson)); position:relative; overflow:hidden; }

@media (max-width:768px) {
  .pg-split { grid-template-columns:1fr; gap:40px; }
  .pg-cards-3 { grid-template-columns:1fr; }
  .pg-hero { min-height:260px; }
  .pg-img-float { position:static; width:100%; margin-top:16px; height:180px; border:0; }
}
</style>
