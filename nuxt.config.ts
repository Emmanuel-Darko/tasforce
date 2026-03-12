export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    jwtSecret:        process.env.JWT_SECRET,
    databaseUrl:      process.env.DATABASE_URL,
    resendApiKey:     process.env.RESEND_API_KEY,
    emailFrom:        process.env.EMAIL_FROM || 'noreply@tas-force.org',
    cloudinaryCloud:  process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryKey:    process.env.CLOUDINARY_API_KEY,
    cloudinarySecret: process.env.CLOUDINARY_API_SECRET,
    public: {
      appName:         'TAS-FORCE',
      appUrl:          process.env.APP_URL || 'http://localhost:3000',
      cloudinaryCloud: process.env.CLOUDINARY_CLOUD_NAME,
    }
  },

  // Prevent bwip-js and qrcode from being bundled client-side (Node-only)
  vite: {
    optimizeDeps: {
      exclude: ['bwip-js', 'qrcode']
    }
  },

  nitro: {
    preset: 'vercel',
    // Ensure server-only packages stay server-side
    externals: {
      inline: ['bwip-js', 'qrcode']
    }
  },

  typescript: { strict: true }
})