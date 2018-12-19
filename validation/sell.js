const Validator = require("validator");
const isEmpty = require("./is-empty");
const validateScheduleInput = require("./schedule");

module.exports = function validateSellInput(data) {
  let errors = validateScheduleInput(data);
  data.hinhThuc = !isEmpty(data.hinhThuc) ? data.hinhThuc : "";
  data.loai = !isEmpty(data.loai) ? data.loai : "";
  data.diachi = !isEmpty(data.diachi) ? data.diachi : "";
  data.dienTich = !isEmpty(data.dienTich) ? data.dienTich : "";
  //chi Tiết
  data.matTien = !isEmpty(data.matTien) ? data.matTien : "";
  data.duongVao = !isEmpty(data.duongVao) ? data.duongVao : "";
  data.huongNha = !isEmpty(data.huongNha) ? data.huongNha : "";
  data.huongBanCong = !isEmpty(data.huongBanCong) ? data.huongBanCong : "";
  data.noiThat = !isEmpty(data.noiThat) ? data.noiThat : "";
  data.image = !isEmpty(data.image) ? data.image : "";

  data.moTa = !isEmpty(data.moTa) ? data.moTa : "";

  if (Validator.isEmpty(data.hinhThuc)) {
    errors.hinhThuc = "Kind of field is required";
  }
  if (Validator.isEmpty(data.loai)) {
    errors.loai = "Kind of field is required";
  }
  if (Validator.isEmpty(data.diachi)) {
    errors.diachi = "Address field is required";
  }
  if (!Validator.isNumeric(data.dienTich)) {
    errors.dienTich = "Area field is required numeric";
  }
  if (!Validator.isNumeric(data.soTang)) {
    errors.soTang = " Number of floor required a numeric";
  }
  if (!Validator.isNumeric(data.soPhongNgu)) {
    errors.soPhongNgu = " Number of bedrooms required a numeric";
  }
  if (!Validator.isNumeric(data.soToilet)) {
    errors.soToilet = " Number of toilets required a numeric";
  }
  if (!Validator.isNumeric(data.gia)) {
    errors.gia = " The price required a numeric";
  }
  if (!Validator.isURL(data.image)) {
    errors.image = " Something wrong?!!";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
