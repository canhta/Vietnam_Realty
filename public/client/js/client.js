
function send_request(){
    var form_yeucau = $('#form_yeucau');
    var lastname    = form_yeucau.find('input[name="lastname"]');
    var mobile      = form_yeucau.find('input[name="mobile"]');
    var email       = form_yeucau.find('input[name="email"]');
    var company     = form_yeucau.find('input[name="company"]');
    var description = form_yeucau.find('textarea[name="description"]');
    
    var error_msg   = form_yeucau.find('#error-msg');
    if ($.trim(lastname.val()) == '') {
        error_msg.text('Vui lòng nhập họ và tên.');
        lastname.focus();
        return false;
    } else {
        error_msg.text('');
    }
    
    if ($.trim(mobile.val()) == '') {
        error_msg.text('Vui lòng nhập số điện thoại liên hệ.');
        mobile.focus();
        return false;
    } else {
        error_msg.text('');
    }
    
    if (email.val()== '' || !/\S+@\S+/.test(email.val())) {
        error_msg.text('Địa chỉ email không hợp lệ.');
        email.focus();
        return false;
    } else {
        error_msg.text('');
    }
    
    var check_captcha = form_yeucau.find('input[name="check_captcha"]');
    if (check_captcha && check_captcha.length > 0) {
        var captcha     = form_yeucau.find('input[name="captcha"]');
        if ($.trim(captcha.val()) == '') {
            error_msg.text('Vui lòng nhập mã xác nhận.');
            captcha.focus();
            return false;
        } else {
            error_msg.text('');
        }
    }
    
    form_yeucau.find('.btnSendQuid').attr('disabled', true);
    
    $.ajax({
        url: base_url+'client/building/send_requid_crm',
        type: 'POST',
        data: form_yeucau.serialize(),
        success: function(response){
            var result = JSON.parse(response);
            if (result.status) {
                form_yeucau.find('input[name="__vtrftk"]').val(result.data.vtrftk);
                form_yeucau.find('input[name="publicid"]').val(result.data.publicid);
                form_yeucau.find('input[name="name"]').val(result.data.name);
                form_yeucau.find('input[name="leadsource"]').val(result.data.leadsource);
                form_yeucau.find('input[name="label:Campaign"]').val(result.data.label);
                form_yeucau.find('input[name="mobile"]').val(result.data.mobile);
                form_yeucau.find('input[name="email"]').val(result.data.email);
                form_yeucau.find('input[name="lastname"]').val(result.data.lastname);
                form_yeucau.find('input[name="company"]').val(result.data.company);
                form_yeucau.find('input[name="address"]').val(result.data.address);
                form_yeucau.find('textarea[name="description"]').val(result.data.description);
                form_yeucau.submit();
            } else {
                form_yeucau.find('.btnSendQuid').attr('disabled', false);
                error_msg.text(result.msg);
                return false;
            }
        }
    });
    
}

