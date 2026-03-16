<template>
  <div>

    <!-- HEADER -->
    <header class="lv-header" :class="{ 'lv-header--scrolled': scrolled }">
      <div class="lv-header-inner">

        <NuxtLink to="/" class="lv-logo">
          <div class="lv-logo-mark">TF</div>
          <div class="lv-logo-text">
            <div class="lv-logo-name">TAS-FORCE</div>
            <div class="lv-logo-sub">Truth &amp; Advocacy for Women</div>
          </div>
        </NuxtLink>

        <nav class="lv-nav">
          <NuxtLink v-for="link in navLinks" :key="link.to" :to="link.to" class="lv-nav-link">{{ link.label }}</NuxtLink>
        </nav>

        <div class="lv-header-right">
          <template v-if="isLoggedIn">
            <NuxtLink :to="isAdmin ? '/admin' : '/dashboard'" class="lv-btn-gold-sm">My Account</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/auth/login"    class="lv-btn-ghost-sm">Sign In</NuxtLink>
            <NuxtLink to="/auth/register" class="lv-btn-gold-sm">Join Us</NuxtLink>
          </template>
          <button class="lv-hamburger" @click="mobileOpen = true" aria-label="Open menu">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </div>
      <div class="lv-header-accent" />
    </header>


    <!-- MOBILE DRAWER -->
    <Transition name="lv-fade">
      <div v-if="mobileOpen" class="lv-drawer-root">
        <div class="lv-drawer-backdrop" @click="mobileOpen = false" />
        <Transition name="lv-slide">
          <div class="lv-drawer">

            <div class="lv-drawer-head">
              <div class="lv-logo">
                <div class="lv-logo-mark" style="width:36px;height:36px;font-size:12px;">TF</div>
                <div class="lv-logo-text">
                  <div class="lv-logo-name">TAS-FORCE</div>
                  <div class="lv-logo-sub">Truth &amp; Advocacy</div>
                </div>
              </div>
              <button class="lv-drawer-close" @click="mobileOpen = false" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            <nav class="lv-drawer-nav">
              <NuxtLink
                v-for="link in drawerLinks" :key="link.to" :to="link.to"
                class="lv-drawer-link" :class="{ 'lv-drawer-link--donate': link.donate }"
                @click="mobileOpen = false"
              >
                <span class="lv-drawer-icon" v-html="link.svg" />
                <span>{{ link.label }}</span>
              </NuxtLink>
            </nav>

            <div class="lv-drawer-footer">
              <template v-if="isLoggedIn">
                <NuxtLink :to="isAdmin ? '/admin' : '/dashboard'" class="lv-drawer-cta-gold" @click="mobileOpen = false">My Account</NuxtLink>
              </template>
              <template v-else>
                <NuxtLink to="/auth/register" class="lv-drawer-cta-gold"  @click="mobileOpen = false">Join TAS-FORCE</NuxtLink>
                <NuxtLink to="/auth/login"    class="lv-drawer-cta-ghost" @click="mobileOpen = false">Sign In</NuxtLink>
              </template>
            </div>

          </div>
        </Transition>
      </div>
    </Transition>


    <!-- CONTENT -->
    <main><slot /></main>


    <!-- FOOTER -->
    <footer class="lv-footer">
      <div class="lv-footer-grid">

        <div class="lv-footer-brand">
          <div class="lv-footer-logo-row">
            <div class="lv-logo-mark" style="width:44px;height:44px;font-size:14px;">TF</div>
            <div class="lv-logo-text">
              <div class="lv-logo-name" style="font-size:17px;">TAS-FORCE</div>
              <div class="lv-logo-sub">Truth and Advocacy for Serwah &amp; Women</div>
            </div>
          </div>
          <p class="lv-footer-desc">Fighting for the rights of women facing injustice in society and marriage — raising awareness and challenging corruption across Africa and beyond.</p>
          <div class="lv-socials">
            <a v-for="(s,i) in socials" :key="i" href="#" class="lv-social" :aria-label="s.label">{{ s.icon }}</a>
          </div>
        </div>

        <div>
          <h4 class="lv-footer-heading">Organisation</h4>
          <ul class="lv-footer-list">
            <li v-for="l in orgLinks" :key="l.to"><NuxtLink :to="l.to" class="lv-footer-link" :class="{'lv-footer-link--gold':l.gold}">{{ l.label }}</NuxtLink></li>
          </ul>
        </div>

        <div>
          <h4 class="lv-footer-heading">Membership</h4>
          <ul class="lv-footer-list">
            <li v-for="l in memberLinks" :key="l.to"><NuxtLink :to="l.to" class="lv-footer-link">{{ l.label }}</NuxtLink></li>
          </ul>
        </div>

      </div>

      <div class="lv-footer-rule">
        <div class="lv-rule-line" /><span class="lv-rule-mark">✦</span><div class="lv-rule-line" />
      </div>

      <div class="lv-footer-bottom">
        <span class="lv-footer-copy">© {{ new Date().getFullYear() }} TAS-FORCE. All rights reserved.</span>
        <span class="lv-footer-copy lv-footer-copy-right">Truth and Advocacy for Serwah &amp; Women Empowerment</span>
      </div>
    </footer>

  </div>
