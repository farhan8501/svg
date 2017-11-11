/*$(document).ready(function() {

  $(".toggle-accordion").on("click", function() {
    var accordionId = $(this).attr("accordion-id"),
      numPanelOpen = $(accordionId + ' .collapse.in').length;
    
    $(this).toggleClass("active");

    if (numPanelOpen == 0) {
      openAllPanels(accordionId);
    } else {
      closeAllPanels(accordionId);
    }
  })

  openAllPanels = function(aId) {
    console.log("setAllPanelOpen");
    $(aId + ' .panel-collapse:not(".in")').collapse('show');
  }
  closeAllPanels = function(aId) {
    console.log("setAllPanelclose");
    $(aId + ' .panel-collapse.in').collapse('hide');
  }
     
});*/

var ticket_id;

var prev_ticket_number="";
var callCount=1;

/*$('#num #ticket_id').click(function(e){
ticket_id=$(e.target).text();
console.log("ticket_di::"+ticket_id);
});*/

$('#num span').click(function(e){
	var ticket_number= $(e.target).text();
	ticket_id=jQuery(this).attr("id");
	console.log("ticket_di::"+ticket_id);
	if(callCount!=1){
		console.log("curr ticket_number"+ticket_number);
		
		removeElement(prev_ticket_number);
	}//prev ticket 
	else{console.log("prev elem not removed");}
	removeElement(ticket_number);

    if(ticket_number!=""){
    	//alert("getting relevance");
    $.getJSON('/webkedb/releavancesearchjson/'+ticket_number,function(data) {
    	dataRelevance = data;
    	if(dataRelevance.length>0){
    	console.log(dataRelevance);
    	generateDonut(ticket_number);
    	getRelevantData(ticket_number);
    	}
    	else{
    		$('#'+ ticket_number +'').append('<td colspan="6"><div class="row"><label>sorry there are no solutions for the selected tickets</label></div></td>');
    		}
    });
    }
    else{
    	console.log("relevance cannot be computed");
    //$('#'+ ticket_number +'').append('<td><div class="row"><label>sorry there are no solutions for the selected tickets</label></div></td>');
    }
	
    prev_ticket_number=ticket_number;
    callCount=2;
    console.log("prev ticket_number"+prev_ticket_number);
});

function generateDonut(tNo){
	console.log("generating donuts")
	var length=dataRelevance.length;
	var ticket_number=tNo;
	console.log("ticekt number param value:"+ticket_number);
	if(length>0){
		for(i=1;i<=length;i++){
			
			$('#'+ ticket_number +'').append('<td width="20%"><div class="panel-group"><div class="panel panel-default"><div class="panel-body">Relevant Solutions:<label id="relevantMessage"></label><br/><strong id="incident"></strong></div><div class="row" id="widget'+ i +'"><div class="col-sm-5"> <div id="donut'+ i +'" class="chart-container scontainer"></div><a id="link'+ i +'">Solution<label id="sLabel'+ i +'"></label></a> </div><div class="col-sm-5"><div class="scontainer">Matched:<label id="mLabel'+ i +'"></label></div> <div class="col-sm-5"><a id="aLink'+ i +'"onclick="aLink'+i+'()"><label id="aLabel'+ i +'"></label></a></div><div class="col-sm-5"><button id="like'+ i +'" class="btn btn-block btn-primary bLike"onclick="like'+i+'()"><i  class="fa fa-thumbs-up"></i></button></div></div></div></div></div></td>')
     
		}
		//appending create solution button
		$('#'+ticket_number+'').append('<td width="20%"><a href="/webkedb/newsolution" id="pop"><input type="image" id="myButton" src="static/image/createsolution.png" alt="CreateSolution" style="padding:40px 5px 5px 20px;"></a></td>  ');
	}
	else{
		console.log("relevance length 0");
	}
	
}
function removeElement(elementId) 

{

    // Removes an element from the document
	var list = document.getElementById(elementId);
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
}
/*populating relevant donuts*/
function likeSolution(id){
	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionrating/'+id,
	    success: function(){
	    	$.ajax({
		   		  type:"GET",
		   		  url:'/webkedb/solutionratingvalue/'+id,
		   		  data : "text",
		   		  success:function(response){
		   			$('#rating'+id).html(response);
		   	    }
		   	  })
	    	 $("#like"+id).attr('disabled', true);
	    }
	});
}
$('a').trigger('click');


