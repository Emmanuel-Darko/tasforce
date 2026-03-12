export default defineNuxtRouteMiddleware(async (to) => {
  const { isLoggedIn, fetchMe } = useAuth()

  // On client, user state may not be loaded yet on first navigation — ensure it's fetched
  if (!isLoggedIn.value && import.meta.client) {
    await fetchMe()
  }

  if (!isLoggedIn.value) {
    return navigateTo({ path: '/auth/login', query: { redirect: to.fullPath } })
  }
})