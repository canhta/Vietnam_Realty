var express = require("express");
var router = express.Router();
const User = require("../../../models/User");
const Profile = require("../../../models/Profile");
const Authentication = require("../../../middlewares/Authentication");
router.get("/all", Authentication.ADMIN, (req, res, next) => {
  Profile.find()
    .populate("user")
    .then(profile => {
      return res.render("admin/listUser", {
        profiles: profile,
        total: profile.length
      });
    })
    .catch(err =>
      res.status(404).json({ noFindFounds: "No find posts found." })
    );
});

//@route  GET admin/manager
//@desc   Get all finds
//@access Public
router.get("/:id", Authentication.ADMIN, (req, res, next) => {
  User.findById(req.params.id)
    .then(find => {
      if (find.length === 0) {
        res.status(404).json({ noFindPost: "No find post found." });
      }
      res.json(find);
    })
    .catch(err =>
      res.status(404).json({ noFindFounds: "No find posts found." })
    );
});
const ROLE = require("../../../constants/roleConstrants");
//@route  GET admin/manager
//@desc   Get all finds
//@access Public
router.post("/up/:id", Authentication.ADMIN, (req, res, next) => {
  //Update
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { role: ROLE.REQUIRE_ADMIN } },
    { new: true }
  ).then(() => res.redirect("/admin/manager/all"));
});
router.post("/down/:id", Authentication.ADMIN, (req, res, next) => {
  //Update
  User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { role: ROLE.REQUIRE_MEMBER } },
    { new: true }
  ).then(() => res.redirect("/admin/manager/all"));
});
//@route  DELETE admin/manager/:id
//@desc   DELETE find by id
//@access Public
router.post("/delete/:id", Authentication.ADMIN, (req, res, next) => {
  Profile.findOneAndRemove({ user: req.params.id }).then(() => {
    User.findOneAndRemove({ _id: req.params.id }).then(() => {
      res.redirect("/admin/manager/all");
    });
  });
});

module.exports = router;
