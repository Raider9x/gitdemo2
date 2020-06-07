var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var videoRouter = require('./routes/video');
var searchUser = require('./routes/searchUser');
var searchTag = require('./routes/searchTag');
var searchMusicID = require('./routes/searchMusicID');
var home = require('./routes/home');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/video', videoRouter);
app.use('/searchUser', searchUser);
app.use('/searchTag', searchTag);
app.use('/searchMusicID', searchMusicID);
app.use('/home', home);
// catch 404 and f biety dfu m bvie rt dung axios dung thu xme nao t cai san npmorward to error handler
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
function ignoreFavicon(req, res, next) {
    if (req.originalUrl === '/favicon.ico') {
        res.status(204).json({nope: true});
    } else {
        next();
    }
}

app.use(ignoreFavicon);
module.exports = app;
