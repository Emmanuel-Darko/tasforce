export const useAuthUser = () => useState<Record<string, any> | null>('auth.user', () => null)

export function useAuth() {
  const user       = useAuthUser()
  const isLoggedIn = computed(() => !!user.value)
  const isAdmin    = computed(() => ['admin','superadmin'].includes(user.value?.role ?? ''))

  async function fetchMe() {
    try {
      const data = await $fetch('/api/auth/me') as any
      user.value = data.user
    } catch { user.value = null }
  }

  async function login(email: string, password: string) {
    const data = await $fetch('/api/auth/login', { method: 'POST', body: { email, password } }) as any
    user.value = data.user
    return data
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/')
  }

  return { user, isLoggedIn, isAdmin, fetchMe, login, logout }
}
