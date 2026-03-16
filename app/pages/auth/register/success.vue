<template>
  <div class="aw-success">
    <div class="aw-check">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
    </div>
    <h2 class="aw-title">Application Submitted!</h2>
    <p class="aw-body">Thank you for joining TAS-FORCE. Your application is under review. We will send you a confirmation email once approved and your membership card is issued.</p>
    <NuxtLink to="/" class="aw-btn">Return to Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })
</script>

<style scoped>
.aw-success { text-align: center; max-width: 420px; padding: 20px 0; }
.aw-check   { width: 68px; height: 68px; border-radius: 50%; background: linear-gradient(135deg, #1f6644, #2D6A4F); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 4px 18px rgba(31,102,68,.35); }
.aw-check svg { width: 28px; height: 28px; color: #fff; }
.aw-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--text); margin-bottom: 12px; }
.aw-body  { font-size: 16px; color: var(--muted); line-height: 1.75; margin-bottom: 28px; }
.aw-btn   { display: inline-flex; align-items: center; padding: 13px 32px; border-radius: 10px; background: linear-gradient(135deg, var(--crimson, #2D1B69), var(--crimson2, #3E2A82)); color: var(--cream, #f5e6d0); font-family: 'Crimson Pro', serif; font-size: 15px; font-weight: 700; text-decoration: none; box-shadow: 0 2px 12px rgba(45,27,105,.28); transition: transform .2s; }
.aw-btn:hover { transform: translateY(-2px); }
</style>