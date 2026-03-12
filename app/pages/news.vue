<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;">Latest Updates</div>
        <h1>News &amp; Updates</h1>
        <p style="margin-top:14px;">Stay informed about our campaigns and advocacy work.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;">
          <div v-for="n in newsItems" :key="n.title" class="card" style="cursor:pointer;">
            <div style="height:8px;background:linear-gradient(90deg,var(--crimson),var(--gold));" />
            <div class="card-body">
              <div style="font-size:11px;color:var(--gold);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">{{ n.date }}</div>
              <h3 style="font-family:'Playfair Display',serif;font-size:19px;color:var(--crimson);margin-bottom:8px;">{{ n.title }}</h3>
              <p style="font-size:15px;color:var(--muted);line-height:1.7;">{{ n.excerpt }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const newsItems = [
  { title:'Justice for Akosua: Latest Updates',          date:'April 18, 2024', excerpt:'The campaign for Akosua Serwah continues as we push for a review of the case and demand accountability from the judiciary.' },
  { title:'Fighting Corrupt Judges: A Call to Action',   date:'April 10, 2024', excerpt:'TAS-FORCE releases a detailed report exposing judicial misconduct and calls for immediate reform of the legal system.' },
  { title:'New Support Centre Opens in Accra',           date:'March 22, 2024', excerpt:'Our new support centre provides counselling, legal advice and practical assistance to women in crisis.' },
  { title:"International Women's Day: TAS-FORCE March",  date:'March 8, 2024',  excerpt:'Hundreds of members participated in our march demanding equal rights and an end to gender-based injustice.' },
]
</script>
