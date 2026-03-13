<template>
  <div class="pg-home">

    <!-- ════════════════════════════════════════════════════════
         §1  HERO — Cinematic editorial split
    ═══════════════════════════════════════════════════════════ -->
    <section class="hp-hero">

      <!-- ── deep crimson mesh bg ── -->
      <div class="hp-hero-bg">
        <div class="hp-hero-mesh" />
        <div class="hp-hero-noise" />
      </div>

      <!-- ── warm gold + crimson orbs (0 purple) ── -->
      <div class="hp-orbs" aria-hidden="true">
        <div class="hp-orb hp-orb-gold"  />
        <div class="hp-orb hp-orb-deep"  />
        <div class="hp-orb hp-orb-mid"   />
      </div>

      <!-- ── layout grid ── -->
      <div class="hp-hero-grid">

        <!-- LEFT TEXT BLOCK -->
        <div class="hp-hero-copy">

          <!-- eyebrow pill -->
          <div class="hp-pill">
            <span class="hp-pill-dot" />
            Truth &amp; Advocacy for Women
          </div>

          <!-- editorial headline -->
          <h1 class="hp-h1">
            <span class="hp-h1-top">Justice</span>
            <em  class="hp-h1-em">for Her.</em>
          </h1>
          <p class="hp-kicker">Accountability for All.</p>

          <p class="hp-body">
            We stand with women facing injustice in marriage and society — raising awareness,
            demanding accountability, and challenging corruption across Africa and beyond.
          </p>

          <!-- CTAs -->
          <div class="hp-ctas">
            <NuxtLink to="/auth/register" class="hp-btn-gold">
              Join the Movement <span class="hp-arrow">→</span>
            </NuxtLink>
            <NuxtLink to="/about" class="hp-btn-ghost">Our Story</NuxtLink>
          </div>

          <!-- social proof -->
          <div class="hp-proof">
            <div class="hp-proof-faces">
              <img v-for="(p,i) in memberPhotos" :key="i" :src="p" :alt="`Member ${i+1}`" />
            </div>
            <p class="hp-proof-text">
              <strong>5,000+</strong> advocates · <strong>40+</strong> countries
            </p>
          </div>

        </div>

        <!-- RIGHT VISUAL — stacked photo + glass badges -->
        <div class="hp-hero-visual">

          <!-- large photo card with 3D tilt -->
          <div class="hp-photo-scene">
            <div class="hp-photo-card">
              <img
                src="https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=900&q=90&auto=format&fit=crop&crop=faces,top"
                alt="African women advocates"
              />
              <!-- gold corner marks -->
              <span class="hp-corner hp-corner-tl" />
              <span class="hp-corner hp-corner-br" />
              <div class="hp-photo-gloss" />
            </div>

            <!-- second card peeking behind -->
            <div class="hp-photo-card hp-photo-back">
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=700&q=80&auto=format&fit=crop&crop=faces"
                alt="Community advocates"
              />
            </div>

            <!-- floating glass stat badges -->
            <div class="hp-badge hp-badge-1">
              <span class="hp-badge-icon">⚖️</span>
              <div>
                <div class="hp-badge-val">12</div>
                <div class="hp-badge-lbl">Campaigns</div>
              </div>
            </div>

            <div class="hp-badge hp-badge-2">
              <span class="hp-badge-icon">🌍</span>
              <div>
                <div class="hp-badge-val">40+</div>
                <div class="hp-badge-lbl">Countries</div>
              </div>
            </div>

            <div class="hp-badge hp-badge-3">
              <span class="hp-badge-icon">✊</span>
              <div>
                <div class="hp-badge-val">8+</div>
                <div class="hp-badge-lbl">Years</div>
              </div>
            </div>

            <!-- gold accent line -->
            <div class="hp-photo-accent" />
          </div>
        </div>

      </div><!-- /hero-grid -->

      <!-- scroll hint -->
      <div class="hp-scroll" aria-hidden="true">
        <div class="hp-scroll-track"><div class="hp-scroll-dot" /></div>
        <span class="hp-scroll-label">Scroll</span>
      </div>

    </section>


    <!-- ════════════════════════════════════════════════════════
         §2  PILLAR STRIP — 3 brand pillars
    ═══════════════════════════════════════════════════════════ -->
    <div class="pillar-strip">
      <div class="container">
        <div class="pillar-grid">
          <div
            v-for="(p, i) in pillars"
            :key="p.title"
            class="pillar-item"
            :class="{ 'pi-bordered': i < pillars.length - 1 }"
          >
            <div class="pillar-icon">{{ p.icon }}</div>
            <div>
              <div class="pillar-title">{{ p.title }}</div>
              <div class="pillar-sub">{{ p.sub }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- ════════════════════════════════════════════════════════
         §3  WHO WE ARE — overlapping image collage
    ═══════════════════════════════════════════════════════════ -->
    <section class="hp-about">
      <div class="container">
        <div class="hp-about-grid">

          <!-- image side -->
          <div class="hp-about-imgs" aria-hidden="true">
            <div class="hp-aimg hp-aimg-main">
              <img
                src="https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=800&q=85&auto=format&fit=crop"
                alt="Women empowerment"
              />
              <!-- crimson label ribbon -->
              <div class="hp-aimg-ribbon">Advocacy in Action</div>
            </div>
            <div class="hp-aimg hp-aimg-secondary">
              <img
                src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80&auto=format&fit=crop"
                alt="Community"
              />
            </div>
            <!-- gold dot grid -->
            <div class="hp-aimg-dots" />
            <!-- years badge -->
            <div class="hp-years-badge">
              <span class="hp-years-num">8+</span>
              <span class="hp-years-lbl">Years of<br/>Service</span>
            </div>
          </div>

          <!-- text side -->
          <div class="hp-about-text">
            <div class="section-eyebrow">About TAS-FORCE</div>
            <h2 class="section-title">Fighting for Women's Rights Across Africa</h2>

            <p class="hp-about-p">
              TAS-FORCE is a fearless advocacy organization committed to supporting women
              facing injustice in society and marriage. We raise awareness, promote
              accountability, and challenge corruption in legal and judicial systems.
            </p>
            <p class="hp-about-p" style="margin-bottom:0;">
              We advocate for reforms that protect the rights and dignity of modern-day
              women — giving every woman a voice that cannot be silenced.
            </p>

            <!-- stat grid -->
            <div class="hp-about-stats">
              <div v-for="s in orgStats" :key="s.label" class="hp-astat">
                <span class="hp-astat-icon">{{ s.icon }}</span>
                <div>
                  <div class="hp-astat-val">{{ s.value }}</div>
                  <div class="hp-astat-lbl">{{ s.label }}</div>
                </div>
              </div>
            </div>

            <div class="hp-about-actions">
              <NuxtLink to="/about" class="btn btn-crimson">Our Story</NuxtLink>
              <NuxtLink to="/get-involved" class="btn btn-outline">Get Involved</NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════
         §4  IMPACT QUOTE — full-bleed crimson
    ═══════════════════════════════════════════════════════════ -->
    <div class="hp-quote-band">
      <div class="hp-qb-deco" aria-hidden="true">"</div>
      <div class="container">
        <div class="hp-qb-inner">
          <span class="hp-qb-mark">"</span>
          <blockquote class="hp-qb-text">
            Every woman deserves justice.<br class="br-md"/>
            Every voice deserves to be heard.<br/>
            We are TAS-FORCE — and we will not be silent.
          </blockquote>
          <cite class="hp-qb-cite">— TAS-FORCE Mission Statement</cite>
        </div>
      </div>
    </div>


    <!-- ════════════════════════════════════════════════════════
         §5  CAMPAIGNS — magazine asymmetric layout
    ═══════════════════════════════════════════════════════════ -->
    <section class="hp-camps section section-bg">
      <div class="container">

        <!-- section header — inline split -->
        <div class="hp-s-head">
          <div>
            <div class="section-eyebrow">Our Campaigns</div>
            <h2 class="section-title" style="margin-bottom:0;">What We Fight For</h2>
          </div>
          <NuxtLink to="/campaigns" class="btn btn-outline hp-s-cta">View All →</NuxtLink>
        </div>

        <!-- featured (tall) + two stacked -->
        <div class="hp-camps-grid">

          <div class="hp-camp hp-camp-featured">
            <img :src="campaigns[0]?.img" class="hp-camp-img" :alt="campaigns[0]?.title" />
            <div class="hp-camp-overlay">
              <span class="hp-camp-num">01</span>
              <h3 class="hp-camp-title">{{ campaigns[0]?.title }}</h3>
              <p class="hp-camp-sub">{{ campaigns[0]?.sub }}</p>
              <NuxtLink to="/campaigns" class="hp-camp-more">Learn More →</NuxtLink>
            </div>
          </div>

          <div class="hp-camps-col">
            <div
              v-for="(c, i) in campaigns.slice(1)"
              :key="c.title"
              class="hp-camp hp-camp-small"
            >
              <img :src="c.img" class="hp-camp-img" :alt="c.title" />
              <div class="hp-camp-overlay">
                <span class="hp-camp-num">0{{ i + 2 }}</span>
                <h3 class="hp-camp-title hp-camp-title-sm">{{ c.title }}</h3>
                <p class="hp-camp-sub">{{ c.sub }}</p>
                <NuxtLink to="/campaigns" class="hp-camp-more">Learn More →</NuxtLink>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════
         §6  HOW IT WORKS — numbered cards on parchment
    ═══════════════════════════════════════════════════════════ -->
    <section class="hp-hiw">
      <div class="container">
        <div class="hp-hiw-head">
          <div class="section-eyebrow center">Get Involved</div>
          <h2 class="section-title" style="text-align:center;">How It Works</h2>
          <p class="hp-hiw-lead">Four simple steps to join our global movement.</p>
        </div>

        <div class="hp-hiw-grid">
          <div class="hp-hiw-line" />
          <div v-for="(step, i) in howItWorks" :key="step.label" class="hp-hiw-card">
            <div class="hp-hiw-num">{{ i + 1 }}</div>
            <div class="hp-hiw-icon">{{ step.icon }}</div>
            <h4 class="hp-hiw-label">{{ step.label }}</h4>
            <p class="hp-hiw-sub">{{ step.sub }}</p>
          </div>
        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════
         §7  MEMBERSHIP CTA — photo-backed dark band
    ═══════════════════════════════════════════════════════════ -->
    <section class="hp-cta-band">
      <img
        src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=1800&q=80&auto=format&fit=crop&crop=top"
        alt=""
        class="hp-cta-photo"
      />
      <div class="hp-cta-overlay" />
      <div class="hp-cta-noise" />

      <div class="container hp-cta-inner">
        <div class="hp-cta-pill">Become a Member</div>
        <h2 class="hp-cta-title">
          Stand with Us.<br/>
          <em>Make a Difference.</em>
        </h2>
        <p class="hp-cta-body">
          Join TAS-FORCE. Receive your official digital membership card and stand united for justice.
        </p>

        <div class="hp-cta-actions">
          <NuxtLink to="/auth/register" class="hp-btn-gold">
            Become a Member <span class="hp-arrow">→</span>
          </NuxtLink>
          <NuxtLink to="/get-involved" class="hp-btn-ghost">Volunteer With Us</NuxtLink>
        </div>

        <!-- avatar proof -->
        <div class="hp-cta-proof">
          <div class="hp-proof-faces">
            <img v-for="(p,i) in memberPhotos" :key="i" :src="p" :alt="`Member ${i+1}`" />
          </div>
          <span class="hp-cta-proof-label">+4,800 advocates worldwide</span>
        </div>
      </div>
    </section>


    <!-- ════════════════════════════════════════════════════════
         §8  CONTACT + NEWS
    ═══════════════════════════════════════════════════════════ -->
    <section class="hp-bottom section-sm" style="background:var(--white);border-top:1.5px solid var(--border-light);">
      <div class="container">
        <div class="contact-grid">

          <div>
            <h3 class="hp-col-title">Get in Touch</h3>
            <div v-for="([icon, val, sub]) in contactItems" :key="val" class="hp-contact-row">
              <div class="hp-contact-icon">{{ icon }}</div>
              <div>
                <div class="hp-contact-val">{{ val }}</div>
                <div class="hp-contact-sub">{{ sub }}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="hp-col-title">Latest News</h3>
            <a v-for="n in news" :key="n.title" href="#" class="hp-news-row">
              <div class="hp-news-bar" />
              <div>
                <div class="hp-news-title">{{ n.title }}</div>
                <div class="hp-news-date">{{ n.date }}</div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
const pillars = [
  { icon: '⚖', title: 'Legal Advocacy',   sub: 'Challenging corrupt legal practices' },
  { icon: '✊', title: "Women's Rights",   sub: 'Empowering and educating women' },
  { icon: '♡', title: 'Support Services', sub: 'Assisting women in need' },
]

const orgStats = [
  { icon: '⚖️', value: '5,000+', label: 'Lives Impacted'    },
  { icon: '📣', value: '12',     label: 'Active Campaigns'  },
  { icon: '⏳', value: '8+',     label: 'Years of Service'  },
  { icon: '🌐', value: '40+',    label: 'Countries Reached' },
]

const campaigns = [
  {
    title: 'End Legal Corruption',
    sub:   'Demanding fair justice for every woman in court',
    img:   'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=85&auto=format&fit=crop',
  },
  {
    title: 'Equal Rights for Women',
    sub:   'Advocating for legislative and social change',
    img:   'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=700&q=80&auto=format&fit=crop',
  },
  {
    title: 'Support for Victims',
    sub:   'Providing help, hope and safe resources',
    img:   'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80&auto=format&fit=crop',
  },
]

const howItWorks = [
  { icon: '📝', label: 'Register',      sub: 'Fill out your application online in minutes.' },
  { icon: '✅', label: 'Get Approved',  sub: 'Our team reviews and verifies your application.' },
  { icon: '🪪', label: 'Get Your Card', sub: 'Receive your official digital membership card.' },
  { icon: '✊', label: 'Advocate',      sub: 'Join campaigns and our global community.' },
]

const memberPhotos = [
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1573497161161-c3e73707e25c?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=80&q=80&auto=format&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1607748851687-ba9a10438621?w=80&q=80&auto=format&fit=crop&crop=face',
]

const contactItems: [string, string, string][] = [
  ['📞', '+123-456-7890',      'Mon – Fri, 9am – 5pm GMT'],
  ['✉',  'info@tas-force.org', 'We reply within 24 hours'],
  ['🌐', 'www.tas-force.org',  'Visit our website'],
]

const news = [
  { title: 'Justice for Akosua: Latest Updates',        date: 'April 18, 2024' },
  { title: 'Fighting Corrupt Judges: A Call to Action', date: 'April 10, 2024' },
  { title: 'New Support Centre Opens in Accra',          date: 'March 22, 2024' },
]
</script>

<style scoped>
/* ═════════════════════════════════════════════════════════════
   §1  HERO
════════════════════════════════════════════════════════════ */
.hp-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--crimson-deep);
}

