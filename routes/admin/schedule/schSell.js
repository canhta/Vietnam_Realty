var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Sell = require("../../../models/Sell");
const Profile = require("../../../models/Profile");
//middleware
const roleMiddleware = require("../../../middlewares/roleMiddleware");
const isEmpty = require("../../../validation/is-empty");

//@route  GET admin/schedule/sells/test
//@desc   Test sells route
//@access Public
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res) => res.json({ msg: "mytest works" })
);
//@route  GET admin/schedule/sells
//@desc   Get all sells
//@access Public
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    Sell.find()
      // .sort({ date: -1 })
      .then(find => {
        // if (find.length === 0) {
        //   res.status(404).json({ noFindPost: "No find posts found." });
        // }
        res.json(find);
      })
      .catch(err =>
        res.status(404).json({ noSellFounds: "No sell posts found." })
      );
  }
);

//@route  GET admin/schedule/sells/:id
//@desc   Get sell by id
//@access Public
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    Sell.findById(req.params.id)
      .then(find => res.json(find))
      .catch(err =>
        res.status(404).json({ noSellFound: "No sell post for this ID." })
      );
  }
);

//@route  POST admin/schedule/sells/
//@desc   Check sells route
//@access Private
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
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
  }
);
//@route  DELETE admin/schedule/sells/:id
//@desc   DELETE sell by id
//@access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    Sell.findById(req.params.id)
      .then(find => {
        //Delete
        Sell.remove().then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => {
        res.status(404).json({ noFindFound: "Not find post found" });
      });
  }
);
module.exports = router;
