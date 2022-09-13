const postcssJitProps = require('postcss-jit-props')
const OpenProps = require('open-props')
const postcssCustomMedia = require('postcss-custom-media')

const plugins = [
  postcssCustomMedia({
    importFrom: [
      {
        customMedia: {
          '--md': '(min-width: 768px)',
          '--lg': '(min-width: 960px)',
          '--xl': '(min-width: 1280px)',
        },
      },
    ],
  }),
  require('postcss-calc'),
  require('postcss-each'),
  require('postcss-nested'),
  require('autoprefixer'),
  postcssJitProps(OpenProps),
]

module.exports = { plugins }
