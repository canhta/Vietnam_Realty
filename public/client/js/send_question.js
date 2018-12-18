
function send_register(request_url)
	{
        var data = "";
        var me = $(this);
        var fullname = $('#fullname').val();
        var email = $('#email').val();
        var tel = $('#tel').val();
        var b_day = $('#b_day').val();
        var b_month = $('#b_month').val();
        var b_year = $('#b_year').val();
        
        var gender = $("input[@name=gender]:checked").val();
        var address = $('#address').val();
        var id_location = $('#id_location').val();
        var images = $('#qimages').val();
        var file_attach = $('#qAttachFile').val();
        var captcha = $('#captcha').val();
        var check = $('#check').val();
        
        
        if(fullname =='' || fullname=='Tên của bạn'){
            $('#q_message').html("Bạn chưa nhập tên!");
            $('#q_message').css('color','red');
            $('#q_message').show("fast");
            $('#fullname').focus();
            return false;
        }
       
        if(!validate_email(email)){
            $('#q_message').html("Email bạn nhập không đúng!");
            $('#q_message').css('color','red');
            $('#q_message').show("fast");
            $('#email').focus();
            return false;
        }
        if(tel == '') {
            $('#q_message').html("Điện thoại không được để trống!");
            $('#q_message').css('color','red');
            $('#q_message').show("fast");
            $('#tel').focus();
            return false;
        }
        if(isNumeric(tel) != true) {
            $('#q_message').html("Điện thoại phải là kiểu số!");
            $('#q_message').css('color','red');
            $('#q_message').show("fast");
            $('#tel').focus();
            return false;
        }
       
//        if(images==''){
//            $('#q_message').html("Ảnh của bạn không được để trống!");
//            $('#q_message').css('color','red');
//            $('#q_message').show("fast");
//          return false;
       // }
//        if(file_attach ==''){
//            $('#q_message').html("Bạn phải có hồ sơ đính kèm!");
//            $('#q_message').css('color','red');
//            $('#q_message').show("fast");
//            return false;
//        }
        if(captcha=='' || captcha=='Mã bảo mật'){
            $('#q_message').html("Bạn chưa nhập mã bảo mật!");
            $('#q_message').css('color','red');
            $('#q_message').show("fast");
            $('#captcha').focus();
            return false;
        }
        
        if($('#check').is(':checked') == false){
            $('#q_message').html("Bạn phải đồng ý để hoàn thành đăng ký!");
            $('#q_message').css('color','red');
            $('#q_message').show("fast");
            $('#check').focus();
            return false;
        }

        data = '';
        data = data + '&fullname='+fullname;
        data = data + '&email='+email;
        data = data + '&tel='+tel;
        data = data + '&b_day='+b_day;
        data = data + '&b_month='+b_month;
        data = data + '&b_year='+b_year;
        data = data + '&address='+address;
        data = data + '&id_location='+id_location;
        data = data + '&gender='+gender;
        
        
        data = data + '&captcha='+captcha;
  
        $.ajax({
            type: "POST",
            url: request_url,
            data: data,
            success: function(msg){
                if(msg=='captcha'){
                	$('#q_message').html("Mã bảo mật không đúng!");
                    $('#q_message').css('color','red');
                    $('#q_message').show("fast");
                    $('#captcha').focus();
		        }else if(msg == 'repeat'){
                	$('#q_message').html("Xin lỗi. Email này đã được đăng ký.");
                    $('#q_message').css('color','red');
                    $('#q_message').show("fast");
                }else if(isNumeric(msg)){
                    $('#fullname').val('');
                    $('#email').val('');
                    $('#tel').val('');
                    $('#address').val('');
                    $('#images').val('');
                    $('#id_location').val('');
                    $('#file_attach').val('');
                    $('#captcha').val('');
                    $('#b_day').val('');
                    $('#b_month').val('');
                    $('#b_year').val('');
             
                    var isUpload = $('#q_isUpload').val();
                    var q_isimage = $('#q_isimage').val();

                    if(isUpload == "1"){
                        $('#qAttachFile').uploadify('settings','formData' ,{'qid': msg});
                        $('#qAttachFile').uploadify('upload','*');
                    } 
                    if(q_isimage  == "1"){

                        $('#qimages').uploadify('settings','formData' ,{'qid': msg});
                        $('#qimages').uploadify('upload','*');
                    }else{
                       // $('#q_message').html("Chúc mừng bạn đã đăng ký cộng tác viên thành công!");
                       // $('#q_message').css('color','green');
                       // $('#q_message').show();
                    }
                    location.href= base_url +'cong-tac-vien/success.html';
                }
            }
        });
        return false;
}

