<template>
  <div class="aw">
    <h2 class="aw-title">Welcome back</h2>
    <p class="aw-sub">Sign in to your TAS-FORCE account.</p>

    <div v-if="error" class="aw-error">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="7" x2="10" y2="10"/><circle cx="10" cy="13.5" r=".5" fill="currentColor"/></svg>
      {{ error }}
    </div>

    <div class="aw-fields">
      <div class="aw-field">
        <label class="aw-label">Email Address <span class="aw-req">*</span></label>
        <input type="email" class="aw-input" placeholder="you@email.com" v-model="email" @keyup.enter="submit" />
      </div>
      <div class="aw-field">
        <label class="aw-label">Password <span class="aw-req">*</span></label>
        <input type="password" class="aw-input" placeholder="Your password" v-model="password" @keyup.enter="submit" />
      </div>
    </div>

    <button class="aw-btn-primary" :disabled="loading" @click="submit">
      <span v-if="loading" class="aw-spinner" />
      {{ loading ? 'Signing in…' : 'Sign In' }}
    </button>

    <p class="aw-footer-text">
      Not a member yet?
      <NuxtLink to="/auth/register" class="aw-link">Join TAS-FORCE →</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })
const { login } = useAuth()
const route      = useRoute()
const email = ref(''), password = ref(''), loading = ref(false), error = ref('')

async function submit() {
  error.value = ''
  if (!email.value || !password.value) { error.value = 'Please enter your email and password.'; return }
  loading.value = true
  try {
    const data = await login(email.value, password.value) as any
    const dest  = (route.query.redirect as string) || (data.user.role !== 'member' ? '/admin' : '/dashboard')
    await navigateTo(dest)
  } catch (e: any) {
    error.value = e?.data?.message || 'Login failed. Please try again.'
  } finally { loading.value = false }
}
</script>

<style scoped>
.aw { width: 100%; max-width: 420px; }

.aw-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
.aw-sub   { font-size: 15px; color: var(--muted); margin-bottom: 26px; line-height: 1.55; }

/* Error */
.aw-error { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: #fdf2f2; border: 1.5px solid #f5c0c0; border-radius: 10px; font-size: 14px; color: #7a0000; margin-bottom: 20px; }
.aw-error svg { width: 18px; height: 18px; flex-shrink: 0; color: #c0392b; }

/* Fields */
.aw-fields { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
.aw-field  { display: flex; flex-direction: column; gap: 5px; }
.aw-label  { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--text-mid, #3d2e4a); }
.aw-req    { color: var(--danger, #8b0000); }
.aw-input  {
  background: var(--white); border: 1.5px solid var(--border, #ddd5e0);
  border-radius: 10px; padding: 12px 14px;
  font-family: 'Crimson Pro', serif; font-size: 15px; color: var(--text);
  outline: none; width: 100%;
  transition: border-color .18s, box-shadow .18s;
}
.aw-input::placeholder { color: var(--muted2, #9a8fa8); }
.aw-input:focus { border-color: var(--crimson, #2D1B69); box-shadow: 0 0 0 3px rgba(45,27,105,.1); }

/* Primary button */
.aw-btn-primary {
  width: 100%; padding: 13px; border-radius: 10px;
  background: linear-gradient(135deg, var(--crimson, #2D1B69), var(--crimson2, #3E2A82));
  color: var(--cream, #f5e6d0); font-family: 'Crimson Pro', serif;
  font-size: 16px; font-weight: 700; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 2px 14px rgba(45,27,105,.3);
  transition: transform .22s, box-shadow .22s, opacity .2s;
  margin-bottom: 18px;
}
.aw-btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(45,27,105,.4); }
.aw-btn-primary:disabled { opacity: .65; cursor: not-allowed; }

.aw-spinner { width: 16px; height: 16px; border: 2px solid rgba(245,230,208,.3); border-top-color: var(--cream, #f5e6d0); border-radius: 50%; animation: spin .7s linear infinite; flex-shrink: 0; }
@keyframes spin { to { transform: rotate(360deg); } }

.aw-footer-text { font-size: 15px; color: var(--muted); text-align: center; }
.aw-link { color: var(--crimson, #2D1B69); font-weight: 600; text-decoration: none; }
.aw-link:hover { text-decoration: underline; }
</style>