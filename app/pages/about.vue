<template>
  <div>
    <section class="page-hero">
      <div class="container page-hero-inner">
        <div class="eyebrow" style="color:var(--gold);">Who We Are</div>
        <h1>About Tas-Force</h1>
        <p style="margin-top:14px;">Truth and Advocacy for Serwah &amp; Women Empowerment</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;">
          <div>
            <div class="section-eyebrow">Our Mission</div>
            <h2 class="section-title">Who We Are</h2>
            <p style="font-size:17px;color:var(--muted);line-height:1.8;margin-bottom:18px;">Tas-Force is an advocacy organization committed to supporting women facing injustice in society and marriage.</p>
            <p style="font-size:17px;color:var(--muted);line-height:1.8;margin-bottom:18px;">Our mission is to raise awareness, promote accountability, and challenge corruption in legal and judicial systems.</p>
            <p style="font-size:17px;color:var(--muted);line-height:1.8;margin-bottom:28px;">We advocate for reforms that protect the rights and dignity of modern-day women.</p>

            <div style="background:var(--parchment2);border-left:4px solid var(--gold);border-radius:0 10px 10px 0;padding:20px 24px;margin-bottom:32px;">
              <p style="font-size:18px;font-family:'Playfair Display',serif;font-style:italic;color:var(--crimson);line-height:1.6;">"Justice delayed is justice denied — we fight to ensure no woman faces injustice alone."</p>
            </div>

            <h3 style="font-family:'Playfair Display',serif;font-size:21px;color:var(--crimson);margin-bottom:14px;">Our Core Values</h3>
            <ul class="mem-perks">
              <li v-for="v in values" :key="v">{{ v }}</li>
            </ul>
          </div>

          <div>
            <div style="border-radius:16px;overflow:hidden;margin-bottom:20px;">
              <img src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=600&q=80&auto=format&fit=crop" alt="TAS-FORCE advocacy" style="width:100%;height:300px;object-fit:cover;" />
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
              <div v-for="s in stats" :key="s.label" class="org-stat" style="text-align:center;">
                <div class="org-stat-val">{{ s.value }}</div>
                <div class="org-stat-label">{{ s.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-bg">
      <div class="container">
        <div style="text-align:center;margin-bottom:40px;">
          <div class="section-eyebrow center">What We Do</div>
          <h2 class="section-title">Our Work</h2>
        </div>
        <div class="feat-grid">
          <div v-for="w in work" :key="w.title" class="feat-card">
            <div class="feat-icon-wrap">{{ w.icon }}</div>
            <h3>{{ w.title }}</h3>
            <p>{{ w.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section-sm" style="background:var(--white);border-top:1px solid var(--border-light);">
      <div class="container" style="text-align:center;">
        <h2 style="font-family:'Playfair Display',serif;font-size:28px;color:var(--crimson);margin-bottom:12px;">Join Our Movement</h2>
        <p style="color:var(--muted);font-size:17px;max-width:480px;margin:0 auto 24px;line-height:1.7;">Become an official member, receive your card, and stand with thousands of advocates.</p>
        <NuxtLink to="/auth/register" class="btn btn-crimson btn-lg">Apply for Membership</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const values = [
  'Truth — Committed to exposing injustice through facts and evidence.',
  'Solidarity — Standing united with every woman facing unfair treatment.',
  'Accountability — Demanding responsibility from those who abuse power.',
  'Dignity — Every woman deserves respect, justice, and equality.',
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