</template>

<script setup lang="ts">
const { isLoggedIn, isAdmin } = useAuth()
const mobileOpen = ref(false)
const scrolled   = ref(false)

onMounted(() => {
  const fn = () => { scrolled.value = window.scrollY > 30 }
  window.addEventListener('scroll', fn, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', fn))
})

const route = useRoute()
watch(() => route.path, () => { mobileOpen.value = false })
watch(mobileOpen, (v) => { if (import.meta.client) document.body.style.overflow = v ? 'hidden' : '' })

const navLinks = [
  { to: '/',             label: 'Home' },
  { to: '/about',        label: 'About Us' },
  { to: '/campaigns',    label: 'Our Campaigns' },
  { to: '/get-involved', label: 'Get Involved' },
  { to: '/news',         label: 'News' },
  { to: '/contact',      label: 'Contact' },
]

const drawerLinks = [
  { to: '/',             label: 'Home',          svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>` },
  { to: '/about',        label: 'About Us',      svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>` },
  { to: '/campaigns',    label: 'Our Campaigns', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>` },
  { to: '/get-involved', label: 'Get Involved',  svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>` },
  { to: '/news',         label: 'News',          svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 9h8M8 13h5"/></svg>` },
  { to: '/contact',      label: 'Contact',       svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 7l10 7 10-7"/></svg>` },
  { to: '/donate',       label: 'Donate', donate: true, svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>` },
]

const socials      = [{ icon: 'f', label: 'Facebook' }, { icon: '\u{1D54F}', label: 'X' }, { icon: '\u25B6', label: 'YouTube' }, { icon: '\u25C9', label: 'Instagram' }]
const orgLinks     = [{ to: '/about', label: 'About Us' }, { to: '/campaigns', label: 'Our Campaigns' }, { to: '/news', label: 'News & Updates' }, { to: '/contact', label: 'Contact Us' }, { to: '/donate', label: '\u2665 Donate', gold: true }]
const memberLinks  = [{ to: '/get-involved', label: 'Get Involved' }, { to: '/auth/register', label: 'Join TAS-FORCE' }, { to: '/auth/login', label: 'Member Login' }, { to: '/verify', label: 'Verify a Card' }]
</script>

<style scoped>
/* TOKENS */
.lv-header, .lv-drawer-root, .lv-footer {
  --lv-gold:        #c9a84c;
  --lv-gold-bright: #e0c06a;
  --lv-crimson-d:   hsl(348,100%,6%);
  --lv-crimson:     hsl(0,80%,28%);
  --lv-fg:          #e8dcc8;
  --lv-muted:       rgba(232,220,200,0.45);
  --lv-border:      rgba(255,255,255,0.06);
  --lv-surface:     #111111;
  --lv-surface-el:  #1a1a1a;
  --lv-font-d: 'Fraunces', 'Playfair Display', serif;
  --lv-font-b: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif;
  font-family: var(--lv-font-b);
  -webkit-font-smoothing: antialiased;
}

/* HEADER */
.lv-header { position: fixed; top: 0; left: 0; right: 0; z-index: 50; transition: background .3s, box-shadow .3s; }
.lv-header--scrolled { background: hsla(348,100%,6%,.96); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 2px 32px rgba(0,0,0,.4); border-bottom: 1px solid rgba(201,168,76,.1); }
.lv-header-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 72px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
.lv-header-accent { height: 2px; background: linear-gradient(90deg, transparent, hsl(348,85%,16%) 15%, var(--lv-gold) 40%, var(--lv-gold-bright) 50%, var(--lv-gold) 60%, hsl(348,85%,16%) 85%, transparent); opacity: .6; }

/* LOGO */
.lv-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; flex-shrink: 0; }
.lv-logo-mark { width: 40px; height: 40px; border-radius: 12px; background: linear-gradient(135deg, var(--lv-gold), var(--lv-gold-bright)); display: flex; align-items: center; justify-content: center; font-family: var(--lv-font-d); font-weight: 900; font-size: 13px; color: var(--lv-crimson-d); box-shadow: 0 4px 16px hsla(43,60%,54%,.3); flex-shrink: 0; transition: box-shadow .2s; }
.lv-logo:hover .lv-logo-mark { box-shadow: 0 6px 24px hsla(43,60%,54%,.5); }
.lv-logo-name { font-family: var(--lv-font-d); font-weight: 700; font-size: 15px; color: var(--lv-fg); letter-spacing: .05em; line-height: 1; }
.lv-logo-sub  { font-size: 9px; color: rgba(201,168,76,.5); letter-spacing: .1em; text-transform: uppercase; margin-top: 3px; }

/* DESKTOP NAV */
.lv-nav { display: flex; align-items: center; gap: 2px; }
.lv-nav-link { padding: 7px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; letter-spacing: .02em; color: rgba(232,220,200,.6); text-decoration: none; transition: all .2s; }
.lv-nav-link:hover { background: rgba(255,255,255,.06); color: var(--lv-fg); }
.lv-nav-link.router-link-active { color: var(--lv-gold); background: rgba(201,168,76,.1); }

/* RIGHT BUTTONS */
.lv-header-right { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.lv-btn-ghost-sm { display: inline-flex; align-items: center; padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 600; color: rgba(232,220,200,.7); border: 1px solid rgba(255,255,255,.1); text-decoration: none; transition: all .2s; white-space: nowrap; }
.lv-btn-ghost-sm:hover { border-color: rgba(255,255,255,.25); color: var(--lv-fg); }
.lv-btn-gold-sm  { display: inline-flex; align-items: center; padding: 9px 20px; border-radius: 10px; font-size: 13px; font-weight: 700; color: var(--lv-crimson-d); background: linear-gradient(135deg, var(--lv-gold), var(--lv-gold-bright)); box-shadow: 0 2px 14px hsla(43,60%,54%,.25); text-decoration: none; transition: all .2s; white-space: nowrap; }
.lv-btn-gold-sm:hover { box-shadow: 0 4px 22px hsla(43,60%,54%,.45); transform: translateY(-1px); }

.lv-hamburger { display: none; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); color: var(--lv-fg); cursor: pointer; transition: background .2s; }
.lv-hamburger svg { width: 20px; height: 20px; }
.lv-hamburger:hover { background: rgba(255,255,255,.1); }

/* DRAWER */
.lv-drawer-root { position: fixed; inset: 0; z-index: 100; }
.lv-drawer-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.65); backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px); }
.lv-drawer { position: absolute; top: 0; right: 0; bottom: 0; width: min(340px,88vw); background: var(--lv-crimson-d); border-left: 1px solid rgba(201,168,76,.15); box-shadow: -8px 0 48px rgba(0,0,0,.55); display: flex; flex-direction: column; overflow-y: auto; }
.lv-drawer-head { display: flex; align-items: center; justify-content: space-between; padding: 20px 20px 16px; border-bottom: 1px solid rgba(255,255,255,.05); flex-shrink: 0; }
.lv-drawer-close { width: 36px; height: 36px; border-radius: 10px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.1); color: rgba(232,220,200,.6); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .18s; }
.lv-drawer-close svg { width: 16px; height: 16px; }
.lv-drawer-close:hover { background: rgba(255,255,255,.1); color: var(--lv-fg); }
.lv-drawer-nav { flex: 1; padding: 16px 12px; display: flex; flex-direction: column; gap: 2px; }
.lv-drawer-link { display: flex; align-items: center; gap: 14px; padding: 13px 16px; border-radius: 12px; font-size: 15px; font-weight: 600; color: rgba(232,220,200,.6); text-decoration: none; border: 1px solid transparent; transition: all .18s; }
.lv-drawer-link:hover { background: rgba(255,255,255,.05); color: var(--lv-fg); }
.lv-drawer-link.router-link-active { background: rgba(201,168,76,.12); color: var(--lv-gold); border-color: rgba(201,168,76,.2); }
.lv-drawer-link--donate { color: rgba(201,168,76,.75); margin-top: 6px; }
.lv-drawer-link--donate:hover { color: var(--lv-gold); background: rgba(201,168,76,.1); }
.lv-drawer-icon { width: 20px; height: 20px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; opacity: .5; transition: opacity .18s; }
.lv-drawer-icon :deep(svg) { width: 18px; height: 18px; }
.lv-drawer-link:hover .lv-drawer-icon,
.lv-drawer-link.router-link-active .lv-drawer-icon { opacity: 1; }
.lv-drawer-footer { padding: 16px; border-top: 1px solid rgba(255,255,255,.05); display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
.lv-drawer-cta-gold  { display: flex; align-items: center; justify-content: center; padding: 13px 20px; border-radius: 12px; background: linear-gradient(135deg, var(--lv-gold), var(--lv-gold-bright)); color: var(--lv-crimson-d); font-size: 14px; font-weight: 700; text-decoration: none; }
.lv-drawer-cta-ghost { display: flex; align-items: center; justify-content: center; padding: 13px 20px; border-radius: 12px; background: transparent; color: rgba(232,220,200,.7); font-size: 14px; font-weight: 600; text-decoration: none; border: 1px solid rgba(255,255,255,.1); transition: all .18s; }
.lv-drawer-cta-ghost:hover { border-color: rgba(255,255,255,.25); color: var(--lv-fg); }

/* DRAWER TRANSITIONS */
.lv-fade-enter-active, .lv-fade-leave-active { transition: opacity .25s; }
.lv-fade-enter-from, .lv-fade-leave-to { opacity: 0; }
.lv-slide-enter-active, .lv-slide-leave-active { transition: transform .28s cubic-bezier(.4,0,.2,1); }
.lv-slide-enter-from, .lv-slide-leave-to { transform: translateX(100%); }

/* FOOTER */
.lv-footer {
  background: var(--lv-crimson-d);
  border-top: 1px solid rgba(201,168,76,.1);
  background-image:
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='22'/%3E%3C/g%3E%3C/svg%3E"),
    linear-gradient(180deg, hsl(348,100%,6%) 0%, #0d0002 100%);
  background-size: 60px 60px, auto;
}
.lv-footer-grid { max-width: 1200px; margin: 0 auto; padding: 64px 24px 40px; display: grid; grid-template-columns: 1.5fr 1fr 1fr; gap: 56px; }
.lv-footer-brand { max-width: 300px; }
.lv-footer-logo-row { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.lv-footer-desc { font-size: 14px; color: rgba(232,220,200,.35); line-height: 1.75; }
.lv-socials { display: flex; gap: 8px; margin-top: 20px; }
.lv-social { width: 36px; height: 36px; border-radius: 9px; background: rgba(255,255,255,.05); border: 1px solid rgba(255,255,255,.08); display: flex; align-items: center; justify-content: center; font-size: 13px; color: rgba(232,220,200,.4); text-decoration: none; transition: all .2s; }
.lv-social:hover { background: rgba(201,168,76,.1); border-color: rgba(201,168,76,.3); color: var(--lv-gold); transform: translateY(-2px); }
.lv-footer-heading { font-family: var(--lv-font-d); font-size: 13px; font-weight: 700; color: var(--lv-fg); letter-spacing: .06em; margin-bottom: 20px; }
.lv-footer-list  { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.lv-footer-link  { font-size: 14px; color: rgba(232,220,200,.45); text-decoration: none; transition: color .18s; }
.lv-footer-link:hover { color: var(--lv-gold); }
.lv-footer-link--gold { color: rgba(201,168,76,.7); }
.lv-footer-link--gold:hover { color: var(--lv-gold-bright); }
.lv-footer-rule { display: flex; align-items: center; gap: 16px; max-width: 1200px; margin: 0 auto; padding: 0 24px; }
.lv-rule-line    { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,.2) 30%, rgba(201,168,76,.2) 70%, transparent); }
.lv-rule-mark    { font-size: 12px; color: rgba(201,168,76,.3); flex-shrink: 0; }
.lv-footer-bottom { max-width: 1200px; margin: 0 auto; padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; }
.lv-footer-copy  { font-size: 12px; color: rgba(232,220,200,.28); }
.lv-footer-copy-right { display: none; }

/* RESPONSIVE */
@media (max-width: 1024px) { .lv-nav { display: none; } .lv-hamburger { display: flex; } .lv-btn-ghost-sm { display: none; } }
@media (max-width: 640px) {
  .lv-header-inner { padding: 0 16px; height: 64px; }
  .lv-logo-sub { display: none; }
  .lv-footer-grid { grid-template-columns: 1fr; gap: 32px; padding: 44px 16px 32px; }
  .lv-footer-brand { max-width: 100%; }
  .lv-footer-rule, .lv-footer-bottom { padding: 0 16px; }
  .lv-footer-bottom { flex-direction: column; align-items: center; text-align: center; padding: 14px 16px; }
}
@media (min-width: 641px) { .lv-footer-copy-right { display: block; } }
</style>