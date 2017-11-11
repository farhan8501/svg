//code to remove active style on level 1		
$(".levelOne ").removeAttr("style");
//code for slide menu 1
$('#category_name').click(function(){
	$('a#status,a#ticket_priority,a#solutionLinked').removeClass("disable_a_href");
	$('a#status,a#ticket_priority,a#solutionLinked').addClass("enable_bold");
	$('a#category_name').removeClass("enable_bold");
	$('a#category_name').addClass("disable_a_href"); 
	$('#item-1 a').addClass("disable_a_href");
	$('#item-3 a').removeClass("disable_a_href");
	$('#item-2 a').removeClass("disable_a_href");
	$('#item-4 a').removeClass("disable_a_href");
});
$('#status').click(function(){
	$('a#category_name,a#ticket_priority,a#solutionLinked').removeClass("disable_a_href");
	$('a#category_name,a#ticket_priority,a#solutionLinked').addClass("enable_bold");
	$('a#status').removeClass("enable_bold");
	$('a#status').addClass("disable_a_href");
	$('#item-2 a').addClass("disable_a_href");
	$('#item-3 a').removeClass("disable_a_href");
	$('#item-4 a').removeClass("disable_a_href");
	$('#item-1 a').removeClass("disable_a_href");
});
$('#solutionLinked').click(function(){
	$('a#status,a#ticket_priority,a#category_name').removeClass("disable_a_href");
	$('a#status,a#ticket_priority,a#category_name').addClass("enable_bold");
	$('a#solutionLinked').removeClass("enable_bold");
	$('a#solutionLinked').addClass("disable_a_href");
	$('#item-4 a').addClass("disable_a_href");
	$('#item-3 a').removeClass("disable_a_href");
	$('#item-2 a').removeClass("disable_a_href");
	$('#item-1 a').removeClass("disable_a_href");
});
$('a#search_keyword').addClass("enable_bold");
//code for slide menu 
$(document).ready(function () {
    $('#collapsibleMenu3').BootSideMenu({
        side: "right",
        pushBody: true,
        remember: false
    });
    
    $('#collapsibleMenu4').BootSideMenu({

    	  // 'left' or 'right'
    	  side: "right",

    	  // animation speed
    	  duration: 500,

    	  // restore last menu status on page refresh
    	  remember: true,

    	  // auto close
    	  autoClose: true,

    	  // push the whole page
    	  pushBody: true,

    	  // close on click
    	  closeOnClick: true,

    	  // width
    	  width: "15%"
    	  
    	});
});
$(document).ready(function () {
	$('#collapsibleMenu3').hide().css("visibility", "hidden");
	$('#collapsibleMenu4').hide().css("visibility", "hidden");
	});
hideRelevantDonut();
//code to hide donut on initial page load
function hideRelevantDonut(){
$('#widget1').hide();
$('#widget2').hide();
$('#widget3').hide();
$('#widget4').hide();
$('#myButton').hide();
}
