var express = require("express");
var router = express.Router();
const passport = require("passport");

const Buy = require("../../models/Buy");
const Sell = require("../../models/Sell");
const Schedule = require("../../models/Schedule");
//middleware
const roleMiddleware = require("../../middlewares/roleMiddleware");

const validateScheduleInput = require("../../validation/schedule");

//@route  GET admin/schedule/schebuys/test
//@desc   Test buys route
//@access Public
router.get(
  "/test",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res) => res.json({ msg: "Buys schedule works" })
);
//@route  GET admin/schedule/sells
//@desc   Get all sells
//@access Public
router.get(
  "/sells",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
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
  }
);
//@route  GET admin/schedule/buys
//@desc   Get all buys
//@access Public
router.get(
  "/buys",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    Buy.find()
      .sort({ date: -1 })
      .then(buy => {
        // if (sell.length === 0) {
        //   res.status(404).json({ noSellPost: "No Sell posts found." });
        // }
        res.json(buy);
      })
      .catch(err =>
        res.status(404).json({ noBuyFounds: "No buy posts found." })
      );
  }
);
//@route  GET admin/schedule/buy/:id
//@desc   Get buyschedule by id
//@access Public
router.get(
  "/buy/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    Buy.findById(req.params.id)
      .then(buy => res.json(buy))
      .catch(err =>
        res.status(404).json({ noBuyFound: "No buy post for this ID." })
      );
  }
);
//@route  GET admin/schedule/sells
//@desc   Get all sells
//@access Public
router.get(
  "/schebuys",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    Schedule.find()
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
    Schedule.findById(req.params.id)
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
  "/schebuy/:_id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    console.log("work");
    Buy.findById(req.params._id).then(buy => {
      console.log(buy);
      const { errors, isValid } = validateScheduleInput(req.body);
      // Check Validation
      if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
      }
      const newScheduleBuy = {
        buy: buy.id,
        from: req.body.from,
        to: req.body.to,
        state: req.body.state,
        cardCash: {
          menhGia: req.body.menhGia,
          idCard: req.body.idCard
        }
      };
      Schedule.findOne({ buy: buy.id }).then(buysche => {
        if (buysche) {
          Schedule.findOneAndUpdate(
            { $set: newScheduleBuy },
            { new: true }
          ).then(buysche => res.json(buysche));
        } else {
          new Schedule(newScheduleBuy)
            .save()
            .then(buysche => res.json(buysche));
        }
      });
    });
  }
);
//@route  GET admin/schedule/schebuy/:id
//@desc   Get buy by id
//@access Public
router.delete(
  "/schebuy/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    Schedule.findById(req.params.id)
      .then(buy => {
        //Delete
        Schedule.remove().then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => {
        res.status(404).json({ noBuyFound: "Not buy post found" });
      });
  }
);
module.exports = router;
