const express = require("express");
var router = express.Router();
router.get("/", (req, res) => res.render("mains/home"));

router.get("/test", (req, res) => res.render("mains/sell/postSell"));

module.exports = router;
