var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
require('dotenv').config({path:'./env'});

//Auth0
const { auth } = require('express-openid-connect');

app.use(
    auth({
      authRequired: true,
      auth0Logout: true,
      issuerBaseURL: process.env.ISSUER_BASE_URL,
      baseURL: process.env.BASE_URL,
      clientID: process.env.CLIENT_ID,
      secret: process.env.SECRET,
      idpLogout: true,
    })
);
//Auth0

//connect to db
var db = require('./database');

var loginRouter = require('./routes/login');
var socketRouter = require('./routes/socket');
var messengerRouter = require('./routes/messenger');
var postsRouter = require('./routes/posts');
var homepageRouter = require('./routes/homepage');
var myprofileRouter = require('./routes/myprofile');
var createprofileRouter = require('./routes/createprofile');
var editprofileRouter = require('./routes/editprofile');
var searchprofileRouter = require('./routes/searchprofile');

require('dotenv').config();

// view engine setup

app.use(bodyParser.urlencoded({extended: false}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');



app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/', loginRouter);
app.use('/socket', socketRouter);
app.use('/messenger', messengerRouter);
app.use('/posts', postsRouter);
app.use('/homepage', homepageRouter);
app.use('/myprofile', myprofileRouter);
app.use('/createprofile', createprofileRouter);
app.use('/editprofile', editprofileRouter);
app.use('/searchprofile', searchprofileRouter);

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
