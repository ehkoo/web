module.exports = options => (files, metalsmith, done) => {
  const keys = Object.keys(options)
  const arbitraryData = keys
    .filter(key => options[key].path != null)
    .reduce((acc, key) => {
      const opt = options[key]
      const items = require(opt.path)

      acc[key] = opt.parser != null && typeof opt.parser === 'function'
        ? items.map(opt.parser)
        : items

      return acc
    }, {})

  metalsmith.metadata(
    Object.assign(
      {},
      metalsmith.metadata(),
      { arbitraryData }
    )
  )
  done()
}
