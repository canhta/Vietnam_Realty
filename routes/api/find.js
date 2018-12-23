var express = require("express");
var router = express.Router();
const Find = require("../../models/Find");
const Profile = require("../../models/Profile");

const validateFindInput = require("../../validation/find");
//@route  GET api/finds/test
//@desc   Test finds route
//@access Public
router.get("/test", (req, res) => res.json("test FIND"));

//@route  GET api/finds
//@desc   Get all finds
//@access Public
router.get("/all", (req, res, next) => {
  Find.find({ state: "NEW" }) //cần sửa thành POSTED
    // .map(val => val)
    .then(find => {
      console.log(find);

      return res.render("mains/find/listFind", {
        finds: find,
        title: "ALL FIND",
        total: find.length
      });
    })
    .catch(err =>
      res.status(404).json({ noSellFounds: "No find posts found." })
    );
});
//@route  GET api/finds
//@desc   Get filter finds
//@access Public
// router.get("/", (req, res, next) => {
//   let _query = {
//     diachi: req.query.diachi,
//     loai: req.query.loai,
//     gia: parseInt(req.query.gia),
//     dienTich: parseInt(req.query.dienTich)
//   };
//   console.log(_query);

//   Find.find()
//     .where("state")
//     .equals("POSTED")
//     .where("diachi")
//     .equals(_query.diachi)
//     .where("loai")
//     .equals(_query.loai)
//     // .where("from")
//     // .gte(_query.gia)
//     // .where("dienTich")
//     // .equals(_query.dienTich())
//     // .sort({ dienTich: -1 })
//     .select("loai diachi dienTich chiTiet gia timePost")
//     .then(find => {
//       console.log("--------All query----------------");
//       // res.json(find);
//       return res.render("mains/find/listFind", { find: find });
//     })
//     .catch(err =>
//       res.status(404).json({ noFindFounds: "No find posts found." })
//     );
// });
//@route  GET api/finds/:id
//@desc   Get find by id
//@access Public
router.get("/:id", (req, res, next) => {
  Find.findById(req.params.id)
    .then(find => res.render("mains/find/detailFind", { find: find }))
    .catch(err =>
      res.status(404).json({ noFindFound: "No find post for this ID." })
    );
});
router.get("/", (req, res, next) =>
  res.render("mains/find/postFind", { title: "POST FIND" })
);
//@route  POST api/finds/
//@desc   Create finds route
//@access Private
router.post("/", (req, res, next) => {
  const { errors, isValid } = validateFindInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  const newFind = new Find({
    user: req.session.id,
    hinhThuc: req.body.hinhThuc,
    loai: req.body.loai,
    adress: {
      diachi: req.body.diachi,
      thanhPho: req.body.thanhPho,
      quan: req.body.quan
    },
    dienTich: req.body.dienTich,
    chiTiet: {
      title: req.body.title,
      noiDung: req.body.noiDung
    },
    cost: {
      from: req.body.from,
      to: req.body.to,
      donVi: req.body.donVi
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
  newFind
    .save()
    .then(find =>
      res.render("mains/find/listFind", { find: find, title: "POST FIND" })
    );
});
//@route  GET api/finds/:id
//@desc   Get find by id
//@access Public
router.delete("/:id", (req, res, next) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Find.findById(req.params.id)
      .then(find => {
        //Check for find owner
        if (find.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorrzed: "User not Authorized" });
        }
        //Delete
        Find.remove().then(() => {
          res.render("mains/find/listFind", { find: find });
        });
      })
      .catch(err => {
        res.status(404).json({ noFindFound: "Not find post found" });
      });
  });
});
module.exports = router;
