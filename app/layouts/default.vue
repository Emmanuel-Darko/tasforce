<template>
  <div>
    <header class="pub-header">
      <div class="pub-inner">
        <NuxtLink to="/" class="pub-logo">
          <div class="pub-logo-icon">TF</div>
          <div>
            <div class="pub-logo-name">TAS-FORCE</div>
            <div class="pub-logo-sub">Truth &amp; Advocacy for Women</div>
          </div>
        </NuxtLink>

        <nav class="pub-nav">
          <NuxtLink to="/"             class="pub-navlink">Home</NuxtLink>
          <NuxtLink to="/about"        class="pub-navlink">About Us</NuxtLink>
          <NuxtLink to="/campaigns"    class="pub-navlink">Our Campaigns</NuxtLink>
          <NuxtLink to="/get-involved" class="pub-navlink">Get Involved</NuxtLink>
          <NuxtLink to="/news"         class="pub-navlink">News</NuxtLink>
          <NuxtLink to="/contact"      class="pub-navlink">Contact</NuxtLink>
        </nav>

        <div class="pub-cta">
          <template v-if="isLoggedIn">
            <NuxtLink :to="isAdmin ? '/admin' : '/dashboard'" class="btn btn-gold btn-sm">My Account</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login"    class="btn btn-outline-cream btn-sm">Sign In</NuxtLink>
            <NuxtLink to="/auth/register" class="btn btn-gold btn-sm">Join Us</NuxtLink>
          </template>
          <button class="pub-hamburger" @click="mobileOpen = true" aria-label="Open menu">☰</button>
        </div>
      </div>
    </header>

    <!-- Mobile drawer -->
    <div class="mobile-nav" :class="{ open: mobileOpen }">
      <div class="mobile-nav-bg" @click="mobileOpen = false" />
      <div class="mobile-nav-drawer">
        <div class="mobile-nav-head">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="pub-logo-icon" style="width:34px;height:34px;font-size:11px;">TF</div>
            <span style="font-family:'Playfair Display',serif;font-weight:900;font-size:16px;color:var(--cream);">TAS-FORCE</span>
          </div>
          <button @click="mobileOpen = false" style="background:none;border:none;color:rgba(245,230,208,0.55);font-size:22px;cursor:pointer;line-height:1;padding:4px;">✕</button>
        </div>
        <div class="mobile-nav-links">
          <NuxtLink to="/"             class="mobile-nav-link" @click="mobileOpen = false">🏠 Home</NuxtLink>
          <NuxtLink to="/about"        class="mobile-nav-link" @click="mobileOpen = false">ℹ About Us</NuxtLink>
          <NuxtLink to="/campaigns"    class="mobile-nav-link" @click="mobileOpen = false">⚖ Our Campaigns</NuxtLink>
          <NuxtLink to="/get-involved" class="mobile-nav-link" @click="mobileOpen = false">✊ Get Involved</NuxtLink>
          <NuxtLink to="/news"         class="mobile-nav-link" @click="mobileOpen = false">📰 News</NuxtLink>
          <NuxtLink to="/contact"      class="mobile-nav-link" @click="mobileOpen = false">✉ Contact</NuxtLink>
          <NuxtLink to="/donate"       class="mobile-nav-link" @click="mobileOpen = false">♡ Donate</NuxtLink>
        </div>
        <div class="mobile-nav-footer">
          <template v-if="isLoggedIn">
            <NuxtLink :to="isAdmin ? '/admin' : '/dashboard'" class="btn btn-gold btn-block" @click="mobileOpen = false">My Account</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/register" class="btn btn-gold btn-block" @click="mobileOpen = false">Join TAS-FORCE</NuxtLink>
            <NuxtLink to="/auth/login"    class="btn btn-outline-cream btn-block" @click="mobileOpen = false">Sign In</NuxtLink>
          </template>
        </div>
      </div>
    </div>

    <main><slot /></main>

    <footer class="pub-footer">
      <div class="pub-footer-top">
        <div>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px;">
            <div class="pub-logo-icon" style="width:40px;height:40px;font-size:13px;">TF</div>
            <div>
              <div style="font-family:'Playfair Display',serif;font-weight:900;font-size:17px;color:var(--cream);letter-spacing:0.04em;">TAS-FORCE</div>
              <div style="font-size:8px;color:rgba(201,168,76,0.65);letter-spacing:0.08em;text-transform:uppercase;margin-top:2px;">Truth and Advocacy for Serwah &amp; Women Empowerment</div>
            </div>
          </div>
          <p style="font-size:15px;color:rgba(245,230,208,0.4);line-height:1.75;max-width:290px;">Fighting for the rights of women facing injustice in society and marriage.</p>
          <div style="display:flex;gap:8px;margin-top:20px;">
            <a v-for="s in ['f','𝕏','▶']" :key="s" href="#" style="width:34px;height:34px;border-radius:50%;background:rgba(201,168,76,0.1);border:1px solid rgba(201,168,76,0.18);display:flex;align-items:center;justify-content:center;font-size:13px;color:rgba(245,230,208,0.45);text-decoration:none;">{{ s }}</a>
          </div>
        </div>
        <div>
          <div class="pf-col-heading">Organisation</div>
          <NuxtLink to="/about"      class="pf-link">About Us</NuxtLink>
          <NuxtLink to="/campaigns"  class="pf-link">Our Campaigns</NuxtLink>
          <NuxtLink to="/news"       class="pf-link">News &amp; Updates</NuxtLink>
          <NuxtLink to="/contact"    class="pf-link">Contact</NuxtLink>
        </div>
        <div>
          <div class="pf-col-heading">Membership</div>
          <NuxtLink to="/get-involved"  class="pf-link">Get Involved</NuxtLink>
          <NuxtLink to="/auth/register" class="pf-link">Join TAS-FORCE</NuxtLink>
          <NuxtLink to="/auth/login"    class="pf-link">Member Login</NuxtLink>
          <NuxtLink to="/donate"        class="pf-link">Donate</NuxtLink>
        </div>
      </div>
      <hr class="pub-footer-divider" />
      <div class="pub-footer-bottom">
        <span class="pub-footer-copy">© {{ new Date().getFullYear() }} TAS-FORCE. All rights reserved.</span>
        <span class="pub-footer-copy" style="display:none;display:block;" data-desktop>Truth and Advocacy for Serwah &amp; Women Empowerment</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, isAdmin } = useAuth()
const mobileOpen = ref(false)
</script>
