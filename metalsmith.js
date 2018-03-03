const url = require('url')
const path = require('path')
const Metalsmith = require('metalsmith')
const tags = require('metalsmith-tags')
const asset = require('metalsmith-static')
const dates = require('metalsmith-date-formatter')
const drafts = require('metalsmith-drafts')
const layouts = require('metalsmith-layouts')
const markdown = require('metalsmith-markdown-remarkable')
const wordcount = require('metalsmith-word-count')
const permalinks = require('metalsmith-permalinks')
const collections = require('metalsmith-collections')

const toc = require('./plugins/toc')
const related = require('./plugins/related')
const readJson = require('./plugins/read-json')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')
const isLocal = process.env.NODE_ENV !== 'production'

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
      gitter: 'https://gitter.im/ehkoo/web'
    }
  })
  .source(path.resolve(__dirname, 'content'))
  .destination(OUTPUT_PATH)
  .use(
    asset({
      src: './assets',
      dest: './assets'
    })
  )
  .use(
    related({
      max_posts: 6
    })
  )
  .use(drafts())
  .use(
    tags({
      path: 'chu-de/:tag.html',
      sortBy: 'date',
      reverse: true,
      layout: 'list.njk'
    })
  )
  .use(
    collections({
      latest: {
        pattern: 'posts/**/*.md',
        sortBy: 'date',
        refer: false,
        reverse: true,
        limit: 15
      },
      pages: {
        pattern: 'pages/**/*.md'
      },
      series: {
        pattern: 'series/**/*.md'
      }
    })
  )
  .use(
    markdown('full', {
      html: true,
      breaks: true,
      quotes: '“”‘’',
      langPrefix: 'language-',
      typographer: true
    })
  )
  .use(
    dates({
      dates: [{ key: 'date', format: 'DD/MM/YYYY' }]
    })
  )
  .use(wordcount())
  .use(
    permalinks({
      pattern: 'bai-viet/:slug',
      linksets: [
        {
          match: { collection: 'pages' },
          pattern: ':slug'
        },
        {
          match: { collection: 'series' },
          pattern: 'series/:series/:slug'
        }
      ]
    })
  )
  .use(
    toc({
      path: 'series/**/*.html',
      url: '/series/:series/:slug',
      tocFilename: 'series/:series/toc.json'
    })
  )
  .use(
    readJson({
      links: {
        path: path.resolve(__dirname, 'content/links/links.json'),
        limit: 10,
        parser: item => ({ ...item, hostname: url.parse(item.url).hostname })
      },
      tools: { path: path.resolve(__dirname, 'content/links/tools.json') }
    })
  )
  .use((files, metalsmith, done) => {
    const { siteUrl, collections } = metalsmith.metadata()
    const TOP_POSTS = 4
    // Split latestPosts into first 5 and the rest
    const topPosts = collections.latest.slice(0, TOP_POSTS)
    const olderPosts = collections.latest.slice(TOP_POSTS)
    metalsmith.metadata({ ...metalsmith.metadata(), topPosts, olderPosts })

    files = Object.keys(files).reduce((acc, key) => {
      const data = files[key]
      if (data.tag != null) {
        data.title = `Bài viết thuộc chủ đề: ${data.tag}`
        data.excerpt = `Những bài viết thuộc chủ đề ${data.tag} trên Ehkoo`
      }

      data.fullUrl = `${siteUrl}/${data.path}`

      acc[key] = data
      return acc
    }, {})

    done()
  })
  .use(layouts('nunjucks'))

builder.build(err => {
  if (err) throw err
})
