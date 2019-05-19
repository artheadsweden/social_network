const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const luckyRouter = require('./routes/lucky');
const searchRouter = require('./routes/search');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const dashboardRouter = require('./routes/dashboard');

const app = express();

mongoose.connect('mongodb://localhost/social_network', {
    useNewUrlParser: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;


app.use(
    // Creates a session middleware with given options.
    session({

      // Defaults to MemoryStore, meaning sessions are stored as POJOs
      // in server memory, and are cleared out when the server restarts.
      store: new MongoStore({ mongooseConnection: db }),

      // Name for the session ID cookie. Defaults to 'connect.sid'.
      name: 'sid',

      // Whether to force-save unitialized (new, but not modified) sessions
      // to the store. Defaults to true (deprecated). For login sessions, it
      // makes no sense to save empty sessions for unauthenticated requests,
      // because they are not associated with any valuable data yet, and would
      // waste storage. We'll only save the new session once the user logs in.
      saveUninitialized: false,

      // Whether to force-save the session back to the store, even if it wasn't
      // modified during the request. Default is true (deprecated). We don't
      // need to write to the store if the session didn't change.
      resave: false,

      // Whether to force-set a session ID cookie on every response. Default is
      // false. Enable this if you want to prolong session lifetime while the user
      // is still browsing the site. Beware that the module doesn't have an absolute
      // timeout option, so you'd need to handle indefinite sessions manually.
      // rolling: false,

      // Secret key to sign the session ID. The signature is used
      // to validate the cookie against any tampering client-side.
      secret: 'sssh, quiet! it\'s a secret!',

      // Settings object for the session ID cookie. The cookie holds a
      // session ID ref in the form of 's:{SESSION_ID}.{SIGNATURE}' as in
      // s%3A9vKnWqiZvuvVsIV1zmzJQeYUgINqXYeS.nK3p01vyu3Zw52x857ljClBrSBpQcc7OoDrpateKp%2Bc

      // It is signed and URL encoded, but NOT encrypted, because session ID is
      // merely a random string that serves as a reference to the session. Even
      // if encrypted, it still maintains a 1:1 relationship with the session.
      // OWASP: cookies only need to be encrypted if they contain valuable data.
      // See https://github.com/expressjs/session/issues/468

      cookie: {

        // Path attribute in Set-Cookie header. Defaults to the root path '/'.
        // path: '/',

        // Domain attribute in Set-Cookie header. There's no default, and
        // most browsers will only apply the cookie to the current domain.
        // domain: null,

        // HttpOnly flag in Set-Cookie header. Specifies whether the cookie can
        // only be read server-side, and not by JavaScript. Defaults to true.
        // httpOnly: true,

        // Expires attribute in Set-Cookie header. Set with a Date object, though
        // usually maxAge is used instead. There's no default, and the browsers will
        // treat it as a session cookie (and delete it when the window is closed).
        // expires: new Date(...)

        // Preferred way to set Expires attribute. Time in milliseconds until
        // the expiry. There's no default, so the cookie is non-persistent.
        maxAge: 1000 * 60 * 60 * 2,

        // SameSite attribute in Set-Cookie header. Controls how cookies are sent
        // with cross-site requests. Used to mitigate CSRF. Possible values are
        // 'strict' (or true), 'lax', and false (to NOT set SameSite attribute).
        // It only works in newer browsers, so CSRF prevention is still a concern.
        sameSite: true,

        // Secure attribute in Set-Cookie header. Whether the cookie can ONLY be
        // sent over HTTPS. Can be set to true, false, or 'auto'. Default is false.
        secure: process.env.NODE_ENV === 'production'
      }
    })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lucky', luckyRouter);
app.use('/search', searchRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/dashboard', dashboardRouter);

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
