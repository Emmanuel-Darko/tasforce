<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="2" y1="5" x2="18" y2="5"/><line x1="2" y1="10" x2="18" y2="10"/><line x1="2" y1="15" x2="18" y2="15"/></svg>
        </button>
        <h1 class="topbar-title">My Profile</h1>
      </div>
    </div>

    <div class="page-body">

      <!-- Profile header card -->
      <div class="pf-header-card">
        <div class="pf-avatar">
          <img v-if="user?.photoUrl" :src="user.photoUrl" :alt="user.firstName" />
          <span v-else>{{ user?.firstName?.[0] }}{{ user?.lastName?.[0] }}</span>
        </div>
        <div>
          <h2 class="pf-name">{{ user?.firstName }} {{ user?.lastName }}</h2>
          <div class="pf-meta">
            <span>{{ user?.position || 'Advocate' }}</span>
            <span class="pf-meta-sep">·</span>
            <span>{{ user?.country || '—' }}</span>
            <span class="pf-meta-sep">·</span>
            <span :class="`badge badge-${user?.status}`" style="font-size:11px;"><span class="bdot"/>{{ user?.status }}</span>
          </div>
          <div v-if="user?.memberId" class="pf-memberid">{{ user.memberId }}</div>
        </div>
      </div>

      <!-- Details card -->
      <div class="card" style="max-width:600px;">
        <div class="card-header"><h3 class="card-title">Personal Information</h3></div>
        <div class="card-body">
          <div class="form-grid" style="margin-bottom:18px;">
            <div class="field"><label>First Name</label><input type="text" class="f-input pf-input-disabled" :value="user?.firstName" disabled /></div>
            <div class="field"><label>Last Name</label><input type="text" class="f-input pf-input-disabled" :value="user?.lastName" disabled /></div>
            <div class="field col-span-2"><label>Email</label><input type="email" class="f-input pf-input-disabled" :value="user?.email" disabled /></div>
            <div class="field"><label>Country</label><input type="text" class="f-input pf-input-disabled" :value="user?.country" disabled /></div>
            <div class="field"><label>Position</label><input type="text" class="f-input pf-input-disabled" :value="user?.position" disabled /></div>
          </div>
          <div class="pf-info-box">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="9" x2="10" y2="14"/><circle cx="10" cy="6.5" r=".5" fill="currentColor"/></svg>
            To update your profile information, please contact the administrator at
            <a href="mailto:info@tas-force.org" class="pf-link">info@tas-force.org</a>.
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
</script>

<style scoped>
.pf-header-card { display: flex; align-items: center; gap: 20px; background: var(--white); border: 1px solid var(--border-light); border-radius: 16px; padding: 24px; margin-bottom: 20px; box-shadow: var(--shadow-sm); }
.pf-avatar { width: 68px; height: 68px; border-radius: 50%; background: linear-gradient(135deg, var(--crimson), var(--crimson2, #3E2A82)); display: flex; align-items: center; justify-content: center; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22px; color: var(--cream); flex-shrink: 0; overflow: hidden; border: 3px solid var(--border-light); }
.pf-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pf-name    { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--crimson); margin-bottom: 6px; }
.pf-meta    { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--muted); flex-wrap: wrap; margin-bottom: 6px; }
.pf-meta-sep { color: var(--border); }
.pf-memberid { font-family: monospace; font-size: 12px; color: var(--muted2); letter-spacing: .08em; }
.pf-input-disabled { background: var(--parchment, #faf8f5) !important; color: var(--muted, #6b5f78) !important; cursor: not-allowed; }
.pf-info-box { display: flex; align-items: flex-start; gap: 10px; padding: 13px 16px; background: #f0f4ff; border: 1.5px solid #c0d0f8; border-radius: 10px; font-size: 14px; color: #1a3a80; line-height: 1.6; }
.pf-info-box svg { width: 18px; height: 18px; flex-shrink: 0; margin-top: 1px; }
.pf-link { color: var(--crimson); font-weight: 600; }

@media (max-width: 640px) { .pf-header-card { flex-direction: column; text-align: center; } .pf-meta { justify-content: center; } }
</style>