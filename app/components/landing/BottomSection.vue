<template>
  <section class="lv-bottom">
    <div class="lv-container">
      <div class="lv-grid">
        <div>
          <h3 class="lv-col-title">Get in Touch</h3>
          <div v-for="([icon, val, sub]) in contactItems" :key="val" class="lv-contact-row">
            <div class="lv-contact-icon">{{ icon }}</div>
            <div>
              <div class="lv-contact-val">{{ val }}</div>
              <div class="lv-contact-sub">{{ sub }}</div>
            </div>
          </div>
        </div>
        <div>
          <h3 class="lv-col-title">Latest News</h3>
          <a v-for="n in news" :key="n.title" href="#" class="lv-news-row">
            <div class="lv-news-bar" />
            <div>
              <div class="lv-news-title">{{ n.title }}</div>
              <div class="lv-news-date">{{ n.date }}</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const contactItems: [string, string, string][] = [
  ['📞', '+123-456-7890',      'Mon – Fri, 9am – 5pm GMT'],
  ['✉️', 'info@tas-force.org', 'We reply within 24 hours'],
  ['🌐', 'www.tas-force.org',  'Visit our website'],
]
const news = [
  { title: 'Justice for Akosua: Latest Updates',        date: 'April 18, 2024' },
  { title: 'Fighting Corrupt Judges: A Call to Action', date: 'April 10, 2024' },
  { title: 'New Support Centre Opens in Accra',          date: 'March 22, 2024' },
]
</script>

<style scoped>
.lv-bottom { padding: 64px 0; background: var(--lv-surface); border-top: 1px solid var(--lv-border); }
.lv-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.lv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 52px; }
.lv-col-title { font-family: var(--lv-font-d); font-size: 20px; font-weight: 700; color: var(--lv-fg); margin-bottom: 24px; }

.lv-contact-row  { display: flex; align-items: flex-start; gap: 14px; margin-bottom: 20px; }
.lv-contact-icon { width: 42px; height: 42px; flex-shrink: 0; border-radius: 10px; background: rgba(201,168,76,.08); border: 1px solid rgba(201,168,76,.15); display: flex; align-items: center; justify-content: center; font-size: 17px; }
.lv-contact-val  { font-size: 16px; font-weight: 600; color: var(--lv-fg); margin-bottom: 3px; }
.lv-contact-sub  { font-size: 13px; color: var(--lv-muted); }

.lv-news-row   { display: flex; align-items: flex-start; gap: 14px; padding: 11px 10px; border-radius: 10px; margin: 0 -10px 4px; text-decoration: none; cursor: pointer; transition: background .15s; }
.lv-news-row:hover { background: var(--lv-surface-el); }
.lv-news-bar   { flex-shrink: 0; margin-top: 5px; width: 3px; height: 38px; border-radius: 2px; background: linear-gradient(to bottom, var(--lv-crimson), var(--lv-gold)); }
.lv-news-title { font-size: 15px; font-weight: 600; color: var(--lv-fg); line-height: 1.45; margin-bottom: 4px; }
.lv-news-date  { font-size: 12px; color: var(--lv-muted); }

@media (max-width: 640px) { .lv-bottom { padding: 48px 0; } .lv-grid { grid-template-columns: 1fr; gap: 36px; } }
</style>