function submit_requid_vp(request_url, msg_width){

	var errors = [];
    var fullname    		= $('#vp_fullname').val();
    var email    			= $('#vp_email').val();
    var tel 				= $('#vp_tel').val();
    var val 				= $('#val').val();
    var company    			= $('#vp_company').val();
    var content    			= $('#vp_content').val();
    var id_related    		= $('#id_related').val();
    var code_related 		= $('#code_related').val();
    var url_related    		= $('#url_related').val();
    var name_related    	= $('#name_related').val();
    var address_related 	= $('#address_related').val();

    if(fullname == '') {
        errors.push('Họ tên không được để trống!');
        $('#vp_fullname').addClass('err');
    }
    if(email == '') {
        errors.push('Email không được để trống!');
        $('#vp_email').addClass('err');
    }else if(!is_email(email))
    {   errors.push('Email không hợp lệ!');
        $('#vp_email').addClass('err');
    }
    if(isNumeric(tel) != true) {
        errors.push('Điện thoại phải là kiểu số!');
        $('#vp_tel').addClass('err');
    }
    if(tel == '') {
        errors.push('Số điện thoại không được để trống!');
        $('#vp_tel').addClass('err');
    }
    if(content == '' || content== 'Nội dung') {
        errors.push('Nội dung không được để trống!');
        $('#vp_content').addClass('err');
    }
    
    if(errors.length > 0) {
        show_message('error_requid', 'error', errors, msg_width); return;
    }
    
    var postdata = 'fullname='+fullname+'&email='+email+'&tel='+tel+'&content='+content+'&company='+company+'&val='+val+'&id_related='+id_related+'&name_related='+name_related+'&code_related='+code_related+'&url_related='+url_related+'&address_related='+address_related;

    $.ajax({
        type: "POST",
        url: base_url + request_url,
        data: postdata,
        timeout: 10*1000,// 10s
        success: function(data) {
            if(data == 1) {
               show_message('error_requid', 'success', 'Đã gửi thành công ! Yêu cầu của bạn đang chờ kiểm duyệt !', msg_width);
                $('#vp_fullname').attr('value','');
                $('#vp_tel').attr('value','');
                $('#vp_email').attr('value','');
                $('#vp_content').attr('value','');
                $('#vp_company').attr('value','');
                $('#val').attr('value','');
                
		    		setTimeout(function(){
		    			$("#close_form").click();
		    		},2000);
            }else if(data =='capcha'){
           	 show_message('error_requid', 'error', 'Mã xác nhận không chính xác !', msg_width);
            }else {
                show_message('error_requid', 'error', data, msg_width);
            }
        },
        error:function (xhr, textStatus, errorThrown) {
            show_message('error_requid', 'error', 'Error !', msg_width);
        }
    });
 }


function showbuilding()
	{
		  var city = document.getElementById('ctname').value;
		  document.location.href =base_url+"toa-nha-van-phong/"+city;
	}
