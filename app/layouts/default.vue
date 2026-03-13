<template>
  <div>

    <!-- ══════════════════════════════════════════
         HEADER
    ═══════════════════════════════════════════ -->
    <header class="pub-header" :class="{ 'pub-header--scrolled': scrolled }">
      <div class="pub-inner">

        <!-- Logo -->
        <NuxtLink to="/" class="pub-logo">
          <div class="pub-logo-icon">TF</div>
          <div>
            <div class="pub-logo-name">TAS-FORCE</div>
            <div class="pub-logo-sub">Truth &amp; Advocacy for Women</div>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="pub-nav">
          <NuxtLink to="/"             class="pub-navlink">Home</NuxtLink>
          <NuxtLink to="/about"        class="pub-navlink">About Us</NuxtLink>
          <NuxtLink to="/campaigns"    class="pub-navlink">Our Campaigns</NuxtLink>
          <NuxtLink to="/get-involved" class="pub-navlink">Get Involved</NuxtLink>
          <NuxtLink to="/news"         class="pub-navlink">News</NuxtLink>
          <NuxtLink to="/contact"      class="pub-navlink">Contact</NuxtLink>
        </nav>

        <!-- Right CTA + hamburger -->
        <div class="pub-cta">
          <template v-if="isLoggedIn">
            <NuxtLink :to="isAdmin ? '/admin' : '/dashboard'" class="btn btn-gold btn-sm">
              My Account
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login"    class="btn btn-outline-cream btn-sm">Sign In</NuxtLink>
            <NuxtLink to="/auth/register" class="btn btn-gold btn-sm">Join Us</NuxtLink>
          </template>
          <button class="pub-hamburger" @click="mobileOpen = true" aria-label="Open menu">
            <span class="hbg-bar" /><span class="hbg-bar" /><span class="hbg-bar" />
          </button>
        </div>

      </div>

      <!-- Active gold accent underline -->
      <div class="pub-header-accent" />
    </header>


    <!-- ══════════════════════════════════════════
         MOBILE DRAWER
    ═══════════════════════════════════════════ -->
    <div class="mobile-nav" :class="{ open: mobileOpen }">
      <div class="mobile-nav-bg" @click="mobileOpen = false" />
      <div class="mobile-nav-drawer">

        <!-- Drawer head -->
        <div class="mobile-nav-head">
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="pub-logo-icon" style="width:36px;height:36px;font-size:12px;">TF</div>
            <div>
              <div style="font-family:'Playfair Display',serif;font-weight:900;font-size:16px;color:var(--cream);letter-spacing:0.05em;">TAS-FORCE</div>
              <div style="font-size:8px;color:rgba(201,168,76,0.55);text-transform:uppercase;letter-spacing:0.1em;margin-top:1px;">Truth &amp; Advocacy</div>
            </div>
          </div>
          <button @click="mobileOpen = false" class="mnav-close">✕</button>
        </div>

        <!-- Drawer links -->
        <div class="mobile-nav-links">
          <NuxtLink to="/"             class="mnav-link" @click="mobileOpen = false">
            <span class="mnav-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L10 3l7 6.5V17a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M7 18v-6h6v6"/></svg></span>
            <span>Home</span>
          </NuxtLink>
          <NuxtLink to="/about"        class="mnav-link" @click="mobileOpen = false">
            <span class="mnav-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3"/><path d="M4 17c0-3.314 2.686-6 6-6s6 2.686 6 6"/></svg></span>
            <span>About Us</span>
          </NuxtLink>
          <NuxtLink to="/campaigns"    class="mnav-link" @click="mobileOpen = false">
            <span class="mnav-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 3v14M3 7h14M3 13h14"/><rect x="3" y="3" width="14" height="14" rx="2"/></svg></span>
            <span>Our Campaigns</span>
          </NuxtLink>
          <NuxtLink to="/get-involved" class="mnav-link" @click="mobileOpen = false">
            <span class="mnav-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M7 9V6a3 3 0 016 0v3"/><rect x="3" y="9" width="14" height="9" rx="1.5"/><circle cx="10" cy="13.5" r="1"/></svg></span>
            <span>Get Involved</span>
          </NuxtLink>
          <NuxtLink to="/news"         class="mnav-link" @click="mobileOpen = false">
            <span class="mnav-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="1.5"/><path d="M7 8h6M7 11h6M7 14h4"/></svg></span>
            <span>News</span>
          </NuxtLink>
          <NuxtLink to="/contact"      class="mnav-link" @click="mobileOpen = false">
            <span class="mnav-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="16" height="11" rx="1.5"/><path d="M2 7l8 5 8-5"/></svg></span>
            <span>Contact</span>
          </NuxtLink>
          <NuxtLink to="/donate"       class="mnav-link mnav-link--donate" @click="mobileOpen = false">
            <span class="mnav-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 16.5S3 12.5 3 7.5a4 4 0 018 0 4 4 0 018 0c0 5-7 9-9 9z"/></svg></span>
            <span>Donate</span>
          </NuxtLink>
        </div>

        <!-- Drawer footer CTAs -->
        <div class="mobile-nav-footer">
          <template v-if="isLoggedIn">
            <NuxtLink :to="isAdmin ? '/admin' : '/dashboard'" class="btn btn-gold btn-block" @click="mobileOpen = false">
              My Account
            </NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/register" class="btn btn-gold btn-block" @click="mobileOpen = false">Join TAS-FORCE</NuxtLink>
            <NuxtLink to="/auth/login"    class="btn btn-outline-cream btn-block" @click="mobileOpen = false">Sign In</NuxtLink>
          </template>
        </div>

      </div>
    </div>


    <!-- ══════════════════════════════════════════
         PAGE CONTENT
    ═══════════════════════════════════════════ -->
    <main><slot /></main>


    <!-- ══════════════════════════════════════════
         FOOTER
    ═══════════════════════════════════════════ -->
    <footer class="pub-footer">

      <!-- Top content grid -->
      <div class="pub-footer-top">

        <!-- Brand column -->
        <div class="pf-brand">
          <div class="pf-brand-logo">
            <div class="pub-logo-icon" style="width:44px;height:44px;font-size:14px;">TF</div>
            <div>
              <div class="pf-brand-name">TAS-FORCE</div>
              <div class="pf-brand-tagline">Truth and Advocacy for Serwah &amp; Women Empowerment</div>
            </div>
          </div>
          <p class="pf-brand-desc">
            Fighting for the rights of women facing injustice in society and marriage —
            raising awareness and challenging corruption across Africa and beyond.
          </p>
          <!-- Social icons -->
          <div class="pf-socials">
            <a href="#" class="pf-social" aria-label="Facebook">f</a>
            <a href="#" class="pf-social" aria-label="X / Twitter">𝕏</a>
            <a href="#" class="pf-social" aria-label="YouTube">▶</a>
            <a href="#" class="pf-social" aria-label="Instagram">◉</a>
          </div>
        </div>

        <!-- Organisation links -->
        <div>
          <div class="pf-col-heading">Organisation</div>
          <NuxtLink to="/about"      class="pf-link">About Us</NuxtLink>
          <NuxtLink to="/campaigns"  class="pf-link">Our Campaigns</NuxtLink>
          <NuxtLink to="/news"       class="pf-link">News &amp; Updates</NuxtLink>
          <NuxtLink to="/contact"    class="pf-link">Contact Us</NuxtLink>
          <NuxtLink to="/donate"     class="pf-link pf-link-gold">♡ Donate</NuxtLink>
        </div>

        <!-- Membership links -->
        <div>
          <div class="pf-col-heading">Membership</div>
          <NuxtLink to="/get-involved"  class="pf-link">Get Involved</NuxtLink>
          <NuxtLink to="/auth/register" class="pf-link">Join TAS-FORCE</NuxtLink>
          <NuxtLink to="/auth/login"    class="pf-link">Member Login</NuxtLink>
          <NuxtLink to="/verify"        class="pf-link">Verify a Card</NuxtLink>
        </div>

      </div>

      <!-- Gold divider line -->
      <div class="pub-footer-divider-fancy">
        <div class="pf-div-line" />
        <div class="pf-div-mark">✦</div>
        <div class="pf-div-line" />
      </div>

      <!-- Bottom bar -->
      <div class="pub-footer-bottom">
        <span class="pub-footer-copy">© {{ new Date().getFullYear() }} TAS-FORCE. All rights reserved.</span>
        <span class="pub-footer-copy pf-bottom-tagline">Truth and Advocacy for Serwah &amp; Women Empowerment</span>
      </div>

    </footer>

  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, isAdmin } = useAuth()
