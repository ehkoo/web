const multimatch = require('multimatch')

module.exports = options => (files, metalsmith, done) => {
  const fileNames = Object.keys(files)
  const list = multimatch(fileNames, [options.path])
  if (list.length > 0) {
    const sorted = list.sort((a, b) => a < b).slice(0, options.limit)
    const quickNews = sorted.reduce((acc, file) => {
      acc.push(files[file])
      return acc
    }, [])

    metalsmith.metadata({ ...metalsmith.metadata(), quickNews })
  }

  done()
}