/* — Background mesh — */
.hp-hero-bg { position: absolute; inset: 0; }

.hp-hero-mesh {
  position: absolute; inset: -30%; width: 160%; height: 160%;
  background:
    radial-gradient(ellipse at 18% 48%, rgba(107,15,26,0.95) 0%, transparent 52%),
    radial-gradient(ellipse at 72% 28%, rgba(74,0,16,0.80)   0%, transparent 48%),
    radial-gradient(ellipse at 55% 78%, rgba(201,168,76,0.14) 0%, transparent 44%),
    radial-gradient(ellipse at 30% 15%, rgba(45,0,8,1)        0%, transparent 58%);
  animation: meshDrift 16s ease-in-out infinite alternate;
}
@keyframes meshDrift {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(-2%,1.5%) scale(1.04); }
}

.hp-hero-noise {
  position: absolute; inset: 0; pointer-events: none; opacity: 0.45;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
}

/* — Warm orbs: ONLY gold + crimson tones — */
.hp-orbs { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.hp-orb {
  position: absolute; border-radius: 50%;
  filter: blur(100px); will-change: transform;
}
.hp-orb-gold {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 68%);
  top: -12%; left: -8%;
  animation: orbFloat 15s ease-in-out infinite alternate;
}
.hp-orb-deep {
  width: 360px; height: 360px;
  background: radial-gradient(circle, rgba(45,0,8,0.9) 0%, transparent 68%);
  bottom: 5%; right: 5%;
  animation: orbFloat 11s ease-in-out infinite alternate-reverse;
}
.hp-orb-mid {
  width: 240px; height: 240px;
  background: radial-gradient(circle, rgba(107,15,26,0.6) 0%, transparent 68%);
  top: 55%; left: 42%;
  animation: orbFloat 9s ease-in-out infinite 3s;
}
@keyframes orbFloat {
  from { transform: translate(0,0) scale(1); }
  to   { transform: translate(22px,-18px) scale(1.08); }
}

