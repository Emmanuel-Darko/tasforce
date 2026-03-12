<template>
  <div>
    <div class="topbar">
      <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
      <h1 class="topbar-title">Membership Cards</h1>
      <div class="topbar-right">
        <button class="btn btn-outline btn-sm" @click="() => window.print()">🖨 Print All</button>
      </div>
    </div>
    <div class="page-body">
      <p style="font-size:15px;color:var(--muted);margin-bottom:24px;">View, print and manage membership cards for all active members.</p>
      <div v-if="loading" style="text-align:center;padding:60px;color:var(--muted);">Loading cards…</div>
      <div v-else-if="!members.length" class="notice notice-info">
        <span>ℹ</span><span>No active members with cards yet. Approve some registrations first.</span>
      </div>
      <div v-else class="qr-grid">
        <div v-for="m in members" :key="m.id" class="card" style="padding:16px;text-align:center;">
          <div style="transform:scale(0.6);transform-origin:top center;margin-bottom:-90px;">
            <MembershipCard :member="m" />
          </div>
          <div style="font-size:11px;color:var(--muted);margin-top:4px;">{{ m.memberId }}</div>
          <div style="font-family:'Playfair Display',serif;font-size:14px;font-weight:600;color:var(--crimson);margin-bottom:10px;">{{ m.firstName }} {{ m.lastName }}</div>
          <div style="display:flex;gap:6px;justify-content:center;">
            <button class="btn btn-crimson btn-sm" @click="() => window.print()">Print</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const loading = ref(false), members = ref<any[]>([])
onMounted(async () => {
  loading.value = true
  try {
    const d: any = await $fetch('/api/admin/members', { params: { status:'active', limit:100 } })
    members.value = d.data
  } finally { loading.value = false }
})
</script>
