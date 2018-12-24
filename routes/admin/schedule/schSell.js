var express = require("express");
var router = express.Router();
const Sell = require("../../../models/Sell");
const User = require("../../../models/User");
const Authentication = require("../../../middlewares/Authentication");
router.get("/all", Authentication.ADMIN, (req, res, next) => {
  Sell.find()
    .populate("user")
    .then(sell => {
      return res.render("admin/listSell", {
        sells: sell,
        total: sell.length
      });
    })
    .catch(err =>
      res.status(404).json({ noFindFounds: "No find posts found." })
    );
});

//@route  GET admin/manager
//@desc   Get all finds
//@access Public
router.get("/:id", Authentication.ADMIN, (req, res, next) => {
  Sell.findById(req.params.id)
    .then(find => {
      if (find.length === 0) {
        res.status(404).json({ noFindPost: "No find post found." });
      }
      res.json(find);
    })
    .catch(err =>
      res.status(404).json({ noFindFounds: "No find posts found." })
    );
});
//@route  DELETE admin/manager/:id
//@desc   DELETE find by id
//@access Public
router.post("/delete/:id", Authentication.ADMIN, (req, res, next) => {
  Sell.findByIdAndRemove(req.params.id).then(() => {
    return res.redirect("/admin/schedule/sells/all");
  });
});
router.get("/fix/:id", Authentication.ADMIN, (req, res, next) => {
  Sell.findOneAndUpdate(
    { id: req.params.id },
    { $set: { state: req.body.state } },
    { new: true }
  ).then(() => res.redirect("/admin/schedule/sells/all"));
});
module.exports = router;
