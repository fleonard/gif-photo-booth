'use strict';
/* eslint no-console:0 */

const express = require('express'),
  //favicon = require('serve-favicon'),
  path = require('path'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  fse = require('fs-extra'),
  utilHmr = require('./utils/util.hmr'),
  pkg = require('../package.json');

//  load routes from `./routes/` directory
const routes = {};
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public', 'favicons')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());

/**
 * Set the application locals
 */
const NODE_ENV = process.env.NODE_ENV || 'production';
app.locals.isDev = NODE_ENV === 'development';
app.locals.isExport = NODE_ENV === 'export'; // for testing export but on port 3000
app.set('port', app.locals.isDev || app.locals.isExport? pkg.config.DEV_PORT : 80);

/**
 * Set up HMR with webpack - if it is dev environment
 */
if (app.locals.isDev) {
  console.log('is dev > HMR', app.locals.isDev, app.get('port'));
  utilHmr.init(app);
}

fse.readdirSync( path.resolve(__dirname, './routes/') )
  .forEach( file => {

    if ( file.indexOf('.js') === -1 ) return;

    // Get the route name
    const routeName = file.replace(/\.js$/, '');

    // Add the routes as a required path
    routes[routeName] = require( path.resolve(__dirname, `./routes/${file}`) );

    // Define the route paths
    app.use(`/${routeName}`, routes[routeName]);
  });

// set root path to the home (can be changed)
app.use('/', routes['home']);

/**
 * catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * error handler
 */
app.use(function(err, req, res) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =  req.app.locals.isDev ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.use(favicon(path.join(__dirname, 'public', 'favicons', 'favicon.ico')));
module.exports = app;
