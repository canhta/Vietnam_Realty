const express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  res.render("mains/home", { title: "Express" });

});

module.exports = router;
