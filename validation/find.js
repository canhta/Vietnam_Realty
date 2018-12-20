const Validator = require("validator");
const isEmpty = require("./is-empty");
const validateScheduleInput = require("./schedule");
module.exports = function validateFindInput(data) {
  let errors = validateScheduleInput(data);

  data.hinhThuc = !isEmpty(data.hinhThuc) ? data.hinhThuc : "sell";
  data.loai = !isEmpty(data.loai) ? data.loai : "";
  data.diachi = !isEmpty(data.diachi) ? data.diachi : "";
  data.dienTich = !isEmpty(data.dienTich) ? data.dienTich : "0";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.noiDung = !isEmpty(data.noiDung) ? data.noiDung : "";

  if (!Validator.isLength(data.noiDung, { min: 10, max: 1000 })) {
    errors.text = "Details must be more 10 characters";
  }
  if (!Validator.isLength(data.title, { min: 10, max: 100 })) {
    errors.text = "Title must be between 10 and 100 characters";
  }
  if (Validator.isEmpty(data.loai)) {
    errors.loai = "The kinds field is required";
  }
  if (Validator.isEmpty(data.diachi)) {
    errors.diachi = "Address field is required";
  }
  if (Validator.isEmpty(data.dienTich)) {
    errors.dienTich = "Area field is required";
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }
  if (Validator.isEmpty(data.noiDung)) {
    errors.noiDung = "Details field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
