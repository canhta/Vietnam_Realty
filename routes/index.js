const express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  let head = req.session.user;
  console.log("--------------------" + head + "--------------------");
  res.render("mains/home", { title: "HOME", head: head });
});
router.get("/tests", function(req, res, next) {
  res.render("admin/listUser");
});
module.exports = router;
