var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

require('dotenv').config();
require('./config/database');
// configure passport
require('./config/passport');

var indexRouter = require('./routes/index');
// var moviesRouter = require('./routes/movies');
// var reviewsRouter = require('./routes/reviews');
// var performersRouter = require('./routes/performers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

// Session middleware
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Make user available within every EJS template
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});

const isLoggedIn = require('./config/auth');

// app.use('/', indexRouter);
// app.use('/movies', moviesRouter);
// Not all routes begin with /movies, therefore
// mount to root for max flexibility
// app.use('/', isLoggedIn, performersRouter);
// // Yup, another related resource - mount to root
// app.use('/', isLoggedIn, reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
