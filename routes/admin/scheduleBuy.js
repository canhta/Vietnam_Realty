var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Buy = require("../../models/Buy");
const ScheBuy = require("../../models/ScheBuy");
//middleware
const roleMiddleware = require("../../middlewares/roleMiddleware");

const validateScheduleInput = require("../../validation/schedule");

//@route  GET admin/schedule/schebuys/test
//@desc   Test buys route
//@access Public
router.get(
  "/schebuys/test",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res) => res.json({ msg: "Buys  schedule works" })
);
//@route  GET admin/schedule/check/sells
//@desc   Get all sells
//@access Public
router.get("/check/schebuys", (req, res, next) => {
  Buy.find()
    .sort({ date: -1 })
    .then(buy => {
      // if (sell.length === 0) {
      //   res.status(404).json({ noSellPost: "No Sell posts found." });
      // }
      res.json(buy);
    })
    .catch(err =>
      res.status(404).json({ noSellFounds: "No sell posts found." })
    );
});
//@route  GET admin/schedule/sells
//@desc   Get all sells
//@access Public
router.get(
  "/schebuys",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    ScheBuy.find()
      // .sort({ date: -1 })
      .then(buy => {
        // if (buy.length === 0) {
        //   res.status(404).json({ noBuyPost: "No buy posts found." });
        // }
        res.json(buy);
      })
      .catch(err =>
        res.status(404).json({ noBuyFounds: "No buy schedule posts found." })
      );
  }
);

//@route  GET admin/schedule/buy/:id
//@desc   Get buyschedule by id
//@access Public
router.get(
  "/schebuy/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    ScheBuy.findById(req.params.id)
      .then(buy => res.json(buy))
      .catch(err =>
        res
          .status(404)
          .json({ noBuyFound: "No buy schedule post for this ID." })
      );
  }
);

//@route  POST admin/schedule/schebuys/
//@desc   Create buys route
//@access Private
router.post(
  "/schebuys",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    const { errors, isValid } = validateScheduleInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newBuySchedule = new ScheBuy({
      buy: req.user.id,
      from: req.body.from,
      to: req.body.to,
      state: req.body.state,
      cardCash: {
        menhGia: req.body.menhGia,
        idCard: req.body.idCard
      }
    });
    newBuySchedule.save().then(buy => res.json(buy));
  }
);
//@route  GET admin/schedule/schebuys/:id
//@desc   Get buy by id
//@access Public
router.delete(
  "/schebuy/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    ScheBuy.findById(req.params.id)
      .then(buy => {
        //Delete
        ScheBuy.remove().then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => {
        res.status(404).json({ noBuyFound: "Not buy post found" });
      });
  }
);
module.exports = router;
