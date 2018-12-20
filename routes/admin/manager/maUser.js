var express = require("express");
var router = express.Router();
var passport = require("passport");
const roleMiddleware = require("../../../middlewares/roleMiddleware");
router.get("/test", (req, res) => res.json({ msg: "test works" }));
const User = require("../../../models/User");
//@route  GET admin/manager
//@desc   Get all finds
//@access Public
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    User.find({ role: "Member" })
      .select("role name email avatar")
      .sort({ name: -1 })
      // .sort({ date: -1 })
      .then(find => {
        // if (find.length === 0) {
        //   res.status(404).json({ noFindPost: "No find posts found." });
        // }
        res.json(find);
      })
      .catch(err =>
        res.status(404).json({ noFindFounds: "No find posts found." })
      );
  }
);
//@route  GET admin/manager
//@desc   Get all finds
//@access Public
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
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
  }
);
//@route  DELETE admin/manager/:id
//@desc   DELETE find by id
//@access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  roleMiddleware.requiredADMIN,
  (req, res, next) => {
    User.findByIdAndRemove(req.params.id)
      .then(find => res.json({ success: true }))
      .catch(err => {
        res.status(404).json({ noFindFound: "Not finsd post found" });
      });
  }
);
module.exports = router;
