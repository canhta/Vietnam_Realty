const express = require("express");
var router = express.Router();

router.get("/", (req, res) => res.render("mains/home.ejs"));


router.get("/test", (req, res) => res.render("mains/sell/detailSell"));



/* GET home page. */

router.get("/", function(req, res, next) {
  let userID = req.session.user;
  console.log("--------------------" + userID + "--------------------");

  res.render("mains/home", { title: "Express", userID: userID });
});
module.exports = router;
