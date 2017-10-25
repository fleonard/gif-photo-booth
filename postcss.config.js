const pkg = require('./package.json');

module.exports = {
  plugins: [
    // These plugins give you majority of css functionality
    // The order is important here
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-extend'),
    require('postcss-mixins'),
    require('postcss-each'),
    require('postcss-at-rules-variables'),
    require('postcss-for'),
    require('postcss-conditionals'),
    require('postcss-cssnext'),
    require('postcss-math'),

    // These are always nice to have
    require('postcss-plugin-px2rem')({
      rootValue: 16,
      unitPrecision: 4,
      minPixelValue: 1
    }),

    // Add a namespace to prevent cross-library contamination
    // require('postcss-prefixer')(pkg.config.CSS_NAMESPACE, {
    //   ignore: [
    //     /vx_/
    //   ]
    // })
  ]
};
