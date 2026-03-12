<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;">What We Fight For</div>
        <h1>Our Campaigns</h1>
        <p style="margin-top:14px;">Active campaigns driving change for women across the world.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:28px;">
          <div v-for="c in campaigns" :key="c.title" class="card">
            <div style="height:8px;background:linear-gradient(90deg,var(--crimson),var(--gold));" />
            <div class="card-body">
              <div style="font-size:34px;margin-bottom:12px;">{{ c.icon }}</div>
              <h3 style="font-family:'Playfair Display',serif;font-size:20px;color:var(--crimson);margin-bottom:8px;">{{ c.title }}</h3>
              <p style="font-size:15px;color:var(--muted);line-height:1.7;margin-bottom:16px;">{{ c.desc }}</p>
              <span class="badge badge-active"><span class="bdot" />Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const campaigns = [
  { icon:'⚖', title:'End Legal Corruption',       desc:'Challenging corrupt practices in legal institutions and demanding fair, transparent judicial processes for all women.'    },
  { icon:'✊', title:'Equal Rights for Women',      desc:'Advocating for legislative reforms that guarantee equal rights, protection and dignity for women in all spheres of life.' },
  { icon:'♡', title:'Support for Victims',          desc:'Providing practical and emotional support services to women who have experienced domestic violence and judicial injustice.' },
  { icon:'📢', title:'Public Awareness Campaigns',  desc:'Raising public consciousness about women\'s rights through media, events, and educational outreach programs.'            },
  { icon:'🏛', title:'Judicial Reform Initiative',  desc:'Working with lawmakers and civil society to push for systemic reforms in how the legal system handles cases involving women.' },
  { icon:'🌍', title:'International Advocacy',       desc:'Connecting with global human rights organizations to bring international attention and pressure to local injustices.'       },
]
</script>
