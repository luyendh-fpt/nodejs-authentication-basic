var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var authenticate = require('./routes/authentication');
var permit = require('./routes/permission');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:abcD1234@cluster0-wuil3.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var membersRouter = require('./routes/routeMembers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use(session({
    secret: 'nodejs'
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authenticate);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/members', membersRouter);

app.use('/free', function (req, resp) {
    console.log('Free space.');
    resp.send('Free space');
});

app.use('/user', permit('user', 'admin'), function (req, resp, next) {
    console.log('Logged in user permission.');
    resp.send('Logged in user permission.' + req.loggedInMember.role);
});

app.use('/admin', permit('admin'), function (req, resp) {
    console.log('Logged in admin permission.');
    resp.send('Logged in admin permission.' + req.loggedInMember.role);
});
// app.use('/admin', permit('admin'), function (req, resp) {
//     resp.send('Okie Admin');
// })

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

var port = 8886;

app.listen(port, function () {
    console.log('Server started at ' + port);
})
