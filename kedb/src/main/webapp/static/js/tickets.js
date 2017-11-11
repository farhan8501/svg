//code to remove active style on level 1		
$(".levelOne ").removeAttr("style");
//code for slide menu 1
$('#category_name').click(function(){
	$('a#ticket_status,a#ticket_priority,a#solutionLinked').removeClass("disable_a_href");
	$('a#ticket_status,a#ticket_priority,a#solutionLinked').addClass("enable_bold");
	$('a#category_name').removeClass("enable_bold");
	$('a#category_name').addClass("disable_a_href"); 
	$('#item-1 a').addClass("disable_a_href");
	$('#item-3 a').removeClass("disable_a_href");
	$('#item-2 a').removeClass("disable_a_href");
	$('#item-4 a').removeClass("disable_a_href");
	
});
$('#ticket_priority').click(function(){
	$('a#ticket_status,a#category_name,a#solutionLinked').removeClass("disable_a_href");
	$('a#ticket_status,a#category_name,a#solutionLinked').addClass("enable_bold");
	$('a#ticket_priority').removeClass("enable_bold");
	$('a#ticket_priority').addClass("disable_a_href");
	$('#item-3 a').addClass("disable_a_href");
	$('#item-1 a').removeClass("disable_a_href");
	$('#item-2 a').removeClass("disable_a_href");
	$('#item-4 a').removeClass("disable_a_href");
});
$('#ticket_status').click(function(){
	$('a#category_name,a#ticket_priority,a#solutionLinked').removeClass("disable_a_href");
	$('a#category_name,a#ticket_priority,a#solutionLinked').addClass("enable_bold");
	$('a#ticket_status').removeClass("enable_bold");
	$('a#ticket_status').addClass("disable_a_href");
	$('#item-2 a').addClass("disable_a_href");
	$('#item-3 a').removeClass("disable_a_href");
	$('#item-4 a').removeClass("disable_a_href");
	$('#item-1 a').removeClass("disable_a_href");
});
$('#solutionLinked').click(function(){
	$('a#ticket_status,a#ticket_priority,a#category_name').removeClass("disable_a_href");
	$('a#ticket_status,a#ticket_priority,a#category_name').addClass("enable_bold");
	$('a#solutionLinked').removeClass("enable_bold");
	$('a#solutionLinked').addClass("disable_a_href");
	$('#item-4 a').addClass("disable_a_href");
	$('#item-3 a').removeClass("disable_a_href");
	$('#item-2 a').removeClass("disable_a_href");
	$('#item-1 a').removeClass("disable_a_href");
});
//code for slide menu 
$(document).ready(function () {
    $('#collapsibleMenu1').BootSideMenu({
  	  // 'left' or 'right'
  	  side: "right",

  	  // animation speed
  	  duration: 500,

  	  // restore last menu status on page refresh
  	  remember: true,

  	  // auto close
  	  autoClose: false,

  	  // push the whole page
  	  pushBody: false,

  	  // close on click
  	  closeOnClick: true,

  	  // width
  	  width: "15%"
    });
    
    $('#collapsibleMenu2').BootSideMenu({

    	  // 'left' or 'right'
    	  side: "right",

    	  // animation speed
    	  duration: 500,

    	  // restore last menu status on page refresh
    	  remember: false,

    	  // auto close
    	  autoClose: true,

    	  // push the whole page
    	  pushBody: false,

    	  // close on click
    	  closeOnClick: true,

    	  // width
    	  width: "15%"
    	  
    	});
});
$(document).ready(function () {
$('#collapsibleMenu1').hide().css("visibility", "hidden");
$('#collapsibleMenu2').hide().css("visibility", "hidden");
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
function setSearchData(){
	//get all ticket number in an array
	
	
	
	for (var i = 0; i <masterData.length - 1; i++) {
	    searchArray.push( masterData[i].ticket_number);
	  
	}
	searchArray = searchArray.sort();
	//console.log(optArray+"ticket_number from optArray");
	
	//placeholder for search box

	$('#search').focus(
		    function(){
		        $(this).val('');
		    });
	
	$(function () {
	    $("#search").autocomplete({
	    	 maxShowItems: 10,
	        source: searchArray
	    });
	});
	//$( "#search" ).autocomplete("widget").addClass("scrollFixedHeight");
	$("#searchButton").click(function(){
		
	    //find the node
	    var selectedVal = document.getElementById('search').value;
	   
	    console.log("selected value from the search box:"+selectedVal);
	    var node = svg.selectAll("circle");
	    if (selectedVal == "none") {
	        node.style("stroke", "white").style("stroke-width", "1");
	    } else {
	        var selected = node.filter(function (d, i) {
	            return d.ticket_number != selectedVal;
/*						        node.on("click", function(d) {
		        	node.classed('selected', false);
		        	d3.select(this).classed('selected', true)
		    	});*/
	        });
	        
	        //reset bubble attr
	        nodes.classed('selected', false).attr("r",rSwitch).style("opacity","1");
	        
	   var  selectedBubble=node.filter(function(d,i){return d.ticket_number==selectedVal;})
	       // console.log("selected node value:"+selected);
	        selected.style("opacity", "0.6");
	        //selected.classed("selected",false);
	        
	   nodes.classed('selected', false).attr("r",rSwitch).style("opacity","0.6");
	        selectedBubble.classed("selected",true)
	        .attr("r",rSwitch+2).style("opacity",1);
	    
	        d3.selectAll("circle").transition()
	            .duration(5000);
	            /*.style("opacity", 1);*/
	        
	        document.getElementById("incident").innerHTML = "Ticket_Number: "+ selectedVal;
	   
	        $.getJSON('/webkedb/releavancesearchjson/'+ selectedVal,function(data) {
				dataRelevance = data;
				getRelevantData();
			});
	    }
	    document.getElementById("search").value = "";
	});
}