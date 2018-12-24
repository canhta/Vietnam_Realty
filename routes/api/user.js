var express = require("express");
var router = express.Router();
var gravatar = require("gravatar");
var bcrypt = require("bcryptjs");
const authentication = require("../../middlewares/Authentication");
//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Profile = require("../../models/Profile");
//@route  GET api/users/
//@desc   Test users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// //@route  GET api/users/register
// //@desc   register route
// //@access Public
router.get("/register", (req, res, next) => {
  res.render("authentication/register", { errors: {}, info: {}, head : req.session.user });
});
// router.get("/register", (req, res, next) => res.json({ msg: "GET works" }));
// // @route   GET api/users/register
// // @desc    Register user
// // @access  Public
router.post("/register", (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  var info = {
    name: req.body.name,
    email: req.body.email
  };

  // Check Validation
  if (!isValid) {
    return res.render("authentication/register", {
      errors: errors,
      info: info,
      head : req.session.user
    });
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.emailExist = "Email already exists";
      return res.render("authentication/register", {
        errors: errors,
        info: info, 
        head : req.session.user
      });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) next(err);
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const newProfile = new Profile({
                user: user.id
              });
              newProfile.save().then(profile => {
                //User matched
                req.session.user = user.id;
                req.session.role = user.role;
                return res.render("mains/user/profile", { profile: profile, head : req.session.user});
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route   GET api/users/login
// @desc    Login User / Returning JWT token
// @access  Public
router.get("/login", (req, res, next) => {
  res.render("authentication/login", { errors: {}, info: {}, head : req.session.user});
});
router.post("/login", (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  var info = {
    email: email
  };
  //Find User by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.incorrect = "Tài khoản hoặc mật khẩu không chính xác";
      return res.render("authentication/login", { errors: errors, info: info, head : req.session.user });
    }
    //Check password
    bcrypt.compare(password, user.password, (err, same) => {
      if (err) {
        errors.incorrect = "Một số thứ bị lỗi";
        return res.render("authentication/login", {
          errors: errors,
          info: info
        });
      }
      if (!same) {
        errors.incorrect = "Tài khoản hoặc mật khẩu không chính xác!";
        return res.render("authentication/login", {
          errors: errors,
          info: info,
          head : req.session.user
        });
      }
      //User matched
      req.session.user = user.id;
      req.session.role = user.role;
      res.redirect("/");
    });
  });
});

// @route   GET api/users/current
// @desc    Return Current user
// @access  Private
router.get("/current", authentication.MEMBER, (req, res) => {
  User.findById(req.session.user).then(user =>
    res.send({ user: user.name, role: user.role, id: user.id })
  );
});
// GET /logout
router.get("/logout", authentication.MEMBER, (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/");
      }
    });
  }
});
module.exports = router;
		