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
//@route  GET api/users/
//@desc   Test users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));

// //@route  GET api/users/register
// //@desc   register route
// //@access Public
// router.get("/register", (req, res, next) => res.json({ msg: "GET works" }));
// // @route   GET api/users/register
// // @desc    Register user
// // @access  Public
router.post("/register", (req, res, next) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
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
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
// @route   GET api/users/login
// @desc    Login User / Returning JWT token
// @access  Public
router.post("/login", (req, res, next) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  //Find User by email
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Email not found!";
      return res.status(404).json({ errors });
    }
    //Check password
    bcrypt.compare(password, user.password, (err, same) => {
      if (err) {
        errors.password = "Some Errors!";
        return res.status(404).json({ errors });
      }
      if (!same) {
        errors.password = "Password incorrect!";
        return res.status(400).json({ errors });
      }
      //User matched
      req.session.user = user.id;
      req.session.role = user.role;
      res.redirect("/api/users/current");
    });
  });
});

// @route   GET api/users/current
// @desc    Return Current user
// @access  Private
router.get("/current", (req, res) => {
  User.findById(req.session.user).then(user =>
    res.send({ user: user.name, role: user.role, id: user.id })
  );
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout success!");
});
module.exports = router;
