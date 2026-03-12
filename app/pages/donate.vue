<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <div style="font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin-bottom:12px;">Support Our Work</div>
        <h1>Donate</h1>
        <p style="margin-top:14px;">Your support helps us fight for justice and empower women.</p>
      </div>
    </section>
    <section class="section">
      <div class="container" style="max-width:700px;">
        <div class="notice notice-info" style="margin-bottom:28px;">
          <span>ℹ</span><span>Donation processing will be available soon. Thank you for your interest in supporting TAS-FORCE.</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:32px;">
          <div v-for="a in amounts" :key="a" class="card" style="text-align:center;padding:24px;cursor:pointer;">
            <div style="font-family:'Playfair Display',serif;font-size:28px;font-weight:700;color:var(--crimson);">GH₵{{ a }}</div>
            <div style="font-size:13px;color:var(--muted);margin-top:4px;">One-time gift</div>
          </div>
        </div>
        <NuxtLink to="/contact" class="btn btn-crimson btn-lg btn-block">Contact Us to Donate</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const amounts = [25, 50, 100, 250, 500, 1000]
</script>
