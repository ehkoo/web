import rss from '@astrojs/rss'

export const get = async () => {
  const posts = import.meta.glob('./bai-viet/**/*.md', { eager: true })

  return rss({
    title: 'Ehkoo',
    description: 'Website tiếng Việt chuyên hướng dẫn tùm lum về JavaScript, CSS, React, và chuyện lập trình frontend.',
    customData: `<language>vi</language>`,
    site: import.meta.env.SITE,
    items: Object.values(posts).map((item) => ({
      title: item.frontmatter.title,
      description: item.frontmatter.description,
      link: item.url,
      pubDate: item.frontmatter.date,
    })),
  })
}
