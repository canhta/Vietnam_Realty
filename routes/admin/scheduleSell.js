var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Sell = require("../../models/Sell");
const ScheSell = require("../../models/ScheSell");
//middleware
const roleMiddleware = require("../../middlewares/roleMiddleware");

const validateScheduleInput = require("../../validation/schedule");

//@route  GET admin/schedule/schesells/test
//@desc   Test sells route
//@access Public
router.get(
  "/schesells/test",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res) => res.json({ msg: "Sells  schedule works" })
);
//@route  GET api/schesells
//@desc   Get all sells
//@access Public
router.get("/check/schesells", (req, res, next) => {
  Sell.find()
    .sort({ date: -1 })
    .then(sell => {
      // if (sell.length === 0) {
      //   res.status(404).json({ noSellPost: "No Sell posts found." });
      // }
      res.json(sell);
    })
    .catch(err =>
      res.status(404).json({ noSellFounds: "No sell posts found." })
    );
});
router.get(
  "/schesells",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    ScheSell.find()
      // .sort({ date: -1 })
      .then(sell => {
        // if (sell.length === 0) {
        //   res.status(404).json({ noSellPost: "No sell posts found." });
        // }
        res.json(sell);
      })
      .catch(err =>
        res.status(404).json({ noSellFounds: "No sell schedule posts found." })
      );
  }
);

//@route  GET admin/schedule/schesell/:id
//@desc   Get sellschedule by id
//@access Public
router.get(
  "/schesell/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    ScheSell.findById(req.params.id)
      .then(sell => res.json(sell))
      .catch(err =>
        res
          .status(404)
          .json({ noSellFound: "No sell schedule post for this ID." })
      );
  }
);

//@route  POST admin/schedule/schesells/
//@desc   Create sells route
//@access Private
router.post(
  "/schesells",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    const { errors, isValid } = validateScheduleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newSellSchedule = new ScheSell({
      sell: req.user.id,
      from: req.body.from,
      to: req.body.to,
      state: req.body.state,
      cardCash: {
        menhGia: req.body.menhGia,
        idCard: req.body.idCard
      }
    });
    newSellSchedule.save().then(sell => res.json(sell));
  }
);
//@route  GET admin/schedule/schesells/:id
//@desc   Get sell by id
//@access Public
router.delete(
  "/schesell/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    ScheSell.findById(req.params.id)
      .then(sell => {
        //Delete
        ScheSell.remove().then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => {
        res.status(404).json({ noSellFound: "Not sell post found" });
      });
  }
);
module.exports = router;
