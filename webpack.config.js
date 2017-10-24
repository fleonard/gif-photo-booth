const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || 'production';

const config = {
  context: __dirname,
  entry: {
    main: ['./src/index.js', './src/styles/main.css']
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname + '/public'),
    filename: 'scripts/[name].bundle.dev.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx', '.css', '.svg']
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel?compact=false'
      },
      { 
        test: /\.(png|woff|woff2|eot|ttf)$/, 
        loader: 'url-loader?limit=100000' 
      },
      {
        test: /\.(css)$/,
        exclude: [ path.resolve(__dirname, 'src/styles') ],
        loader: ExtractTextPlugin.extract('css-loader?modules&localIdentName=[name]-[local]&sourceMap!postcss?sourceMap=inline')
      },
      {
        test: /\.(css)$/,
        include: [ path.resolve(__dirname, 'src/styles') ],
        loader: ExtractTextPlugin.extract('css-loader?sourceMap!postcss?sourceMap=inline')
      }
    ]
  },
  devServer: {
    contentBase: './public',
    hot: true,
    historyApiFallback: true,
    port: 8888
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) }}),
    new webpack.ProvidePlugin({ 'React': 'react' }),
    new ExtractTextPlugin('styles/[name].bundle.css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  postcss: function() {
    return [
      require('postcss-import')({ path: [ path.resolve(__dirname, 'src') ] }),
      require('postcss-cssnext'),
      require('postcss-nested'),
      require('postcss-pixels-to-rem')
    ];
  }
};

switch (NODE_ENV) {
  case 'production':
    config.plugins = config.plugins.concat([
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: { warnings: false },
        output: { comments: false }
      })
    ]);
    config.output.filename = 'scripts/[name].bundle.js';
    break;
  case 'development':
  default:
    break;
}

module.exports = config;
