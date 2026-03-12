export default defineNuxtRouteMiddleware(async () => {
  const { isLoggedIn, isAdmin, fetchMe } = useAuth()

  if (!isLoggedIn.value && import.meta.client) {
    await fetchMe()
  }

  if (isLoggedIn.value) {
    return navigateTo(isAdmin.value ? '/admin' : '/dashboard')
  }
})