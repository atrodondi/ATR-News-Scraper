// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");
axios.get("https://www.nytimes.com/section/world").then(response => {
  var $ = cheerio.load(response.data);

  $("article h2").each((i, element) => {
    var result = {};
    result.title = $(this).children("a").text();
    result.link = $(this).children("a").attr("href");
    result.summary = $(this).find("p").text();
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
