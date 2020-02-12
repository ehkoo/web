const markdown = require('metalsmith-markdown')
const marked = require('marked')
const ent = require('ent')

function paragraph(text) {
  return `<p class="mb-3 leading-double">${text}</p>`
}

function blockquote(text) {
  return `<blockquote class="mb-3 bg-gray-200 px-3 py-4 border-l-4 border-gray-500">${text}</blockquote>`
}

function image(href, title, text) {
  return `<figure class="mb-3">
  <img class="rounded-md mb-2" src="${href}" alt="${title}" title="${title}" />
${text != null &&
  `<figcaption class="text-sm text-gray-600 text-center">${text}</figcaption>`}
</figure>`
}

function heading(text, level, raw, slugger) {
  if (level === 2)
    return `<h2 class="mb-3 text-xl text-pink-600 font-600">${text}</h2>`

  if (level === 3) return `<h3 class="mb-3 text-lg text-pink-600">${text}</h3>`

  return `<h${level} class="mb-3 text-pink-600">${text}</h${level}>`
}

function code(code, infostring) {
  return `<pre class="mb-3 text-sm rounded-md">
<code class="language-${infostring}">${ent.encode(code)}</code>
</pre>`
}

function codespan(code) {
  return `<code class="text-orange-800 bg-orange-200 p-half">${code}</code>`
}

function list(body, isOrdered) {
  const tag = !isOrdered ? 'ul' : 'ol'
  const classes = !isOrdered ? 'list-disc' : 'list-decimal'

  return `<${tag} class="${classes} mb-3 ml-2 leading-double">${body}</${tag}>`
}

module.exports = function() {
  const renderer = new marked.Renderer()
  const fns = { image, heading, paragraph, blockquote, code, codespan, list }

  Object.entries(fns).forEach(([key, fn]) => (renderer[key] = fn))

  return markdown({
    renderer,
    pedantic: false,
    gfm: true,
    tables: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: true,
  })
}