function aLink1(){
$("#aLink1").click(function (){
	
	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionlink-'+dataRelevance[0].solutionid+ "-" +ticket_id,
	    data: "json", 
	    success: function(response){
	    	 $.ajax({
	   		  type:"GET",
	   		  url:'/webkedb/solution_ticket-'+response+"-"+dataRelevance[0].solutionid+"-"+ticket_id,
	   		  data : "text",
	   		  success:function(response){
	   			  if(response==""){}
	   			  else{
	   		  document.getElementById('aLabel1').innerHTML=response;
	   			  }
	   	    }
	   	  })
	    	
	    }
	});
});
}
function aLink2(){
$("#aLink2").click(function (){
	
	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionlink-'+dataRelevance[1].solutionid+ "-" +ticket_id,
	    data: "json", 
	    success: function(response){
	    	 $.ajax({
	   		  type:"GET",
	   		  url:'/webkedb/solution_ticket-'+response+"-"+dataRelevance[1].solutionid+"-"+ticket_id,
	   		  data : "text",
	   		  success:function(response){
	   			  if(response==""){}
	   			  else{
	   		  document.getElementById('aLabel2').innerHTML=response;
	   			  }
	   	    }
	   	  })
	    	
	    }
	});
});
}
function aLink3(){
$("#aLink3").click(function (){
	
	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionlink-'+dataRelevance[2].solutionid+ "-" +ticket_id,
	    data: "json", 
	    success: function(response){
	    	 $.ajax({
	   		  type:"GET",
	   		  url:'/webkedb/solution_ticket-'+response+"-"+dataRelevance[2].solutionid+"-"+ticket_id,
	   		  data : "text",
	   		  success:function(response){
	   			  if(response==""){}
	   			  else{
	   		  document.getElementById('aLabel3').innerHTML=response;
	   			  }
	   	    }
	   	  })
	    	
	    }
	});
});
}
function aLink4(){
$("#aLink4").click(function (){

	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionlink-'+dataRelevance[3].solutionid+ "-" +ticket_id,
	    data: "json", 
	    success: function(response){
	    	 $.ajax({
	   		  type:"GET",
	   		  url:'/webkedb/solution_ticket-'+response+"-"+dataRelevance[3].solutionid+"-"+ticket_id,
	   		  data : "text",
	   		  success:function(response){
	   			  if(response==""){}
	   			  else{
	   		  document.getElementById('aLabel4').innerHTML=response;
	   			  }
	   	    }
	   	  })
	    	
	    }
	});
});
}
function like1(){
$("#like1").click(function (){
	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionrating/'+dataRelevance[0].solutionid,
	    data: "json", 
	    success: function(response){
	    	 $("#like1").attr('disabled', true);
	    }
	});
	  
});
}
function like2(){
$("#like2").click(function (){
	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionrating/'+dataRelevance[1].solutionid,
	    data: "json", 
	    success: function(response){
	    	 $("#like2").attr('disabled', true);
	    }
	});
	  
});
}
function like3(){
$("#like3").click(function (){
	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionrating/'+dataRelevance[2].solutionid,
	    data: "json", 
	    success: function(response){
	    	 $("#like3").attr('disabled', true);
	    }
	});
	  
});
}
function like4(){
$("#like4").click(function (){
	$.ajax({
	    type: "GET", 
	    url: '/webkedb/solutionrating/'+dataRelevance[3].solutionid,
	    data: "json", 
	    success: function(response){
	    	 $("#like4").attr('disabled', true);
	    }
	});
	  
});
}

function getRelevantData(tNumber){
	console.log("getRelevant called");
    var length=dataRelevance.length;
    var ticket_number=tNumber;
/*	ticket_id = data
	.filter(function(d) {
				return d.ticket_number === ticket_number;
			})
	.map(function(d) {
		return d.ticket_id;
	});*/
    switch (true) {
        case length>=4:
        	$('label[id*="relevantMessage"]').text('');
        $('#widget1').show();
        $('#widget2').show();
        $('#widget3').show();
        $('#widget4').show();
        $('#myButton').show();
    		break;
        case length==3:
        	$('label[id*="relevantMessage"]').text('');
	    $('#widget1').show();
        $('#widget2').show();
        $('#widget3').show();
        $('#widget4').hide();
        $('#myButton').show();

    		break;
        case length==2:
        	$('label[id*="relevantMessage"]').text('');
		$('#widget1').show();
        $('#widget2').show();
        $('#widget3').hide();
        $('#widget4').hide();
        $('#myButton').show();
    		break;
        case length==1:
        	$('label[id*="relevantMessage"]').text('');
		$('#widget1').show();
        $('#widget2').hide();
        $('#widget3').hide();
        $('#widget4').hide();
        $('#myButton').show();
        	break;
        case length==0:
       
        $('#widget1').hide();
        $('#widget2').hide();
        $('#widget3').hide();
        $('#widget4').hide();
        var msg="sorry there are no solutions for the selected tickets";
        document.getElementById("relevantMessage").innerHTML =msg ;
    	break;
        default: 	
    }

    donut1();
    donut2();
    donut3();
    donut4();
}//end of getRelevantData()

