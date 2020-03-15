const cssnano = require('cssnano')
const postCssAtomic = require('postcss-atomic')
const postcssPresetEnv = require('postcss-preset-env')
const postcssCustomMedia = require('postcss-custom-media')

const plugins = [postCssAtomic(), postcssPresetEnv(), postcssCustomMedia()]

module.exports = {
  map: { inline: false },
  plugins:
    process.env.NODE_ENV === 'production' ? [...plugins, cssnano()] : plugins,
}
