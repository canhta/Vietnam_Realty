const Validator = require("validator");
const isEmpty = require("./is-empty");
const validateScheduleInput = require("./schedule");


module.exports = function validateSellInput(data) {
  let errors = validateScheduleInput(data);
  data.hinhThuc = !isEmpty(data.hinhThuc) ? data.hinhThuc : "";
  data.loai = !isEmpty(data.loai) ? data.loai : "";
  data.dienTich = !isEmpty(data.dienTich) ? data.dienTich : "0";
  //chi Tiết
  data.matTien = !isEmpty(data.matTien) ? data.matTien : "";
  data.duongVao = !isEmpty(data.duongVao) ? data.duongVao : "";
  data.huongNha = !isEmpty(data.huongNha) ? data.huongNha : "";
  data.huongBanCong = !isEmpty(data.huongBanCong) ? data.huongBanCong : "";
  data.noiThat = !isEmpty(data.noiThat) ? data.noiThat : "";
  data.image = !isEmpty(data.image) ? data.image : "";

  data.moTa = !isEmpty(data.moTa) ? data.moTa : "";

  if (Validator.isEmpty(data.hinhThuc)) {
    errors.hinhThuc = "Trường này yêu cầu chọn";
  }
  if (Validator.isEmpty(data.loai)) {
    errors.loai = "Trường này yêu cầu chọn";
  }
  if (Validator.isEmpty(data.diachi)) {
    errors.diaChi = "Không được bỏ trống địa chỉ";
  }
  if (!Validator.isNumeric(data.dienTich)) {
    errors.dienTich = "diện tích không được để trống";
  }
  if (!Validator.isNumeric(data.dienTich)){
    errors.dienTich = "diện tích yêu cầu sôs";
  } 
  
  if (!Validator.isNumeric(data.gia)) {
    errors.cost = " Giá yêu cầu số";
  }
  if (Validator.isEmpty(data.moTa)){
    errors.moTa = "Mô tả không được bỏ trống";
  }

   
  if (!Validator.isNumeric(data.matTien)) {
    errors.matDuong = " Trường này yêu cầu số";
  }
  
  if (!Validator.isNumeric(data.duongVao)) {
    errors.matDuong = "Trường này yêu cầu số";
  }

  if (!Validator.isNumeric(data.soTang)) {
    errors.soTang = "Trường này yêu cầu số";
  }

  if (!Validator.isNumeric(data.soToilet) || !Validator.isNumeric(data.soPhongNgu)) {
    errors.nguToilet = "Trường này yêu cầu số";
  }

  if (!Validator.isNumeric(data.idCard)){
    errors.card = "Trường này yêu cầu số";
  }

  


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
