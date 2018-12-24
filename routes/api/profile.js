var express = require("express");
var router = express.Router();

//Load input validation
const validateProfileInput = require("../../validation/profile");
//Load profile and user Model
var Profile = require("../../models/Profile");
var User = require("../../models/User");
const Authentication = require("../../middlewares/Authentication");
//@route  GET api/profile/test
//@desc   Test profile route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//@route  GET api/profiles
//@desc   Get current users profile
//@access Private
router.get("/current", Authentication.MEMBER, (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.session.user })
    .populate("users", { name, email, avatar })
    .then(profile => {
      var user = {
        name: profile.user.name,
        email: profile.user.email,
        avatar: profile.user.avatar
      };
      // console.log(profile.user.name);
      // if (!profile) {
      //   return res.render("mains/user/editProfile");
      // }
      return res.render("mains/user/profile", { profile: profile, user: user });
    })
    .catch(err => res.status(404).json(err));
});
//@route  POST api/profile
//@desc   Create user profile
//@access Private
router.post("/", (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  // Get fields
  const profileFields = {};
  profileFields.user = req.session.user;
  if (req.body.dateOfBirth) profileFields.dateOfBirth = req.body.dateOfBirth;
  if (req.body.gender) profileFields.gender = req.body.gender;
  if (req.body.phone) profileFields.phone = req.body.phone;
  // Adress
  profileFields.social = {};
  if (req.body.city) profileFields.adress.city = req.body.city;
  if (req.body.district) profileFields.adress.district = req.body.district;
  if (req.body.commnune) profileFields.adress.commnune = req.body.commnune;

  Profile.findOne({ user: req.session.user }).then(profile => {
    if (profile) {
      //Update
      Profile.findOneAndUpdate(
        { user: req.session.id },
        { $set: profileFields },
        { new: true }
      )
        .then(profile => res.json(profile))
        .catch(err => res.json("USER: " + req.session.id + "::" + err));
    } else {
      // Create

      // Check if phone exists
      Profile.findOne({ phone: profileFields.phone }).then(profile => {
        if (profile) {
          errors.phone = "That phone number already exists";
          res.status(400).json(errors);
        }

        // Save Profile
        new Profile(profileFields).save().then(profile => {
          return res.render("/api/profile", { profile });
        });
      });
    }
  });
});

//@route  POST api/profile/user/:user_id
//@desc   Get profile by user id
//@access Public
// router.get("/user/:user_id", (req, res, next) => {
//   Profile.findOne({ user: req.params.user_id })
//     .populate("user", ["fullname", "avatar"])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = "There is no profile for this user";
//         res.status(404).json(errors);
//       }
//       res.json(profile);
//     })
//     .catch(err =>
//       res.status(404).json({ profile: "There is no profile for this user" })
//     );
// });

//@route  POST api/profile/all
//@desc   Get all profiles
//@access Public
router.get("/all", (req, res, next) => {
  const errors = {};
  Profile.find()
    .populate("user", ["fullname", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There is no profiles";
        res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});
// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete("/", (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => {
      res.json({ success: true });
    });
  });
});
module.exports = router;
