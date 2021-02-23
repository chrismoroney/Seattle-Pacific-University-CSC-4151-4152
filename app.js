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
var messagesRouter = require('./routes/messages');
var postsRouter = require('./routes/posts');
var homepageRouter = require('./routes/homepage');
var myprofileRouter = require('./routes/myprofile');
var createprofileRouter = require('./routes/createprofile');

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
app.use('/messages', messagesRouter);
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


module.exports = app;
