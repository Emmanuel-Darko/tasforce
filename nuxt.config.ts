export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },
  future: { compatibilityVersion: 4 },
  modules: ['@pinia/nuxt'],
  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,700;1,9..144,900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

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
    preset: 'node-server',
    // Ensure server-only packages stay server-side
    externals: {
      inline: ['bwip-js', 'qrcode']
    }
  },

  typescript: { strict: true }
})