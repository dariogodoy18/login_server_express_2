const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./passport/passport')(passport)

const app = express();

const indexRouter = require('./routes/routes');

//Session init
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());


// view engine setup
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize())
app.use(passport.session())

app.use(indexRouter);

//Starting server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})


