var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

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
app.use(express.static("/public"));

// Connect to the Mongo DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/newsScraper";
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true }, error => {
    if (error) {
      console.log(error);
    } else {
      console.log("mongoose connection is successful");
    }
  })
  .catch(error => handleError(error));

// handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// routes
require("./config/routes")(app);

// listening
app.listen(PORT, function () {
  console.log("Listening on Port: " + PORT);
});
