const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";
  data.diachi = !isEmpty(data.diachi) ? data.diachi : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone number is required";
  }
  if (!Validator.isNumeric(data.phone)) {
    errors.phone = "Phone number is numeric";
  }
  if (data.phone.length < 10 || data.phone.length > 11) {
    errors.phone = "Phone number invalid!";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
