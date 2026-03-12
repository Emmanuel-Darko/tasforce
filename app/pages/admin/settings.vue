<template>
  <div>
    <div class="topbar">
      <button class="topbar-menu" @click="toggleSidebar?.()">☰</button>
      <h1 class="topbar-title">Settings</h1>
      <div class="topbar-right">
        <button class="btn btn-crimson btn-sm" @click="saved = true; setTimeout(() => saved = false, 3000)">Save Changes</button>
      </div>
    </div>
    <div class="page-body">
      <div v-if="saved" class="notice notice-ok"><span>✦</span><span>Settings saved successfully.</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Organisation</h3></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:14px;">
            <div class="field"><label>Organisation Name</label><input type="text" class="f-input" value="TAS-FORCE" /></div>
            <div class="field"><label>Full Name</label><input type="text" class="f-input" value="Truth and Advocacy for Serwah & Women Empowerment" /></div>
            <div class="field"><label>Email</label><input type="email" class="f-input" value="info@tas-force.org" /></div>
            <div class="field"><label>Website</label><input type="url" class="f-input" value="www.tas-force.org" /></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Registration Settings</h3></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:14px;">
            <div class="field">
              <label>Registration Status</label>
              <select class="f-select"><option>Open — Accepting applications</option><option>Closed — Not accepting</option></select>
            </div>
            <div class="field">
              <label>Auto-Approve Applications</label>
              <select class="f-select"><option>No — Manual review required</option><option>Yes — Approve automatically</option></select>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Email Notifications</h3></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:14px;">
            <div class="field"><label>Sender Name</label><input type="text" class="f-input" value="TAS-FORCE" /></div>
            <div class="field"><label>From Email</label><input type="email" class="f-input" placeholder="noreply@tas-force.org" /></div>
            <div class="field"><label>Admin Notification Email</label><input type="email" class="f-input" placeholder="admin@tas-force.org" /></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Change Password</h3></div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:14px;">
            <div class="field"><label>Current Password</label><input type="password" class="f-input" /></div>
            <div class="field"><label>New Password</label><input type="password" class="f-input" /></div>
            <div class="field"><label>Confirm New Password</label><input type="password" class="f-input" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const saved = ref(false)
</script>
