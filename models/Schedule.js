const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ScheduleSchema = new Schema({
  sell: {
    type: Schema.Types.ObjectId,
    ref: "sells"
  },
  buy: {
    type: Schema.Types.ObjectId,
    ref: "buys"
  }
});
module.exports = Schedule = mongoose.model("schedule", ScheduleSchema);