/* — Hero layout — */
.hp-hero-grid {
  position: relative; z-index: 2;
  max-width: 1200px; margin: 0 auto;
  padding: 130px 24px 90px;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  gap: 56px;
  align-items: center;
  width: 100%;
}

/* — Eyebrow pill — */
.hp-pill {
  display: inline-flex; align-items: center; gap: 10px;
  font-size: 10px; font-weight: 700; letter-spacing: 0.24em;
  text-transform: uppercase; color: var(--gold);
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.28);
  border-radius: 999px; padding: 8px 18px;
  margin-bottom: 28px;
}
.hp-pill-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--gold); flex-shrink: 0;
  box-shadow: 0 0 8px var(--gold);
  animation: pillPulse 2.6s ease-in-out infinite;
}
@keyframes pillPulse {
  0%,100% { opacity:1; transform:scale(1); }
  50%     { opacity:.3; transform:scale(.65); }
}

/* — Headline — */
.hp-h1 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(50px, 7.8vw, 90px);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -0.02em;
  margin: 0 0 10px;
}
.hp-h1-top { display: block; color: #fff; }
.hp-h1-em {
  display: block; font-style: italic;
  background: linear-gradient(120deg, var(--gold) 0%, var(--gold2) 55%, #f5e070 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hp-kicker {
  font-family: 'Playfair Display', serif;
  font-size: clamp(18px, 2.8vw, 27px);
  font-style: italic; font-weight: 400;
  color: rgba(201,168,76,0.52);
  margin-bottom: 24px;
}

.hp-body {
  font-size: clamp(15px, 1.7vw, 17px);
  color: rgba(255,255,255,0.44);
  line-height: 1.85;
  margin-bottom: 36px;
  max-width: 500px;
}

/* — Buttons — */
.hp-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 40px; }

.hp-btn-gold {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 15px 34px; border-radius: 12px;
  background: linear-gradient(135deg, var(--gold) 0%, var(--gold2) 100%);
  color: var(--crimson-deep);
  font-family: 'Crimson Pro', serif; font-size: 16px; font-weight: 700;
  text-decoration: none; border: none; cursor: pointer;
  box-shadow: 0 4px 28px rgba(201,168,76,0.38);
  transition: transform .26s cubic-bezier(.4,0,.2,1), box-shadow .26s;
  white-space: nowrap;
}
.hp-btn-gold:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 42px rgba(201,168,76,0.56);
}
.hp-arrow { transition: transform .24s; display: inline-block; }
.hp-btn-gold:hover .hp-arrow { transform: translateX(5px); }