$(document).ready(function() {
    //up images
    $('#qimages').uploadify({
        'auto'      : false,
        'multi'     : false,
        'fileSizeLimit' : '500KB',
        'queueSizeLimit' : 1,
        'fileTypeDesc' : 'Image Files',
        'fileTypeExts' : '*.jpg; *.png',
        'swf'          : '/public/client/uploadify_v3/uploadify.swf',
        'uploader'     : '/public/client/uploadify_v3/upimage.php',
        'buttonText'   : '', 
        'buttonImage'  : '/public/client/uploadify_v3/btnupload.gif',
        'removeCompleted' : true,
        'width'        : 95,
        'height'       : 15,
        'formData'     : {'cat_id':1},  
        'onSelect' : function(file){
            $('#q_isimage').val(1);
            var fileName = file.name;
            var validExtensions = new Array('jpg','png');
            var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
            if(!in_array(fileNameExt,validExtensions)){
                $("#qimages").uploadify('cancel');
                $('#q_isimage').val(0);
                alert("File đính kèm file có định dạng jpg, png !");
                return false;
            }
        },
        'onCancel': function(file) {
            if($('div#qimages-queue').find("div.uploadify-queue-item").size() == 1){
                $('#q_isimage').val(0);
            }
        },
        'onQueueComplete' : function(queueData) {
            $('#q_isimage').val(0);
        }
    });
    //upload profile
    $('#qAttachFile').uploadify({
        'auto'      : false,
        'multi'     : false,
        'queueSizeLimit' : 1,
        'fileTypeDesc' : 'profile Files',
        'fileTypeExts' : '*.doc;*.zip;*.rar',
        'swf'          : '/public/client/uploadify_v3/uploadify.swf',
        'uploader'     : '/public/client/uploadify_v3/quickpost.php',
        'buttonImage'  : '/public/client/uploadify_v3/btnupload.gif',
        'removeCompleted' : true,
        'width'        : 95,
        'height'       : 15,
        'formData'     : {'cat_id':1},  
        'onSelect' : function(file){
            $('#q_isUpload').val(1);
            var fileName = file.name;
            var validExtensions = new Array('doc','zip','rar');
            var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
            if(!in_array(fileNameExt,validExtensions)){
                $("#qAttachFile").uploadify('cancel');
                $('#q_isUpload').val(0);
                alert("File đính kèm file có định dạng jpg, png, doc, zip, rar!");
                return false;
            }
        },
        'onCancel': function(file) {
            if($('div#qAttachFile-queue').find("div.uploadify-queue-item").size() == 1){
                $('#q_isUpload').val(0);
            }
        },
        'onQueueComplete' : function(queueData) {
            $('#q_isUpload').val(0);
        }
    });
});

function redoQuestion(){
    $('#q_fullname').val('Tên của bạn');
    $('#q_email').val('Email');
    $('#q_securityCode').val('Mã bảo mật');
    $('#q_content').val('Nội dung câu hỏi');
    $('#qAttachFile').uploadifyClearQueue();
    $('#q_isUpload').val(0);
}

function in_array (needle, haystack, argStrict) {
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',        strict = !! argStrict;
 
    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    } 
    return false;
}
function validate_email(address) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if(reg.test(address) == false) {
        return false;
    }else{
        return true;
    }
}
function isNumeric(sText){
    var ValidChars = "0123456789-";
    var IsNumber=true;
    var Char;
    for (i = 0; i < sText.length && IsNumber == true; i++){
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1){
            IsNumber = false;
        }
    }
    return IsNumber;
}
function change_captcha(image_id){
    var img_name = '/captcha/verify.php?' + Math.floor((100)*Math.random());
    $('#'+image_id).attr('src', img_name);
}
