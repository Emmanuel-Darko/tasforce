<template>
  <div class="app-shell">
    <div class="sb-overlay" :class="{ open: sideOpen }" @click="sideOpen = false" />

    <aside class="sidebar" :class="{ open: sideOpen }">
      <div class="sb-logo">
        <div class="sb-mark">TF</div>
        <div>
          <div class="sb-org">TAS-FORCE</div>
          <div class="sb-tag">Member Platform</div>
        </div>
      </div>

      <nav class="sb-nav">
        <template v-if="isAdmin">
          <div class="sb-glabel">Administration</div>
          <NuxtLink to="/admin" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg></span>
            Overview
          </NuxtLink>
          <NuxtLink to="/admin/registrations" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h14M3 10h14M3 15h8"/><circle cx="16" cy="15" r="2.5"/><path d="M16 13.8v1.2l.8.8"/></svg></span>
            Registrations
          </NuxtLink>
          <NuxtLink to="/admin/members" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="6" r="3"/><path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M14 3a3 3 0 010 6M18 18c0-2.8-1.8-5.1-4-5.8"/></svg></span>
            Members
          </NuxtLink>
          <NuxtLink to="/admin/cards" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 9h16M6 13h2M10 13h4"/></svg></span>
            Member Cards
          </NuxtLink>
          <NuxtLink to="/admin/reports" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 15l4-5 3 3 4-6 3 3"/><rect x="2" y="2" width="16" height="16" rx="2"/></svg></span>
            Reports
          </NuxtLink>
          <NuxtLink to="/admin/settings" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="2.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/></svg></span>
            Settings
          </NuxtLink>
        </template>

        <template v-else>
          <div class="sb-glabel">My Account</div>
          <NuxtLink to="/dashboard" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/><rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/></svg></span>
            Dashboard
          </NuxtLink>
          <NuxtLink to="/dashboard/profile" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="4"/><path d="M2 18c0-3.3 3.6-6 8-6s8 2.7 8 6"/></svg></span>
            My Profile
          </NuxtLink>
          <NuxtLink to="/dashboard/card" class="sb-link" @click="sideOpen=false">
            <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 9h16M6 13h2M10 13h4"/></svg></span>
            My Card
          </NuxtLink>
        </template>

        <div class="sb-divider" />
        <div class="sb-glabel">General</div>
        <NuxtLink to="/" class="sb-link" @click="sideOpen=false">
          <span class="sb-icon"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8.5L10 2l8 6.5V17a1 1 0 01-1 1H3a1 1 0 01-1-1V8.5z"/><path d="M7 18v-7h6v7"/></svg></span>
          Public Site
        </NuxtLink>
      </nav>

      <div class="sb-foot">
        <div class="sb-user">
          <div class="sb-avatar">
            <img v-if="user?.photoUrl" :src="user.photoUrl" :alt="initials" />
            <span v-else>{{ initials }}</span>
          </div>
          <div style="min-width:0;">
            <div class="sb-uname">{{ user?.firstName }} {{ user?.lastName }}</div>
            <div class="sb-urole">{{ isAdmin ? 'Administrator' : 'Member' }}</div>
          </div>
        </div>
        <button class="sb-logout" @click="logout">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;flex-shrink:0;"><path d="M13 7l3 3-3 3M16 10H8M8 3H4a1 1 0 00-1 1v12a1 1 0 001 1h4"/></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <div class="app-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, isAdmin, logout } = useAuth()
const sideOpen = ref(false)
const initials = computed(() =>
  `${user.value?.firstName?.[0] ?? ''}${user.value?.lastName?.[0] ?? ''}`
)
provide('toggleSidebar', () => { sideOpen.value = !sideOpen.value })
</script>

<style scoped>
.sb-icon { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; opacity: .8; }
.sb-icon svg { width: 16px; height: 16px; }
.router-link-active.sb-link .sb-icon,
.sb-link.active .sb-icon { opacity: 1; }
</style>