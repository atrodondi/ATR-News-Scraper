var db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

module.exports = app => {
  // home page
  app.get("/", (req, res) => {
    // rending the home screen with the objects from DB to render to handlebars

    res.render("home");
  });

  //   saved articles page
  app.get("/saved", (req, res) => {
    res.render("saved");
  });

  // listening for a scrape call from front end when the scrape new articles button is pushed
  app.get("/scrape", (req, res) => {
    axios.get("https://www.theguardian.com/us-news").then(response => {
      var $ = cheerio.load(response.data);
      var resultArr = [];

      $(".fc-item").each((i, element) => {
        var result = {};
        result.title = $(element).find("a").text();
        result.link = $(element).find("a").attr("href");
        result.summary = $(element)
          .find('div[class="fc-item__standfirst"]')
          .text();
        // console.log(result);
        resultArr.push(result);
      });
      db.Article.create(resultArr)
        .then(dbArticle => {
          console.log("Articles that you were looking for", dbArticle);
          res.json(dbArticle);
        })
        .catch(err => {
          console.log(err);
        });
      console.log("Scrape complete");
    });
  });
};
