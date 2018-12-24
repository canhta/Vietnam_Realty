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
  data.idCard = !isEmpty(data.idCard) ? data.idCard : "0";

  if (!Validator.isNumeric(data.fromDienTich)){
    errors.dienTich = "Yêu cầu giá trị số"
  }
  if (!Validator.isNumeric(data.toDienTich)){
    errors.dienTich = "Yêu cầu giá trị số"
  }

  if (!Validator.isNumeric(data.fromCost)){
    errors.cost = "Yêu cầu giá trị số"
  }

  if (!Validator.isNumeric(data.toCost)){
    errors.cost = "Yêu cầu giá trị số"
  }

  if (!Validator.isNumeric(data.idCard)){
    errors.idCardKHL = "Yêu cầu giá trị số"
  }
  if (data.idCard.length < 8){
    errors.idCardKDD = "Yêu cầu mã thẻ lớn hơn 8 kí tự"
  }




  if (Validator.isEmpty(data.loai)) {
    errors.loai = "Trường này không được rỗng";
  }
 
  if (Validator.isEmpty(data.dienTich)) {
    errors.dienTichRong = "Trường này không được rỗng";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
