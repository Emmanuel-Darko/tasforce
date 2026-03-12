<template>
  <div class="home">

    <!-- ── HERO ── -->
    <section class="hero">
      <img
        src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1600&q=80&auto=format&fit=crop"
        alt="Women advocates"
        class="hero-bg-img"
      />
      <div class="hero-overlay" />
      <div class="hero-particles">
        <div v-for="i in 6" :key="i" :class="`hero-particle hero-particle-${i}`" />
      </div>
      <div class="hero-content">
        <div class="hero-inner">
          <div class="eyebrow">Truth and Advocacy for Women</div>
          <h1 class="hero-title">Justice<br/><em>for Her.</em></h1>
          <div class="hero-sub">Accountability for All.</div>
          <p class="hero-body">Fighting for the rights of women facing injustice in society and marriage. We raise awareness, promote accountability, and challenge corruption in legal systems.</p>
          <div class="hero-acts">
            <NuxtLink to="/auth/register" class="btn btn-gold btn-lg hero-btn-primary">Join the Fight</NuxtLink>
            <NuxtLink to="/about" class="btn btn-outline-cream btn-lg">Learn More</NuxtLink>
          </div>
          <!-- Floating trust badges -->
          <div class="hero-trust">
            <div v-for="s in heroStats" :key="s.label" class="hero-trust-item">
              <div class="hero-trust-val">{{ s.value }}</div>
              <div class="hero-trust-label">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- Scroll indicator -->
      <div class="hero-scroll">
        <div class="hero-scroll-dot" />
      </div>
    </section>

    <!-- ── PILLAR STRIP ── -->
    <div class="pillar-strip">
      <div class="container">
        <div class="pillar-grid">
          <div v-for="p in pillars" :key="p.title" class="pillar-item">
            <div class="pillar-icon-wrap">
              <div class="pillar-icon">{{ p.icon }}</div>
            </div>
            <div>
              <div class="pillar-title">{{ p.title }}</div>
              <div class="pillar-sub">{{ p.sub }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── ABOUT / WHO WE ARE ── -->
    <section class="about-v2">
      <div class="container">
        <div class="about-v2-grid">
          <!-- Image side -->
          <div class="about-v2-images">
            <div class="about-v2-img about-v2-img-main">
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80&auto=format&fit=crop"
                alt="Women empowerment"
              />
            </div>
            <div class="about-v2-img about-v2-img-secondary">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80&auto=format&fit=crop"
                alt="Team collaboration"
              />
            </div>
            <!-- Floating badge -->
            <div class="about-v2-badge">
              <div class="about-v2-badge-val">8+</div>
              <div class="about-v2-badge-label">Years of<br/>Service</div>
            </div>
            <!-- Decorative elements -->
            <div class="about-v2-dots" />
          </div>
          <!-- Text side -->
          <div class="about-v2-text">
            <div class="section-eyebrow">About Tas-Force</div>
            <h2 class="section-title" style="margin-bottom:20px;">Who We Are</h2>
            <p class="about-v2-body">TAS-FORCE is a fearless advocacy organization committed to supporting women facing injustice in society and marriage. We raise awareness, promote accountability, and challenge corruption in legal and judicial systems.</p>
            <p class="about-v2-body" style="margin-bottom:32px;">We advocate for reforms that protect the rights and dignity of modern-day women — giving every woman a voice that cannot be silenced.</p>
            <div class="about-v2-stats">
              <div v-for="s in orgStats" :key="s.label" class="about-v2-stat">
                <div class="about-v2-stat-icon">{{ s.icon }}</div>
                <div>
                  <div class="about-v2-stat-val">{{ s.value }}</div>
                  <div class="about-v2-stat-label">{{ s.label }}</div>
                </div>
              </div>
            </div>
            <NuxtLink to="/about" class="btn btn-crimson" style="margin-top:28px;">Read More About Us</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ── IMPACT BANNER ── -->
    <div class="impact-banner">
      <div class="container">
        <div class="impact-inner">
          <div class="impact-quote">
            <div class="impact-quote-mark">"</div>
            <p class="impact-quote-text">Every woman deserves justice. Every voice deserves to be heard. We are TAS-FORCE — and we will not be silent.</p>
            <div class="impact-quote-author">— TAS-FORCE Mission Statement</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── CAMPAIGNS ── -->
    <section class="section section-bg">
      <div class="container">
        <div class="section-head center">
          <div class="section-eyebrow center">Our Campaigns</div>
          <h2 class="section-title" style="color:var(--crimson);">What We Fight For</h2>
          <p class="section-lead">Three pillars of advocacy driving real change for women everywhere.</p>
        </div>
        <div class="campaign-grid">
          <div v-for="c in campaigns" :key="c.title" class="campaign-card">
            <div class="campaign-card-img-wrap">
              <img :src="c.img" :alt="c.title" class="campaign-card-img" />
            </div>
            <div class="campaign-card-body">
              <div class="campaign-tag">Campaign</div>
              <div class="campaign-card-title">{{ c.title }}</div>
              <div class="campaign-card-sub">{{ c.sub }}</div>
              <NuxtLink to="/campaigns" class="campaign-card-link">Learn More →</NuxtLink>
            </div>
          </div>
        </div>
        <div style="text-align:center;margin-top:40px;">
          <NuxtLink to="/campaigns" class="btn btn-crimson">View All Campaigns</NuxtLink>
        </div>
      </div>
    </section>

    <!-- ── HOW IT WORKS ── -->
    <section class="hiw-v2">
      <div class="container">
        <div class="section-head center" style="margin-bottom:56px;">
          <div class="section-eyebrow center">Get Involved</div>
          <h2 class="section-title">How It Works</h2>
          <p class="section-lead">Four simple steps to join our movement.</p>
        </div>
        <div class="hiw-v2-track">
          <div class="hiw-v2-line" />
          <div v-for="(step, i) in howItWorks" :key="step.label" class="hiw-v2-card">
            <div class="hiw-v2-num">{{ i + 1 }}</div>
            <div class="hiw-v2-icon">{{ step.icon }}</div>
            <div class="hiw-v2-label">{{ step.label }}</div>
            <div class="hiw-v2-sub">{{ step.sub }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── MEMBERSHIP CTA ── -->
    <section class="section section-dark" style="position:relative;overflow:hidden;">
      <div class="cta-pattern" />
      <div class="container" style="text-align:center;position:relative;z-index:2;">
        <div class="section-eyebrow center" style="color:var(--gold);">Become a Member</div>
        <h2 class="cta-title">Stand with Us.<br/>Make a Difference.</h2>
        <p class="cta-body">Join TAS-FORCE as an advocate. Receive your official digital membership card and stand united for justice.</p>
        <div class="cta-acts">
          <NuxtLink to="/auth/register" class="btn btn-gold btn-lg">Become a Member</NuxtLink>
          <NuxtLink to="/get-involved"  class="btn btn-outline-cream btn-lg">Volunteer With Us</NuxtLink>
        </div>
        <!-- Member photos strip -->
        <div class="member-strip">
          <div class="member-avatars">
            <div v-for="(m, i) in memberPhotos" :key="i"
              :style="`width:42px;height:42px;border-radius:50%;overflow:hidden;border:2px solid var(--gold);margin-left:${i>0?'-10px':'0'};z-index:${10-i};position:relative;`">
              <img :src="m" alt="member" style="width:100%;height:100%;object-fit:cover;" />
            </div>
          </div>
          <div class="member-count">+4,800 members worldwide</div>
        </div>
      </div>
    </section>

    <!-- ── CONTACT & NEWS STRIP ── -->
    <section class="section-sm" style="background:var(--white);border-top:1px solid var(--border-light);">
      <div class="container">
        <div class="contact-grid">
          <div>
            <h3 class="contact-col-title">Contact Us</h3>
            <div v-for="[icon, val, sub] in contactItems" :key="val" class="contact-item">
              <div class="contact-icon">{{ icon }}</div>
              <div>
                <div class="contact-item-val">{{ val }}</div>
                <div class="contact-item-sub">{{ sub }}</div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="contact-col-title">Latest News</h3>
            <div v-for="n in news" :key="n.title" class="news-item">
              <div class="news-item-icon">📰</div>
              <div>
                <div class="news-item-title">{{ n.title }}</div>
                <div class="news-item-date">{{ n.date }}</div>
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
  { icon:'👩', value:'5,000+', label:'Lives Impacted' },
  { icon:'📢', value:'12',     label:'Active Campaigns' },
  { icon:'🕊',  value:'8+',    label:'Years of Service' },
  { icon:'🌍', value:'40+',   label:'Countries Reached' },
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
const howItWorks = [
  { icon:'📝', label:'Register',  sub:'Fill out your membership application online in minutes.' },
  { icon:'✅', label:'Get Approved', sub:'Our team reviews and verifies your application.' },
  { icon:'🪪', label:'Get Your Card',  sub:'Receive your official digital membership ID card.' },
  { icon:'✊', label:'Advocate',   sub:'Join campaigns, events, and our global community.' },
]
const memberPhotos = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&crop=face',
]
const contactItems = [
  ['📞', '+123-456-7890',   'Available Mon–Fri, 9am–5pm'],
  ['✉',  'info@tas-force.org', 'We reply within 24 hours'],
  ['🌐', 'www.tas-force.org',  'Visit our website'],
]
const news = [
  { title:'Justice for Akosua: Latest Updates',        date:'April 18, 2024' },
  { title:'Fighting Corrupt Judges: A Call to Action', date:'April 10, 2024' },
  { title:'New Support Centre Opens in Accra',          date:'March 22, 2024' },
]
</script>

<style scoped>
/* ── HERO ENHANCEMENTS ── */
.hero-inner { max-width: 640px; }

.hero-btn-primary {
  position: relative;
  overflow: hidden;
}
.hero-btn-primary::after {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 40%; height: 200%;
  background: rgba(255,255,255,0.18);
  transform: skewX(-20deg);
  transition: left 0.5s ease;
}
.hero-btn-primary:hover::after { left: 120%; }

/* Trust stats row */
.hero-trust {
  display: flex;
  gap: 0;
  margin-top: 40px;
  border: 1px solid rgba(201,168,76,0.2);
  border-radius: 12px;
  background: rgba(45,0,8,0.45);
  backdrop-filter: blur(10px);
  overflow: hidden;
  width: fit-content;
}
.hero-trust-item {
  padding: 14px 28px;
  text-align: center;
  position: relative;
}
.hero-trust-item + .hero-trust-item::before {
  content: '';
  position: absolute;
  left: 0; top: 20%; bottom: 20%;
  width: 1px;
  background: rgba(201,168,76,0.2);
}
.hero-trust-val   { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--gold); line-height: 1; }
.hero-trust-label { font-size: 10px; color: rgba(245,230,208,0.55); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }

