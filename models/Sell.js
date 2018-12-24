const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const SellSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
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
  adress: [
    {
      diachi: {
        type: String,
        required: true
      },
      thanhPho: {
        type: String,
        required: true
      },
      quan: {
        type: String,
        required: true
      }
    }
  ],
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
  cost: [
    {
      gia: {
        type: Number,
        required: true,
        default: 0
      },
      donVi: {
        type: String,
        required: true
      }
    }
  ],
  imageURL: [
    {
      image: {
        type: String
      }
    }
  ],
  state: {
    type: String,
    required: true,
    enum: ["NEW", "STORAGE", "POSTED"],
    default: "NEW"
  },
  timePost: [
    {
      fromPost: {
        type: Date,
        default: Date.now()
      },
      toPost: {
        type: Date,
        default: Date.now()
      }
    }
  ],
  cardCash: {
    menhGia: {
      type: Number,
      required: true
    },
    idCard: {
      type: Number,
      required: true
    }
  }
});
module.exports = mongoose.model("sells", SellSchema);
SellSchema.pre("save", function(next) {
  this.timePost.fromPost = moment(this.timePost.fromPost).format(
    "MMMM DD,YYYY"
  );
  this.timePost.toPost = moment(this.timePost.toPost).format("MMMM DD,YYYY");
  next();
});
