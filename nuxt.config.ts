// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.BACKEND_BASE_URL
    }
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-quasar-ui', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css', '@/main.css'
  ],
  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/axios.js'
  ],
  quasar: {
    extras: {
      fontIcons: ['material-icons','fontawesome-v6']
    },
    plugins: ['Notify']
  }
})
