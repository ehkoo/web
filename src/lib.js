import baseSlugify from 'slugify'
export const POSTS_PER_PAGE = 12

function processPosts(posts) {
  return posts
    .sort((a, b) => {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    })
    .filter((p) => p.frontmatter.draft !== true)
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
  const tagsAndPost = posts.flatMap((post) => post.frontmatter.tags.split(',').map((tag) => [tag.trim(), post]))

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
        posts.sort((a, b) => new Date(b.frontmatter?.date).getTime() - new Date(a.frontmatter?.date).getTime()),
      ])
      // Then sort tag by its latest post date
      .sort(([_, a], [__, b]) => {
        // Sort by length first
        if (a.length !== b.length) return b.length - a.length

        const [firstOfA] = a
        const [firstOfB] = b

        return new Date(firstOfB.frontmatter?.date).getTime() - new Date(firstOfA.frontmatter?.date).getTime()
      })
  )
}

export function groupPostsByYear(posts) {
  posts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))

  const map = Object.create(null)

  for (const post of posts) {
    const year = new Date(post.frontmatter.date).getFullYear()

    map[year] = map[year] ?? []
    map[year].push(post)
  }

  return map
}

export function formatDate(date, { dateStyle = 'long' } = {}) {
  const d = new Date(date)

  return new Intl.DateTimeFormat('vi-VN', { dateStyle }).format(d)
}

export function timeAgo(d) {
  const date = new Date(d)
  const now = new Date()
  const days = Math.floor((date.valueOf() - now.valueOf()) / 84_600_000)
  const value = Math.abs(days) < 60 ? days : Math.floor(days / 30)
  const unit = Math.abs(days) < 60 ? 'day' : 'month'

  const formatter = new Intl.RelativeTimeFormat('vi', { numeric: 'auto', style: 'narrow', value: unit })
  return formatter.format(value, unit)
}
