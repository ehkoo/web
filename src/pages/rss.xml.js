import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET() {
  const posts = await getCollection('post')

  return rss({
    title: 'Ehkoo',
    description: 'Website tiếng Việt chuyên hướng dẫn tùm lum về JavaScript, CSS, React, và chuyện lập trình frontend.',
    customData: `<language>vi</language>`,
    site: import.meta.env.SITE,
    items: posts.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      link: `/bai-viet/${item.id}`,
      pubDate: item.data.date,
    })),
  })
}
