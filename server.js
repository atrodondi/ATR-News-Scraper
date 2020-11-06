var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
require("dotenv").config();

// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

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
const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

mongoose
  .connect(MONGO_CONNECTION || "mongodb://localhost/atrscraper", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to MongoDB successfully, full send baby!!"))
  .catch((err) => {
    console.log(err);
  });

// handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
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
