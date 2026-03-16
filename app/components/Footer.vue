<template>
  <footer class="bg-crimson-deep border-t border-gold/10">
    <!-- Top grid -->
    <div class="container mx-auto py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
      <!-- Brand column -->
      <div class="sm:col-span-2 lg:col-span-1 max-w-xs">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center font-display font-black text-sm text-crimson-deep shadow-lg shadow-gold/30">
            TF
          </div>
          <div>
            <div class="font-display font-bold text-base text-foreground">TAS-FORCE</div>
            <div class="text-[10px] text-gold/40 tracking-[0.1em] uppercase leading-snug">
              Truth and Advocacy for Serwah<br />& Women Empowerment
            </div>
          </div>
        </div>
        <p class="text-sm text-muted-foreground leading-relaxed mb-5">
          Fighting for the rights of women facing injustice in society and marriage —
          raising awareness and challenging corruption across Africa and beyond.
        </p>
        <div class="flex gap-3">
          <a
            v-for="(icon, i) in socialIcons"
            :key="i"
            href="#"
            class="w-9 h-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-xs text-foreground/40 hover:text-gold hover:border-gold/30 hover:bg-gold/5 transition-all"
          >
            {{ icon }}
          </a>
        </div>
      </div>
      <!-- Organisation -->
      <div>
        <h4 class="font-display font-bold text-sm text-foreground mb-5 tracking-wide">Organisation</h4>
        <ul class="space-y-3">
          <li v-for="link in organisationLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
      <!-- Membership -->
      <div>
        <h4 class="font-display font-bold text-sm text-foreground mb-5 tracking-wide">Membership</h4>
        <ul class="space-y-3">
          <li v-for="link in membershipLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm text-muted-foreground hover:text-gold transition-colors"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <!-- Fancy divider -->
    <div class="container mx-auto flex items-center gap-4 px-6">
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <span class="text-gold/30 text-lg font-display">✦</span>
      <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
    <!-- Bottom bar -->
    <div class="container mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center">
      <p class="text-xs text-muted-foreground">
        © {{ year }} TAS-FORCE. All rights reserved.
      </p>
      <p class="text-[10px] text-muted-foreground/60 tracking-wide hidden sm:block">
        Truth and Advocacy for Serwah & Women Empowerment
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const year = new Date().getFullYear();

const socialIcons = ["f", "𝕏", "▶", "◉"];

const organisationLinks = [
  { to: "/about", label: "About Us" },
  { to: "/campaigns", label: "Our Campaigns" },
  { to: "/news", label: "News & Updates" },
  { to: "/contact", label: "Contact Us" },
  { to: "/donate", label: "♡ Donate" },
]

const membershipLinks = [
  { to: "/get-involved", label: "Get Involved" },
  { to: "/auth/register", label: "Join TAS-FORCE" },
  { to: "/auth/login", label: "Member Login" },
  { to: "/verify", label: "Verify a Card" },
]
</script>