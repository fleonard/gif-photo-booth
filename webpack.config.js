const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    main: ['./src/index.js', './src/styles/main.css']
  },
  devServer: { 
    inline: true 
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname + '/public'),
    filename: 'scripts/[name].bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: [ '', '.js', '.jsx', '.css' ]
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel'
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
  plugins: [
    new webpack.ProvidePlugin({ 'React': 'react' }),
    new ExtractTextPlugin('styles/[name].bundle.css')
  ],
  devtool: 'source-map',
  postcss: function() {
    return [
      require('postcss-import')({ path: [ path.resolve(__dirname, 'src') ] }),
      require('postcss-cssnext'),
      require('postcss-nested')
    ];
  }
};
