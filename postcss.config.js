const postcssJitProps = require('postcss-jit-props')
const OpenProps = require('open-props')

const plugins = [
  require('postcss-custom-media'),
  require('postcss-calc'),
  require('postcss-each'),
  require('postcss-nested'),
  require('autoprefixer'),
  postcssJitProps(OpenProps),
  // postcssJitProps({
  //   files: ['./node_modules/open-props/open-props.min.css'],
  // }),
]

module.exports = { plugins }
