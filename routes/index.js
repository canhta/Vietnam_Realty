const express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  let user = req.session.user;
  console.log("--------------------" + user + "--------------------");

  res.render("mains/home", { title: "Express", user: user });
});
module.exports = router;
