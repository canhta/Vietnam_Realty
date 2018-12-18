const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const BuySchema = new Schema({
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
  ]
});
module.exports = mongoose.model("buy", BuySchema);
