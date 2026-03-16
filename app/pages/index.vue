<template>
  <div class="lv-page">
    <HeroSection />
    <PillarStrip />
    <AboutSection />
    <QuoteBand />
    <CampaignsSection />
    <HowItWorks />
    <CtaBand />
    <BottomSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection     from '@/components/landing/HeroSection.vue'
import PillarStrip     from '@/components/landing/PillarStrip.vue'
import AboutSection    from '@/components/landing/AboutSection.vue'
import QuoteBand       from '@/components/landing/QuoteBand.vue'
import CampaignsSection from '@/components/landing/CampaignsSection.vue'
import HowItWorks      from '@/components/landing/HowItWorks.vue'
import CtaBand         from '@/components/landing/CtaBand.vue'
import BottomSection   from '@/components/landing/BottomSection.vue'
</script>

<style>
/* Lovable dark-theme design tokens — applied globally so all landing
   components can reference them via var(--lv-*) */
:root {
  --lv-bg:          #0a0a0a;
  --lv-surface:     #111111;
  --lv-surface-el:  #1a1a1a;
  --lv-fg:          #e8dcc8;
  --lv-muted:       #6b6050;
  --lv-border:      #272727;
  --lv-gold:        #c9a84c;
  --lv-gold-bright: #e0c06a;
  --lv-crimson:     hsl(0, 80%, 28%);
  --lv-crimson-d:   hsl(348, 100%, 6%);
  --lv-crimson-m:   hsl(348, 85%, 16%);
  --lv-cream:       hsl(40, 30%, 92%);
  --lv-font-d: 'Fraunces', 'Playfair Display', serif;
  --lv-font-b: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif;
}

.lv-page {
  font-family: var(--lv-font-b);
  background: var(--lv-bg);
  color: var(--lv-fg);
  -webkit-font-smoothing: antialiased;
}
</style>