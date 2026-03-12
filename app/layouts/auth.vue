<template>
  <div class="auth-shell">
    <div class="auth-brand">
      <div class="auth-brand-pattern" />
      <div style="position:relative;z-index:2;">
        <NuxtLink to="/" style="display:inline-flex;align-items:center;gap:10px;margin-bottom:28px;">
          <div class="pub-logo-icon" style="width:44px;height:44px;font-size:15px;">TF</div>
          <div>
            <div style="font-family:'Playfair Display',serif;font-weight:900;font-size:20px;color:var(--cream);letter-spacing:0.05em;">TAS-FORCE</div>
            <div style="font-size:8px;color:rgba(201,168,76,0.7);letter-spacing:0.1em;text-transform:uppercase;margin-top:1px;">Truth &amp; Advocacy for Women</div>
          </div>
        </NuxtLink>

        <h2 style="font-family:'Playfair Display',serif;font-size:clamp(22px,3vw,30px);color:var(--cream);font-weight:700;line-height:1.2;margin-bottom:10px;">Justice for Her.<br/><span style="color:var(--gold);font-style:italic;">Accountability for All.</span></h2>
        <p style="font-size:15px;color:rgba(245,230,208,0.52);line-height:1.7;margin-bottom:30px;max-width:340px;">Fighting for the rights of women facing injustice in society and marriage.</p>

        <ul class="auth-feats">
          <li v-for="f in features" :key="f.text" class="auth-feat">
            <div class="auth-feat-dot"></div>
            <span>{{ f.text }}</span>
          </li>
        </ul>

        <NuxtLink to="/" class="btn btn-ghost btn-sm" style="margin-top:28px;color:rgba(245,230,208,0.3);padding-left:0;font-size:13px;">← Back to website</NuxtLink>
      </div>
    </div>

    <div class="auth-form">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const features = [
  { text: 'Official digital membership card with QR verification' },
  { text: 'Secure member portal & profile management' },
  { text: 'Access to campaigns, resources & updates' },
  { text: 'Stand united in the fight for justice' },
]
</script>
