const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(bodyParser.json());

// Connect to heroku mySQL (clearDB)
const pool = mysql.createPool({
    host     : 'us-cdbr-iron-east-05.cleardb.net',
    user     : 'b1a3380ee580d8',
    password : '26ce75fe',
    database : 'heroku_7fa44debcf8c49f'
});

// Create link to Angular build directory
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Initialize the app
const server = app.listen(process.env.PORT || 8080, function () {
const port = server.address().port;
console.log("App now running on port", port);
});

// Generic error handler used by all endpoints
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

