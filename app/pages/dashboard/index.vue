<template>
  <div>
    <div class="topbar">
      <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
      <h1 class="topbar-title">My Dashboard</h1>
      <div class="topbar-right">
        <span style="font-size:13px;color:var(--muted);">{{ today }}</span>
      </div>
    </div>
    <div class="page-body">
      <div style="margin-bottom:22px;">
        <h2 style="font-family:'Playfair Display',serif;font-size:22px;color:var(--crimson);">Welcome, {{ user?.firstName }}</h2>
        <p style="font-size:15px;color:var(--muted);margin-top:4px;">{{ statusMessage }}</p>
      </div>

      <div v-if="user?.status === 'pending'" class="notice notice-warn">
        <span>⚠</span>
        <span>Your membership application is pending admin review. You will be notified once approved and your card is issued.</span>
      </div>

      <div class="two-col">
        <div>
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
        </div>

        <div class="card">
          <div class="card-header"><h3 class="card-title">My Card Preview</h3></div>
          <div class="card-body" style="display:flex;flex-direction:column;align-items:center;">
            <template v-if="user?.status === 'active'">
              <div style="transform:scale(0.7);transform-origin:top center;margin-bottom:-70px;">
                <MembershipCard :member="user" />
              </div>
              <NuxtLink to="/dashboard/card" class="btn btn-crimson btn-sm">View Full Card</NuxtLink>
            </template>
            <template v-else>
              <div style="padding:28px;text-align:center;">
                <div style="font-size:52px;color:var(--border);margin-bottom:14px;">▣</div>
                <p style="font-size:14px;color:var(--muted);">Your membership card will appear here once your application is approved.</p>
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
const today    = new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })
const statusMessage = computed(() => {
  if (user.value?.status === 'active')  return 'Your membership is active and in good standing.'
  if (user.value?.status === 'pending') return 'Your application is under review.'
  return 'Please contact us if you have any questions.'
})
const details = computed(() => [
  ['Full Name',    `${user.value?.firstName ?? ''} ${user.value?.lastName ?? ''}`, false],
  ['Email',         user.value?.email,            false],
  ['Member ID',     user.value?.memberId || 'Pending', false],
  ['Position',      user.value?.position,         false],
  ['Country',       user.value?.country,          false],
  ['Member Since',  user.value?.memberSince || '—',false],
  ['Status',        user.value?.status,           true],
])
</script>