.hp-btn-ghost {
  display: inline-flex; align-items: center; padding: 15px 30px;
  border-radius: 12px;
  background: rgba(255,255,255,0.055);
  color: rgba(255,255,255,0.7);
  font-family: 'Crimson Pro', serif; font-size: 16px; font-weight: 600;
  text-decoration: none;
  border: 1.5px solid rgba(255,255,255,0.14);
  transition: all .22s; white-space: nowrap;
}
.hp-btn-ghost:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.3);
  color: #fff; transform: translateY(-2px);
}

/* — Social proof — */
.hp-proof { display: flex; align-items: center; gap: 14px; }
.hp-proof-faces { display: flex; align-items: center; }
.hp-proof-faces img {
  width: 34px; height: 34px;
  border-radius: 50%; object-fit: cover;
  border: 2.5px solid var(--crimson-deep);
  margin-left: -9px;
  transition: transform .2s;
}
.hp-proof-faces img:first-child { margin-left: 0; }
.hp-proof-faces img:hover { transform: scale(1.15) translateY(-2px); z-index: 5; }
.hp-proof-text { font-size: 13px; color: rgba(255,255,255,0.36); line-height: 1.5; }
.hp-proof-text strong { color: var(--gold); font-weight: 600; }

/* — Right visual — */
.hp-hero-visual {
  display: flex; justify-content: center; align-items: center;
}

.hp-photo-scene {
  position: relative;
  width: 100%;
  max-width: 420px;
  height: 500px;
}

/* back card — slightly rotated, dimmed */
.hp-photo-card {
  position: absolute;
  border-radius: 22px; overflow: hidden;
  box-shadow: 0 28px 72px rgba(0,0,0,0.58);
}
.hp-photo-card img { width: 100%; height: 100%; object-fit: cover; display: block; }

.hp-photo-back {
  width: 78%; height: 86%;
  bottom: 0; right: 0;
  transform: rotate(5deg);
  opacity: .55;
  border: 2px solid rgba(201,168,76,0.18);
  z-index: 1;
}

