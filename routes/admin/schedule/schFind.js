var express = require("express");
var router = express.Router();
const Find = require("../../../models/Find");
const Profile = require("../../../models/Profile");
//middleware
const isEmpty = require("../../../validation/is-empty");

//@route  GET admin/schedule/finds/test
//@desc   Test finds route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "mytest works" }));
//@route  GET admin/schedule/finds
//@desc   Get all finds
//@access Public
router.get("/all", (req, res, next) => {
  Find.find()
    // .sort({ date: -1 })
    .then(find => {
      // if (find.length === 0) {
      //   res.status(404).json({ noFindPost: "No find posts found." });
      // }
      res.json(find);
    })
    .catch(err =>
      res.status(404).json({ noFindFounds: "No find posts found." })
    );
});

//@route  GET admin/schedule/finds/:id
//@desc   Get find by id
//@access Public
router.get("/:id", (req, res, next) => {
  Find.findById(req.params.id)
    .then(find => res.json(find))
    .catch(err =>
      res.status(404).json({ noFindFound: "No find post for this ID." })
    );
});

//@route  POST admin/schedule/finds/
//@desc   Check finds route
//@access Private
router.post("/:id", (req, res, next) => {
  const _state = req.body.state;
  if (
    _state === "NEW" ||
    _state === "READY" ||
    _state === "POSTED" ||
    _state === "EXPIRED"
  ) {
    Find.findByIdAndUpdate(
      req.params.id,
      { state: _state },
      { new: true }
    ).then(value => res.json(value));
  } else return res.status(400).json({ invalid: "errors state" });
});
//@route  DELETE admin/schedule/finds/:id
//@desc   DELETE find by id
//@access Public
router.delete("/:id", (req, res, next) => {
  Find.findByIdAndRemove(req.params.id)
    .then(find => res.json({ success: true }))
    .catch(err => {
      res.status(404).json({ noFindFound: "Not find post found" });
    });
});
module.exports = router;
