<template>
  <div>
    <!-- ── HERO ── -->
    <section class="hero">
      <img
        src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1600&q=80&auto=format&fit=crop"
        alt="Women advocates"
        class="hero-bg-img"
      />
      <div class="hero-overlay" />
      <div class="hero-content">
        <div style="max-width:640px;">
          <div class="eyebrow">Truth and Advocacy for Women</div>
          <h1 class="hero-title">Justice for Her.</h1>
          <div class="hero-sub">Accountability for All.</div>
          <p class="hero-body">Fighting for the rights of women facing injustice in society and marriage. We raise awareness, promote accountability, and challenge corruption in legal systems.</p>
          <div class="hero-acts">
            <NuxtLink to="/auth/register" class="btn btn-gold btn-lg">Join the Fight</NuxtLink>
            <NuxtLink to="/about"         class="btn btn-outline-cream btn-lg">Learn More</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PILLARS ── -->
    <div class="pillar-strip">
      <div class="container">
        <div class="pillar-grid">
          <div v-for="p in pillars" :key="p.title" class="pillar-item">
            <div class="pillar-icon">{{ p.icon }}</div>
            <div>
              <div class="pillar-title">{{ p.title }}</div>
              <div class="pillar-sub">{{ p.sub }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── ABOUT ── -->
    <section class="section">
      <div class="container">
        <div class="about-grid">
          <div class="about-img-wrap">
            <img
              src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80&auto=format&fit=crop"
              alt="Women in solidarity"
            />
            <div class="about-img-badge">
              <div v-for="(s, i) in heroStats" :key="s.label" style="display:flex;align-items:center;gap:10px;">
                <div v-if="i > 0" class="stat-bubble-sep" />
                <div class="stat-bubble">
                  <div class="stat-bubble-val">{{ s.value }}</div>
                  <div class="stat-bubble-label">{{ s.label }}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="section-eyebrow">About Tas-Force</div>
            <h2 class="section-title">Who We Are</h2>
            <p style="font-size:17px;color:var(--muted);line-height:1.8;margin-bottom:18px;">Tas-Force is an advocacy organization committed to supporting women facing injustice in society and marriage.</p>
            <p style="font-size:17px;color:var(--muted);line-height:1.8;margin-bottom:18px;">Our mission is to raise awareness, promote accountability, and challenge corruption in legal and judicial systems.</p>
            <p style="font-size:17px;color:var(--muted);line-height:1.8;margin-bottom:28px;">We advocate for reforms that protect the rights and dignity of modern-day women.</p>
            <div class="org-stats" style="margin-bottom:28px;">
              <div v-for="s in orgStats" :key="s.label" class="org-stat">
                <div class="org-stat-val">{{ s.value }}</div>
                <div class="org-stat-label">{{ s.label }}</div>
              </div>
            </div>
            <NuxtLink to="/about" class="btn btn-crimson">Read More About Us</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CAMPAIGNS ── -->
    <section class="section section-bg">
      <div class="container">
        <div style="text-align:center;margin-bottom:48px;">
          <div class="section-eyebrow center">Our Campaigns</div>
          <h2 class="section-title" style="color:var(--crimson);">What We Fight For</h2>
          <p style="font-size:17px;color:var(--muted);max-width:520px;margin:0 auto;line-height:1.7;">Three pillars of advocacy driving real change for women everywhere.</p>
        </div>
        <div class="campaign-grid">
          <div v-for="c in campaigns" :key="c.title" class="campaign-card">
            <img :src="c.img" :alt="c.title" class="campaign-card-img" />
            <div class="campaign-card-body">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;">Campaign</div>
              <div class="campaign-card-title">{{ c.title }}</div>
              <div class="campaign-card-sub">{{ c.sub }}</div>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:36px;">
          <NuxtLink to="/campaigns" class="btn btn-crimson">View All Campaigns</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── MEMBERSHIP CTA ── -->
    <section class="section section-dark">
      <div class="container" style="text-align:center;">
        <div class="section-eyebrow center" style="color:var(--gold);">Become a Member</div>
        <h2 style="font-family:'Playfair Display',serif;font-size:clamp(26px,4vw,40px);color:var(--cream);margin-bottom:16px;font-weight:700;">Stand with Us. Make a Difference.</h2>
        <p style="font-size:17px;color:rgba(245,230,208,0.55);max-width:540px;margin:0 auto 32px;line-height:1.75;">Join TAS-FORCE as an advocate. Receive your official digital membership card and stand united for justice.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <NuxtLink to="/auth/register" class="btn btn-gold btn-lg">Become a Member</NuxtLink>
          <NuxtLink to="/get-involved"  class="btn btn-outline-cream btn-lg">Volunteer With Us</NuxtLink>
        </div>
        <!-- Member photos strip -->
        <div style="display:flex;align-items:center;justify-content:center;gap:0;margin-top:36px;">
          <div v-for="(m, i) in memberPhotos" :key="i"
            :style="`width:42px;height:42px;border-radius:50%;overflow:hidden;border:2px solid var(--crimson-mid);margin-left:${i>0?'-10px':'0'};z-index:${10-i};`">
            <img :src="m" alt="member" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <div style="margin-left:10px;font-size:14px;color:rgba(245,230,208,0.55);">+4,800 members worldwide</div>
        </div>
      </div>
    </section>

    <!-- ── CONTACT & NEWS STRIP ── -->
    <section class="section-sm" style="background:var(--white);border-top:1px solid var(--border-light);">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:40px;" class="contact-grid">
          <div>
            <h3 style="font-family:'Playfair Display',serif;font-size:21px;color:var(--crimson);margin-bottom:18px;">Contact Us</h3>
            <div v-for="[icon,val] in contactItems" :key="val" style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div style="width:36px;height:36px;border-radius:8px;background:rgba(107,15,26,0.07);display:flex;align-items:center;justify-content:center;font-size:15px;flex-shrink:0;">{{ icon }}</div>
              <span style="font-size:16px;color:var(--text-mid);">{{ val }}</span>
            </div>
          </div>
          <div>
            <h3 style="font-family:'Playfair Display',serif;font-size:21px;color:var(--crimson);margin-bottom:18px;">Latest News</h3>
            <div v-for="n in news" :key="n.title" style="padding:14px 0;border-bottom:1px solid var(--border-light);display:flex;gap:14px;align-items:flex-start;">
              <div style="width:42px;height:42px;border-radius:8px;background:rgba(107,15,26,0.07);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">📰</div>
              <div>
                <div style="font-size:15px;font-weight:600;color:var(--text);line-height:1.4;margin-bottom:3px;">{{ n.title }}</div>
                <div style="font-size:12px;color:var(--muted2);">{{ n.date }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const pillars = [
  { icon:'⚖', title:'Legal Advocacy',   sub:'Challenging corrupt legal practices' },
  { icon:'✊', title:"Women's Rights",   sub:'Empowering and educating women' },
  { icon:'♡', title:'Support Services', sub:'Assisting women in need' },
]
const heroStats = [
  { value:'5K+',  label:'Members' },
  { value:'12',   label:'Campaigns' },
  { value:'40+',  label:'Countries' },
]
const orgStats = [
  { value:'5,000+', label:'Lives Impacted' },
  { value:'12',     label:'Active Campaigns' },
  { value:'8+',     label:'Years of Service' },
  { value:'40+',    label:'Countries Reached' },
]
const campaigns = [
  {
    title: 'End Legal Corruption',
    sub: 'Demanding Fair Justice',
    img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Equal Rights for Women',
    sub: 'Advocating for Change',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&q=80&auto=format&fit=crop',
  },
  {
    title: 'Support for Victims',
    sub: 'Providing Help & Hope',
    img: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80&auto=format&fit=crop',
  },
]
const memberPhotos = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&crop=face',
]
const contactItems = [['📞','+123-456-7890'],['✉','info@tas-force.org'],['🌐','www.tas-force.org']]
const news = [
  { title:'Justice for Akosua: Latest Updates',        date:'April 18, 2024' },
  { title:'Fighting Corrupt Judges: A Call to Action', date:'April 10, 2024' },
  { title:'New Support Centre Opens in Accra',          date:'March 22, 2024' },
]
</script>
