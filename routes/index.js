const express = require("express");
var router = express.Router();
router.get("/", (req, res) => res.render("mains/sell/postSell.ejs"));


router.get("/test", (req, res) => res.render("mains/sell/detailSell"));

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("mains/sell/postSell", { title: "Express" });
});


module.exports = router;
