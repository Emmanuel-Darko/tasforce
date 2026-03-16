<template>
  <section class="lv-camps">
    <div class="lv-container">
      <div class="lv-head">
        <div>
          <span class="lv-eyebrow">Our Campaigns</span>
          <h2 class="lv-title" style="margin-bottom:0;">What We Fight For</h2>
        </div>
        <NuxtLink to="/campaigns" class="lv-viewall">
          View All
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
        </NuxtLink>
      </div>

      <div class="lv-grid">
        <!-- Featured -->
        <div class="lv-camp lv-camp-featured">
          <img :src="campaigns[0]?.img" :alt="campaigns[0]?.title" class="lv-camp-img" />
          <div class="lv-overlay">
            <span class="lv-num">01</span>
            <h3 class="lv-camp-title">{{ campaigns[0]?.title }}</h3>
            <p class="lv-camp-sub">{{ campaigns[0]?.sub }}</p>
            <NuxtLink to="/campaigns" class="lv-more">
              Learn More
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Side stack -->
        <div class="lv-col">
          <div v-for="(c, i) in campaigns.slice(1)" :key="c.title" class="lv-camp lv-camp-small">
            <img :src="c.img" :alt="c.title" class="lv-camp-img" />
            <div class="lv-overlay">
              <span class="lv-num">0{{ i + 2 }}</span>
              <h3 class="lv-camp-title lv-camp-title-sm">{{ c.title }}</h3>
              <p class="lv-camp-sub">{{ c.sub }}</p>
              <NuxtLink to="/campaigns" class="lv-more">
                Learn More
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const campaigns = [
  { title: 'End Legal Corruption',   sub: 'Demanding fair justice for every woman in court',  img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=85&auto=format&fit=crop' },
  { title: 'Equal Rights for Women', sub: 'Advocating for legislative and social change',       img: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=700&q=80&auto=format&fit=crop' },
  { title: 'Support for Victims',    sub: 'Providing help, hope and safe resources',            img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=700&q=80&auto=format&fit=crop' },
]
</script>

<style scoped>
.lv-camps { padding: 96px 0; background: var(--lv-surface); }
.lv-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.lv-head { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 40px; gap: 16px; }
.lv-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .2em; color: var(--lv-gold); margin-bottom: 12px; display: block; }
.lv-title   { font-family: var(--lv-font-d); font-size: clamp(26px,3.5vw,38px); font-weight: 700; color: var(--lv-fg); line-height: 1.15; }
.lv-viewall { display: inline-flex; align-items: center; gap: 8px; color: var(--lv-gold); font-weight: 700; font-size: 15px; text-decoration: none; transition: gap .2s; flex-shrink: 0; }
.lv-viewall svg { width: 16px; height: 16px; }
.lv-viewall:hover { gap: 12px; }

.lv-grid { display: grid; grid-template-columns: 7fr 5fr; gap: 16px; align-items: start; }
.lv-col  { display: flex; flex-direction: column; gap: 16px; }

.lv-camp { position: relative; border-radius: 20px; overflow: hidden; background: var(--lv-crimson-d); cursor: pointer; }
.lv-camp-featured { height: 540px; }
.lv-camp-small    { height: 260px; }

.lv-camp-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .7; transition: transform .65s cubic-bezier(.4,0,.2,1), opacity .4s; }
.lv-camp:hover .lv-camp-img { transform: scale(1.07); opacity: .52; }

.lv-overlay { position: absolute; inset: 0; padding: 28px 26px; display: flex; flex-direction: column; justify-content: flex-end; background: linear-gradient(to top, rgba(10,0,2,.98) 0%, rgba(30,0,5,.62) 50%, rgba(10,0,2,.06) 100%); transition: background .3s; }
.lv-camp:hover .lv-overlay { background: linear-gradient(to top, rgba(10,0,2,.99) 0%, rgba(30,0,5,.78) 56%, rgba(10,0,2,.14) 100%); }

.lv-num        { font-family: var(--lv-font-d); font-size: 10px; font-weight: 700; letter-spacing: .22em; color: var(--lv-gold); margin-bottom: 9px; display: block; }
.lv-camp-title { font-family: var(--lv-font-d); font-size: 26px; font-weight: 700; color: var(--lv-cream); line-height: 1.2; margin-bottom: 7px; }
.lv-camp-title-sm { font-size: 20px; }
.lv-camp-sub   { font-size: 14px; color: rgba(232,220,200,.5); line-height: 1.5; }
.lv-more { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: var(--lv-gold); text-decoration: none; margin-top: 15px; opacity: 0; transform: translateY(8px); transition: opacity .28s, transform .28s; }
.lv-more svg { width: 14px; height: 14px; }
.lv-camp:hover .lv-more { opacity: 1; transform: translateY(0); }

@media (max-width: 960px) {
  .lv-grid { grid-template-columns: 1fr; }
  .lv-camp-featured { height: 380px; }
  .lv-col { flex-direction: row; }
  .lv-camp-small { height: 230px; flex: 1; }
}
@media (max-width: 640px) {
  .lv-camps { padding: 64px 0; }
  .lv-head { flex-direction: column; align-items: flex-start; }
  .lv-col { flex-direction: column; }
  .lv-camp-featured { height: 300px; }
  .lv-camp-small { height: 220px; flex: none; }
  .lv-camp-title { font-size: 21px; }
}
</style>