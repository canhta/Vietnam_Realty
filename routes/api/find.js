var express = require("express");
var router = express.Router();
const Find = require("../../models/Find");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Authentication = require("../../middlewares/Authentication");
const validateFindInput = require("../../validation/find");
const State = require("../../constants/state");
//@route  GET api/finds/test
//@desc   Test finds route
//@access Public
router.get("/test", (req, res) => res.json("test FIND"));

//@route  GET api/finds
//@desc   Get all finds
//@access Public
router.get("/all", (req, res, next) => {
  Find.find({ state: State.POSTED }) //cần sửa thành POSTED
    // .map(val => val)
    .then(find => {
      return res.render("mains/find/listFind", {
        finds: find,
        title: "ALL FIND",
        total: find.length,
        head: req.session.user
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
    .then(find => {
      Profile.findOne({ user: sell.user })
        .populate("user")
        .then(profile => {
          return res.render("mains/find/detailFind", {
            title: "DETAIL FIND",
            find: find,
            head: req.session.user,
            profile: profile
          });
        });
    })
    .catch(err =>
      res.status(404).json({ noFindFound: "No find post for this ID." })
    );
});
router.get("/", Authentication.MEMBER, (req, res, next) =>
  res.render("mains/find/postFind", {
    title: "POST FIND",
    head: req.session.user,
    errors: {},
    info: {}
  })
);
//@route  POST api/finds/
//@desc   Create finds route
//@access Private
router.post("/", Authentication.MEMBER, (req, res, next) => {
  // console.log("comhere");
  const { errors, isValid } = validateFindInput(req.body);
  User.findById(req.session.user).then(user =>
    console.log(`this is session user: ${user}`)
  );
  var info = {
    hinhThuc: req.body.hinhThuc,
    loai: req.body.loai,
    adress: {
      thanhPho: req.body.thanhPho,
      quan: req.body.quan
    },
    dienTich: {
      fromDienTich: req.body.fromDienTich,
      toDienTich: req.body.toDienTich
    },
    cost: {
      fromCost: req.body.fromCost,
      toCost: req.body.toCost,
      donVi: req.body.donVi
    },
    timePost: {
      fromPost: req.body.fromPost,
      toPost: req.body.toPost
    },
    cardCash: {
      menhGia: req.body.menhGia,
      idCard: req.body.idCard
    }
  };
  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    //res.render("mains/find/postFind", { title: "POST FIND", head : req.session.user, errors : {}, info :{} })
    return res.render("mains/find/postFind", {
      head: req.session.user,
      errors: errors,
      info: info
    });
  }
  const newFind = new Find({
    user: req.session.user,
    hinhThuc: req.body.hinhThuc,
    loai: req.body.loai,
    adress: {
      thanhPho: req.body.thanhPho,
      quan: req.body.quan
    },
    dienTich: {
      fromDienTich: req.body.fromDienTich,
      toDienTich: req.body.toDienTich
    },
    cost: {
      fromCost: req.body.fromCost,
      toCost: req.body.toCost,
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
  newFind.save().then(
    find =>
      res.render("mains/find/detailFind", {
        find: find,
        title: "POST FIND",
        head: req.session.user
      })
    //res.json(find)
  );
});
//@route  GET api/finds/:id
//@desc   Get find by id
//@access Public
router.delete("/:id", Authentication.MEMBER, (req, res, next) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Find.findById(req.params.id)
      .then(find => {
        //Check for find owner
        if (find.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorrzed: "User not Authorized" });
        }
        //Delete
        Find.remove().then(() => {
          res.render("mains/find/listFind", {
            find: find,
            head: req.session.user
          });
        });
      })
      .catch(err => {
        res.status(404).json({ noFindFound: "Not find post found" });
      });
  });
});
module.exports = router;
