<template>
  <div>
    <section class="pg-hero pg-hero--padded">
      <img src="https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1400&q=80&auto=format&fit=crop" alt="Get Involved" class="pg-hero-bg" />
      <div class="pg-hero-overlay" />
      <div class="container pg-hero-inner">
        <div class="pg-hero-eyebrow">Take Action</div>
        <h1 class="pg-hero-title">Get Involved</h1>
        <p class="pg-hero-sub">There are many ways to support our mission and make a real difference.</p>
      </div>
    </section>

    <section style="padding:80px 0;">
      <div class="container">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 class="section-title">Ways to Make an Impact</h2>
          <p style="font-size:16px;color:var(--muted);max-width:500px;margin:12px auto 0;line-height:1.7;">Choose how you want to contribute. Every action counts.</p>
        </div>
        <div class="gi-grid">
          <div v-for="o in options" :key="o.title" class="gi-card">
            <div class="gi-icon">{{ o.icon }}</div>
            <h3>{{ o.title }}</h3>
            <p>{{ o.desc }}</p>
            <NuxtLink :to="o.link" class="btn btn-crimson btn-sm" style="margin-top:auto;">{{ o.cta }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section class="pg-cta">
      <div class="container" style="text-align:center;">
        <h2 style="font-family:'Playfair Display',serif;font-size:clamp(24px,4vw,36px);color:var(--cream);margin-bottom:14px;">Ready to Make a Difference?</h2>
        <p style="color:rgba(255,255,255,0.6);font-size:17px;max-width:480px;margin:0 auto 28px;line-height:1.7;">Join thousands of advocates standing up for justice across the world.</p>
        <NuxtLink to="/auth/register" class="btn btn-gold btn-lg">Become a Member</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const options = [
  { icon:'🤝', title:'Become a Member',   desc:'Join TAS-FORCE officially, receive your membership card and stand united for justice.', link:'/auth/register', cta:'Register Now'  },
  { icon:'💪', title:'Volunteer With Us', desc:'Give your time and skills to support our campaigns, events and outreach programs.',        link:'/contact',       cta:'Get in Touch'  },
  { icon:'❤',  title:'Donate',            desc:'Your financial support funds our legal advocacy work, campaigns and support services.',    link:'/donate',        cta:'Donate Now'    },
  { icon:'📢', title:'Spread the Word',   desc:"Share our campaigns on social media and help amplify the voices of women in need.",       link:'/',              cta:'Learn How'     },
  { icon:'⚖',  title:'Legal Support',    desc:'If you are a legal professional, volunteer your expertise to support our advocacy work.',  link:'/contact',       cta:'Contact Us'    },
  { icon:'✍',  title:'Share Your Story', desc:'Have you faced injustice? Your story could help others and strengthen our campaigns.',    link:'/contact',       cta:'Get in Touch'  },
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

.gi-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
.gi-card {
  background:var(--white); border:1px solid var(--border-light); border-radius:16px;
  padding:36px 28px; text-align:center; display:flex; flex-direction:column; align-items:center; gap:10px;
  transition:transform 0.25s, box-shadow 0.25s;
}
.gi-card:hover { transform:translateY(-6px); box-shadow:var(--shadow); }
.gi-icon { font-size:38px; margin-bottom:4px; }
.gi-card h3 { font-family:'Playfair Display',serif; font-size:19px; color:var(--crimson); }
.gi-card p { font-size:15px; color:var(--muted); line-height:1.7; }

.pg-cta { padding:80px 0; background:linear-gradient(135deg, var(--crimson-deep), var(--crimson)); }

@media (max-width:768px) {
  .gi-grid { grid-template-columns:1fr; }
  .pg-hero { min-height:260px; }
}
@media (max-width: 600px) {
  .pg-hero--padded .pg-hero-inner {
    padding: 40px 18px !important;
  }
}
</style>
