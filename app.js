
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var session = require('express-session'); //express session
var bodyParser = require('body-parser');
var app = express();

//connect to db
var db = require('./database');

var loginRouter = require('./routes/login');
var socketRouter = require('./routes/socket');
var usersRouter = require('./routes/users');
var messengerRouter = require('./routes/messenger');
var postsRouter = require('./routes/posts');
var homepageRouter = require('./routes/homepage');
var myprofileRouter = require('./routes/myprofile');
var createprofileRouter = require('./routes/createprofile');

require('dotenv').config();
const { ExpressOIDC } = require('@okta/oidc-middleware');



const { OKTA_DOMAIN, CLIENT_ID, CLIENT_SECRET, APP_BASE_URL, APP_SECRET } = process.env;

// session support is required to use ExpressOIDC
app.use(session({
  secret: 'this should be secure',
  resave: true,
  saveUninitialized: false
}));

const oidc = new ExpressOIDC({
  issuer: 'https://dev-83573246.okta.com/oauth2/default',
  client_id: '"0oa9wcmtxQ8EGmkBS5d6"',
  client_secret: 'BW-h_Rnp4KRYNsmVTIGFKHsZZt23J8fyC-Gg1Ext',
  redirect_uri: 'http://localhost:3000/authorization-code/callback',
  scope: 'openid profile',
  appBaseUrl: 'http://localhost:3000'
});

// ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);

app.use(session({
  secret: APP_SECRET,
  resave: true,
  saveUninitialized: false,
}));

app.use(oidc.router);
app.use(bodyParser.json());

// Or attach endpoints like this to use your custom-made JWT middleware instead
// app.get('/messages', isAuthenticatedMiddleware, messagesController.getAll);
// app.post('/messages', isAuthenticatedMiddleware, messagesController.post);

app.get('/logout', oidc.forceLogoutAndRevoke(), (req, res) => {
  // This is never called because forceLogoutAndRevoke always redirects.
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', loginRouter);
app.use('/socket', socketRouter);
app.use('/users', usersRouter);
app.use('/messenger', messengerRouter);
app.use('/posts', postsRouter);
app.use('/homepage', homepageRouter);
app.use('/myprofile', myprofileRouter);
app.use('/createprofile', createprofileRouter);

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

app.all('*', oidc.ensureAuthenticated());

module.exports = app;