/* Floating particles */
.hero-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.hero-particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(201,168,76,0.12);
  animation: floatUp 8s ease-in-out infinite;
}
.hero-particle-1 { width:8px;  height:8px;  left:10%;  bottom:-20px; animation-delay:0s;   animation-duration:9s;  }
.hero-particle-2 { width:5px;  height:5px;  left:25%;  bottom:-20px; animation-delay:1.5s; animation-duration:7s;  }
.hero-particle-3 { width:12px; height:12px; left:55%;  bottom:-20px; animation-delay:3s;   animation-duration:11s; }
.hero-particle-4 { width:6px;  height:6px;  left:70%;  bottom:-20px; animation-delay:2s;   animation-duration:8s;  }
.hero-particle-5 { width:9px;  height:9px;  left:82%;  bottom:-20px; animation-delay:4s;   animation-duration:10s; }
.hero-particle-6 { width:4px;  height:4px;  left:45%;  bottom:-20px; animation-delay:0.5s; animation-duration:6s;  }

@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 0; }
  10%  { opacity: 1; }
  90%  { opacity: 0.6; }
  100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
}

/* Scroll indicator */
.hero-scroll {
  position: absolute; bottom: 36px; left: 50%; transform: translateX(-50%);
  width: 24px; height: 38px; border: 2px solid rgba(201,168,76,0.4); border-radius: 14px;
  display: flex; justify-content: center; padding-top: 6px;
}
.hero-scroll-dot {
  width: 4px; height: 8px; border-radius: 2px; background: var(--gold);
  animation: scrollBounce 2s ease-in-out infinite;
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); opacity: 1; }
  50%       { transform: translateY(10px); opacity: 0.4; }
}

