export default defineNuxtPlugin(async (nuxtApp) => {
  // Only run on client side to avoid SSR/hydration mismatch
  if (import.meta.server) return

  const { fetchMe } = useAuth()
  // Fetch user state once on app load — prevents the auth flash on refresh
  await fetchMe()
})