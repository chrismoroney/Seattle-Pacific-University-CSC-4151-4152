var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session'); //express session
var bodyParser = require('body-parser');
// var okta = require("@okta/okta-sdk-nodejs"); //okta library
// var ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC; //oidc library
var app = express();

//add oktaclient and oidc
// var oktaClient = new okta.Client({
//   orgUrl: 'https://www.dev-28212450.okta.com',
//   token: '00v7IQng5IFIumh852wH9NtnF8AptDvKdhJ80fMUHd'
// });
// const oidc = new ExpressOIDC({
//   appBaseUrl: 'http://localhost:3000',
//   issuer: "https://www.dev-28212450.okta.com/oauth2/default",
//   client_id: '0oa7bw4xyfob58xG25d6',
//   client_secret: '3d7lnNMQSoNCV6b29OIlrwCj_fp6z8g5Ho4X2JPi',
//   redirect_uri: 'http://localhost:3000/home',
//   scope: "openid profile",
//   routes: {
//     login: {
//       path: "/"
//     },
//     callback: {
//       path: "/users/callback",
//       defaultRedirect: "/dashboard"
//     }
//   }
// });

//connect to db
var db = require('./database');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//use express session
// app.use(session({
//   secret: "alskdjfa;ldskwoeirn1120931lkj",
//   resave: true,
//   saveUninitialized: false
// }));

//use oidc router
// app.use(oidc.router);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/messages', messagesRouter);

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
