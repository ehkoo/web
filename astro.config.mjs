import { defineConfig } from 'astro/config'
import rehypeExternalLinks from 'rehype-external-links'

import { remarkReadingTime } from './src/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://ehkoo.com/',
  server: {
    port: 6001,
    host: false,
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeExternalLinks],
    extendDefaultPlugins: true,
  },
})
