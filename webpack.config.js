const pkg = require('./package.json');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashPlugin = require('lodash-webpack-plugin');

const appConfig = {
  ENV: process.env.NODE_ENV || 'production',
  VERSION: pkg.version,
  CSS_NAMESPACE: pkg.config.CSS_NAMESPACE,
  OUTPUT_NAME: pkg.config.OUTPUT_NAME,
  DEV_PORT: pkg.config.DEV_PORT,
  USE_EXPRESS: pkg.config.USE_EXPRESS,
};

const entries = [
  {
    key: 'app',
    points: [
      './src/index.js',
      './src/styles/main.css'
    ],
    hot: true
  }
];

const config = {
  context: path.resolve(__dirname),
  entry: {},
  output: {
    path: path.resolve(__dirname, './public/'),
    filename: `scripts/${appConfig.OUTPUT_NAME}.[name].${appConfig.VERSION}.js`,
    publicPath: '/'
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(`./styles/${appConfig.OUTPUT_NAME}.[name].${appConfig.VERSION}.css`),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(appConfig.ENV) }),
    new webpack.DefinePlugin({ 'appConfig': JSON.stringify(appConfig) }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'manifest', minChunks: Infinity })
  ]
};


const ruleCss = {
  test: /\.(css|scss)$/,
  exclude: /node_modules/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        importLoaders: 1,
        modules: true,
        localIdentName: '[name]-[local]'
      }
    },
    'postcss-loader'
  ]
};

let plugins = [];

// add the entry points
entries.map(entry => {
  config.entry[entry.key] = entry.points;

  console.log(appConfig.ENV, appConfig.USE_EXPRESS, entry.hot);

  if (appConfig.ENV === 'development' && appConfig.USE_EXPRESS && entry.hot) {
    config.entry[entry.key].unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
  }
});

if ( appConfig.ENV === 'development' ) {

  config.output.pathinfo = true;

  // add development tools
  config.devtool = '#source-map';

  config.devServer = {
    contentBase: './public',
    port: appConfig.DEV_PORT,
    hot: true
  };

  plugins = plugins.concat([
    // HMR for webpack to express
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]);

} else {
  ruleCss.use = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          minimize: true,
          importLoaders: 1,
          modules: true,
          localIdentName: '[name]-[local]'
        }
      },
      'postcss-loader'
    ]
  });

  plugins = plugins.concat([
    new LodashPlugin({
      paths: true
    }),
    // Uglify the JS for production
    new UglifyJsPlugin({ sourceMap: true, extractComments: true }),
  ]);
}

// add webpack plugins
config.plugins = config.plugins.concat(plugins);

// Apply the css rules
config.module.rules.push(ruleCss);

module.exports = config;
