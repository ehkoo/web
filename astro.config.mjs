import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://ehkoo.com',
  server: { port: 6001, host: false },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
})
