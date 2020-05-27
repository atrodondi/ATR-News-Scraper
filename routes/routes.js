var db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

module.exports = app => {
  // home page
  app.get("/", (req, res) => {
    res.render("home");
  });

  //   saved articles page
  app.get("/saved", (req, res) => {
    res.render("saved");
  });

  app.get("/scrape", (req, res) => {
    console.log(req.body);
    axios.get("https://www.theguardian.com/us-news").then(response => {
      var $ = cheerio.load(response.data);

      $(".fc-item").each((i, element) => {
        var result = {};
        result.title = $(element).find("a").text();
        result.link = $(element).find("a").attr("href");
        result.summary = $(element)
          .find('div[class="fc-item__standfirst"]')
          .text();
        console.log(result);

        db.Article.create(result)
          .then(dbArticle => {
            console.log(dbArticle);
          })
          .catch(err => {
            console.log(err);
          });
      });
      console.log("Scrape complete");
    });
  });
};
