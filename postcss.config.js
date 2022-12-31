const OpenProps = require('open-props')
const postcssJitProps = require('postcss-jit-props')
const postcssPresetEnv = require('postcss-preset-env')

const plugins = [
  postcssPresetEnv({
    stage: 1,
  }),
  require('postcss-calc'),
  require('postcss-each'),
  require('postcss-nested'),
  postcssJitProps(OpenProps),
]

module.exports = { plugins }
