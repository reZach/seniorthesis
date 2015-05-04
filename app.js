// Default node packages
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// MongoDB / Mongoose packages
// + data models
var databaseConfig = require('./db');
var mongoose = require('mongoose');

require('./models/time');
require('./models/activity');
require('./models/user');
require('./models/colors');
require('./models/colorsdata');

mongoose.connect(databaseConfig.url, databaseConfig.onStartConnect()); // Connect to database

// Create the app
var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Use the public directory

// Config Passport
var passport = require('passport');
var expressSession = require('express-session');

app.use(expressSession({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Initialize Passport
var initPassport = require('./passport/init');
var googleLogin = require('./passport/login');
initPassport(passport);
googleLogin(passport);

// Config routes
var routes = require('./routes/index')(passport);
app.use('/', routes);

// Catch any routes we don't have paths for
// 404 error
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;