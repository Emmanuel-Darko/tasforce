<template>
  <div class="app-shell">
    <!-- Overlay for mobile -->
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
          <NuxtLink to="/admin"               class="sb-link" @click="sideOpen=false"><span class="sb-icon">⊞</span>Overview</NuxtLink>
          <NuxtLink to="/admin/registrations" class="sb-link" @click="sideOpen=false"><span class="sb-icon">☰</span>Registrations</NuxtLink>
          <NuxtLink to="/admin/members"       class="sb-link" @click="sideOpen=false"><span class="sb-icon">◉</span>Members</NuxtLink>
          <NuxtLink to="/admin/cards"         class="sb-link" @click="sideOpen=false"><span class="sb-icon">▣</span>Member Cards</NuxtLink>
          <NuxtLink to="/admin/reports"       class="sb-link" @click="sideOpen=false"><span class="sb-icon">▤</span>Reports</NuxtLink>
          <NuxtLink to="/admin/settings"      class="sb-link" @click="sideOpen=false"><span class="sb-icon">⚙</span>Settings</NuxtLink>
        </template>
        <template v-else>
          <div class="sb-glabel">My Account</div>
          <NuxtLink to="/dashboard"         class="sb-link" @click="sideOpen=false"><span class="sb-icon">⊞</span>Dashboard</NuxtLink>
          <NuxtLink to="/dashboard/profile" class="sb-link" @click="sideOpen=false"><span class="sb-icon">◉</span>My Profile</NuxtLink>
          <NuxtLink to="/dashboard/card"    class="sb-link" @click="sideOpen=false"><span class="sb-icon">▣</span>My Card</NuxtLink>
        </template>
        <div class="sb-divider" />
        <div class="sb-glabel">General</div>
        <NuxtLink to="/" class="sb-link" @click="sideOpen=false"><span class="sb-icon">⌂</span>Public Site</NuxtLink>
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
        <button class="sb-logout" @click="logout">✕ Sign Out</button>
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
// Expose for topbar menu button via provide/inject
provide('toggleSidebar', () => { sideOpen.value = !sideOpen.value })
</script>
