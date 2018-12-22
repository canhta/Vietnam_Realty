var express = require("express");
var router = express.Router();

const Sell = require("../../models/Sell");
const Profile = require("../../models/Profile");
//middleware
const validateSellInput = require("../../validation/sell");

//@route  GET api/sells/test
//@desc   Test sells route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Sells works" }));
module.exports = router;

//@route  GET api/sells/all
//@desc   Get all sells
//@access Public
router.get("/all", (req, res, next) => {
  Sell.find(
    { state: "POSTED" },
    "hinhThuc loai diachi dienTich chiTiet gia timePost"
  ) //cần sua thanh sate
    // .map(val => val)
    .then(sell => {
      res.json(sell);
    })
    .catch(err =>
      res.status(404).json({ noSellFounds: "No sell posts found." })
    );
});
//@route  GET api/sells
//@desc   Get filter sells
//@access Public
router.get("/", (req, res, next) => {
  let _query = {
    diachi: req.query.diachi,
    loai: req.query.loai,
    gia: parseInt(req.query.gia),
    dienTich: parseInt(req.query.dienTich)
  };
  console.log(_query);

  Sell.find()
    .where("state")
    .equals("POSTED")
    .where("diachi")
    .equals(_query.diachi)
    .where("loai")
    .equals(_query.loai)
    // .where("from")
    // .gte(_query.gia)
    // .where("dienTich")
    // .equals(_query.dienTich())
    // .sort({ dienTich: -1 })
    .select("loai diachi dienTich chiTiet gia timePost")
    .then(sell => {
      console.log(sell.state);
      console.log("-------------------All----------------");
      res.json(sell);
    })
    .catch(err =>
      res.status(404).json({ noSellFounds: "No sellS posts found." })
    );
});
//@route  GET api/sells/:id
//@desc   Get sell by id
//@access Public
router.get("/:id", (req, res, next) => {
  Sell.findById(req.params.id)
    .then(sell => res.json(sell))
    .catch(err =>
      res.status(404).json({ noSellFound: "No sell post for this ID." })
    );
});

//@route  POST api/sells/
//@desc   Create sells route
//@access Private
router.post("/", (req, res, next) => {
  const { errors, isValid } = validateSellInput(req.body);

  // Check Validation
  if (!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }
  const newSell = new Sell({
    user: req.user.id,
    avatar: req.body.avatar,
    hinhThuc: req.body.hinhThuc,
    loai: req.body.loai,
    diachi: req.body.diachi,
    dienTich: req.body.dienTich,

    chiTiet: {
      matTien: req.body.matTien,
      duongVao: req.body.duongVao,
      huongNha: req.body.huongNha,
      huongBanCong: req.body.huongBanCong,
      soTang: req.body.soTang,
      soPhongNgu: req.body.soPhongNgu,
      soToilet: req.body.soToilet,
      noiThat: req.body.noiThat
    },
    gia: req.body.gia,
    noiThat: {
      image: req.body.image
    },
    moTa: req.body.moTa
  });
  newSell.save().then(sell => res.json(sell));
});
//@route  GET api/sells/:id
//@desc   Get sell by id
//@access Public
router.delete("/:id", (req, res, next) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Sell.findById(req.params.id)
      .then(sell => {
        //Check for sell owner
        if (sell.user.toString() !== req.user.id) {
          return res.status(401).json({ notauthorrzed: "User not Authorized" });
        }
        //Delete
        sell.remove().then(() => {
          res.json({ success: true });
        });
      })
      .catch(err => {
        res.status(404).json({ noSellFound: "Not sell post found" });
      });
  });
});
module.exports = router;
