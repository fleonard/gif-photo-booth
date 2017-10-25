'use strict';

const webpack = require('webpack');
const webpackConfig = require('../../webpack.config');
const compiler = webpack(webpackConfig);

module.exports = {
  /**
   * @name init
   * @description Initiate Hot Module Replacement with webpack
   * @param {express} app - The express app
    */
  init: app => {
    app.use(require('webpack-dev-middleware')(compiler, {
      noInfo: true, publicPath: webpackConfig.output.publicPath
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
      path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));
  }
};
