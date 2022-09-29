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
  const all = getAllPosts(posts)

  const newsletters = all.filter((post) => post.frontmatter.tags.includes('Newsletter')).slice(0, 3)
  const others = all
    .filter((post) => post.frontmatter.tags.includes('Newsletter') === false)
    .slice(0, 3 + POSTS_PER_PAGE)

  return { posts: others.slice(3), top3: others.slice(0, 3), newsletters }
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

  return postsByTag
}
