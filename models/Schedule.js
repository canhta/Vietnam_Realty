const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ScheduleSchema = new Schema({
  typePost: {
    type: String,
    required: true,
    enum: ["SELL", "FIND"]
  },
  state: {
    type: String,
    required: true,
    enum: ["READY", "POSTED", "EXPIRED"]
  }
});
module.exports = Schedule = mongoose.model("schedules", ScheduleSchema);
