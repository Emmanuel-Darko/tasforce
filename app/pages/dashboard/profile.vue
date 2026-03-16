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

      <!-- Profile identity card -->
      <div class="pf-hero" style="margin-bottom:22px;">
        <div class="pf-avatar">
          <img v-if="user?.photoUrl" :src="user.photoUrl" :alt="user?.firstName" />
          <span v-else>{{ initials }}</span>
        </div>
        <div class="pf-identity">
          <h2 class="pf-name">{{ user?.firstName }} {{ user?.lastName }}</h2>
          <div class="pf-meta">
            <span>{{ user?.position || '—' }}</span>
            <span class="pf-sep">·</span>
            <span>{{ user?.country || '—' }}</span>
            <span v-if="user?.memberId" class="pf-sep">·</span>
            <span v-if="user?.memberId" class="pf-memberid">{{ user.memberId }}</span>
          </div>
        </div>
        <span v-if="user?.status" :class="`badge badge-${user.status}`" style="margin-left:auto;flex-shrink:0;">
          <span class="bdot" />{{ user.status }}
        </span>
      </div>

      <!-- Details form -->
      <div class="card" style="max-width:640px;">
        <div class="card-header">
          <h3 class="card-title">Personal Information</h3>
          <span class="pf-readonly-badge">Read-only</span>
        </div>
        <div class="card-body">
          <div class="form-grid" style="margin-bottom:20px;">
            <div class="field">
              <label>First Name</label>
              <div class="pf-value">{{ user?.firstName || '—' }}</div>
            </div>
            <div class="field">
              <label>Last Name</label>
              <div class="pf-value">{{ user?.lastName || '—' }}</div>
            </div>
            <div class="field col-span-2">
              <label>Email Address</label>
              <div class="pf-value">{{ user?.email || '—' }}</div>
            </div>
            <div class="field">
              <label>Country</label>
              <div class="pf-value">{{ user?.country || '—' }}</div>
            </div>
            <div class="field">
              <label>Position</label>
              <div class="pf-value pf-value--cap">{{ user?.position || '—' }}</div>
            </div>
            <div class="field">
              <label>Membership Type</label>
              <div class="pf-value pf-value--cap">{{ user?.membershipType || '—' }}</div>
            </div>
            <div class="field">
              <label>Member Since</label>
              <div class="pf-value">{{ user?.memberSince || '—' }}</div>
            </div>
          </div>

          <div class="pf-contact-info">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="9" x2="10" y2="14"/><circle cx="10" cy="6.5" r=".5" fill="currentColor" stroke="none"/></svg>
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
const initials = computed(() => `${user.value?.firstName?.[0] ?? ''}${user.value?.lastName?.[0] ?? ''}`)
</script>

<style scoped>
/* Profile hero */
.pf-hero {
  display: flex; align-items: center; gap: 18px;
  background: var(--white); border: 1px solid var(--border-light);
  border-radius: 16px; padding: 22px 24px;
  box-shadow: var(--shadow-sm); flex-wrap: wrap;
}
.pf-avatar {
  width: 64px; height: 64px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, var(--crimson), var(--crimson2));
  display: flex; align-items: center; justify-content: center;
  font-family: 'Playfair Display', serif; font-weight: 700; font-size: 22px;
  color: var(--cream); overflow: hidden;
  border: 3px solid var(--border-light);
}
.pf-avatar img { width: 100%; height: 100%; object-fit: cover; }
.pf-name   { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--crimson); margin-bottom: 5px; }
.pf-meta   { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--muted); flex-wrap: wrap; }
.pf-sep    { color: var(--border); }
.pf-memberid { font-family: monospace; font-size: 12px; color: var(--muted2); letter-spacing: .06em; }

/* Readonly badge */
.pf-readonly-badge {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .1em; color: var(--muted2);
  background: var(--parchment2); border: 1px solid var(--border);
  border-radius: 6px; padding: 3px 10px;
}

/* Value display (read-only replacement for inputs) */
.pf-value {
  background: var(--parchment);
  border: 1.5px solid var(--border-light);
  border-radius: var(--r);
  padding: 10px 14px;
  font-family: 'Crimson Pro', serif;
  font-size: 15px;
  color: var(--text-mid);
  min-height: 42px;
  display: flex; align-items: center;
}
.pf-value--cap { text-transform: capitalize; }

/* Contact info notice */
.pf-contact-info {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 12px 16px; background: #f0f6ff;
  border: 1.5px solid #b8cef8; border-radius: 10px;
  font-size: 14px; color: #1a3a80; line-height: 1.6;
}
.pf-contact-info svg { width: 17px; height: 17px; flex-shrink: 0; margin-top: 2px; }
.pf-link { color: var(--crimson); font-weight: 600; }

@media (max-width: 640px) {
  .pf-hero { flex-wrap: wrap; }
  .pf-hero .badge { margin-left: 0; }
}
</style>