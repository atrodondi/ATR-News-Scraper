var db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

module.exports = app => {
  // home page
  app.get("/", (req, res) => {
    db.Article.find({ saved: false })
      // added lean to get a JSON Object instead of making one, took some googling
      .lean()
      .then(dbArticle => {
        // console.log("DBARTICLE RIGHT HERE >>>><<><><<", dbArticle);

        res.render("home", { article: dbArticle });
      });
  });
  //   saved articles page
  app.get("/saved", (req, res) => {
    db.Article.find({ saved: true })
      // had to add populate so that handlebars could grab it when i opened comment modal
      .populate("comment")
      .lean()
      .then(dbArticle => {
        res.render("saved", { article: dbArticle });
      });
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
      db.Article.create(resultArr, (err, articles) => {
        if (err) {
          console.log(err);
        } else {
          console.log(articles);
          var newObjArr = articles.map(arrItem => {
            return {
              id: arrItem._id,
              title: arrItem.title,
              link: arrItem.link,
              summary: arrItem.summary,
              saved: arrItem.saved
            };
          });
          res.send(newObjArr);
        }
      });

      console.log("Scrape complete");
    });
  });

  // save article route

  app.get("/saveArticle/:id", (req, res) => {
    console.log(req.params.id);
    db.Article.updateOne({ _id: req.params.id }, { saved: true }).then(
      result => {
        console.log(result);
        res.json(result);
      }
    );
  });

  // save comment route

  app.post("/saveComment/:id", (req, res) => {
    console.log(req.body);
    console.log(req.params.id);
    db.Comment.create(req.body)
      .then(dbComment => {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comment: dbComment.id } },
          { new: true }
        );
      })
      .then(dbComment => {
        console.log(dbComment);
        res.send(dbComment);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // getting comments from articles and displaying in modal
  app.get("/getComments/:id", (req, res) => {
    console.log(req.params.id);
    db.Article.findOne({ _id: req.params.id })
      .populate("comment")
      .then(dbArticle => {
        res.send(dbArticle);
      })
      .catch(err => {
        res.send(err);
      });
  });

  // deleting comments
  app.get("/deleteComment/:id", (req, res) => {
    db.Comment.deleteOne({ _id: req.params.id }).then(dbComment => {
      res.send(dbComment);
    });
  });

  // end of modyle exports below this, app is not defined
};
