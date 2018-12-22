const express = require("express");
var router = express.Router();
router.get("/", (req, res) => res.render("mains/sell/postSell.ejs"));

module.exports = router;
