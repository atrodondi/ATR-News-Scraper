$(document).ready(function () {
  // scrape button push - starts the scrape
  $(document).on("click", ".scrape-new", function () {
    console.log("scrape clicked");
    $.ajax({
      type: "GET",
      url: "/scrape"
    }).then(article => {
      console.log("finished", article);
      $(".articleBox").empty();
      if (article.name === "MongoError") {
        $(".articleBox").append(
          "<div class='card'><div class='card-body bg-warning'>Uh Oh, looks like you need to scrape some articles!</div></div>"
        );
      } else {
        for (i in article) {
          $(".articleBox").append(
            "<li data-id='" +
              article[i].id +
              "'><div class='card'><div class='card-header'> Breaking News!</div><div class='card-body'><h5 class='card-title'>" +
              article[i].title +
              "</h5><p class='card-text'>" +
              article[i].summary +
              "</p><a href='" +
              article[i].link +
              "' class='btn btn-primary'>Article</a><button class='btn btn-success saveBtn float-right' data-id='" +
              article[i].id +
              "'>Save Article</button></div></div></li>"
          );
        }
      }
    });
    // end of document on click scrape new
  });

  // save an article button
  $(document).on("click", ".saveBtn", function () {
    console.log("saved clicked");
    let ID = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/saveArticle/" + ID
    }).then(function (data) {
      console.log(data);
      $("li[data-id='" + ID + "'").remove();
    });
  });

  // viewing comments of articles button
  $(document).on("click", ".comment", function () {
    let thisID = $(this).attr("data-id");
    $("#commentModal" + thisID).modal("toggle");
    // display all the comments of the article to the comment modal
    $.ajax({
      type: "GET",
      url: "/getComments/" + thisID
    }).then(data => {
      console.log("ARTICLE WITH COMMENT", data);
    });
  });

  // saving a comment button
  $(document).on("click", ".saveComment", function () {
    var thisID = $(this).attr("data-id");
    var newCommentObj = {
      _articleId: thisID,

      body: $("#newCommentBody" + thisID)
        .val()
        .trim()
    };
    console.log(newCommentObj);
    $.ajax({
      type: "POST",
      url: "/saveComment/" + thisID,
      data: newCommentObj
    }).then(data => {
      console.log("response from saving a comment", data);

      $("#newCommentBody" + thisID).val("");
      location.reload();
    });
  });

  // deleting a comment
  $(document).on("click", ".deleteComment", function () {
    let thisID = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/deleteComment/" + thisID
    }).then(data => {
      console.log(data);
      location.reload();
    });
  });

  // deleting a saved article from saved page
  $(document).on("click", ".delete", function () {
    let thisID = $(this).attr("data-id");
    $.ajax({
      type: "GET",
      url: "/deleteSaved/" + thisID
    }).then(data => {
      console.log(data);
      location.reload();
    });
  });

  // clear articles button
  $(document).on("click", ".clear", function () {
    $(".articleBox").empty();
    $(".articleBox").append(
      "<div class='card'><div class='card-body bg-warning'>Uh Oh, looks like you need to scrape some articles!</div></div>"
    );
  });

  // end of document ready
});
