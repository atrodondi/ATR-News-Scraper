$(document).ready(function () {
  // scrape button push - starts the scrape
  $(document).on("click", ".scrape-new", function () {
    console.log("scrape clicked");
    $.ajax({
      type: "GET",
      url: "/scrape"
    }).then(article => {
      console.log("finished", article);
      location.reload();
    });
    // end of document on click scrape new
  });

  $(document).on("click", ".saveBtn", function () {
    console.log("saved clicked");
    let ID = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/saveArticle/" + ID
    }).then(function (data) {
      location.reload();
    });
  });

  // end of document ready
});

// app.get("/", (req, res) => {
// db.Article.find({ saved: false }).then(dbArticle => {
//   console.log("DBARTICLE RIGHT HERE >>>><<><><<", dbArticle);
//   // had to make a new array of objects because abarticle did not want to work to send back to handlebars. couldnt figure this out, took forever
//   var newObjArr = dbArticle.map(arrItem => {
//     return {
//       id: arrItem._id,
//       title: arrItem.title,
//       link: arrItem.link,
//       summary: arrItem.summary,
//       saved: arrItem.saved
//     };
//   });
//   // rending the home screen with the objects from DB to render to handlebars
//   res.render("home", { articles: newObjArr });
// });
// });
