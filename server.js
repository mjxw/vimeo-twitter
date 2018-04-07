'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const passport = require('passport');
const app = express();


// Create link to Angular build directory
const distDir = __dirname + '/dist/';
const viewDir = __dirname + '/views';
 
// Configure the session
const sessionConfig = {
	secret: 'keyboard cat', 
	cookie: {maxAge: 86400000},	//24hrs
	resave: false,
  saveUninitialized: false
};

app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(express.static(distDir));
app.use(passport.initialize());
app.use(passport.session());
app.set('views', viewDir);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res) {
  res.render('login');
});

// Send all other requests to the Angular app
app.get('/home', (req, res) => {
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

