<template>
  <div>
    <!-- TOPBAR -->
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" width="24" height="24">
            <line x1="2" y1="5" x2="18" y2="5"/>
            <line x1="2" y1="10" x2="18" y2="10"/>
            <line x1="2" y1="15" x2="18" y2="15"/>
          </svg>
        </button>
        <h1 class="topbar-title">My Dashboard</h1>
      </div>
      <div class="topbar-right">
        <span class="db-date">{{ today }}</span>
        <NuxtLink v-if="user?.status === 'active'" to="/dashboard/card" class="btn btn-gold btn-sm">My Card</NuxtLink>
      </div>
    </div>

    <div class="page-body">

      <!-- Welcome banner -->
      <div class="db-banner">
        <div class="db-banner-bg" />
        <div class="db-banner-inner">
          <div class="db-avatar">
            <img v-if="user?.photoUrl" :src="user.photoUrl" :alt="user.firstName" />
            <span v-else>{{ initials }}</span>
          </div>
          <div class="db-banner-text">
            <h2 class="db-welcome">Welcome back, {{ user?.firstName }}!</h2>
            <p class="db-status-msg">{{ statusMessage }}</p>
          </div>
          <div class="db-banner-badge" :class="`db-badge--${user?.status}`">
            <span class="db-badge-dot" />{{ user?.status }}
          </div>
        </div>
      </div>

      <!-- Pending notice -->
      <div v-if="user?.status === 'pending'" class="db-notice">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2L2 17h16L10 2z"/><line x1="10" y1="9" x2="10" y2="12"/><circle cx="10" cy="15" r=".5" fill="currentColor"/></svg>
        Your membership application is pending admin review. You will be notified once approved and your card is issued.
      </div>

      <div class="two-col">
        <!-- Membership details -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Membership Details</h3>
          </div>
          <div class="card-body">
            <div v-for="[k, v, isBadge] in details" :key="k" class="detail-row">
              <span class="detail-key">{{ k }}</span>
              <span class="detail-value">
                <span v-if="isBadge" :class="`badge badge-${user?.status}`"><span class="bdot" />{{ user?.status }}</span>
                <span v-else>{{ v }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Card preview -->
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">My Card Preview</h3>
            <NuxtLink v-if="user?.status === 'active'" to="/dashboard/card" class="btn btn-crimson btn-sm">View Full Card</NuxtLink>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;align-items:center;">
            <template v-if="user?.status === 'active'">
              <div style="transform:scale(0.68);transform-origin:top center;margin-bottom:-72px;">
                <MembershipCard :member="user" />
              </div>
            </template>
            <template v-else>
              <div class="db-card-empty">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="40" height="28" rx="4"/><line x1="4" y1="20" x2="44" y2="20"/><line x1="12" y1="30" x2="20" y2="30"/><line x1="12" y1="34" x2="30" y2="34"/></svg>
                <p>Your membership card will appear here once your application is approved.</p>
              </div>
            </template>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: 'auth' })
const { user } = useAuth()
const toggleSidebar = inject<() => void>('toggleSidebar')
const today = new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
const initials = computed(() => `${user.value?.firstName?.[0] ?? ''}${user.value?.lastName?.[0] ?? ''}`)
const statusMessage = computed(() => {
  if (user.value?.status === 'active')  return 'Your membership is active and in good standing.'
  if (user.value?.status === 'pending') return 'Your application is under review.'
  return 'Please contact us if you have any questions.'
})
const details = computed(() => [
  ['Full Name',   `${user.value?.firstName ?? ''} ${user.value?.lastName ?? ''}`, false],
  ['Email',        user.value?.email,            false],
  ['Member ID',    user.value?.memberId || 'Pending', false],
  ['Position',     user.value?.position,         false],
  ['Country',      user.value?.country,          false],
  ['Member Since', user.value?.memberSince || '—', false],
  ['Status',       user.value?.status,           true],
])
</script>

<style scoped>
.db-date { font-size: 12px; color: var(--muted2); white-space: nowrap; }

.db-banner {
  position: relative; border-radius: 16px; overflow: hidden;
  margin-bottom: 20px; padding: 24px 28px;
}
.db-banner-bg {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, var(--crimson-deep) 0%, var(--crimson) 55%, var(--crimson2) 100%);
  background-image:
    linear-gradient(135deg, var(--crimson-deep) 0%, var(--crimson) 55%, var(--crimson2) 100%),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C9A84C' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='20'/%3E%3C/g%3E%3C/svg%3E");
}
.db-banner-inner {
  position: relative; z-index: 1;
  display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
}
.db-avatar {
  width: 54px; height: 54px; border-radius: 50%; flex-shrink: 0;
  background: rgba(245,230,208,.2); border: 2.5px solid rgba(201,168,76,.5);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-weight: 700; font-size: 18px;
  color: var(--cream); overflow: hidden;
}
.db-avatar img { width: 100%; height: 100%; object-fit: cover; }
.db-welcome    { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: var(--cream); margin-bottom: 3px; }
.db-status-msg { font-size: 13px; color: rgba(245,230,208,.62); }
.db-banner-badge {
  margin-left: auto; display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 14px; border-radius: 20px;
  font-size: 12px; font-weight: 700; text-transform: capitalize; white-space: nowrap; flex-shrink: 0;
}
.db-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.db-badge--active   { background: rgba(45,106,79,.35); color: #7de8b0; border: 1px solid rgba(45,106,79,.45); }
.db-badge--pending  { background: rgba(201,168,76,.25); color: var(--gold); border: 1px solid rgba(201,168,76,.4); }
.db-badge--inactive { background: rgba(255,255,255,.1); color: rgba(245,230,208,.55); border: 1px solid rgba(255,255,255,.15); }

.db-notice {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 18px; background: #fffbec;
  border: 1.5px solid var(--gold); border-radius: 12px;
  font-size: 14px; color: var(--warning); margin-bottom: 20px; line-height: 1.55;
}
.db-notice svg { width: 18px; height: 18px; flex-shrink: 0; }

.db-card-empty { padding: 28px 20px; text-align: center; }
.db-card-empty svg { width: 52px; height: 52px; color: var(--border); margin: 0 auto 14px; display: block; }
.db-card-empty p   { font-size: 14px; color: var(--muted); line-height: 1.65; max-width: 220px; margin: 0 auto; }

@media (max-width: 640px) {
  .db-date { display: none; }
  .db-banner-badge { margin-left: 0; }
}
</style>