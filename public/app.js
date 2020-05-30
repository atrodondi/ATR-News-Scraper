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

  $(document).on("click", ".comment", function () {
    $("#commentModal" + $(this).attr("data-id")).modal("toggle");
  });

  $(document).on("click", ".saveComment", function () {
    var thisID = $(this).attr("data-id");
    var newCommentObj = {
      title: $("#newCommentTitle" + thisID)
        .val()
        .trim(),
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
      console.log(data);
      $("#newCommentTitle" + data._id).val("");
      $("#newCommentBody" + data._id).val("");
    });
  });
  // end of document ready
});
