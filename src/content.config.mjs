import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const post = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/bai-viet' }),
})

const typescript = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/typescript' }),
})

const newsletter = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ban-tin' }),
})

export const collections = { post, typescript, newsletter }
