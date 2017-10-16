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
const headingsIdentifier = require('metalsmith-headings-identifier')

const toc = require('./plugins/toc')
const related = require('./plugins/related')
const quickNews = require('./plugins/quicknews')
const readJson = require('./plugins/read-json')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = Metalsmith(__dirname)
  .metadata({
    siteUrl: process.env.SITE_URL || 'https://ehkoo.com',
    siteName: 'Ehkoo',
    siteDesc:
      'Tin tức lập trình web cập nhật liên tục. Đầy đủ các chủ đề PHP, JavaScript, CSS, PWA, front-end, back-end...',
    siteLogo: 'https://ehkoo.com/img/logo.png',
    social: {
      twitterHandle: '@ehkoo',
      fbPageId: '122317275146521',
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
      dest: '.'
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
      layout: 'list.njk'
    })
  )
  .use(
    collections({
      lastPosts: {
        pattern: 'posts/**/*.md',
        sortBy: 'date',
        refer: false,
        reverse: true
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
  .use(headingsIdentifier({
    linkTemplate: '<a class="heading-archor" href="#%s"></a>'
  }))
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
    quickNews({
      path: 'quicknews/**',
      limit: 8
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
    const { siteUrl } = metalsmith.metadata()

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
