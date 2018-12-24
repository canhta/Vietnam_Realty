const express = require("express");
var router = express.Router();

/* GET home page. */

router.get("/", function(req, res, next) {
  let userID = req.session.user;
  console.log("--------------------" + userID + "--------------------");

  res.render("mains/home", { title: "Express", userID: userID });
});
router.get("/login",function(req,res){
  res.render("authentication/login")
})
router.get("/register",function(req,res){
  res.render("authentication/register")
})
module.exports = router;