/* front card — 3D tilt */
.hp-photo-card:not(.hp-photo-back) {
  width: 84%; height: 92%;
  top: 0; left: 0;
  transform: rotateY(-8deg) rotateX(4deg);
  transition: transform .55s cubic-bezier(.4,0,.2,1);
  border: 2.5px solid rgba(201,168,76,0.32);
  z-index: 2;
}
.hp-photo-card:not(.hp-photo-back):hover {
  transform: rotateY(-2deg) rotateX(1deg) scale(1.02);
}

/* gold corner accent marks */
.hp-corner {
  position: absolute; width: 32px; height: 32px;
  z-index: 3; pointer-events: none;
}
.hp-corner-tl {
  top: 14px; left: 14px;
  border-top: 2px solid rgba(201,168,76,0.72);
  border-left: 2px solid rgba(201,168,76,0.72);
  border-radius: 6px 0 0 0;
}
.hp-corner-br {
  bottom: 14px; right: 14px;
  border-bottom: 2px solid rgba(201,168,76,0.72);
  border-right: 2px solid rgba(201,168,76,0.72);
  border-radius: 0 0 6px 0;
}

.hp-photo-gloss {
  position: absolute; inset: 0; pointer-events: none;
  background: linear-gradient(145deg,
    rgba(255,255,255,0.11) 0%,
    transparent 38%,
    rgba(0,0,0,0.08) 100%
  );
}

/* gold accent bar under front card */
.hp-photo-accent {
  position: absolute;
  bottom: 12px; left: 10px;
  width: 52%; height: 4px;
  background: linear-gradient(90deg, var(--gold), transparent);
  border-radius: 2px; z-index: 3;
}

/* — Floating glass badges — */
.hp-badge {
  position: absolute; z-index: 5;
  display: flex; align-items: center; gap: 10px;
  padding: 11px 16px; border-radius: 14px;
  background: rgba(45,0,8,0.76);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(201,168,76,0.30);
  box-shadow: 0 10px 38px rgba(0,0,0,0.38), 0 0 0 0.5px rgba(201,168,76,0.1);
  white-space: nowrap;
}
.hp-badge-icon { font-size: 20px; flex-shrink: 0; }
.hp-badge-val {
  font-family: 'Playfair Display', serif;
  font-size: 20px; font-weight: 700; color: var(--gold); line-height: 1;
}
.hp-badge-lbl {
  font-size: 9px; color: rgba(245,230,208,0.48);
  text-transform: uppercase; letter-spacing: 0.09em; margin-top: 2px;
}

.hp-badge-1 { top: 9%; right: -16px; animation: badgeFloat 5.2s ease-in-out infinite; }
.hp-badge-2 { bottom: 22%; left: -18px; animation: badgeFloat 6.8s ease-in-out infinite 1.4s; }
.hp-badge-3 { bottom: 5%; right: 12%; animation: badgeFloat 4.6s ease-in-out infinite 2.8s; }
@keyframes badgeFloat {
  0%,100% { transform: translateY(0); }
  50%     { transform: translateY(-11px); }
}

/* — Scroll indicator — */
.hp-scroll {
  position: absolute; bottom: 30px; left: 50%;
  transform: translateX(-50%); z-index: 3;
  display: flex; flex-direction: column; align-items: center; gap: 8px;
}
.hp-scroll-track {
  width: 24px; height: 40px;
  border: 2px solid rgba(201,168,76,0.3);
  border-radius: 12px;
  display: flex; justify-content: center; padding-top: 7px;
}
.hp-scroll-dot {
  width: 4px; height: 9px; border-radius: 2px; background: var(--gold);
  animation: scrollBounce 2.2s ease-in-out infinite;
}
@keyframes scrollBounce {
  0%,100% { transform:translateY(0); opacity:1; }
  50%     { transform:translateY(12px); opacity:.25; }
}
.hp-scroll-label {
  font-size: 9px; letter-spacing: .2em; text-transform: uppercase;
  color: rgba(201,168,76,.38);
}


/* ═════════════════════════════════════════════════════════════
   §2  PILLAR STRIP — reuse global .pillar-* but override icon bg
════════════════════════════════════════════════════════════ */
/* icon hover lift — scoped enhancement on top of main.css */
.pillar-item {
  transition: background .18s;
  cursor: default;
}
.pillar-item:hover { background: var(--parchment); }
.pillar-item:hover .pillar-icon {
  transform: scale(1.1) rotate(-4deg);
  box-shadow: 0 6px 18px rgba(107,15,26,0.14);
}
.pillar-icon { transition: transform .22s, box-shadow .22s; }
/* border between items */
.pi-bordered { border-right: 1px solid var(--border-light); }


/* ═════════════════════════════════════════════════════════════
   §3  WHO WE ARE
════════════════════════════════════════════════════════════ */
.hp-about { padding: 108px 0; background: var(--white); }

.hp-about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 76px; align-items: center;
}

/* image collage */
.hp-about-imgs { position: relative; min-height: 500px; }

.hp-aimg { border-radius: 18px; overflow: hidden; box-shadow: 0 20px 56px rgba(0,0,0,0.14); }
.hp-aimg img { width: 100%; height: 100%; object-fit: cover; display: block; }

.hp-aimg-main {
  width: 72%; height: 400px;
  position: relative; z-index: 2;
}