function donut1(){
	var createGradient=function(svg,id,color1,color2){

        var defs = svg.append("svg:defs")

        var red_gradient = defs.append("svg:linearGradient")
                .attr("id", id)
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "50%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

        red_gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", color1)
                .attr("stop-opacity", 1);

        red_gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", color2)
                .attr("stop-opacity", 1);
    };
    var matchedText=dataRelevance[0].search_keywords.substring(0,30);
    document.getElementById("mLabel1").innerHTML =matchedText;
    document.getElementById("sLabel1").innerHTML =dataRelevance[0].solutionid;
    document.getElementById("link1").setAttribute("href", "/webkedb/solutions/"+dataRelevance[0].solutionid); 
    document.getElementById("aLabel1").innerHTML =dataRelevance[0].solutionlinked;
    document.getElementById("like1").setAttribute("href", "/webkedb/solutionsrating/"+dataRelevance[0].solutionid);
    
    var percent=dataRelevance[0].relevance;
	

    var ratio=percent/100;
    d3.selectAll("#donut1 > *").remove();
    var pie=d3.layout.pie()
            .value(function(d){return d})
            .sort(null);
    var w=100,h=100;
    var outerRadius=(w/3);
    var innerRadius=45;

    var color = ['#f2503f','#ea0859','#404F70'];

    var svg=d3.select("#donut1")
            .append("svg")
            .attr({
                width:w,
                height:h,
                class:'shadow'
            }).append('g')
            .attr({
                transform:'translate('+w/2.2+','+h/2.2+')'
            });

    createGradient(svg,'gradient',color[0],color[1]);

    var arc=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2*Math.PI);

    var arcLine=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);


    var pathBackground=svg.append('path')

            .attr({
                d:arc
            })
            .style({
                fill:color[2]
            });


    var pathChart=svg.append('path')
            .datum({endAngle:0})
            .attr({
                d:arcLine
            })
            .style({
                fill:'url(#gradient)'
            });

    var middleCount=svg.append('text')
            .text(function(d){
                return d;
            })

            .attr({
                class:'middleText',
                'text-anchor':'middle',
                dy:15,
                dx:-8
            })
            .style({
                fill:color[1],
                'font-size':'30px'

            });
        svg.append('text')
            .text('%')
            .attr({
                class:'percent',
                'text-anchor':'middle',
                dx:20,
                dy:10

            })
            .style({
                fill:color[1],
                'font-size':'15px'

            });

    var arcTween=function(transition, newAngle) {
        transition.attrTween("d", function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            var interpolateCount = d3.interpolate(0, percent);
            return function (t) {
                d.endAngle = interpolate(t);
                middleCount.text(Math.floor(interpolateCount(t)));
                return arcLine(d);
            };
        });
    };


    var animate=function(){
        pathChart.transition()
                .duration(750)
                .ease('cubic')
                .call(arcTween,((2*Math.PI))*ratio);


    };

    setTimeout(animate,0);
};


