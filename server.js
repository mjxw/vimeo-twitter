'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const session = require('express-session');
const MemcachedStore = require('connect-memcached')(session);
const passport = require('passport');
const app = express();

// Create link to Angular build directory
const distDir = __dirname + '/dist/';

const ENV = app.get('env');
const MEMCACHE_URL = 'redis-19395.c8.us-east-1-4.ec2.cloud.redislabs.com:19395';

// Connect to heroku mySQL (clearDB)
const pool = mysql.createPool({
  host     : 'us-cdbr-iron-east-05.cleardb.net',
  user     : 'b1a3380ee580d8',
  password : '26ce75fe',
  database : 'heroku_7fa44debcf8c49f'
});

// Configure the session and session storage
const sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: 'keyboardcat',
  signed: true
};

if(ENV === 'production' && MEMCACHE_URL) {
  sessionConfig.store = new MemcachedStore({
    hosts:[MEMCACHE_URL]
  });
}

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static(distDir));

// OAuth2
app.use(passport.initialize());
app.use(passport.session());
app.use(require('./lib/oauth2').router);

// Send all other requests to the Angular app
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
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
const server = app.listen(process.env.PORT || 8080, function () {
  const port = server.address().port;
  console.log('App now running on port', port);
});





// Generic error handler used by all endpoints
function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({'error': message});
}

