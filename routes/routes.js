var db = require("../models");

var axios = require("axios");
var cheerio = require("cheerio");

module.exports = (app) => {
  // home page
  app.get("/", (req, res) => {
    res.render("home");
  });

  //   saved articles page
  app.get("/saved", (req, res) => {
    db.Article.find({ saved: true })
      // had to add populate so that handlebars could grab it when i opened comment modal
      .populate("comment")
      .lean()
      .then((dbArticle) => {
        res.render("saved", { article: dbArticle });
      });
  });

  // listening for a scrape call from front end when the scrape new articles button is pushed
  app.get("/scrape", (req, res) => {
    console.log("scrape click");
    axios.get("https://www.theguardian.com/us-news").then((response) => {
      var $ = cheerio.load(response.data);
      var resultArr = [];

      $(".fc-item").each((i, element) => {
        var result = {};
        result.title = $(element).find("a").text();
        result.link = $(element).find("a").attr("href");
        result.summary = $(element)
          .find('div[class="fc-item__standfirst"]')
          .text();
        resultArr.push(result);
      });
      db.Article.create(resultArr, (err, articles) => {
        if (err) {
          res.send(err);
        } else {
          var newObjArr = articles.map((arrItem) => {
            return {
              id: arrItem._id,
              title: arrItem.title,
              link: arrItem.link,
              summary: arrItem.summary,
              saved: arrItem.saved,
            };
          });
          res.send(newObjArr);
        }
      });
    });
  });

  // save article route

  app.get("/saveArticle/:id", (req, res) => {
    db.Article.updateOne({ _id: req.params.id }, { saved: true }).then(
      (result) => {
        res.json(result);
      }
    );
  });

  // save comment route

  app.post("/saveComment/:id", (req, res) => {
    db.Comment.create(req.body)
      .then((dbComment) => {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { comment: dbComment.id } },
          { new: true }
        );
      })
      .then((dbComment) => {
        res.send(dbComment);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  // getting comments from articles and displaying in modal
  app.get("/getComments/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate("comment")
      .then((dbArticle) => {
        res.send(dbArticle);
      })
      .catch((err) => {
        res.send(err);
      });
  });

  // deleting comments
  app.get("/deleteComment/:id", (req, res) => {
    db.Comment.deleteOne({ _id: req.params.id }).then((dbComment) => {
      res.send(dbComment);
    });
  });

  // deleting saved article from DB
  app.get("/deleteSaved/:id", (req, res) => {
    db.Article.updateOne({ _id: req.params.id }, { saved: false }).then(
      (result) => {
        res.json(result);
      }
    );
  });

  // end of modyle exports below this, app is not defined
};
