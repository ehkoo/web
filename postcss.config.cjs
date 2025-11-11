const OpenProps = require('open-props')
const postcssGlobalData = require('@csstools/postcss-global-data')
const postcssJitProps = require('postcss-jit-props')
const postcssPresetEnv = require('postcss-preset-env')

const plugins = [
  postcssGlobalData({
    files: ['src/styles/queries.css'],
  }),
  postcssPresetEnv({
    stage: 3,
    features: {
      'custom-media-queries': true,
    },
  }),
  postcssJitProps(OpenProps),
]

module.exports = { plugins }
