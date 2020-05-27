module.exports = router => {
  // home page
  router.get("/", (req, res) => {
    res.render("home");
  });

  //   saved articles page
  router.get("/saved", (req, res) => {
    res.render("saved");
  });
};
