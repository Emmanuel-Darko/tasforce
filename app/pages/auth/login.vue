<template>
  <div class="lf-wrap">

    <div class="lf-header">
      <h2 class="lf-title">Welcome back</h2>
      <p class="lf-sub">Sign in to your TAS-FORCE account to continue.</p>
    </div>

    <div v-if="error" class="lf-error">
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="10" r="8"/><line x1="10" y1="6.5" x2="10" y2="10.5"/><circle cx="10" cy="13.5" r=".6" fill="currentColor" stroke="none"/></svg>
      {{ error }}
    </div>

    <div class="lf-fields">
      <div class="lf-field">
        <label class="lf-label">Email Address <span class="lf-req">*</span></label>
        <input type="email" class="lf-input" placeholder="you@email.com" v-model="email" @keyup.enter="submit" />
      </div>
      <div class="lf-field">
        <label class="lf-label">Password <span class="lf-req">*</span></label>
        <input type="password" class="lf-input" placeholder="Your password" v-model="password" @keyup.enter="submit" />
      </div>
    </div>

    <button class="lf-btn" :disabled="loading" @click="submit">
      <span v-if="loading" class="lf-spinner" />
      {{ loading ? 'Signing in…' : 'Sign In' }}
    </button>

    <div class="lf-divider"><span>or</span></div>

    <p class="lf-foot">
      Not a member yet?
      <NuxtLink to="/auth/register" class="lf-link">Apply for membership →</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })
const { login } = useAuth()
const route = useRoute()
const email = ref(''), password = ref(''), loading = ref(false), error = ref('')

async function submit() {
  error.value = ''
  if (!email.value || !password.value) { error.value = 'Please enter your email and password.'; return }
  loading.value = true
  try {
    const data = await login(email.value, password.value) as any
    const dest = (route.query.redirect as string) || (data.user.role !== 'member' ? '/admin' : '/dashboard')
    await navigateTo(dest)
  } catch (e: any) {
    error.value = e?.data?.message || 'Login failed. Please try again.'
  } finally { loading.value = false }
}
</script>

<style scoped>
.lf-wrap {
  width: 100%;
  max-width: 400px;
  background: var(--white);
  border-radius: 20px;
  padding: 36px 36px 32px;
  box-shadow: 0 4px 32px rgba(61,0,0,.1), 0 1px 4px rgba(61,0,0,.06);
  border: 1px solid var(--border-light);
}

.lf-header { margin-bottom: 28px; }
.lf-title  { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--crimson); margin-bottom: 6px; }
.lf-sub    { font-size: 14px; color: var(--muted); line-height: 1.55; }

.lf-error  {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 14px; background: #fff0f0;
  border: 1.5px solid #f5c0c0; border-radius: 10px;
  font-size: 13px; color: #7a0000; margin-bottom: 20px;
}
.lf-error svg { width: 17px; height: 17px; flex-shrink: 0; color: #c0392b; }

.lf-fields { display: flex; flex-direction: column; gap: 16px; margin-bottom: 22px; }
.lf-field  { display: flex; flex-direction: column; gap: 6px; }
.lf-label  { font-size: 12px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--text-mid); }
.lf-req    { color: var(--danger); }
.lf-input  {
  background: var(--white);
  border: 1.5px solid var(--border);
  border-radius: 10px;
  padding: 11px 14px;
  font-family: 'Crimson Pro', serif;
  font-size: 15px;
  color: var(--text);
  outline: none;
  width: 100%;
  transition: border-color .18s, box-shadow .18s;
}
.lf-input::placeholder { color: var(--muted2); }
.lf-input:focus { border-color: var(--crimson); box-shadow: 0 0 0 3px rgba(107,15,26,.1); background: #fffaf8; }

.lf-btn {
  width: 100%; padding: 13px;
  background: var(--crimson);
  color: var(--cream);
  font-family: 'Playfair Display', serif;
  font-size: 16px; font-weight: 700;
  border: none; border-radius: 10px;
  cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
  box-shadow: 0 2px 12px rgba(107,15,26,.3);
  transition: background .2s, transform .2s, box-shadow .2s;
  letter-spacing: .03em;
}
.lf-btn:hover:not(:disabled) { background: var(--crimson2); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(107,15,26,.38); }
.lf-btn:disabled { opacity: .6; cursor: not-allowed; }

.lf-spinner {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2.5px solid rgba(245,230,208,.3);
  border-top-color: var(--cream);
  animation: lfSpin .7s linear infinite; flex-shrink: 0;
}
@keyframes lfSpin { to { transform: rotate(360deg); } }

.lf-divider {
  display: flex; align-items: center; gap: 12px;
  margin: 22px 0; color: var(--muted2); font-size: 12px;
}
.lf-divider::before,
.lf-divider::after { content: ''; flex: 1; height: 1px; background: var(--border-light); }

.lf-foot { font-size: 14px; color: var(--muted); text-align: center; }
.lf-link { color: var(--crimson); font-weight: 600; text-decoration: none; }
.lf-link:hover { text-decoration: underline; }
</style>