/* ── PILLAR ENHANCEMENTS ── */
.pillar-icon-wrap {
  position: relative;
  flex-shrink: 0;
}
.pillar-icon {
  width: 44px; height: 44px; border-radius: 10px;
  background: linear-gradient(135deg, rgba(107,15,26,0.09), rgba(107,15,26,0.04));
  border: 1px solid rgba(107,15,26,0.12);
  display: flex; align-items: center; justify-content: center;
  font-size: 20px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.pillar-item:hover .pillar-icon {
  transform: scale(1.1);
  box-shadow: 0 4px 14px rgba(107,15,26,0.15);
}

/* ── ABOUT V2 ── */
.about-v2 { padding: 100px 0; background: var(--white); }
.about-v2-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
.about-v2-images { position: relative; min-height: 460px; }
.about-v2-img { border-radius: 16px; overflow: hidden; box-shadow: 0 16px 48px rgba(0,0,0,0.1); }
.about-v2-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.about-v2-img-main { width: 75%; height: 380px; position: relative; z-index: 2; }
.about-v2-img-secondary { width: 55%; height: 260px; position: absolute; bottom: -10px; right: 0; z-index: 3; border: 4px solid var(--white); }
.about-v2-badge {
  position: absolute; top: 20px; right: 30px; z-index: 4;
  width: 90px; height: 90px; border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), #d4a843);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  box-shadow: 0 8px 24px rgba(201,168,76,0.4);
  animation: badgePulse 3s ease-in-out infinite;
}
.about-v2-badge-val { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: var(--crimson-deep); line-height: 1; }
.about-v2-badge-label { font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--crimson-deep); text-align: center; line-height: 1.3; margin-top: 2px; }
@keyframes badgePulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
.about-v2-dots {
  position: absolute; bottom: 30px; left: -20px; z-index: 1;
  width: 80px; height: 80px;
  background-image: radial-gradient(var(--gold) 1.5px, transparent 1.5px);
  background-size: 12px 12px;
  opacity: 0.35;
}


