import preact from '@astrojs/preact'
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://ehkoo.com',
  server: { port: 6001, host: false },
  integrations: [preact()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
})