function donut2(){
	var createGradient=function(svg,id,color1,color2){

        var defs = svg.append("svg:defs")

        var red_gradient = defs.append("svg:linearGradient")
                .attr("id", id)
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "50%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

        red_gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", color1)
                .attr("stop-opacity", 1);

        red_gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", color2)
                .attr("stop-opacity", 1);
    };

 
    var percent=dataRelevance[1].relevance;
    var matchedText=dataRelevance[1].search_keywords.substring(0,30);
    document.getElementById("mLabel2").innerHTML =matchedText;
    document.getElementById("sLabel2").innerHTML =dataRelevance[1].solutionid;
    document.getElementById("link2").setAttribute("href", "/webkedb/solutions/"+dataRelevance[1].solutionid); 
    document.getElementById("aLabel2").innerHTML =dataRelevance[1].solutionlinked;
    
    var ratio=percent/100;
    //clear the chart before redrawing it
    d3.selectAll("#donut2 > *").remove();
    
    var pie=d3.layout.pie()
            .value(function(d){return d})
            .sort(null);
/* manipulate w/h to move svg accordingly*/
    var w=100,h=100;
/* changed from w/2 to w/3 to make donut small  outer radius subtract to reduce thickness*/
    var outerRadius=(w/3);
    var innerRadius=45;

    var color = ['#f2503f','#ea0859','#404F70'];

    var svg=d3.select("#donut2")
            .append("svg")
            .attr({
                width:w,
                height:h,
                class:'shadow'
            }).append('g')
            .attr({
                transform:'translate('+w/2.2+','+h/2.2+')'
            });

    createGradient(svg,'gradient',color[0],color[1]);

    var arc=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2*Math.PI);

    var arcLine=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);


    var pathBackground=svg.append('path')

            .attr({
                d:arc
            })
            .style({
                fill:color[2]
            });


    var pathChart=svg.append('path')
            .datum({endAngle:0})
            .attr({
                d:arcLine
            })
            .style({
                fill:'url(#gradient)'
            });

    var middleCount=svg.append('text')
            .text(function(d){
                return d;
            })

            .attr({
                class:'middleText',
                'text-anchor':'middle',
                dy:15,
                dx:-8
            })
            .style({
                fill:color[1],
                'font-size':'30px'

            });
        svg.append('text')
            .text('%')
            .attr({
                class:'percent',
                'text-anchor':'middle',
                dx:15,
                dy:10

            })
            .style({
                fill:color[1],
                'font-size':'15px'

            });

    var arcTween=function(transition, newAngle) {
        transition.attrTween("d", function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            var interpolateCount = d3.interpolate(0, percent);
            return function (t) {
                d.endAngle = interpolate(t);
                middleCount.text(Math.floor(interpolateCount(t)));
                return arcLine(d);
            };
        });
    };


    var animate=function(){
        pathChart.transition()
                .duration(750)
                .ease('cubic')
                .call(arcTween,((2*Math.PI))*ratio);


    };

    setTimeout(animate,0);
};



function donut3(){
	var createGradient=function(svg,id,color1,color2){

        var defs = svg.append("svg:defs")

        var red_gradient = defs.append("svg:linearGradient")
                .attr("id", id)
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "50%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

        red_gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", color1)
                .attr("stop-opacity", 1);

        red_gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", color2)
                .attr("stop-opacity", 1);
    };

    //var percent =dataset[2].Relavance;
    
    
  //  debugger;
    //alert("percent before"+percent);
    var percent=dataRelevance[2].relevance;
    var matchedText=dataRelevance[2].search_keywords.substring(0,30);
    document.getElementById("mLabel3").innerHTML =matchedText;
    document.getElementById("sLabel3").innerHTML =dataRelevance[2].solutionid;
    document.getElementById("link3").setAttribute("href", "/webkedb/solutions/"+dataRelevance[2].solutionid); 
    document.getElementById("aLabel3").innerHTML =dataRelevance[2].solutionlinked;
	
    var ratio=percent/100;
	d3.selectAll("#donut3 > *").remove();
    var pie=d3.layout.pie()
            .value(function(d){return d})
            .sort(null);
/* manipulate w/h to move svg accordingly*/
    var w=100,h=100;
/* changed from w/2 to w/3 to make donut small  outer radius subtract to reduce thickness*/
    var outerRadius=(w/3);
    var innerRadius=45;

    var color = ['#f2503f','#ea0859','#404F70'];

    var svg=d3.select("#donut3")
            .append("svg")
            .attr({
                width:w,
                height:h,
                class:'shadow'
            }).append('g')
            .attr({
                transform:'translate('+w/2.2+','+h/2.2+')'
            });

    createGradient(svg,'gradient',color[0],color[1]);

    var arc=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2*Math.PI);

    var arcLine=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);


    var pathBackground=svg.append('path')

            .attr({
                d:arc
            })
            .style({
                fill:color[2]
            });


    var pathChart=svg.append('path')
            .datum({endAngle:0})
            .attr({
                d:arcLine
            })
            .style({
                fill:'url(#gradient)'
            });

    var middleCount=svg.append('text')
            .text(function(d){
                return d;
            })

            .attr({
                class:'middleText',
                'text-anchor':'middle',
                dy:15,
                dx:-8
            })
            .style({
                fill:color[1],
                'font-size':'30px'

            });
        svg.append('text')
            .text('%')
            .attr({
                class:'percent',
                'text-anchor':'middle',
                dx:15,
                dy:10

            })
            .style({
                fill:color[1],
                'font-size':'15px'

            });

    var arcTween=function(transition, newAngle) {
        transition.attrTween("d", function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            var interpolateCount = d3.interpolate(0, percent);
            return function (t) {
                d.endAngle = interpolate(t);
                middleCount.text(Math.floor(interpolateCount(t)));
                return arcLine(d);
            };
        });
    };


    var animate=function(){
        pathChart.transition()
                .duration(750)
                .ease('cubic')
                .call(arcTween,((2*Math.PI))*ratio);


    };

    setTimeout(animate,0);
