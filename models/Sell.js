const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const SellSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  hinhThuc: {
    type: String,
    required: true,
    enum: ["sell", "rent"]
  },
  loai: {
    type: String,
    required: true
  },
  diachi: {
    type: String,
    required: true
  },
  dienTich: {
    type: Number,
    required: true
  },
  chiTiet: [
    {
      matTien: {
        type: String
      },
      duongVao: {
        type: String
      },
      huongNha: {
        type: String
      },
      huongBanCong: {
        type: String
      },
      soTang: {
        type: Number,
        default: 0
      },
      soPhongNgu: {
        type: Number,
        default: 0
      },
      soToilet: {
        type: Number,
        default: 0
      },
      noiThat: {
        type: String
      }
    }
  ],
  moTa: {
    type: String
  },
  gia: {
    type: Number,
    required: true,
    default: 0
  },
  imageURL: [
    {
      image: {
        type: String
      }
    }
  ]
});
module.exports = mongoose.model("sells", SellSchema);
