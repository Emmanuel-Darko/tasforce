<template>
  <div class="pg">
    <!-- HERO -->
    <section class="ph">
      <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1600&q=85&auto=format&fit=crop" alt="News" class="ph-bg" />
      <div class="ph-overlay" />
      <div class="ph-noise" />
      <div class="container ph-inner">
        <div class="ph-eyebrow">Latest Updates</div>
        <h1 class="ph-title">News &amp; Updates</h1>
        <p class="ph-sub">Stay informed about our campaigns and advocacy work.</p>
      </div>
    </section>

    <!-- NEWS CONTENT -->
    <section class="pg-section">
      <div class="container">

        <!-- Featured article -->
        <div v-if="newsItems[0]" class="news-featured">
          <div class="news-featured-img">
            <img :src="newsItems[0].img" :alt="newsItems[0].title" />
            <div class="news-featured-img-overlay" />
          </div>
          <div class="news-featured-body">
            <span class="news-date-tag">{{ newsItems[0].date }}</span>
            <h2 class="news-featured-title">{{ newsItems[0].title }}</h2>
            <p class="news-featured-excerpt">{{ newsItems[0].excerpt }}</p>
            <span class="news-read-more">Read full article →</span>
          </div>
        </div>

        <!-- Grid of other articles -->
        <div class="news-grid">
          <div v-for="n in newsItems.slice(1)" :key="n.title" class="news-card">
            <div class="news-card-img">
              <img :src="n.img" :alt="n.title" />
            </div>
            <div class="news-card-body">
              <span class="news-date-tag">{{ n.date }}</span>
              <h3 class="news-card-title">{{ n.title }}</h3>
              <p class="news-card-excerpt">{{ n.excerpt }}</p>
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
  { title:'Justice for Akosua: Latest Updates',         date:'April 18, 2024', excerpt:'The campaign for Akosua Serwah continues as we push for a review of the case and demand accountability from the judiciary. International attention grows as more organizations rally behind the cause.', img:'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=900&q=85&auto=format&fit=crop' },
  { title:'Fighting Corrupt Judges: A Call to Action',  date:'April 10, 2024', excerpt:'TAS-FORCE releases a detailed report exposing judicial misconduct and calls for immediate reform of the legal system.',                                                                              img:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=80&auto=format&fit=crop' },
  { title:'New Support Centre Opens in Accra',          date:'March 22, 2024', excerpt:'Our new support centre provides counselling, legal advice and practical assistance to women in crisis.',                                                                                                   img:'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80&auto=format&fit=crop' },
  { title:"International Women's Day: TAS-FORCE March", date:'March 8, 2024',  excerpt:'Hundreds of members participated in our march demanding equal rights and an end to gender-based injustice.',                                                                                               img:'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=700&q=80&auto=format&fit=crop' },
]
</script>

<style scoped>
.pg { background: var(--lv-bg, #0a0a0a); color: var(--lv-fg, #e8dcc8); font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif; }

.ph { position: relative; min-height: 380px; display: flex; align-items: center; overflow: hidden; }
.ph-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .3; }
.ph-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, hsla(348,100%,6%,.97) 0%, hsla(348,85%,16%,.88) 60%, hsla(348,100%,6%,.92) 100%); }
.ph-noise { position: absolute; inset: 0; opacity: .35; pointer-events: none; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
.ph-inner { position: relative; z-index: 2; padding: 80px 0; }
.ph-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: .22em; text-transform: uppercase; color: #c9a84c; margin-bottom: 14px; }
.ph-title   { font-family: 'Fraunces', 'Playfair Display', serif; font-size: clamp(32px,5vw,54px); font-weight: 900; color: hsl(40,30%,92%); margin-bottom: 10px; line-height: 1.05; }
.ph-sub     { font-size: 17px; color: rgba(232,220,200,.55); max-width: 520px; line-height: 1.7; }

.pg-section { padding: 96px 0; }

/* Featured */
.news-featured {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
  background: var(--lv-surface, #111); border: 1px solid rgba(255,255,255,.07);
  border-radius: 20px; overflow: hidden; margin-bottom: 48px;
  transition: box-shadow .3s, border-color .3s;
}
.news-featured:hover { box-shadow: 0 20px 56px rgba(0,0,0,.55); border-color: rgba(201,168,76,.18); }
.news-featured-img { position: relative; overflow: hidden; min-height: 340px; }
.news-featured-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .55s; }
.news-featured:hover .news-featured-img img { transform: scale(1.04); }
.news-featured-img-overlay { position: absolute; inset: 0; background: linear-gradient(to right, transparent 60%, rgba(17,17,17,.4)); }
.news-featured-body { padding: 40px 36px; display: flex; flex-direction: column; justify-content: center; }

.news-date-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: #c9a84c; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.25); padding: 5px 12px; border-radius: 20px; margin-bottom: 14px; }

.news-featured-title { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--lv-fg, #e8dcc8); margin-bottom: 12px; line-height: 1.3; }
.news-featured-excerpt { font-size: 15px; color: rgba(232,220,200,.52); line-height: 1.75; margin-bottom: 20px; }

.news-read-more { font-size: 14px; font-weight: 700; color: #c9a84c; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: gap .2s; }
.news-read-more:hover { gap: 9px; }

/* Grid */
.news-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
.news-card {
  background: var(--lv-surface, #111); border: 1px solid rgba(255,255,255,.07);
  border-radius: 18px; overflow: hidden;
  transition: transform .3s, box-shadow .3s, border-color .3s;
}
.news-card:hover { transform: translateY(-8px); box-shadow: 0 20px 52px rgba(0,0,0,.5); border-color: rgba(201,168,76,.18); }
.news-card-img { height: 200px; overflow: hidden; }
.news-card-img img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s; }
.news-card:hover .news-card-img img { transform: scale(1.06); }
.news-card-body { padding: 22px 24px; }
.news-card-title { font-family: 'Fraunces', 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--lv-fg, #e8dcc8); margin: 10px 0 8px; line-height: 1.3; }
.news-card-excerpt { font-size: 14px; color: rgba(232,220,200,.5); line-height: 1.72; margin-bottom: 14px; }

@media (max-width: 900px) { .news-featured { grid-template-columns: 1fr; } .news-grid { grid-template-columns: 1fr 1fr; } .news-featured-img { min-height: 240px; } }
@media (max-width: 640px) { .ph { min-height: 300px; } .ph-inner { padding: 56px 16px; } .pg-section { padding: 64px 0; } .news-grid { grid-template-columns: 1fr; } }
</style>