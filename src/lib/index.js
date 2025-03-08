import baseSlugify from 'slugify'
import { formatDate } from './date-time'

export * from './date-time'

export const POSTS_PER_PAGE = 12

function processPosts(posts) {
  return posts

    .sort((a, b) => {
      return new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    })
    .filter((p) => p.data.draft !== true)
    .map((p) => {
      p.data.formattedDate = formatDate(p.data.date)
      p.data.url = `/bai-viet/${p.slug}`
      return p
    })
}

export function getAllPosts(posts, { limit } = {}) {
  const processed = processPosts(posts)

  if (limit) return processed.slice(0, limit)

  return processed
}

export function getAllPostsByTag(posts) {
  return posts
}

export function getPostsForHomepage(posts) {
  return getAllPosts(posts)
}

export function getNewsletters(posts) {
  return processPosts(posts).slice(0, 3)
}

export function slugify(str) {
  return baseSlugify(str, { locale: 'vi', lower: true, trim: true })
}

export function groupPostsByTag(posts) {
  const tagsAndPost = posts.flatMap((post) => post.data.tags.split(',').map((tag) => [tag.trim(), post]))

  const postsByTag = tagsAndPost.reduce((acc, [tag, post]) => {
    acc[tag] = acc[tag] ?? []
    acc[tag].push(post)

    return acc
  }, {})

  return (
    Object.entries(postsByTag)
      // Sort posts by published date
      .map(([tag, posts]) => [
        tag,
        posts.sort((a, b) => new Date(b.data?.date).getTime() - new Date(a.data?.date).getTime()),
      ])
      // Then sort tag by its latest post date
      .sort(([, a], [, b]) => {
        // Sort by length first
        if (a.length !== b.length) return b.length - a.length

        const [firstOfA] = a
        const [firstOfB] = b

        return new Date(firstOfB.data?.date).getTime() - new Date(firstOfA.data?.date).getTime()
      })
  )
}

export function groupPostsByYear(posts) {
  posts.sort((a, b) => new Date(b.data.date) - new Date(a.data.date))

  const map = Object.create(null)

  for (const post of posts) {
    const year = new Date(post.data.date).getFullYear()

    map[year] = map[year] ?? []
    map[year].push(post)
  }

  return map
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

export function getPrimaryTag(tags) {
  if (Array.isArray(tags)) {
    const tag = tags.at(0)
    const variant = tag.toLocaleLowerCase()
    const specials = ['HTML', 'CSS', 'JavaScript', 'React', 'Vue']

    if (specials.includes(tag)) {
      if (tag === 'JavaScript') return { tag: 'JS', variant: 'js' }
      return { tag, variant }
    }

    return { tag: tag.length > 3 ? tag.substring(0, 1) : tag, variant }
  }

  return { tag: tags.slice(0, 3), variant: 'unknown' }
}
