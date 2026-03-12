<template>
  <div style="text-align:center;padding:48px 20px;max-width:460px;">
    <div style="width:68px;height:68px;background:#e8f5ee;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;color:var(--success);margin:0 auto 20px;">✓</div>
    <h2 style="font-family:'Playfair Display',serif;font-size:26px;color:var(--crimson);margin-bottom:12px;">Application Submitted!</h2>
    <p style="font-size:16px;color:var(--muted);line-height:1.75;margin-bottom:26px;">
      Thank you for joining TAS-FORCE. Your application is under review. We will send you a confirmation email once approved and your membership card is issued.
    </p>
    <NuxtLink to="/" class="btn btn-crimson">Return to Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth' })
</script>
