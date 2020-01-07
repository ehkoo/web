const { extname } = require('path')
const marked = require('marked')

function isMarkdown(file) {
  return /\.md$|\.markdown$/.test(extname(file))
}

function generateHeadings(acc, [path, file]) {
  if (!isMarkdown(path)) return { ...acc, [path]: file }

  const lexer = new marked.Lexer()
  const tokens = lexer.lex(file.contents.toString('utf8'))
  const headings = tokens.filter(({ type }) => type === 'heading')
  const updated = { ...file, headings }
  return { ...acc, [path]: updated }
}

module.exports = function headings(files, metalsmith, done) {
  files = Object.entries(files).reduce(generateHeadings, {})
  done()
}
