const express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  res.render("mains/home", { title: "Express" });

});
router.get("/post", function(req, res){
  res.render("mains/find/postFind");
})
router.get("/abc", (req, res) => res.render("mains/user/profile"))
module.exports = router;
