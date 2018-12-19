const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const FindSchema = new Schema({
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
    type: String,
    required: true
  },
  chiTiet: [
    {
      title: {
        type: String,
        required: true
      },
      noiDung: {
        type: String,
        required: true
      }
    }
  ],
  gia: [
    {
      from: {
        type: Number,
        default: 0
      },
      to: {
        type: Number,
        default: 0
      }
    }
  ],
  state: {
    type: String,
    required: true,
    enum: ["NEW", "READY", "POSTED", "EXPIRED"],
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
module.exports = mongoose.model("finds", FindSchema);
