import baseSlugify from 'slugify'
import { getCollection } from 'astro:content'

import { formatDate } from './date-time'

export * from './date-time'

/**
 * Get posts to show in Homepage
 */
export async function getPostsForHomepage() {
  const MAX_POST = 6

  const posts = await Promise.all([getCollection('post'), getCollection('newsletter'), getCollection('typescript')])
    .then((posts) => [].concat(...posts))
    .then(processPosts)

  // Group posts by their primary tag
  const postsByTag = new Map()
  for (const post of posts) {
    const tag = getPrimaryTag(post.data.tags)

    const coll = postsByTag.get(tag) ?? []
    if (coll.length < MAX_POST) {
      coll.push(post)
    }

    postsByTag.set(tag, coll)
  }

  return Array.from(postsByTag.entries()).sort(([, [a]], [, [b]]) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  })
}

function getPrimaryTag(tags) {
  let list = Array.isArray(tags) ? tags : tags.split(',')

  return list.at(0)
}

function processPosts(posts) {
  return posts
    .sort((a, b) => {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    })
    .filter((p) => p.data.draft !== true)
    .map((p) => {
      p.data.formattedDate = p.data?.date ? formatDate(p.data.date) : undefined
      p.data.url = getPostUrl(p)

      return p
    })
}

function getPostUrl(post) {
  if (post.collection === 'typescript') return `/learn-typescript-together/${post.id}`
  if (post.collection === 'newsletter') return `/ban-tin/${post.id}`

  return `/bai-viet/${post.id}`
}

export function slugify(str) {
  return baseSlugify(str, { locale: 'vi', lower: true, trim: true })
}

/**
 * Apply Cloudinary transformations to an URL
 */
export function transformImage(url, transformations) {
  const matches = url.match('upload/(.*)/v')
  if (matches === null) return url

  const tokens = Object.fromEntries(matches[1].split(',').map((s) => s.split('_')))
  const newTokens = { ...tokens, ...transformations }

  return url.replace(
    matches[1],
    Object.entries(newTokens)
      .filter(([, v]) => v != null)
      .map(([k, v]) => `${k}_${v}`)
      .join(','),
  )
}

/**
 * Resize a post's cover to provided `width` and `height`
 */
export function resizePostCover(post, { width, height }) {
  const copy = { ...post }
  copy.data.cover = transformImage(post.data.cover, { c: 'fill', w: width, h: height })
  return copy
}
