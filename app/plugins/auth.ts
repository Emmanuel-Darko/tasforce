export default defineNuxtPlugin(async () => {
  // Capture the request-bound fetch function SYNCHRONOUSLY (before any await).
  // This preserves the Nuxt composable context so SSR forwards the browser cookie.
  const fetcher = useRequestFetch()
  const { fetchMe } = useAuth()

  // callOnce runs on SSR and is skipped on client hydration (state is already in payload).
  await callOnce('auth:init', () => fetchMe(fetcher as any))
})