.hp-aimg-ribbon {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(90deg, var(--crimson) 0%, var(--crimson2) 100%);
  color: var(--cream); text-align: center;
  font-size: 10px; font-weight: 700; letter-spacing: .2em;
  text-transform: uppercase; padding: 11px;
}

.hp-aimg-secondary {
  position: absolute; bottom: -14px; right: 0;
  width: 56%; height: 275px;
  border: 5px solid var(--white);
  box-shadow: 0 14px 42px rgba(0,0,0,0.13);
  z-index: 3;
}

.hp-aimg-dots {
  position: absolute; bottom: 34px; left: -22px; z-index: 1;
  width: 90px; height: 90px;
  background-image: radial-gradient(var(--gold) 1.8px, transparent 1.8px);
  background-size: 13px 13px; opacity: .3;
}

.hp-years-badge {
  position: absolute; top: 16px; right: 14px; z-index: 5;
  width: 90px; height: 90px; border-radius: 50%;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  box-shadow: 0 10px 32px rgba(201,168,76,0.52);
  animation: yearsGlow 4s ease-in-out infinite;
}
@keyframes yearsGlow {
  0%,100% { box-shadow: 0 10px 32px rgba(201,168,76,.52); transform: scale(1); }
  50%     { box-shadow: 0 14px 44px rgba(201,168,76,.74); transform: scale(1.05); }
}
.hp-years-num {
  font-family: 'Playfair Display', serif;
  font-size: 27px; font-weight: 900; color: var(--crimson-deep); line-height: 1;
}
.hp-years-lbl {
  font-size: 9px; text-transform: uppercase;
  letter-spacing: .06em; color: var(--crimson-deep);
  text-align: center; line-height: 1.35; margin-top: 3px;
}

/* text side */
.hp-about-p {
  font-size: 17px; color: var(--muted); line-height: 1.85; margin-bottom: 16px;
}

.hp-about-stats {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 12px; margin: 28px 0 10px;
}
.hp-astat {
  display: flex; align-items: center; gap: 14px;
  background: var(--parchment2);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 16px 18px;
  transition: transform .18s, box-shadow .18s;
}
.hp-astat:hover { transform: translateY(-2px); box-shadow: var(--shadow-sm); }
.hp-astat-icon { font-size: 24px; flex-shrink: 0; }
.hp-astat-val {
  font-family: 'Playfair Display', serif;
  font-size: 24px; font-weight: 700; color: var(--crimson); line-height: 1;
}
.hp-astat-lbl { font-size: 12px; color: var(--muted); margin-top: 2px; }

.hp-about-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 28px; }


/* ═════════════════════════════════════════════════════════════
   §4  QUOTE BAND
════════════════════════════════════════════════════════════ */
.hp-quote-band {
  position: relative; overflow: hidden;
  background: linear-gradient(135deg,
    var(--crimson-deep) 0%,
    var(--crimson-mid)  42%,
    var(--crimson)      100%
  );
  padding: 76px 0;
}
.hp-qb-deco {
  position: absolute; font-family: 'Playfair Display', serif;
  font-size: 500px; color: rgba(255,255,255,0.022);
  top: -90px; left: 24px; line-height: 1;
  pointer-events: none; user-select: none;
}
.hp-qb-inner {
  position: relative; z-index: 1;
  text-align: center; max-width: 820px; margin: 0 auto;
}
.hp-qb-mark {
  font-family: 'Playfair Display', serif;
  font-size: 90px; color: var(--gold);
  line-height: 0.65; display: block; margin-bottom: 18px;
}
.hp-qb-text {
  font-family: 'Playfair Display', serif;
  font-size: clamp(19px, 2.9vw, 28px);
  font-style: italic; color: var(--cream);
  line-height: 1.65; margin-bottom: 20px;
  border: none; padding: 0;
}
.hp-qb-cite {
  font-size: 11px; color: rgba(201,168,76,0.48);
  letter-spacing: .18em; text-transform: uppercase;
  font-style: normal;
}


/* ═════════════════════════════════════════════════════════════
   §5  CAMPAIGNS
════════════════════════════════════════════════════════════ */
.hp-camps { padding-top: 96px; padding-bottom: 96px; }

.hp-s-head {
  display: flex; align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px; gap: 16px;
}
.hp-s-cta { flex-shrink: 0; }

.hp-camps-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 18px; align-items: start;
}
.hp-camps-col { display: flex; flex-direction: column; gap: 18px; }

.hp-camp {
  position: relative; border-radius: 18px; overflow: hidden;
  background: var(--crimson-deep); cursor: pointer;
}
.hp-camp-featured { height: 540px; }
.hp-camp-small    { height: 255px; }

.hp-camp-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%; object-fit: cover;
  opacity: .68;
  transition: transform .65s cubic-bezier(.4,0,.2,1), opacity .4s;
}
.hp-camp:hover .hp-camp-img { transform: scale(1.07); opacity: .52; }

.hp-camp-overlay {
  position: absolute; inset: 0;
  padding: 26px 24px;
  display: flex; flex-direction: column; justify-content: flex-end;
  background: linear-gradient(to top,
    rgba(26,0,5,.98)  0%,
    rgba(61,0,0,.62)  50%,
    rgba(26,0,5,.06)  100%
  );
  transition: background .35s;
}
.hp-camp:hover .hp-camp-overlay {
  background: linear-gradient(to top,
    rgba(26,0,5,.99)  0%,
    rgba(61,0,0,.78)  56%,
    rgba(26,0,5,.14)  100%
  );
}

