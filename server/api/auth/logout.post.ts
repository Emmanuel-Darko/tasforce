export default defineEventHandler(async (event) => {
  deleteCookie(event, 'tf_token', { path: '/' })
  return { success: true }
})
