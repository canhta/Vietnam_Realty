const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateScheduleInput(data) {
  let errors = {};

  // data.from = !isEmpty(data.from) ? data.from : "";
  // data.to = !isEmpty(data.to) ? data.to : "";
  data.state = !isEmpty(data.state) ? data.state : "READY";
  data.menhGia = !isEmpty(data.menhGia) ? data.menhGia : 20000;
  data.idCard = !isEmpty(data.idCard) ? data.idCard : 0;

  if (!Validator.isNumeric(data.menhGia)) {
    errors.menhGia = "Area field is required numeric";
  }
  if (!Validator.isNumeric(data.idCard)) {
    errors.idCard = " Number of floor required a numeric";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