const mobileOpen = ref(false)

// Scroll-aware header
const scrolled = ref(false)
onMounted(() => {
  const onScroll = () => { scrolled.value = window.scrollY > 48 }
  window.addEventListener('scroll', onScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', onScroll))
})
</script>

<style scoped>
/* ═══════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════ */
.pub-header {
  background: var(--crimson-deep);
  position: sticky; top: 0; z-index: 150;
  transition: background 0.3s, box-shadow 0.3s;
}

/* Scrolled state — subtle glass depth */
.pub-header--scrolled {
  background: rgba(45, 0, 8, 0.96);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 2px 32px rgba(0,0,0,0.32);
}

/* Gold shimmer accent line at bottom */
.pub-header-accent {
  height: 2px;
  background: linear-gradient(90deg,
    transparent   0%,
    var(--crimson-mid) 15%,
    var(--gold)   40%,
    var(--gold2)  50%,
    var(--gold)   60%,
    var(--crimson-mid) 85%,
    transparent  100%
  );
  opacity: 0.72;
}

/* ── Hamburger icon — 3 bars ── */
.pub-hamburger {
  display: none;
  flex-direction: column; gap: 5px;
  padding: 8px 6px;
  background: rgba(201,168,76,0.1);
  border: 1px solid rgba(201,168,76,0.28);
  border-radius: 8px; cursor: pointer;
}
.hbg-bar {
  display: block; width: 20px; height: 1.5px;
  background: var(--cream); border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s;
}

/* ── Nav link active indicator ── */
/* override global router-link-active for a bottom-border treatment */
:deep(.router-link-active.pub-navlink) {
  color: var(--gold) !important;
  position: relative;
}
:deep(.router-link-active.pub-navlink)::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 50%; right: 50%;
  height: 2px; border-radius: 1px;
  background: var(--gold);
  transition: left 0.22s, right 0.22s;
}
/* expand on active */
:deep(.router-link-exact-active.pub-navlink)::after {
  left: 13px; right: 13px;
}


