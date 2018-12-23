const express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  let userID = req.session.user;
  console.log("--------------------" + userID + "--------------------");

  res.render("mains/home", { title: "Express", userID: userID });
});
module.exports = router;
