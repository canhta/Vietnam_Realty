const express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/", (req, res, next) => {
  console.log("Hello HOME");
  return res.render("mains/home", { title: "HOME" });
});

module.exports = router;
