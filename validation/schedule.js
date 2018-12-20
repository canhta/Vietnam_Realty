const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateScheduleInput(data) {
  let errors = {};

  // data.from = !isEmpty(data.from) ? data.from : "";
  // data.to = !isEmpty(data.to) ? data.to : "";

  data.menhGia = !isEmpty(data.menhGia) ? data.menhGia : "0";
  data.idCard = !isEmpty(data.idCard) ? data.idCard : "0";
  if (!Validator.isNumeric(data.menhGia)) {
    errors.menhGia = "Area field is required numeric";
  }
  if (!Validator.isNumeric(data.idCard)) {
    errors.idCard = " Number of floor required a numeric";
  }
  return errors;
};