function showground()
{
		  var city = document.getElementById('cityname').value;
	  document.location.href =base_url+"mat-bang-ban-le/"+city;
}
function showcheap()
{
	  var city = document.getElementById('cityname').value;
	  document.location.href =base_url+"van-phong-gia-re/"+city;
}
function is_email(str)
{
   var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   if(reg.test(str) == false) {
      return false;
   }
   else return true;
}
function reset_form(form_id, msg_div)
{
	$('#'+form_id)[0].reset();
	$(':input').removeClass('err');
	$('#'+msg_div).html('');
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
function is_array(obj)
{
   if(obj.constructor.toString().indexOf("Array") == -1) {
       return false;
   }
   else {
       return true;
   }
}

/**
 * div : id display
 * type : success, error
 * msg : content
 */
function show_message(div, type, msg)
{
	var message = '';
    var width   = '98%';

    if(arguments[3] > 0) var width = arguments[3] + 'px';

    if(type == 'error') {
        var class2   = 'line_er';
    }
    else if(type == 'success') {
        var class2   = 'line_success';
    }
    
    message += '<ul class="'+class2+'" style="width:'+width+';">';
    if(is_array(msg)) {
        if(msg.length > 1) {
            var margin_top = 10;
            message += '<li class="top">Có lỗi xảy ra:</li>';
        }
        else {
            var margin_top = 0;
        }
        for(i = 0; i < msg.length; i++) {
            message += '<li style="margin-top:'+margin_top+'px;">- '+msg[i]+'</li>';
        }
    }
    else {
         message += '<li style="margin-top:'+margin_top+'px;">- '+msg+'</li>';
    }
    message += '</ul>';
    
    if(msg.length >1){
        	$('.banner-r').hide();
        	$('#'+div).hide().html(message).fadeIn().delay(2500).fadeOut(function() {
    			$('.banner-r').show('fast');
    		});
        }else{
        	$('#'+div).hide().html(message).fadeIn();
        }
    
    $('#'+div).delay(2500).fadeOut();
}

function submit_form(myform){

	var errors = [];
    var fullname    = $('#fullname').val();
    var email    	= $('#email').val();
    var check 		= $('#check').val();
    var tel    	= $('#tel').val();
    var content    	= $('#content').val();

    if(fullname == '') {
        errors.push('Họ tên không được để trống!');
        $('#fullname').addClass('err');
    }
    if(isNumeric(tel) != true) {
        errors.push('Điện thoại phải là kiểu số!');
        $('#tel').addClass('err');
    }
    if(tel == '') {
        errors.push('Số điện thoại không được để trống!');
        $('#tel').addClass('err');
    }
    if(email == '') {
        errors.push('Email không được để trống!');
        $('#email').addClass('err');
    }else if(!is_email(email))
    {   errors.push('Email không hợp lệ!');
        $('#email').addClass('err');
    }
    if(content == '') {
        errors.push('Nội dung không được để trống!');
        $('#content').addClass('err');
    }
    if(errors.length > 0) {
        show_message('error_comment', 'error', errors, '300'); return;
    }else{    	
    	$('#check').attr('value', 'Submit');
    	document.forms[myform].submit();
	}
 }
function submit_requid(request_url, msg_width){

	var errors = [];
    var fullname    		= $('#fullname').val();
    var email    			= $('#email').val();
    var tel 				= $('#tel').val();
    var val 				= $('#val').val();
    var company    			= $('#company').val();
    var content    			= $('#content').val();
    var id_related    		= $('#id_related').val();
    var code_related 		= $('#code_related').val();
    var url_related    		= $('#url_related').val();
    var name_related    	= $('#name_related').val();
    var address_related 	= $('#address_related').val();

    if(fullname == '') {
        errors.push('Họ tên không được để trống!');
        $('#fullname').addClass('err');
    }
    if(email == '') {
        errors.push('Email không được để trống!');
        $('#email').addClass('err');
    }else if(!is_email(email))
    {   errors.push('Email không hợp lệ!');
        $('#email').addClass('err');
    }
    if(isNumeric(tel) != true) {
        errors.push('Điện thoại phải là kiểu số!');
        $('#tel').addClass('err');
    }
    if(tel == '') {
        errors.push('Số điện thoại không được để trống!');
        $('#tel').addClass('err');
    }
    if(content == '' || content== 'Nội dung') {
        errors.push('Nội dung yêu cầu không được để trống!');
        $('#content').addClass('err');
    }
    
    if(errors.length > 0) {
        show_message('error_ques', 'error', errors, msg_width); return;
    }
    
    var postdata = 'fullname='+fullname+'&email='+email+'&tel='+tel+'&content='+content+'&company='+company+'&val='+val+'&id_related='+id_related+'&name_related='+name_related+'&code_related='+code_related+'&url_related='+url_related+'&address_related='+address_related;

    $.ajax({
        type: "POST",
        url: base_url + request_url,
        data: postdata,
        timeout: 10*1000,// 10s
        success: function(data) {
    	
            if(data == 1) {
              // show_message('error_ques', 'success', 'Đã gửi thành công ! Yêu cầu của bạn đang chờ kiểm duyệt !', msg_width);
		$("#error_ques").attr('style',"display:block;")
            	$("#error_ques").html('<iframe name="lastframe" id="lastframe" SRC="'+base_url+'building/success" width="440" height="70" frameborder="0" marginwidth="0" marginheight="0" ></iframe>').delay(5000).fadeOut();

                $('#fullname').attr('value','');
                $('#tel').attr('value','');
                $('#email').attr('value','');
                $('#content').attr('value','');
                $('#company').attr('value','');
                $('#val').attr('value','');
                 $('#light-request').delay(5000).fadeOut();
                $('#fade-request').delay(5000).fadeOut();
		return false;

		    		//setTimeout(function(){
		    		//	$("#close_form").click();
		    		//},2000);
            }else if(data =='captcha'){
           	 show_message('error_ques', 'error', 'Mã xác nhận không chính xác !', msg_width);
            }else {
                show_message('error_ques', 'error', data, msg_width);
            }
        },
        error:function (xhr, textStatus, errorThrown) {
            show_message('error_ques', 'error', 'Error !', msg_width);
        }
    });
 }
function post_question(request_url, msg_width)
{
    var errors = [];
    var fullname     = $('#fullname').val();
    var email    = $('#email').val();
    var tel    		= $('#tel').val();
    var content  = $('#content').val();
    var captcha     = $('#captcha').val();

    if(!is_email(email))
    {
        errors.push('Email không hợp lệ!');
        $('#email').addClass('err');
    }
    if(fullname == '' || fullname == 'Họ tên') {
        errors.push('Họ tên không được để trống!');
        $('#fullname').addClass('err');
    }
    if(isNumeric(tel) != true) {
        errors.push('Điện thoại phải là kiểu số!');
        $('#tel').addClass('err');
    }
    if(content == '' || content== 'Nội dung') {
        errors.push('Nội dung không được để trống!');
        $('#content').addClass('err');
    }
   if(captcha == '' || captcha== 'Mã xác nhận') {
        errors.push('Mã xác nhận không được để trống!');
        $('#captcha').addClass('err');
    }

    if(errors.length > 0) {
        show_message('error_ques', 'error', errors, msg_width); return;
    }
    
    var postdata = 'fullname='+fullname+'&email='+email+'&tel='+tel+'&content='+content+'&captcha='+captcha;
    
    $.ajax({
        type: "POST",
        url: base_url + request_url,
        data: postdata,
        timeout: 10*1000,// 10s
        success: function(data) {
    	
            if(data == 1) {
              // show_message('error_ques', 'success', 'Đã gửi thành công ! Yêu cầu của bạn đang chờ kiểm duyệt !', msg_width);

		$('.formsend').fadeOut(function() {
                	$("#error_ques").attr('style',"display:block;");
	            	$("#error_ques").html('<iframe name="lastframe" id="lastframe" SRC="'+base_url+'sale/success" width="195" height="190" frameborder="0" marginwidth="0" marginheight="0" style="overflow-x: hidden;overflow-y: hidden;" ></iframe>').delay(5000).fadeOut(function() {
	            		$(".formsend").fadeIn();
	            	});  
            	});

                $('#fullname').attr('value','Họ tên');
                $('#tel').attr('value','Điện Thoại');
                $('#email').attr('value','Email');
                $('#content').attr('value','Nội dung');    
		return false;              
    		}else {
                show_message('error_ques', 'error', data, msg_width);
            }
        },
        error:function (xhr, textStatus, errorThrown) {
            show_message('error_ques', 'error', 'Error !', msg_width);
        }
    });
}

function filter_price()
{
	var districts     	= $('#districts').val();
//    var streets    		= $('#streets').val();
//    var kind_office    	= $('#kind_office').val();
    var area_from  		= $('#area_from').val();
    var area_to     	= $('#area_to').val();
    var price_from  	= $('#price_from').val();
    var price_to     	= $('#price_to').val();
    
	window.location.href= base_url+ 'van-phong-cho-thue/tim-kiem/'+districts+'-'+area_from+'-'+area_to+'-'+price_from+'-'+price_to+'.html';
}
function filter_home()
{
	var districts     	= $('#districts').val();
    var area  			= $('#area').val();
    var price 			= $('#price').val();
    
	window.location.href= base_url+ 'tim-kiem/'+districts+'-'+area+'-'+price+'.html';
}
function submit_deposit_cu(request_url){

	var errors = [];
    var fullname    = $('#fullname').val();
    var email    	= $('#email').val();
    var fax    		= $('#fax').val();
    var tel    		= $('#tel').val();
    var company    	= $('#company').val();
    
    var title    		= $('#title').val();
    var address    		= $('#address').val();
    var area    		= $('#area').val();
    var status    		= $('#status').val();// trang thai san pham
    var price    		= $('#price').val();
    var fee    			= $('#fee').val();
    var contents    	= $('#contents').val();
   // var id_location    	= $('#id_location').val();
    
    
    var captcha 		= $('#captcha').val();

    if(fullname == '') {
        errors.push('Họ tên không được để trống!');
        $('#fullname').addClass('err');
    }
    if(tel == '') {
        errors.push('Số điện thoại không được để trống!');
        $('#tel').addClass('err');
    }
    if(isNumeric(tel) != true) {
        errors.push('Điện thoại phải là kiểu số!');
        $('#tel').addClass('err');
    }
    if(email == '') {
        errors.push('Email không được để trống!');
        $('#email').addClass('err');
    }else if(!is_email(email))
    {   errors.push('Email không hợp lệ!');
        $('#email').addClass('err');
    }
    if(address == '') {
        errors.push('Địa chỉ không được để trống!');
        $('#address').addClass('err');
    }
    
    if(title == '') {
        errors.push('Tên sản phẩm không được để trống!');
        $('#title').addClass('err');
    }
    if(price == '') {
        errors.push('Giá sản phẩm không được để trống!');
        $('#price').addClass('err');
    }
    if(contents == '') {
        errors.push('Mô tả sản phẩm không được để trống!');
        $('#contents').addClass('err');
    }
    
    if(errors.length > 0) {
        show_message('error_deposit', 'error', errors, '300'); return;
    }
    
    var postdata = 'fullname='+fullname+'&email='+email+'&tel='+tel+'&contents='+contents+'&fax='+fax+'&company='+company
    				+'&title='+title+'&address='+address+'&price='+price+'&area='+area+'&fee='+fee+'&status='+status+'&contents='+contents+'&captcha='+captcha;
    
    $.ajax({
        type: "POST",
        url: request_url,
        data: postdata,
        timeout: 10*1000,// 10s
        success: function(data) {
	    	 if(data == 1) {
	         	//reset_form('myform','error_deposit');
		        // change_captcha('email_captcha_image');
	         	$(".detailtnin").attr('style',"display:none;");
			$("#error_deposit").attr('style',"display:block;");
	         	$('#error_deposit').html('<span style="color:green; font-size: 14px; padding:10px;">Chúc mừng bạn đã gửi yêu cầu thành công. Yêu cầu của bạn đang chờ kiểm duyệt.</span>');
	         	
	         }else if(data == 'captcha') {
	             show_message('error_deposit', 'error', 'Mã xác nhận không chính xác !', 300);
	         }
	         else {
	        	 show_message('error_deposit', 'error', 'Có lỗi ! Xin bạn vui lòng thử lại !', 300);
	         }
        },
        error:function (xhr, textStatus, errorThrown) {
            show_message('error_deposit', 'error', 'Error !', 300);
        }
    });
 }


function submit_deposit(request_url){

	var errors = [];
    var fullname    = $('#fullname').val();
    var email    	= $('#email').val();
    var tel    		= $('#tel').val();
    var address    		= $('#address').val();
    var contents    	= $('#contents').val();
   
    var captcha 		= $('#captcha').val();

//    if(fullname == '') {
//        errors.push('Họ tên không được để trống!');
//        $('#fullname').addClass('err');
//    }
    if(tel == '') {
        errors.push('Số điện thoại không được để trống!');
        $('#tel').addClass('err');
    }
    if(isNumeric(tel) != true) {
        errors.push('Điện thoại phải là kiểu số!');
        $('#tel').addClass('err');
    }
    if(email == '') {
        errors.push('Email không được để trống!');
        $('#email').addClass('err');
    }else if(!is_email(email))
    {   errors.push('Email không hợp lệ!');
        $('#email').addClass('err');
    }
//    if(address == '') {
//        errors.push('Địa chỉ không được để trống!');
//        $('#address').addClass('err');
//    }
    
   
    if(contents == '') {
        errors.push('Mô tả sản phẩm không được để trống!');
        $('#contents').addClass('err');
    }
    
    if(errors.length > 0) {
        show_message('error_deposit', 'error', errors, '300'); return;
    }
    
    var postdata = 'fullname='+fullname+'&email='+email+'&tel='+tel+'&address='+address+'&contents='+contents+'&captcha='+captcha;
    
    $.ajax({
        type: "POST",
        url: request_url,
        data: postdata,
        timeout: 10*1000,// 10s
        success: function(data) {
	    	 if(data == 1) {
	    		 reset_form('myform','error_deposit');
	            // $("#error_deposit").attr('style',"display:block;padding-top:60px;");
	         	// $('#error_deposit').html('<div style="color:green; font-size: 12px; padding:10px 0 0 15px;">Chúc mừng bạn đã gửi yêu cầu thành công. Yêu cầu của bạn đang chờ kiểm duyệt.</div>');
		location.href=base_url + "ky-gui-san-pham-thanh-cong.html";
	         	
	         }else if(data == 'captcha') {
	             show_message('error_deposit', 'error', 'Mã xác nhận không chính xác !', 300);
	         }
	         else {
	        	 show_message('error_deposit', 'error', 'Có lỗi ! Xin bạn vui lòng thử lại !', 300);
	         }
        },
        error:function (xhr, textStatus, errorThrown) {
            show_message('error_deposit', 'error', 'Error !', 300);
        }
    });
 }

function submit_contact(request_url, msg_width){
	
	var errors = [];
    var fullname    		= $('#fullname').val();
    var email    			= $('#email').val();
    var tel 				= $('#tel').val();
    var address 				= $('#address').val();
    var captcha 				= $('#captcha').val();
    var content    			= $('#content').val();
   
    
    if(fullname == '') {
        errors.push('Họ tên không được để trống!');
        $('#fullname').addClass('err');
    }
    if(email == '') {
        errors.push('Email không được để trống!');
        $('#email').addClass('err');
    }else if(!is_email(email))
    {   errors.push('Email không hợp lệ!');
        $('#email').addClass('err');
    }
    if(isNumeric(tel) != true) {
        errors.push('Điện thoại phải là kiểu số!');
        $('#tel').addClass('err');
    }
    if(tel == '') {
        errors.push('Số điện thoại không được để trống!');
        $('#tel').addClass('err');
    }
    if(content == '' || content== 'Nội dung') {
        errors.push('Nội dung không được để trống!');
        $('#content').addClass('err');
    }
    
    if(errors.length > 0) {
        show_message('error_ques', 'error', errors, msg_width); return;
    }
    
    var postdata = 'fullname='+fullname+'&email='+email+'&tel='+tel+'&content='+content+'&address='+address+'&captcha='+captcha;

    $.ajax({
        type: "POST",
        url: base_url + request_url,
        data: postdata,
        timeout: 10*1000,// 10s
        success: function(data) {
            if(data == 1) {
            	location.href=base_url + 'lien-he-thanh-cong.html';
            }else if(data =='captcha'){
           	 show_message('error_ques', 'error', 'Mã xác nhận không chính xác !', msg_width);
            }else {
                show_message('error_ques', 'error', data, msg_width);
            }
        },
        error:function (xhr, textStatus, errorThrown) {
            show_message('error_ques', 'error', 'Error !', msg_width);
        }
    });
 }

function report_price(request_url, msg_width){
	
	var errors = [];
    var fullname    		= $('#fullname').val();
    var email    			= $('#email').val();
    var tel 				= $('#tel').val();
    var kind_office 		= $('#kind_office').val();
    var position    		= $('#position').val();
    var area    			= $('#area').val();
    var price    			= $('#price').val();
    var captcha 			= $('#captcha').val();
    
    if(fullname == '') {
        errors.push('Họ tên không được để trống!');
        $('#fullname').addClass('err');
    }
    if(email == '') {
        errors.push('Email không được để trống!');
        $('#email').addClass('err');
    }else if(!is_email(email))
    {   errors.push('Email không hợp lệ!');
        $('#email').addClass('err');
    }
    if(isNumeric(tel) != true) {
        errors.push('Điện thoại phải là kiểu số!');
        $('#tel').addClass('err');
    }
    if(tel == '') {
        errors.push('Số điện thoại không được để trống!');
        $('#tel').addClass('err');
    }
   
    if(errors.length > 0) {
    	
        show_message('error_ques', 'error', errors, msg_width); return;
    }
    
    var postdata = 'fullname='+fullname+'&email='+email+'&tel='+tel+'&kind_office='+kind_office+'&position='+position+'&area='+area+'&price='+price+'&captcha='+captcha;

    $.ajax({
        type: "POST",
        url: base_url + request_url,
        data: postdata,
        timeout: 10*1000,// 10s
        success: function(data) {
            if(data == 1) {
            	location.href=base_url + 'nhan-bao-gia-thanh-cong.html';
            }else if(data =='captcha'){
           	 show_message('error_ques', 'error', 'Mã xác nhận không chính xác !', msg_width);
            }else {
                show_message('error_ques', 'error', data, msg_width);
            }
        },
        error:function (xhr, textStatus, errorThrown) {
            show_message('error_ques', 'error', 'Error !', msg_width);
        }
    });
 }
