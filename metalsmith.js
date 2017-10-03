const path = require('path')
const Metalsmith = require('metalsmith')
const asset = require('metalsmith-static')
const dates = require('metalsmith-date-formatter')
const layouts = require('metalsmith-layouts')
const permalinks = require('metalsmith-permalinks')
const collections = require('metalsmith-collections')
const wordcount = require('metalsmith-word-count')
const markdown = require('metalsmith-markdown-remarkable')

const OUTPUT_PATH = path.resolve(__dirname, 'dist')

module.exports = Metalsmith(__dirname)
  .source(path.resolve(__dirname, 'content'))
  .destination(OUTPUT_PATH)
  .use(
    asset({
      src: './assets',
      dest: '.'
    })
  )
  .use(
    collections({
      lastArticles: {
        pattern: 'posts/**/*.md',
        sortBy: 'date',
        refer: false,
        reverse: true
      }
    })
  )
  .use(
    markdown('full', {
      breaks: true,
      quotes: '“”‘’',
      langPrefix: 'language-',
      typographer: true
    })
  )
  .use(
    permalinks({
      pattern: 'bai-viet/:slug'
    })
  )
  .use(
    dates({
      dates: [{ key: 'date', format: 'DD/MM/YYYY' }]
    })
  )
  .use(wordcount())
  .use(
    layouts('nunjucks')
  )
