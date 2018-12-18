var express = require("express");
var router = express.Router();
const passport = require("passport");

const Buy = require("../../models/Buy");
const Profile = require("../../models/Profile");

const validateBuyInput = require("../../validation/buy");

//@route  GET api/buys/test
//@desc   Test buys route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Buys works" }));
module.exports = router;

//@route  GET api/buys
//@desc   Get all buys
//@access Public
router.get("/", (req, res, next) => {
  Buy.find()
    .sort({ date: -1 })
    .then(buy => {
      // if (buy.length === 0) {
      //   res.status(404).json({ noBuyPost: "No buy posts found." });
      // }
      res.json(buy);
    })
    .catch(err => res.status(404).json({ noBuyFounds: "No buy posts found." }));
});

//@route  GET api/buys/:id
//@desc   Get buy by id
//@access Public
router.get("/:id", (req, res, next) => {
  Buy.findById(req.params.id)
    .then(buy => res.json(buy))
    .catch(err =>
      res.status(404).json({ noBuyFound: "No buy post for this ID." })
    );
});

//@route  POST api/buys/
//@desc   Create buys route
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateBuyInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newBuy = new Buy({
      user: req.user.id,
      avatar: req.body.avatar,
      hinhThuc: req.body.hinhThuc,
      loai: req.body.loai,
      diachi: req.body.diachi,
      dienTich: req.body.dienTich,
      chiTiet: {
        title: req.body.title,
        noiDung: req.body.noiDung
      },
      gia: {
        from: req.body.from,
        to: req.body.to
      }
    });
    newBuy.save().then(buy => res.json(buy));
  }
);
//@route  GET api/buys/:id
//@desc   Get buy by id
//@access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Buy.findById(req.params.id)
        .then(buy => {
          //Check for buy owner
          if (buy.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorrzed: "User not Authorized" });
          }
          //Delete
          Buy.remove().then(() => {
            res.json({ success: true });
          });
        })
        .catch(err => {
          res.status(404).json({ noBuyFound: "Not buy post found" });
        });
    });
  }
);
module.exports = router;
