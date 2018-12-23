const express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  res.render("mains/user/editProfile", { title: "Express" });

});
router.get("/post", function(req, res){
  res.render("mains/find/postFind");
})

module.exports = router;
