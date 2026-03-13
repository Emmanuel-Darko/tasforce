<template>
  <div>
    <section class="pg-hero">
      <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1400&q=80&auto=format&fit=crop" alt="Global activism - news hero background" class="pg-hero-bg" />
      <div class="pg-hero-overlay" />
      <div class="container pg-hero-inner">
        <div class="pg-hero-eyebrow">Latest Updates</div>
        <h1 class="pg-hero-title">News &amp; Updates</h1>
        <p class="pg-hero-sub">Stay informed about our campaigns and advocacy work.</p>
      </div>
    </section>

    <section style="padding:80px 0;">
      <div class="container">
        <!-- Featured article -->
        <div class="news-featured" v-if="newsItems[0]">
          <div class="news-featured-img">
            <img :src="newsItems[0].img" :alt="newsItems[0].title" />
          </div>
          <div class="news-featured-body">
            <span class="news-date-badge">{{ newsItems[0].date }}</span>
            <h2>{{ newsItems[0].title }}</h2>
            <p>{{ newsItems[0].excerpt }}</p>
            <span class="news-read-more">Read full article →</span>
          </div>
        </div>

        <!-- Grid -->
        <div class="news-grid">
          <div v-for="n in newsItems.slice(1)" :key="n.title" class="news-card">
            <div class="news-card-img">
              <img :src="n.img" :alt="n.title" />
            </div>
            <div class="news-card-body">
              <span class="news-date-badge">{{ n.date }}</span>
              <h3>{{ n.title }}</h3>
              <p>{{ n.excerpt }}</p>
              <span class="news-read-more">Read more →</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const newsItems = [
  { title:'Justice for Akosua: Latest Updates',          date:'April 18, 2024', excerpt:'The campaign for Akosua Serwah continues as we push for a review of the case and demand accountability from the judiciary. International attention grows as more organizations rally behind the cause.', img:'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80&auto=format&fit=crop' },
  { title:'Fighting Corrupt Judges: A Call to Action',   date:'April 10, 2024', excerpt:'TAS-FORCE releases a detailed report exposing judicial misconduct and calls for immediate reform of the legal system.', img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&auto=format&fit=crop' },
  { title:'New Support Centre Opens in Accra',           date:'March 22, 2024', excerpt:'Our new support centre provides counselling, legal advice and practical assistance to women in crisis.', img:'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&q=80&auto=format&fit=crop' },
  { title:"International Women's Day: TAS-FORCE March",  date:'March 8, 2024',  excerpt:'Hundreds of members participated in our march demanding equal rights and an end to gender-based injustice.', img:'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=600&q=80&auto=format&fit=crop' },
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

/* Featured */
.news-featured {
  display:grid; grid-template-columns:1fr 1fr; gap:0; margin-bottom:48px;
  background:var(--white); border:1px solid var(--border-light); border-radius:16px; overflow:hidden;
  transition:box-shadow 0.25s;
}
.news-featured:hover { box-shadow:var(--shadow); }
.news-featured-img { height:100%; }
.news-featured-img img { width:100%; height:100%; min-height:320px; object-fit:cover; }
.news-featured-body { padding:36px 32px; display:flex; flex-direction:column; justify-content:center; }
.news-featured-body h2 { font-family:'Playfair Display',serif; font-size:24px; color:var(--crimson); margin:12px 0; }
.news-featured-body p { font-size:16px; color:var(--muted); line-height:1.7; margin-bottom:16px; }

.news-date-badge {
  display:inline-block; font-size:10px; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
  color:var(--gold); background:var(--parchment); border:1px solid var(--border-light);
  padding:4px 12px; border-radius:20px;
}

.news-read-more { font-size:14px; font-weight:600; color:var(--crimson); cursor:pointer; display:inline-flex; align-items:center; gap:4px; }
.news-read-more:hover { text-decoration:underline; }

/* Grid */
.news-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
.news-card {
  background:var(--white); border:1px solid var(--border-light); border-radius:16px;
  overflow:hidden; transition:transform 0.25s, box-shadow 0.25s;
}
.news-card:hover { transform:translateY(-6px); box-shadow:var(--shadow); }
.news-card-img { height:180px; overflow:hidden; }
.news-card-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
.news-card:hover .news-card-img img { transform:scale(1.05); }
.news-card-body { padding:22px 24px; }
.news-card-body h3 { font-family:'Playfair Display',serif; font-size:18px; color:var(--crimson); margin:10px 0 8px; }
.news-card-body p { font-size:14px; color:var(--muted); line-height:1.7; margin-bottom:12px; }

@media (max-width:768px) {
  .news-featured { grid-template-columns:1fr; }
  .news-featured-img img { min-height:200px; }
  .news-grid { grid-template-columns:1fr; }
  .pg-hero { min-height:260px; }
}
</style>
