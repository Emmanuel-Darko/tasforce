<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-crimson-deep/95 backdrop-blur-xl border-b border-gold/10 shadow-lg shadow-black/30'
        : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between h-16 md:h-[72px]">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-3 group">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center font-display font-black text-sm text-crimson-deep shadow-lg shadow-gold/30 group-hover:shadow-gold/50 transition-shadow">
          TF
        </div>
        <div class="hidden sm:block">
          <div class="font-display font-bold text-sm text-foreground tracking-wide">TAS-FORCE</div>
          <div class="text-[10px] text-gold/50 tracking-[0.12em] uppercase">Truth & Advocacy for Women</div>
        </div>
      </NuxtLink>
      <!-- Desktop nav -->
      <nav class="hidden lg:flex items-center gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'px-4 py-2 rounded-lg text-[13px] font-semibold tracking-wide transition-all duration-200',
            route.path === link.to
              ? 'text-gold bg-gold/10'
              : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
          ]"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>
      <!-- Right side -->
      <div class="flex items-center gap-3">
        <NuxtLink
          to="/auth/login"
          class="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-[13px] font-semibold text-foreground/70 border border-white/10 hover:border-white/25 hover:text-foreground transition-all"
        >
          Sign In
        </NuxtLink>
        <NuxtLink
          to="/auth/register"
          class="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl text-[13px] font-bold bg-gradient-to-r from-gold to-gold-bright text-crimson-deep shadow-md shadow-gold/25 hover:shadow-lg hover:shadow-gold/40 hover:-translate-y-0.5 transition-all"
        >
          Join Us
        </NuxtLink>
        <button
          @click="mobileOpen = true"
          class="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <IconMenu class="w-5 h-5" />
        </button>
      </div>
    </div>
  </header>
  <!-- Mobile drawer -->
  <transition name="fade">
    <div v-if="mobileOpen">
      <div
        class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        @click="closeMobile"
      />
      <transition name="slide">
        <div
          class="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-[340px] bg-crimson-deep border-l border-gold/15 shadow-2xl shadow-black/50 flex flex-col"
        >
          <!-- Drawer header -->
          <div class="flex items-center justify-between p-5 border-b border-white/5">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-gold to-gold-bright flex items-center justify-center font-display font-black text-xs text-crimson-deep">
                TF
              </div>
              <div>
                <div class="font-display font-bold text-sm text-foreground">TAS-FORCE</div>
                <div class="text-[9px] text-gold/40 tracking-[0.1em] uppercase">Truth & Advocacy</div>
              </div>
            </div>
            <button
              @click="closeMobile"
              class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors"
            >
              <IconX class="w-4 h-4" />
            </button>
          </div>
          <!-- Nav links -->
          <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            <div v-for="(link, i) in navLinks" :key="link.to">
              <NuxtLink
                :to="link.to"
                @click.native="closeMobile"
                :class="[
                  'flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-semibold transition-all',
                  route.path === link.to
                    ? 'text-gold bg-gold/10 border border-gold/15'
                    : 'text-foreground/60 hover:text-foreground hover:bg-white/5'
                ]"
              >
                <component :is="link.icon" class="w-[18px] h-[18px] flex-shrink-0" />
                <span>{{ link.label }}</span>
              </NuxtLink>
            </div>
            <div>
              <NuxtLink
                to="/donate"
                @click.native="closeMobile"
                class="flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[15px] font-semibold text-accent-foreground bg-accent/80 border border-crimson/30 hover:bg-accent transition-all mt-2"
              >
                <IconHeart class="w-[18px] h-[18px] flex-shrink-0" />
                <span>Donate</span>
              </NuxtLink>
            </div>
          </nav>
          <!-- Drawer footer CTAs -->
          <div class="p-4 border-t border-white/5 space-y-2.5">
            <NuxtLink
              to="/auth/register"
              @click.native="closeMobile"
              class="flex items-center justify-center w-full px-5 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-gold to-gold-bright text-crimson-deep shadow-md shadow-gold/25"
            >
              Join TAS-FORCE
            </NuxtLink>
            <NuxtLink
              to="/auth/login"
              @click.native="closeMobile"
              class="flex items-center justify-center w-full px-5 py-3 rounded-xl text-sm font-semibold text-foreground/70 border border-white/10 hover:border-white/25 transition-colors"
            >
              Sign In
            </NuxtLink>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
// Vue & Nuxt composables
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// Import icons as Vue components (from lucide-vue or equivalent)
import { Menu as IconMenu, X as IconX, Home as IconHome, Users as IconUsers, LayoutGrid as IconLayoutGrid, HandHelping as IconHandHelping, Newspaper as IconNewspaper, Mail as IconMail, Heart as IconHeart } from 'lucide-vue-next'

// Navigation links
const navLinks = [
  { to: '/', label: 'Home', icon: IconHome },
  { to: '/about', label: 'About Us', icon: IconUsers },
  { to: '/campaigns', label: 'Our Campaigns', icon: IconLayoutGrid },
  { to: '/get-involved', label: 'Get Involved', icon: IconHandHelping },
  { to: '/news', label: 'News', icon: IconNewspaper },
  { to: '/contact', label: 'Contact', icon: IconMail }
]

const scrolled = ref(false)
const mobileOpen = ref(false)
const route = useRoute()

const onScroll = () => {
  scrolled.value = window.scrollY > 30
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

// Close mobile menu on route change
watch(
  () => route.path,
  () => {
    mobileOpen.value = false
  }
)

// Scroll/body lock
watch(mobileOpen, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

function closeMobile() {
  mobileOpen.value = false
}
</script>

<style scoped>
/* Basic transitions for mobile drawer */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s cubic-bezier(.22,1,.36,1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>