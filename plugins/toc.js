const path = require('path')
const multimatch = require('multimatch')
const Remarkable = require('remarkable')
const md = new Remarkable()

module.exports = options => (files, metalsmith, done) => {
  const getTocPath = series =>
    path.resolve(
      metalsmith.source(),
      options.tocFilename.replace(':series', series),
    )

  const cache = {}
  const getTocOfSeries = series => cache[series] || require(getTocPath(series))

  const fileNames = Object.keys(files)
  const list = multimatch(fileNames, [options.path])

  if (list.length > 0) {
    // Generate TOC object
    const newFiles = list.reduce((acc, filename) => {
      const file = files[filename]
      const toc = getTocOfSeries(file.series)
      if (toc) {
        file.toc = {
          ...toc,
          url: `/series/${toc.slug}`,
          sections: toc.sections.map(section => ({
            ...section,
            children: section.children.map(child => ({
              ...child,
              name: md.render(child.name),
              url: options.url
                .replace(':series', file.series)
                .replace(':slug', child.slug),
            })),
          })),
        }
      }

      acc[filename] = file
      return acc
    }, {})

    files = { ...files, ...newFiles }
  }

  done()
}
