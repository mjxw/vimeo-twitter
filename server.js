'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const postLoginRoutes = require('./routes/post-login-routes');

const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');

const app = express();

const distDir = __dirname + '/dist/';
const viewDir = __dirname + '/views';
const publicDir = __dirname + '/public';
 
app.use(bodyParser.json());
app.set('views', viewDir);
app.set('view engine', 'ejs');
app.use(express.static(publicDir));
app.use(express.static(distDir));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, // 24hrs
  keys: [keys.session.cookieKey]
}));
// initialize passport 
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', authRoutes);
app.use('/post-login', postLoginRoutes);

//connect to mongodb 
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb');
});

app.get('/', function(req, res) {
  console.log("login page");
  res.render('login');
});


// Basic 404 handler
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// Basic error handler
app.use((err, req, res, next) => {
  /* jshint unused:false */
  console.error(err);
  // If our routes specified a specific response, then send that. Otherwise,
  // send a generic message so as not to leak anything.
  res.status(500).send(err.response || 'Something broke!');
});

// Initialize the app
const server = app.listen(process.env.PORT || 4200, function () {
  const port = server.address().port;
  console.log('App now running on port', port);
});

// Generic error handler used by all endpoints
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({'error': message});
}

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/dist/index.html'));
// });