/* ═══════════════════════════════════════════════
   MOBILE DRAWER — enhanced
═══════════════════════════════════════════════ */
.mnav-close {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 8px;
  color: rgba(255,255,255,0.5);
  font-size: 16px; cursor: pointer;
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.18s, color 0.18s;
}
.mnav-close:hover {
  background: rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.85);
}

.mnav-link {
  display: flex !important;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-radius: 10px;
  color: rgba(245, 230, 208, 0.58);
  font-size: 16px;
  font-family: 'Crimson Pro', serif;
  font-weight: 500;
  text-decoration: none;
  border-left: 3px solid transparent;
  margin-bottom: 2px;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
}
.mnav-link:hover {
  background: rgba(201, 168, 76, 0.1);
  color: var(--cream);
  border-left-color: rgba(201, 168, 76, 0.35);
}
/* Active state */
.mnav-link.router-link-active,
.mnav-link.router-link-exact-active {
  background: rgba(201, 168, 76, 0.14);
  color: var(--gold);
  border-left-color: var(--gold);
  font-weight: 600;
}
/* SVG icon container */
.mnav-icon {
  width: 20px; height: 20px;
  flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  opacity: 0.5;
  transition: opacity 0.18s;
}
.mnav-icon svg { width: 18px; height: 18px; }
.mnav-link:hover .mnav-icon,
.mnav-link.router-link-active .mnav-icon {
  opacity: 1;
}
/* Donate gold tint */
.mnav-link--donate { color: rgba(201, 168, 76, 0.7); }
.mnav-link--donate:hover,
.mnav-link--donate.router-link-active {
  color: var(--gold);
  background: rgba(201, 168, 76, 0.12);
  border-left-color: var(--gold);
}


/* ═══════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════ */
.pub-footer {
  background: var(--crimson-deep);
  /* subtle texture */
  background-image:
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='0.025'%3E%3Ccircle cx='30' cy='30' r='22'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(180deg, var(--crimson-deep) 0%, #1a0003 100%);
  background-size: 60px 60px, auto;
}

/* — Brand column — */
.pf-brand { max-width: 300px; }

.pf-brand-logo {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 18px;
}
.pf-brand-name {
  font-family: 'Playfair Display', serif;
  font-weight: 900; font-size: 18px;
  color: var(--cream); letter-spacing: 0.05em;
  line-height: 1;
}
.pf-brand-tagline {
  font-size: 8px; color: rgba(201,168,76,0.55);
  letter-spacing: 0.07em; text-transform: uppercase;
  margin-top: 4px; line-height: 1.4;
}
.pf-brand-desc {
  font-size: 14px; color: rgba(255,255,255,0.36);
  line-height: 1.75;
}

/* — Social icons — */
.pf-socials {
  display: flex; gap: 8px; margin-top: 20px;
}
.pf-social {
  width: 36px; height: 36px; border-radius: 50%;
  background: rgba(201,168,76,0.08);
  border: 1px solid rgba(201,168,76,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: background 0.2s, border-color 0.2s, color 0.2s, transform 0.2s;
}
.pf-social:hover {
  background: rgba(201,168,76,0.18);
  border-color: rgba(201,168,76,0.55);
  color: var(--gold);
  transform: translateY(-2px);
}

/* — Footer link gold variant — */
.pf-link-gold {
  color: var(--gold) !important;
  opacity: 0.85;
}
.pf-link-gold:hover { opacity: 1; color: var(--gold2) !important; }

/* — Fancy divider — */
.pub-footer-divider-fancy {
  display: flex; align-items: center; gap: 16px;
  max-width: 1200px; margin: 0 auto;
  padding: 0 24px;
}
.pf-div-line {
  flex: 1; height: 1px;
  background: linear-gradient(90deg,
    transparent,
    rgba(201,168,76,0.22) 30%,
    rgba(201,168,76,0.22) 70%,
    transparent
  );
}
.pf-div-mark {
  font-size: 10px; color: rgba(201,168,76,0.4);
  flex-shrink: 0;
}

/* — Bottom bar — */
.pf-bottom-tagline { display: none; }
@media (min-width: 641px) { .pf-bottom-tagline { display: block; } }

/* ═══════════════════════════════════════════════
   RESPONSIVE
═══════════════════════════════════════════════ */
@media (max-width: 900px) {
  .pub-hamburger { display: flex; }
}

@media (max-width: 640px) {
  .pub-footer-top {
    grid-template-columns: 1fr !important;
    gap: 32px;
    padding: 44px 16px 32px;
  }
  .pf-brand { max-width: 100%; }
  .pub-footer-bottom { padding: 14px 16px; }
  .pub-footer-divider-fancy { padding: 0 16px; }
}
</style>