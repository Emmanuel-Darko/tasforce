<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="2" y1="5" x2="18" y2="5"/><line x1="2" y1="10" x2="18" y2="10"/><line x1="2" y1="15" x2="18" y2="15"/></svg>
        </button>
        <h1 class="topbar-title">My Dashboard</h1>
      </div>
      <div class="topbar-right">
        <span class="db-date">{{ today }}</span>
      </div>
    </div>

    <div class="page-body">

      <!-- Welcome banner -->
      <div class="db-welcome">
        <div class="db-welcome-avatar">{{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}</div>
        <div>
          <h2 class="db-welcome-name">Welcome back, {{ user?.firstName }}!</h2>
          <p class="db-welcome-status">{{ statusMessage }}</p>
        </div>
        <span :class="`db-status-badge db-status-badge--${user?.status}`">
          <span class="db-status-dot" />
          {{ user?.status }}
        </span>
      </div>

      <!-- Pending notice -->
      <div v-if="user?.status === 'pending'" class="db-notice db-notice--warn">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2L2 17h16L10 2z"/><line x1="10" y1="9" x2="10" y2="12"/><circle cx="10" cy="15" r=".5" fill="currentColor"/></svg>
        Your membership application is pending admin review. You will be notified once approved and your card is issued.
      </div>

      <div class="two-col">
        <!-- Membership details -->
        <div class="card">
          <div class="card-header"><h3 class="card-title">Membership Details</h3></div>
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
            <NuxtLink v-if="user?.status === 'active'" to="/dashboard/card" class="btn btn-crimson btn-sm">View Card</NuxtLink>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;align-items:center;">
            <template v-if="user?.status === 'active'">
              <div style="transform:scale(0.68);transform-origin:top center;margin-bottom:-74px;">
                <MembershipCard :member="user" />
              </div>
            </template>
            <template v-else>
              <div class="db-card-placeholder">
                <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="40" height="28" rx="4"/><line x1="4" y1="20" x2="44" y2="20"/><line x1="12" y1="30" x2="20" y2="30"/><line x1="12" y1="34" x2="28" y2="34"/></svg>
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
  ['Member Since', user.value?.memberSince || '—',false],
  ['Status',       user.value?.status,           true],
])
</script>

<style scoped>
.db-date { font-size: 12px; color: var(--muted2); white-space: nowrap; }

/* Welcome */
.db-welcome { display: flex; align-items: center; gap: 16px; background: linear-gradient(135deg, var(--crimson), var(--crimson2, #3E2A82)); border-radius: 16px; padding: 22px 24px; margin-bottom: 20px; }
.db-welcome-avatar { width: 52px; height: 52px; border-radius: 50%; background: rgba(245,230,208,.2); border: 2px solid rgba(201,168,76,.5); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 18px; color: var(--cream); flex-shrink: 0; }
.db-welcome-name   { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 700; color: var(--cream); margin-bottom: 3px; }
.db-welcome-status { font-size: 13px; color: rgba(245,230,208,.65); }
.db-status-badge   { margin-left: auto; display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: capitalize; white-space: nowrap; flex-shrink: 0; }
.db-status-badge--active   { background: rgba(47,160,112,.25); color: #5de89a; border: 1px solid rgba(47,160,112,.35); }
.db-status-badge--pending  { background: rgba(201,168,76,.2); color: var(--gold, #c9a84c); border: 1px solid rgba(201,168,76,.35); }
.db-status-badge--inactive { background: rgba(255,255,255,.1); color: rgba(245,230,208,.6); border: 1px solid rgba(255,255,255,.15); }
.db-status-dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }

/* Notice */
.db-notice { display: flex; align-items: flex-start; gap: 12px; padding: 14px 18px; border-radius: 12px; font-size: 14px; line-height: 1.6; margin-bottom: 20px; }
.db-notice svg { width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; }
.db-notice--warn { background: #fef9ec; border: 1.5px solid #f0d060; color: #6b4800; }

/* Card placeholder */
.db-card-placeholder { padding: 28px 20px; text-align: center; }
.db-card-placeholder svg { width: 56px; height: 56px; color: var(--border); margin: 0 auto 14px; display: block; }
.db-card-placeholder p { font-size: 14px; color: var(--muted); line-height: 1.65; max-width: 240px; margin: 0 auto; }

@media (max-width: 640px) {
  .db-welcome { flex-wrap: wrap; }
  .db-status-badge { margin-left: 0; }
  .db-date { display: none; }
}
</style>