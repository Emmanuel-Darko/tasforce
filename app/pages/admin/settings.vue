<template>
  <div>
    <div class="topbar">
      <div style="display:flex;align-items:center;gap:12px;">
        <button class="topbar-menu" @click="toggleSidebar?.()">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><line x1="2" y1="5" x2="18" y2="5"/><line x1="2" y1="10" x2="18" y2="10"/><line x1="2" y1="15" x2="18" y2="15"/></svg>
        </button>
        <h1 class="topbar-title">Settings</h1>
      </div>
      <div class="topbar-right">
        <button class="btn btn-crimson btn-sm" :disabled="saving" @click="save">
          <span v-if="saving" class="st-spinner" />
          {{ saving ? 'Saving…' : 'Save Changes' }}
        </button>
      </div>
    </div>

    <div class="page-body">

      <Transition name="st-slide">
        <div v-if="saved" class="st-saved">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 4 7.5 13 4 9.5"/></svg>
          Settings saved successfully.
        </div>
      </Transition>

      <div class="st-grid">

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Organisation</h3>
            <span class="st-section-tag">General</span>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:16px;">
            <div class="field"><label>Organisation Name</label><input type="text"  class="f-input" value="TAS-FORCE" /></div>
            <div class="field"><label>Full Name</label>         <input type="text"  class="f-input" value="Truth and Advocacy for Serwah &amp; Women Empowerment" /></div>
            <div class="field"><label>Email</label>             <input type="email" class="f-input" value="info@tas-force.org" /></div>
            <div class="field"><label>Website</label>           <input type="url"   class="f-input" value="www.tas-force.org" /></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Registration Settings</h3>
            <span class="st-section-tag">Control</span>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:16px;">
            <div class="field">
              <label>Registration Status</label>
              <select class="f-select"><option>Open — Accepting applications</option><option>Closed — Not accepting</option></select>
              <span class="hint">Controls whether new applications can be submitted</span>
            </div>
            <div class="field">
              <label>Auto-Approve Applications</label>
              <select class="f-select"><option>No — Manual review required</option><option>Yes — Approve automatically</option></select>
              <span class="hint">Automatically approve and issue cards on registration</span>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Email Notifications</h3>
            <span class="st-section-tag">Email</span>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:16px;">
            <div class="field"><label>Sender Name</label>             <input type="text"  class="f-input" value="TAS-FORCE" /></div>
            <div class="field"><label>From Email</label>              <input type="email" class="f-input" placeholder="noreply@tas-force.org" /></div>
            <div class="field"><label>Admin Notification Email</label><input type="email" class="f-input" placeholder="admin@tas-force.org" /></div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Change Password</h3>
            <span class="st-section-tag">Security</span>
          </div>
          <div class="card-body" style="display:flex;flex-direction:column;gap:16px;">
            <div class="field"><label>Current Password</label>     <input type="password" class="f-input" /></div>
            <div class="field"><label>New Password</label>         <input type="password" class="f-input" /></div>
            <div class="field"><label>Confirm New Password</label> <input type="password" class="f-input" /></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'dashboard', middleware: ['auth','admin'] })
const toggleSidebar = inject<() => void>('toggleSidebar')
const saved = ref(false), saving = ref(false)
async function save() {
  saving.value = true
  await new Promise(r => setTimeout(r, 700))
  saving.value = false
  saved.value = true
  setTimeout(() => { saved.value = false }, 3200)
}
</script>

<style scoped>
.st-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

.st-section-tag {
  font-size: 10px; font-weight: 700; text-transform: uppercase;
  letter-spacing: .1em; color: var(--muted2);
  background: var(--parchment2); border: 1px solid var(--border);
  border-radius: 6px; padding: 3px 10px;
}

.st-saved {
  display: flex; align-items: center; gap: 10px;
  padding: 12px 18px; background: #e8f5ee;
  border: 1.5px solid #98d4b0; border-radius: 12px;
  font-size: 14px; color: #1f5e3a; font-weight: 600;
  margin-bottom: 20px;
}
.st-saved svg { width: 18px; height: 18px; flex-shrink: 0; }

.st-spinner {
  width: 14px; height: 14px; border-radius: 50%;
  border: 2px solid rgba(245,230,208,.3); border-top-color: var(--cream);
  animation: stSpin .7s linear infinite; display: inline-block;
}
@keyframes stSpin { to { transform: rotate(360deg); } }

/* Slide transition */
.st-slide-enter-active, .st-slide-leave-active { transition: all .25s; }
.st-slide-enter-from, .st-slide-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 860px) { .st-grid { grid-template-columns: 1fr; } }
</style>