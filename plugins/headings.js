const marked = require('marked')
const slugify = require('slugify')
const { extname } = require('path')

function isMarkdown(file) {
  return /\.md$|\.markdown$/.test(extname(file))
}

function generateHeadings(path, file) {
  if (!isMarkdown(path)) return []

  const lexer = new marked.Lexer()
  const tokens = lexer.lex(file.contents.toString('utf8'))
  const headings = tokens
    .filter(
      token =>
        token.type != null && token.type === 'heading' && token.depth < 4,
    )
    .map(({ text, depth }) => ({
      text,
      depth,
      id: slugify(text, { replacement: '-', remove: null, lower: true }),
    }))
    .reduce((acc, heading) => {
      const last = acc[acc.length - 1]
      if (!last || last.depth >= heading.depth)
        return [...acc, { ...heading, submenu: [] }]

      if (last.depth < heading.depth)
        return acc.map(item =>
          item === last
            ? { ...item, submenu: [...item.submenu, heading] }
            : item,
        )

      return [...acc, heading]
    }, [])

  return headings
}

module.exports = function headings(files, metalsmith, done) {
  Object.keys(files).forEach(function(path) {
    const file = files[path]

    file.headings = generateHeadings(path, file)
  })
  setImmediate(done)
}