.hp-camp-num {
  font-family: 'Playfair Display', serif;
  font-size: 10px; font-weight: 700;
  letter-spacing: .22em; color: var(--gold);
  margin-bottom: 9px; display: block;
}
.hp-camp-title {
  font-family: 'Playfair Display', serif;
  font-size: 26px; font-weight: 700;
  color: var(--cream); line-height: 1.2; margin-bottom: 7px;
}
.hp-camp-title-sm { font-size: 20px; }
.hp-camp-sub { font-size: 14px; color: rgba(245,230,208,.5); line-height: 1.5; }
.hp-camp-more {
  display: inline-flex; align-items: center; gap: 5px;
  font-size: 13px; font-weight: 600; color: var(--gold);
  text-decoration: none; margin-top: 15px; letter-spacing: .04em;
  opacity: 0; transform: translateY(8px);
  transition: opacity .28s, transform .28s;
}
.hp-camp:hover .hp-camp-more { opacity: 1; transform: translateY(0); }


/* ═════════════════════════════════════════════════════════════
   §6  HOW IT WORKS
════════════════════════════════════════════════════════════ */
.hp-hiw { padding: 96px 0; background: var(--white); }
.hp-hiw-head { text-align: center; margin-bottom: 60px; }
.hp-hiw-lead {
  font-size: 17px; color: var(--muted);
  max-width: 440px; margin: 10px auto 0; line-height: 1.7;
}

.hp-hiw-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 20px; position: relative;
}
.hp-hiw-line {
  position: absolute;
  top: 46px; left: 12.5%; right: 12.5%;
  border-top: 2px dashed rgba(107,15,26,0.14);
  pointer-events: none;
}

.hp-hiw-card {
  background: var(--parchment);
  border: 1px solid var(--border-light);
  border-radius: 18px; padding: 32px 22px 28px;
  text-align: center; position: relative; z-index: 1;
  box-shadow: 0 2px 14px rgba(61,0,0,0.05);
  transition: transform .26s cubic-bezier(.4,0,.2,1), box-shadow .26s;
}
.hp-hiw-card:hover {
  transform: translateY(-9px);
  box-shadow: 0 20px 52px rgba(107,15,26,0.13);
}
.hp-hiw-num {
  width: 40px; height: 40px; border-radius: 50%;
  background: linear-gradient(135deg, var(--crimson), var(--crimson2));
  color: var(--cream);
  font-family: 'Playfair Display', serif;
  font-size: 17px; font-weight: 900;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
  box-shadow: 0 6px 16px rgba(107,15,26,.32);
  position: relative; z-index: 1;
}
.hp-hiw-icon { font-size: 34px; margin-bottom: 12px; }
.hp-hiw-label {
  font-family: 'Playfair Display', serif;
  font-size: 17px; font-weight: 700;
  color: var(--crimson); margin-bottom: 8px;
}
.hp-hiw-sub { font-size: 14px; color: var(--muted); line-height: 1.65; }


/* ═════════════════════════════════════════════════════════════
   §7  CTA BAND
════════════════════════════════════════════════════════════ */
.hp-cta-band {
  position: relative; overflow: hidden;
  padding: 120px 0;
  background: var(--crimson-deep);
  text-align: center;
}
.hp-cta-photo {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  object-fit: cover; object-position: center 35%;
  opacity: .18;
}
.hp-cta-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(135deg,
    rgba(26,0,5,.97)  0%,
    rgba(74,0,16,.88) 50%,
    rgba(26,0,5,.95)  100%
  );
}
.hp-cta-noise {
  position: absolute; inset: 0; pointer-events: none; opacity: .35;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
}
.hp-cta-inner { position: relative; z-index: 2; }

.hp-cta-pill {
  display: inline-flex; align-items: center;
  font-size: 10px; font-weight: 700; letter-spacing: .22em;
  text-transform: uppercase; color: var(--gold);
  background: rgba(201,168,76,.1);
  border: 1px solid rgba(201,168,76,.28);
  border-radius: 999px; padding: 7px 18px;
  margin-bottom: 24px;
}

