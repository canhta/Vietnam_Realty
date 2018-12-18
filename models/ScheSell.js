const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ScheSellSchema = new Schema({
  sell: {
    type: Schema.Types.ObjectId,
    ref: "sells"
  },
  from: {
    type: Date,
    required: true,
    default: Date.now()
  },
  to: {
    type: Date,
    required: true,
    default: Date.now()
  },
  state: {
    type: String,
    required: true,
    enum: ["READY", "POSTED", "EXPIRED"]
  },
  cardCash: {
    menhGia: {
      type: Number,
      required: true,
      default: 20000
    },
    idCard: {
      type: String,
      required: true,
      default: 0
    }
  }
});
module.exports = Schedule = mongoose.model("schesells", ScheSellSchema);
