var express = require("express");
var router = express.Router();
const Find = require("../../../models/Find");
const User = require("../../../models/User");
const Authentication = require("../../../middlewares/Authentication");
router.get("/all", Authentication.ADMIN, (req, res, next) => {
  Find.find()
    .populate("user")
    .then(find => {
      return res.render("admin/listFind", {
        finds: find,
        total: find.length
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
  Find.findById(req.params.id)
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
const STATE = require("../../../constants/state");
//@route  DELETE admin/manager/:id
//@desc   DELETE find by id
//@access Public
router.post("/delete/:id", Authentication.ADMIN, (req, res, next) => {
  Find.findByIdAndRemove(req.params.id).then(() => {
    return res.redirect("/admin/schedule/finds/all");
  });
});
router.post("/new/:id", Authentication.ADMIN, (req, res, next) => {
  //Update
  Find.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { state: STATE.NEW } },
    { new: true }
  ).then(() => res.redirect("/admin/schedule/finds/all"));
});
router.post("/storage/:id", Authentication.ADMIN, (req, res, next) => {
  //Update
  Find.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { state: STATE.STORAGE } },
    { new: true }
  ).then(() => res.redirect("/admin/schedule/finds/all"));
});
router.post("/post/:id", Authentication.ADMIN, (req, res, next) => {
  //Update
  Find.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { state: STATE.POSTED } },
    { new: true }
  ).then(() => res.redirect("/admin/schedule/finds/all"));
});
module.exports = router;
