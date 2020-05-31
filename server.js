var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Require all models
var db = require("./models");

var PORT = 3333;

// Initialize Express
var app = express();

// // Configure middleware
// var router = require("./config/routes");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static(__dirname + "/public"));

// Connect to the Mongo DB
var MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb://user:password1@ds151853.mlab.com:51853/heroku_wk8x54d6";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// routes
require("./routes/routes")(app);

// listening
app.listen(PORT, function () {
  console.log("Listening on Port: " + PORT);
});

module.exports = app;
