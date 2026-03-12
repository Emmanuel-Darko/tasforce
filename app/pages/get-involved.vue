<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;">Take Action</div>
        <h1>Get Involved</h1>
        <p style="margin-top:14px;">There are many ways to support our mission and make a real difference.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="feat-grid">
          <div v-for="o in options" :key="o.title" class="feat-card" style="text-align:center;">
            <div class="feat-icon" style="font-size:38px;display:flex;justify-content:center;">{{ o.icon }}</div>
            <h3>{{ o.title }}</h3>
            <p>{{ o.desc }}</p>
            <NuxtLink :to="o.link" class="btn btn-crimson btn-sm" style="margin-top:16px;">{{ o.cta }}</NuxtLink>
          </div>
        </div>
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
