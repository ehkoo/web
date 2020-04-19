const { extname } = require('path')

function isMarkdown(file) {
  return /\.md$|\.markdown$/.test(extname(file))
}

function process(content, opts) {
  const words = content.toString('utf8').match(/[\u0400-\u04FF]+|\S+\s*/g)
  const wordCount = words !== null ? words.length : 0

  const readingTime = Math.floor(wordCount / opts.speed)

  return { wordCount, readingTime }
}

module.exports = function wordCount(options = {}) {
  const opts = {
    speed: 300,
    ...options,
  }

  return (files, metalsmith, done) => {
    Object.keys(files).forEach(function (path) {
      if (isMarkdown(path)) {
        const file = files[path]
        const { wordCount, readingTime } = process(file.contents, opts)

        file.wordCount = wordCount
        file.readingTime = readingTime
      }
    })
    setImmediate(done)
  }
}