.about-v2-body { font-size: 16px; color: var(--muted); line-height: 1.85; margin-bottom: 14px; }
.about-v2-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.about-v2-stat {
  display: flex; align-items: center; gap: 14px;
  background: var(--parchment2); border: 1px solid var(--border); border-radius: 12px;
  padding: 18px 20px; transition: transform 0.18s, box-shadow 0.18s;
}
.about-v2-stat:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }
.about-v2-stat-icon { font-size: 26px; flex-shrink: 0; }
.about-v2-stat-val { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--crimson); line-height: 1; }
.about-v2-stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; }

/* ── IMPACT BANNER ── */
.impact-banner {
  background: linear-gradient(135deg, var(--crimson) 0%, var(--crimson-mid) 100%);
  padding: 60px 0;
  position: relative;
  overflow: hidden;
}
.impact-banner::before {
  content: '"';
  position: absolute;
  font-family: 'Playfair Display', serif;
  font-size: 400px;
  color: rgba(255,255,255,0.03);
  top: -80px; left: 40px;
  line-height: 1;
  pointer-events: none;
}
.impact-inner { display: flex; justify-content: center; }
.impact-quote { max-width: 780px; text-align: center; }
.impact-quote-mark { font-family: 'Playfair Display', serif; font-size: 80px; color: var(--gold); line-height: 0.6; margin-bottom: 20px; }
.impact-quote-text { font-family: 'Playfair Display', serif; font-size: clamp(18px, 2.8vw, 26px); font-style: italic; color: var(--cream); line-height: 1.6; margin-bottom: 18px; }
.impact-quote-author { font-size: 13px; color: rgba(245,230,208,0.55); text-transform: uppercase; letter-spacing: 0.12em; }

/* ── CAMPAIGN ENHANCEMENTS ── */
.section-head { margin-bottom: 48px; }
.section-head.center { text-align: center; }
.section-lead { font-size: 17px; color: var(--muted); max-width: 520px; margin: 0 auto; line-height: 1.7; }

.campaign-card-img-wrap { overflow: hidden; height: 65%; }
.campaign-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s cubic-bezier(0.4,0,0.2,1); }
.campaign-card:hover .campaign-card-img { transform: scale(1.06); }

.campaign-tag { font-size: 10px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
.campaign-card-link { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--gold); font-weight: 600; margin-top: 10px; letter-spacing: 0.04em; transition: gap 0.2s; }
.campaign-card-link:hover { gap: 8px; }

