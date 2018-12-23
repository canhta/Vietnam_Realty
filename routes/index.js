const express = require("express");
var router = express.Router();
router.get("/", (req, res) => res.render("mains/find/postFind.ejs"));


router.get("/test", (req, res) => res.render("mains/sell/detailSell"));


/* GET home page. */
router.get("/", (req, res, next) => {
  console.log("Hello HOME");
  return res.render("mains/home", { title: "HOME" });
});

module.exports = router;
