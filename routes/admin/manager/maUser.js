var express = require("express");
var router = express.Router();
const User = require("../../../models/User");
const Profile = require("../../../models/Profile");
router.get("/all", (req, res, next) => {
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
router.get("/:id", (req, res, next) => {
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
//@route  DELETE admin/manager/:id
//@desc   DELETE find by id
//@access Public
router.delete("/:id", (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(find => res.json({ success: true }))
    .catch(err => {
      res.status(404).json({ noFindFound: "Not finsd post found" });
    });
});
module.exports = router;
