<template>
  <div class="lv-pillars">
    <div class="lv-container">
      <div class="lv-pillars-grid">
        <div v-for="(p, i) in pillars" :key="p.title" class="lv-pillar" :class="{ 'lv-pillar-sep': i < pillars.length - 1 }">
          <div class="lv-pillar-icon" v-html="p.svg" />
          <div>
            <div class="lv-pillar-title">{{ p.title }}</div>
            <div class="lv-pillar-sub">{{ p.sub }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pillars = [
  {
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    title: 'Legal Advocacy', sub: 'Challenging corrupt legal practices',
  },
  {
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>`,
    title: "Women's Rights", sub: 'Empowering and educating women',
  },
  {
    svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
    title: 'Support Services', sub: 'Assisting women in need',
  },
]
</script>

<style scoped>
.lv-pillars { background: var(--lv-surface); border-top: 1px solid var(--lv-border); border-bottom: 1px solid var(--lv-border); }
.lv-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.lv-pillars-grid { display: grid; grid-template-columns: repeat(3, 1fr); }
.lv-pillar { display: flex; align-items: center; gap: 16px; padding: 24px 28px; cursor: default; transition: background .18s; position: relative; }
.lv-pillar:hover { background: var(--lv-surface-el); }
.lv-pillar-sep { border-right: 1px solid var(--lv-border); }
.lv-pillar-icon { width: 48px; height: 48px; flex-shrink: 0; border-radius: 12px; background: rgba(201,168,76,.1); border: 1px solid rgba(201,168,76,.2); display: flex; align-items: center; justify-content: center; color: var(--lv-gold); transition: transform .22s; }
.lv-pillar-icon :deep(svg) { width: 22px; height: 22px; }
.lv-pillar:hover .lv-pillar-icon { transform: scale(1.1) rotate(-4deg); }
.lv-pillar-title { font-family: var(--lv-font-d); font-size: 15px; font-weight: 700; color: var(--lv-fg); margin-bottom: 3px; }
.lv-pillar-sub   { font-size: 13px; color: var(--lv-muted); line-height: 1.4; }
@media (max-width: 768px) {
  .lv-pillars-grid { grid-template-columns: 1fr; }
  .lv-pillar-sep { border-right: none; border-bottom: 1px solid var(--lv-border); }
  .lv-pillar { padding: 18px 20px; }
}
</style>