.hp-cta-title {
  font-family: 'Playfair Display', serif;
  font-size: clamp(30px, 5.5vw, 58px);
  font-weight: 900; color: var(--cream);
  line-height: 1.1; margin-bottom: 20px;
  letter-spacing: -.01em;
}
.hp-cta-title em {
  font-style: italic;
  background: linear-gradient(120deg, var(--gold), var(--gold2));
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hp-cta-body {
  font-size: 17px; color: rgba(245,230,208,.44);
  max-width: 520px; margin: 0 auto 38px; line-height: 1.78;
}

.hp-cta-actions {
  display: flex; gap: 14px;
  justify-content: center; flex-wrap: wrap;
  margin-bottom: 40px;
}

.hp-cta-proof { display: flex; align-items: center; justify-content: center; gap: 14px; }
.hp-cta-proof-label { font-size: 13px; color: rgba(245,230,208,.34); }


/* ═════════════════════════════════════════════════════════════
   §8  BOTTOM STRIP — contact + news
════════════════════════════════════════════════════════════ */
.hp-col-title {
  font-family: 'Playfair Display', serif;
  font-size: 21px; font-weight: 700;
  color: var(--crimson); margin-bottom: 24px;
}

.hp-contact-row {
  display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px;
}
.hp-contact-icon {
  width: 42px; height: 42px; flex-shrink: 0;
  border-radius: 10px;
  background: rgba(107,15,26,0.07);
  border: 1px solid rgba(107,15,26,0.1);
  display: flex; align-items: center; justify-content: center; font-size: 17px;
}
.hp-contact-val { font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
.hp-contact-sub { font-size: 13px; color: var(--muted2); }

.hp-news-row {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 11px 10px; border-radius: 10px;
  margin: 0 -10px 4px; text-decoration: none; cursor: pointer;
  transition: background .15s;
}
.hp-news-row:hover { background: var(--parchment); }
.hp-news-bar {
  flex-shrink: 0; margin-top: 5px;
  width: 3px; height: 38px; border-radius: 2px;
  background: linear-gradient(to bottom, var(--crimson), var(--gold));
}
.hp-news-title { font-size: 15px; font-weight: 600; color: var(--text); line-height: 1.45; margin-bottom: 4px; }
.hp-news-date  { font-size: 12px; color: var(--muted2); }


/* ═════════════════════════════════════════════════════════════
   RESPONSIVE — TABLET  (≤ 960px)
════════════════════════════════════════════════════════════ */
@media (max-width: 960px) {

  /* Hero */
  .hp-hero-grid {
    grid-template-columns: 1fr;
    padding-top: 108px; gap: 48px;
    text-align: center;
  }
  .hp-hero-copy { max-width: 100%; }
  .hp-pill { display: inline-flex; }
  .hp-body { max-width: 100%; margin-left: auto; margin-right: auto; }
  .hp-ctas  { justify-content: center; }
  .hp-proof { justify-content: center; }
  .hp-hero-visual { max-width: 340px; margin: 0 auto; }
  .hp-photo-scene { max-width: 340px; height: 420px; }

  /* About */
  .hp-about-grid { grid-template-columns: 1fr; gap: 52px; }
  .hp-about-imgs { max-width: 480px; min-height: 380px; }

  /* Campaigns */
  .hp-camps-grid { grid-template-columns: 1fr; }
  .hp-camp-featured { height: 380px; }
  .hp-camps-col { flex-direction: row; }
  .hp-camp-small { height: 230px; flex: 1; }

  /* HIW */
  .hp-hiw-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
  .hp-hiw-line { display: none; }
}


/* ═════════════════════════════════════════════════════════════
   RESPONSIVE — MOBILE  (≤ 640px)
════════════════════════════════════════════════════════════ */
@media (max-width: 640px) {

  /* Hero */
  .hp-hero-grid { padding: 88px 16px 60px; gap: 38px; }
  .hp-h1 { font-size: clamp(42px, 13vw, 56px); }
  .hp-kicker { font-size: 17px; }
  .hp-body { font-size: 15px; }
  .hp-ctas { flex-direction: column; gap: 10px; }
  .hp-btn-gold, .hp-btn-ghost { width: 100%; justify-content: center; }
  .hp-photo-scene { max-width: 280px; height: 350px; }
  .hp-photo-card:not(.hp-photo-back) { transform: rotateY(-4deg) rotateX(2deg); }
  .hp-badge { padding: 8px 12px; border-radius: 10px; }
  .hp-badge-val { font-size: 16px; }
  .hp-badge-1 { right: -10px; }
  .hp-badge-2 { left: -8px; }
  .hp-badge-3 { right: 8%; }
  .hp-scroll { display: none; }

  /* Pillar strip — stacked */
  .pillar-grid { grid-template-columns: 1fr !important; }
  .pillar-item + .pillar-item { border-left: none !important; border-top: 1px solid var(--border-light); }
  .pi-bordered { border-right: none; }
  .pillar-item { padding: 18px 16px; }

  /* About */
  .hp-about { padding: 68px 0; }
  .hp-about-imgs { min-height: 300px; }
  .hp-aimg-main { width: 80%; height: 265px; }
  .hp-aimg-secondary { width: 52%; height: 186px; }
  .hp-years-badge { width: 78px; height: 78px; top: 10px; right: 10px; }
  .hp-years-num { font-size: 22px; }
  .hp-about-stats { grid-template-columns: 1fr 1fr; gap: 10px; }
  .hp-astat { padding: 13px 14px; }
  .hp-astat-val { font-size: 20px; }

  /* Quote */
  .hp-quote-band { padding: 52px 0; }
  .hp-qb-text { font-size: 18px; }
  .br-md { display: none; }

  /* Campaigns */
  .hp-camps { padding-top: 64px; padding-bottom: 64px; }
  .hp-s-head { flex-direction: column; align-items: flex-start; gap: 12px; }
  .hp-camps-col { flex-direction: column; }
  .hp-camp-featured { height: 300px; }
  .hp-camp-small { height: 220px; flex: none; }
  .hp-camp-title { font-size: 21px; }
  .hp-camp-title-sm { font-size: 18px; }

  /* HIW */
  .hp-hiw { padding: 64px 0; }
  .hp-hiw-grid { grid-template-columns: 1fr; gap: 14px; }
  .hp-hiw-card { padding: 24px 18px; }

  /* CTA */
  .hp-cta-band { padding: 84px 0; }
  .hp-cta-actions { flex-direction: column; gap: 10px; }
  .hp-cta-actions .hp-btn-gold,
  .hp-cta-actions .hp-btn-ghost { width: 100%; justify-content: center; }

  /* Bottom */
  .hp-bottom { padding: 44px 0 !important; }
}
</style>