//}//draw end
};




function donut4(){
	var createGradient=function(svg,id,color1,color2){

        var defs = svg.append("svg:defs")

        var red_gradient = defs.append("svg:linearGradient")
                .attr("id", id)
                .attr("x1", "0%")
                .attr("y1", "0%")
                .attr("x2", "50%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

        red_gradient.append("svg:stop")
                .attr("offset", "50%")
                .attr("stop-color", color1)
                .attr("stop-opacity", 1);

        red_gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", color2)
                .attr("stop-opacity", 1);
    };

   
    var percent =dataRelevance[3].relevance;
    var matchedText=dataRelevance[3].search_keywords.substring(0,30);
    document.getElementById("mLabel4").innerHTML =matchedText;
    document.getElementById("sLabel4").innerHTML =dataRelevance[3].solutionid;
    document.getElementById("link4").setAttribute("href", "/webkedb/solutions/"+dataRelevance[3].solutionid); 
    document.getElementById("aLabel4").innerHTML =dataRelevance[3].solutionlinked;
    
    var ratio=percent/100;
    
    //clear the chart before redrawing it
    d3.selectAll("#donut4 > *").remove();
    
    var pie=d3.layout.pie()
            .value(function(d){return d})
            .sort(null);
/* manipulate w/h to move svg accordingly*/
    var w=100,h=100;
/* changed from w/2 to w/3 to make donut small  outer radius subtract to reduce thickness*/
    var outerRadius=(w/3);
    var innerRadius=45;

    var color = ['#f2503f','#ea0859','#404F70'];

    var svg=d3.select("#donut4")
            .append("svg")
            .attr({
                width:w,
                height:h,
                class:'shadow'
            }).append('g')
            .attr({
                transform:'translate('+w/2.2+','+h/2.2+')'
            });

    createGradient(svg,'gradient',color[0],color[1]);

    var arc=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0)
            .endAngle(2*Math.PI);

    var arcLine=d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .startAngle(0);


    var pathBackground=svg.append('path')

            .attr({
                d:arc
            })
            .style({
                fill:color[2]
            });


    var pathChart=svg.append('path')
            .datum({endAngle:0})
            .attr({
                d:arcLine
            })
            .style({
                fill:'url(#gradient)'
            });

    var middleCount=svg.append('text')
            .text(function(d){
                return d;
            })

            .attr({
                class:'middleText',
                'text-anchor':'middle',
                dy:15,
                dx:-8
            })
            .style({
                fill:color[1],
                'font-size':'30px'

            });
        svg.append('text')
            .text('%')
            .attr({
                class:'percent',
                'text-anchor':'middle',
                dx:15,
                dy:10

            })
            .style({
                fill:color[1],
                'font-size':'15px'

            });

    var arcTween=function(transition, newAngle) {
        transition.attrTween("d", function (d) {
            var interpolate = d3.interpolate(d.endAngle, newAngle);
            var interpolateCount = d3.interpolate(0, percent);
            return function (t) {
                d.endAngle = interpolate(t);
                middleCount.text(Math.floor(interpolateCount(t)));
                return arcLine(d);
            };
        });
    };


    var animate=function(){
        pathChart.transition()
                .duration(750)
                .ease('cubic')
                .call(arcTween,((2*Math.PI))*ratio);


    };

    setTimeout(animate,0);
};
