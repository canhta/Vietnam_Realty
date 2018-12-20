var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const isEmpty = require("../../validation/is-empty");
const Find = require("../../models/Find");
const Profile = require("../../models/Profile");

const validateFindInput = require("../../validation/find");

//@route  GET api/finds/test
//@desc   Test finds route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Finds works" }));
module.exports = router;

//@route  GET api/finds
//@desc   Get all finds
//@access Public
router.get("/", (req, res, next) => {
  Find.find() //cần sua thanh sate
    // .map(val => val)
    .then(find => {
      let value = find.filter(val => {
        return val.state === req.query.state;
      });
      console.log(value.length);

      res.json(value);
    })
    .catch(err =>
      res.status(404).json({ noFindFounds: "No find posts found." })
    );
});

//@route  GET api/finds/:id
//@desc   Get find by id
//@access Public
router.get("/:id", (req, res, next) => {
  Find.findById(req.params.id)
    .then(find => res.json(find))
    .catch(err =>
      res.status(404).json({ noFindFound: "No find post for this ID." })
    );
});

//@route  POST api/finds/
//@desc   Create finds route
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validateFindInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newFind = new Find({
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
      },
      state: "NEW",
      timePost: {
        fromPost: req.body.fromPost,
        toPost: req.body.toPost
      },
      cardCash: {
        menhGia: req.body.menhGia,
        idCard: req.body.idCard
      }
    });
    newFind.save().then(find => res.json(find));
  }
);
//@route  GET api/finds/:id
//@desc   Get find by id
//@access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Find.findById(req.params.id)
        .then(find => {
          //Check for find owner
          if (find.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorrzed: "User not Authorized" });
          }
          //Delete
          Find.remove().then(() => {
            res.json({ success: true });
          });
        })
        .catch(err => {
          res.status(404).json({ noFindFound: "Not find post found" });
        });
    });
  }
);
module.exports = router;