/* ── HOW IT WORKS V2 ── */
.hiw-v2 { padding: 100px 0; background: var(--parchment); }
.hiw-v2-track {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  position: relative;
}
.hiw-v2-line {
  position: absolute;
  top: 42px; left: 12.5%; right: 12.5%;
  height: 2px;
  border-top: 2px dashed rgba(107,15,26,0.2);
  z-index: 0;
}
.hiw-v2-card {
  background: var(--white);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  padding: 32px 22px;
  text-align: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
  transition: transform 0.25s, box-shadow 0.25s;
}
.hiw-v2-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 36px rgba(107,15,26,0.1);
}
.hiw-v2-num {
  width: 36px; height: 36px; border-radius: 50%;
  background: linear-gradient(135deg, var(--crimson), var(--crimson2));
  color: var(--cream);
  font-family: 'Playfair Display', serif;
  font-size: 16px; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 14px;
  box-shadow: 0 4px 12px rgba(107,15,26,0.3);
}
.hiw-v2-icon { font-size: 32px; margin-bottom: 12px; }
.hiw-v2-label {
  font-family: 'Playfair Display', serif;
  font-size: 17px; font-weight: 700; color: var(--crimson);
  margin-bottom: 8px;
}
.hiw-v2-sub { font-size: 14px; color: var(--muted); line-height: 1.6; }

/* ── CTA SECTION ── */
.cta-pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10S0 14.5 0 20s4.5 10 10 10 10-4.5 10-10zm10 0c0 5.5 4.5 10 10 10s10-4.5 10-10-4.5-10-10-10-10 4.5-10 10z'/%3E%3C/g%3E%3C/svg%3E");
  pointer-events: none;
}
.cta-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(28px, 4.5vw, 46px);
  color: var(--cream);
  margin-bottom: 18px;
  font-weight: 700;
  line-height: 1.15;
}
.cta-body {
  font-size: 17px;
  color: rgba(245,230,208,0.55);
  max-width: 540px;
  margin: 0 auto 36px;
  line-height: 1.75;
}
.cta-acts {
  display: flex;
  gap: 14px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.member-strip {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.member-avatars { display: flex; align-items: center; }
.member-count { font-size: 14px; color: rgba(245,230,208,0.55); }

/* ── CONTACT & NEWS ENHANCEMENTS ── */
.contact-col-title {
  font-family: 'Playfair Display', serif;
  font-size: 21px;
  color: var(--crimson);
  margin-bottom: 22px;
  font-weight: 700;
}
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  margin-bottom: 18px;
}
.contact-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  background: rgba(107,15,26,0.07);
  border: 1px solid rgba(107,15,26,0.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}
.contact-item-val { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 2px; }
.contact-item-sub { font-size: 13px; color: var(--muted2); }

.news-item {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 14px 0;
  border-bottom: 1px solid var(--border-light);
  transition: background 0.15s;
  border-radius: 8px;
  padding: 12px 10px;
  margin: 0 -10px;
}
.news-item:hover { background: var(--parchment); }
.news-item:last-child { border-bottom: none; }
.news-item-icon {
  width: 42px; height: 42px;
  border-radius: 8px;
  background: rgba(107,15,26,0.07);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
  flex-shrink: 0;
}
.news-item-title { font-size: 15px; font-weight: 600; color: var(--text); line-height: 1.4; margin-bottom: 4px; }
.news-item-date  { font-size: 12px; color: var(--muted2); }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .about-v2-grid { grid-template-columns: 1fr; gap: 40px; }
  .about-v2-images { min-height: 340px; max-width: 500px; }
  .hiw-v2-track {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .hiw-v2-line { display: none; }
}
@media (max-width: 640px) {
  .hero-trust { flex-wrap: wrap; }
  .hero-trust-item { flex: 1 1 40%; }
  .about-v2-stats { grid-template-columns: 1fr; }
  .about-v2-img-main { width: 85%; height: 280px; }
  .about-v2-img-secondary { width: 50%; height: 180px; }
  .hiw-v2-track { grid-template-columns: 1fr; }
  .hiw-v2 { padding: 60px 0; }
  .about-v2 { padding: 60px 0; }
  .impact-banner { padding: 40px 0; }
}
</style>
