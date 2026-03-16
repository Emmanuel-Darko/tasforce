<template>
  <div class="vf-root">
    <!-- Brand mark -->
    <div class="vf-brand">
      <div class="vf-brand-mark">TF</div>
      <div class="vf-brand-name">TAS-FORCE</div>
      <div class="vf-brand-sub">Member Verification Portal</div>
    </div>
    <div class="vf-card" style="max-width: 390px; margin: 0 auto;">
      <div class="vf-card-bar vf-card-bar--gold" />
      <form @submit.prevent="onSubmit" class="vf-form">
        <label class="vf-label" for="member-id">Enter your Member ID to verify:</label>
        <input
          id="member-id"
          v-model="memberId"
          class="vf-input"
          placeholder="e.g. TF-1234-5678"
          autocomplete="off"
          :disabled="loading"
        />
        <button
          class="vf-btn"
          type="submit"
          :disabled="loading || !memberId"
        >
          <span v-if="loading" class="vf-spinner" style="margin-right:8px;width:18px;height:18px;border-width:2px;" />
          {{ loading ? 'Verifying…' : 'Verify Membership' }}
        </button>
        <p v-if="error" class="vf-error">{{ error }}</p>
      </form>
      <div class="vf-card-footer">
        <NuxtLink to="/" class="vf-back">← Return to TAS-FORCE</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const memberId = ref('')
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  if (!memberId.value.trim()) {
    error.value = 'Please enter a member ID.'
    return
  }
  loading.value = true
  // Optionally validate format (e.g., TF-XXXX-XXXX), or skip for flexibility
  try {
    // Pre-check exists for some feedback, but /verify/[memberId] will do the real verification
    await $fetch(`/api/verify/${encodeURIComponent(memberId.value.trim())}`)
    router.push(`/verify/${encodeURIComponent(memberId.value.trim())}`)
  } catch (e: any) {
    error.value = e?.data?.message || 'Member not found or error occurred.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.vf-root {
  min-height: 100svh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  background: var(--lv-bg, #0a0a0a);
  padding: 40px 20px;
  font-family: 'Plus Jakarta Sans', 'Crimson Pro', sans-serif;
  color: var(--lv-fg, #e8dcc8);
}
.vf-brand { text-align: center; margin-bottom: 36px; }
.vf-brand-mark {
  width: 54px; height: 54px; border-radius: 14px;
  background: linear-gradient(135deg, #c9a84c, #e0c06a);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Fraunces', 'Playfair Display', serif;
  font-weight: 900; font-size: 16px; color: hsl(348,100%,6%);
  margin: 0 auto 12px;
  box-shadow: 0 6px 24px hsla(43,60%,54%,.35);
}
.vf-brand-name { font-family: 'Fraunces', 'Playfair Display', serif; font-weight: 900; font-size: 22px; color: var(--lv-fg, #e8dcc8); letter-spacing: .05em; }
.vf-brand-sub  { font-size: 11px; color: rgba(201,168,76,.5); letter-spacing: .12em; text-transform: uppercase; margin-top: 3px; }

.vf-card {
  width: 100%; max-width: 390px;
  background: var(--lv-surface, #111); border: 1px solid rgba(255,255,255,.08);
  border-radius: 20px; overflow: hidden;
  margin-bottom: 24px;
  padding: 32px 24px 20px;
  box-sizing: border-box;
}
.vf-card-bar { height: 4px; }
.vf-card-bar--gold { background: linear-gradient(90deg, #9a7a2a, #e0c06a, #c9a84c, #e0c06a, #9a7a2a); }

.vf-form { display: flex; flex-direction: column; gap: 17px; }
.vf-label { font-size: 14px; color: rgba(201,168,76,.7); font-weight: 500; margin-bottom: 2px; }
.vf-input {
  border-radius: 8px;
  border: 1.5px solid var(--lv-fg, #c9a84c);
  background: #19140b;
  padding: 8px 14px;
  color: var(--lv-fg, #e8dcc8);
  font-size: 16px;
  outline: none;
  transition: border-color .15s;
}
.vf-input:focus { border-color: #c9a84c; }
.vf-btn {
  background: linear-gradient(90deg, #c9a84c, #e0c06a);
  color: #1a0a0a;
  border: none;
  font-family: inherit;
  font-weight: 700;
  font-size: 15px;
  border-radius: 8px;
  padding: 10px 0;
  margin-top: 7px;
  cursor: pointer;
  transition: filter .15s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vf-btn:disabled { filter: grayscale(0.4) brightness(0.88); cursor: not-allowed; }
.vf-error {
  color: #e57373;
  font-size: 13.5px;
  margin-top: 4px;
  text-align: center;
  min-height: 16px;
}
.vf-spinner {
  width: 18px; height: 18px; border: 2px solid rgba(201,168,76,.16); border-top-color: #c9a84c; border-radius: 50%; animation: spin .8s linear infinite; display: inline-block; vertical-align: middle;
}
@keyframes spin { to { transform: rotate(360deg); } }
.vf-card-footer { margin-top: 22px; text-align: center; }
.vf-back { font-size: 13px; color: rgba(232,220,200,.35); text-decoration: none; transition: color .18s; }
.vf-back:hover { color: #c9a84c; }
</style>