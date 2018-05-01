const path = require('path')
const multimatch = require('multimatch')
const Remarkable = require('remarkable')
const md = new Remarkable()

module.exports = options => (files, metalsmith, done) => {
  const getTocPath = series => path.resolve(metalsmith.source(), options.tocFilename.replace(':series', series))

  const cache = {}
  const getTocOfSeries = series => {
    if (!cache[series]) {
      cache[series] = require(getTocPath(series))
    }

    return cache[series]
  }

  const tocMapCache = {}
  const makeTocMap = (toc, file) => {
    if (!tocMapCache[toc.slug]) {
      const transformChild = child => ({
        ...child,
        url: options.urlGenerator(file.series, child.slug)
      })
      const articles = {
        '': toc.index,
        ...toc.sections.reduce(
          (acc, section) => ({
            ...acc,
            ...section.children.reduce(
              (acc, child) => ({
                ...acc,
                [child.slug]: transformChild(child)
              }),
              {}
            )
          }),
          {}
        )
      }

      tocMapCache[toc.slug] = {
        articles,
        keys: Object.keys(articles)
      }
    }

    return tocMapCache[toc.slug]
  }

  const firstOf = tocMap => tocMap.articles[tocMap.keys[0]]

  const nextOf = (tocMap, slug) => {
    if (slug == null) return tocMap.articles[tocMap.keys[1]]

    const idx = tocMap.keys.indexOf(slug)
    if (idx === -1 || idx + 1 > tocMap.length) return null

    return tocMap.articles[tocMap.keys[idx + 1]]
  }

  const prevOf = (tocMap, slug) => {
    const idx = tocMap.keys.indexOf(slug)
    if (idx === -1 || idx - 1 < 0) return null

    return tocMap.articles[tocMap.keys[idx - 1]]
  }

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
            children: section.children.map(child => {
              return {
                ...child,
                name: md.render(child.name),
                url: options.urlGenerator(file.series, child.slug)
              }
            })
          }))
        }

        // tocMap is required to generate next/prev links in articles
        const tocMap = makeTocMap(toc, file)

        file.nextArticle = nextOf(tocMap, file.slug)
        file.prevArticle = prevOf(tocMap, file.slug)

        if (file.nextArticle == null && file.prevArticle == null) {
          file.nextArticle = firstOf(tocMap)
        }
      }

      acc[filename] = file
      return acc
    }, {})

    files = { ...files, ...newFiles }
  }

  done()
}
