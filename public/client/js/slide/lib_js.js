$(document).ready(function(){
closetimer = 0;
	if($("#nav")) {
		
		$("#nav li b").mouseover(function() {
			if($(this).parent().parent().hasClass('sub'))
			{
				clearTimeout(closetimer);
				if(this.className.indexOf("hover") != -1) {			
					
					$("#nav em").removeClass("hover");
					$("#nav i").removeClass("hover");
					$(this).parent().next().fadeIn("slow");
					$('.shadow2').show();
					$(this).removeClass("hover");
				}
				else {
					
					$('.shadow2').show();
					$("#nav b").removeClass();
					$(this).addClass("hover");
					$("#nav em").removeClass("hover");
					$("#nav i").removeClass("hover");
					$("#nav ul:visible").fadeOut("slow");
					$(this).parent().next().fadeIn("slow");
				}
			}				
			else
			{
				if($("#nav li ul").is(':visible'))
				{
					$("#nav li ul").hide();
					$('.shadow2').hide();
				}
				
			}
			return false;
		});

		$("#nav i").mouseover(function() {
		clearTimeout(closetimer);
			if(this.className.indexOf("hover") != -1) {
				$("#nav em").removeClass("hover");
				$(this).parent().next().slideUp(500);
				$(this).removeClass("hover");
			}
			else {
				$("#nav i").removeClass();
				$(this).addClass("hover");
				$("#nav em").removeClass("hover");
				$(this).parent().next().slideDown(500);
			}
			return false;
		});

		$("#nav em").mouseover(function() {
		clearTimeout(closetimer);
			if(this.className.indexOf("hover") != -1) {
				$(this).parent().next().fadeOut("slow");
				$(this).removeClass("hover");
			}
			else {
				$("#nav em").removeClass();
				$(this).addClass("hover");
				$(this).parent().next().fadeIn("slow");
			}
			return false;
		});

		$("#nav").mouseover(function() {
			clearTimeout(closetimer);			
		});

		$("#nav").mouseout(function() {
			
			closetimer = window.setTimeout(function(){
			$("#nav em").removeClass("hover");
			$("#nav i").removeClass("hover");
			}, 2000);
		}); 
	}
	
	$('.ad-gallery').adGallery();

});