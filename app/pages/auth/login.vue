<template>
  <div style="width:100%;max-width:420px;">
    <h2 style="font-family:'Playfair Display',serif;font-size:26px;color:var(--crimson);margin-bottom:6px;">Sign In</h2>
    <p style="font-size:15px;color:var(--muted);margin-bottom:26px;">Welcome back. Enter your credentials to continue.</p>

    <div v-if="error" class="notice notice-err">{{ error }}</div>

    <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:18px;">
      <div class="field">
        <label>Email Address <span class="req">*</span></label>
        <input type="email" class="f-input" placeholder="you@email.com" v-model="email" @keyup.enter="submit" />
      </div>
      <div class="field">
        <label>Password <span class="req">*</span></label>
        <input type="password" class="f-input" placeholder="Your password" v-model="password" @keyup.enter="submit" />
      </div>
    </div>

    <button class="btn btn-crimson btn-block" :disabled="loading" @click="submit">
      {{ loading ? 'Signing in…' : 'Sign In' }}
    </button>

    <p style="margin-top:16px;font-size:15px;color:var(--muted);">
      Not a member yet? <NuxtLink to="/auth/register" style="color:var(--crimson);font-weight:600;">Join TAS-FORCE</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'auth', middleware: 'guest' })
const { login } = useAuth()
const route     = useRoute()
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
