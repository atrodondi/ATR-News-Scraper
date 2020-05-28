// scrape button push - starts the scrape
$(document).on("click", ".scrape-new", function () {
  console.log("scrape clicked");
  $.ajax({
    type: "GET",
    url: "/scrape"
  }).then(data => {
    console.log("finished", data);
  });
});
