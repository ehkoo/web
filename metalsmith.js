const path = require('path')
const Metalsmith = require('metalsmith')
const asset = require('metalsmith-static')
const drafts = require('metalsmith-drafts')
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown-remarkable')
const wordcount = require('metalsmith-word-count')
const collections = require('metalsmith-collections')
const feed = require('metalsmith-feed')

const tags = require('./plugins/metalsmith-tags')
const dates = require('./plugins/metalsmith-date-formatter')
const related = require('./plugins/related')
const permalinks = require('./plugins/metalsmith-permalinks')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

function transformCloudinary(url, transformations) {
  const tokens = url.match(/upload\/(.+)\/v/)

  const actions = tokens != null ? tokens[1] : null

  // Transformation string -> object
  const oldT =
    actions == null
      ? {}
      : actions.split(',').reduce((acc, action) => {
          const [key, value] = action.split('_')
          return { ...acc, [key]: value }
        }, {})

  // Transformation object -> string
  const newT = Object.entries({ ...oldT, ...transformations })
    .map(([k, v]) => k + '_' + v, [])
    .join(',')

  return tokens == null
    ? url.replace('upload/', 'upload/' + newT + '/')
    : url.replace(tokens[0], 'upload/' + newT + '/v')
}

const builder = Metalsmith(__dirname)
  .metadata({
    env: process.env.NODE_ENV,
    siteUrl: process.env.SITE_URL || 'https://ehkoo.com',
    siteName: 'Ehkoo',
    siteDesc:
      'Tin tức và hướng dẫn lập trình frontend cập nhật liên tục. Đầy đủ các chủ đề về JavaScript, CSS, React, Vue, PWA...',
    siteLogo: 'https://ehkoo.com/assets/img/logo.png',
    social: {
      twitterHandle: '@ehkoo',
      fbPageId: '122317275146521',
      fbAppId: '207039013199010',
      facebook: 'https://facebook.com/ehkoo.dev',
      twitter: 'https://twitter.com/EhkooDev',
      github: 'https://github.com/ehkoo',
      gitter: 'https://gitter.im/ehkoo/web',
    },
    site: {
      title: 'Ehkoo',
      url: process.env.SITE_URL || 'https://ehkoo.com',
    },
  })
  .source(path.resolve(__dirname, 'content'))
  .destination(OUTPUT_PATH)
  .clean(true)
  .use(asset({ src: './assets', dest: './assets' }))
  .use(related({ max_posts: 6 }))
  .use(drafts())
  .use(
    tags({
      path: 'chu-de/:tag.html',
      sortBy: 'date',
      reverse: true,
      layout: 'list.njk',
    }),
  )
  .use(
    collections({
      latest: {
        pattern: 'posts/**/*.md',
        sortBy: 'date',
        refer: false,
        reverse: true,
        limit: 20,
      },
      pages: { pattern: 'pages/**/*.md' },
      series: { pattern: 'series/**/*.md' },
      feed: {
        pattern: ['posts/**/*.md', '!posts/wisdom/**/*.md'],
        sortBy: 'date',
        refer: false,
        reverse: true,
      },
    }),
  )
  .use(
    markdown('full', {
      html: true,
      breaks: true,
      quotes: '“”‘’',
      langPrefix: 'language-',
      typographer: true,
    }),
  )
  .use(wordcount())
  .use(
    permalinks({
      pattern: 'bai-viet/:slug',
      linksets: [
        {
          match: { collection: 'pages' },
          pattern: ':slug',
        },
        {
          match: { collection: 'series' },
          pattern: 'series/:series/:slug',
        },
      ],
    }),
  )
  .use((files, metalsmith, done) => {
    const { siteUrl } = metalsmith.metadata()

    files = Object.entries(files).reduce((acc, [key, data]) => {
      data.fullUrl = `${siteUrl}/${data.path}`

      data.thumbnailUrl = data.cover != null ? transformCloudinary(data.cover, { w: 960, c: 'scale' }) : data.cover

      // Square thumbnail URL
      data.squareThumbnailUrl =
        data.cover != null ? transformCloudinary(data.cover, { w: 150, c: 'fill', g: 'center', h: 150 }) : data.cover

      return { ...acc, [key]: data }
    }, {})

    done()
  })
  .use(feed({ collection: 'feed' }))
  .use(dates({ dates: [{ key: 'date', format: 'DD/MM/YYYY' }] }))
  .use((files, metalsmith, done) => {
    const { collections } = metalsmith.metadata()
    const TOP_POSTS = 5
    // Split latestPosts into first 5 and the rest
    const topPosts = collections.latest.slice(0, TOP_POSTS)
    const olderPosts = collections.latest.slice(TOP_POSTS)
    metalsmith.metadata({ ...metalsmith.metadata(), topPosts, olderPosts })

    files = Object.entries(files).reduce((acc, [key, data]) => {
      if (data.tag != null) {
        data.title = `Bài viết thuộc chủ đề: ${data.tag}`
        data.excerpt = `Những bài viết thuộc chủ đề ${data.tag} trên Ehkoo`
      }

      return { ...acc, [key]: data }
    }, {})

    done()
  })
  .use(
    layouts({
      engineOptions: {
        path: path.resolve(__dirname, 'layouts'),
      },
    }),
  )

builder.build(err => {
  if (err) throw err
})
