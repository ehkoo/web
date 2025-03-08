import { defineConfig } from 'astro/config'
import markdownIntegration from '@astropub/md'
import rehypeExternalLinks from 'rehype-external-links'

import { remarkReadingTime } from './src/remark-reading-time.mjs'

// https://astro.build/config
export default defineConfig({
  site: 'https://ehkoo.com/',
  server: {
    port: 6001,
    host: false,
  },
  integrations: [markdownIntegration()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [rehypeExternalLinks],
    extendDefaultPlugins: true,
  },
})
