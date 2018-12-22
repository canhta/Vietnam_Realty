const express = require("express");
var router = express.Router();
router.get("/index", (req, res) => res.render("mains/home"));

module.exports = router;
