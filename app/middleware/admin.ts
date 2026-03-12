export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn, isAdmin } = useAuth()
  if (!isLoggedIn.value) return navigateTo('/auth/login')
  if (!isAdmin.value)    return navigateTo('/dashboard')
})
