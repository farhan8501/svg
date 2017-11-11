
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
	   		  document.getElementById('aLabel1').innerHTML=response;
	   	    }
	   	  })
	    	
	    }
	});
});
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
	   		  document.getElementById('aLabel2').innerHTML=response;
	   	    }
	   	  })
	    	
	    }
	});
});

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
	   		  document.getElementById('aLabel3').innerHTML=response;
	   	    }
	   	  })
	    	
	    }
	});
});

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
	   		  document.getElementById('aLabel4').innerHTML=response;
	   	    }
	   	  })
	    	
	    }
	});
});

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


function getRelevantData(){
    var length=dataRelevance.length;
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
	/* manipulate w/h to move svg accordingly*/
    var width=100,height=100;
/* changed from w/2 to w/3 to make donut small  outer radius subtract to reduce thickness*/
/*    var outerRadius=(w/3);
    var innerRadius=45;*/
    var duration = 1500,
    transition = 200;
    
    var matchedText=dataRelevance[0].search_keywords.substring(0,30);
    document.getElementById("mLabel1").innerHTML =matchedText;
    document.getElementById("sLabel1").innerHTML =dataRelevance[0].solutionid;
    document.getElementById("link1").setAttribute("href", "/webkedb/solutions/"+dataRelevance[0].solutionid); 
    document.getElementById("aLabel1").innerHTML =dataRelevance[0].solutionlinked;
    document.getElementById("like1").setAttribute("href", "/webkedb/solutionsrating/"+dataRelevance[0].solutionid);
    var percent=dataRelevance[0].relevance;
	

    d3.selectAll("#donut1 > *").remove();


var dataset = {
            lower: calcPercent(0),
            upper: calcPercent(percent)
        },
        radius = Math.min(width, height) / 3,
        pie = d3.pie().sort(null),
        format = d3.format(".0%");

var arc = d3.arc()
        .innerRadius(radius * .8)
        .outerRadius(radius);

var svg = d3.select("#donut1").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
                .data(pie(dataset.lower))
                .enter().append("path")
                .attr("class", function (d, i) {
                    return "color" + i
                })
                .attr("d", arc)
                .each(function (d) {
                    this._current = d;
                });

var text = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em");

var progress = 0;

var timeout = setTimeout(function () {
    clearTimeout(timeout);
    path = path.data(pie(dataset.upper));
    path.transition().duration(duration).attrTween("d", function (a) {
        var i = d3.interpolate(this._current, a);
        var i2 = d3.interpolate(progress, percent)
        this._current = i(0);
        return function (t) {
            text.text(format(i2(t) / 100));
            return arc(i(t));
        };
    });
}, 200);

function calcPercent(percent) {
    return [percent, 100 - percent];
};
};


function donut2(){
	/* manipulate w/h to move svg accordingly*/
    var width=100,height=100;
/* changed from w/2 to w/3 to make donut small  outer radius subtract to reduce thickness*/
/*    var outerRadius=(w/3);
    var innerRadius=45;*/
    var duration = 1500,
    transition = 200;
 
    var percent=dataRelevance[1].relevance;
    var matchedText=dataRelevance[1].search_keywords.substring(0,30);
    document.getElementById("mLabel2").innerHTML =matchedText;
    document.getElementById("sLabel2").innerHTML =dataRelevance[1].solutionid;
    document.getElementById("link2").setAttribute("href", "/webkedb/solutions/"+dataRelevance[1].solutionid); 
    document.getElementById("aLabel2").innerHTML =dataRelevance[1].solutionlinked;
    
   
    //clear the chart before redrawing it
    d3.selectAll("#donut2 > *").remove();
    
    var dataset = {
            lower: calcPercent(0),
            upper: calcPercent(percent)
        },
        radius = Math.min(width, height) / 3,
        pie = d3.pie().sort(null),
        format = d3.format(".0%");

var arc = d3.arc()
        .innerRadius(radius * .8)
        .outerRadius(radius);

var svg = d3.select("#donut2").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
                .data(pie(dataset.lower))
                .enter().append("path")
                .attr("class", function (d, i) {
                    return "color" + i
                })
                .attr("d", arc)
                .each(function (d) {
                    this._current = d;
                });

var text = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em");

var progress = 0;

var timeout = setTimeout(function () {
    clearTimeout(timeout);
    path = path.data(pie(dataset.upper));
    path.transition().duration(duration).attrTween("d", function (a) {
        var i = d3.interpolate(this._current, a);
        var i2 = d3.interpolate(progress, percent)
        this._current = i(0);
        return function (t) {
            text.text(format(i2(t) / 100));
            return arc(i(t));
        };
    });
}, 200);

function calcPercent(percent) {
    return [percent, 100 - percent];
};
};



function donut3(){
	/* manipulate w/h to move svg accordingly*/
    var width=100,height=100;
/* changed from w/2 to w/3 to make donut small  outer radius subtract to reduce thickness*/
/*    var outerRadius=(w/3);
    var innerRadius=45;*/
    var duration = 1500,
    transition = 200;
	  //  debugger;
    //alert("percent before"+percent);
    var percent=dataRelevance[2].relevance;
    var matchedText=dataRelevance[2].search_keywords.substring(0,30);
    document.getElementById("mLabel3").innerHTML =matchedText;
    document.getElementById("sLabel3").innerHTML =dataRelevance[2].solutionid;
    document.getElementById("link3").setAttribute("href", "/webkedb/solutions/"+dataRelevance[2].solutionid); 
    document.getElementById("aLabel3").innerHTML =dataRelevance[2].solutionlinked;
	
   
	d3.selectAll("#donut3 > *").remove();
	var dataset = {
            lower: calcPercent(0),
            upper: calcPercent(percent)
        },
        radius = Math.min(width, height) / 3,
        pie = d3.pie().sort(null),
        format = d3.format(".0%");

var arc = d3.arc()
        .innerRadius(radius * .8)
        .outerRadius(radius);

var svg = d3.select("#donut3").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
                .data(pie(dataset.lower))
                .enter().append("path")
                .attr("class", function (d, i) {
                    return "color" + i
                })
                .attr("d", arc)
                .each(function (d) {
                    this._current = d;
                });

var text = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em");

var progress = 0;

var timeout = setTimeout(function () {
    clearTimeout(timeout);
    path = path.data(pie(dataset.upper));
    path.transition().duration(duration).attrTween("d", function (a) {
        var i = d3.interpolate(this._current, a);
        var i2 = d3.interpolate(progress, percent)
        this._current = i(0);
        return function (t) {
            text.text(format(i2(t) / 100));
            return arc(i(t));
        };
    });
}, 200);

function calcPercent(percent) {
    return [percent, 100 - percent];
};
};




function donut4(){
	
	/* manipulate w/h to move svg accordingly*/
    var width=100,height=100;
/* changed from w/2 to w/3 to make donut small  outer radius subtract to reduce thickness*/
/*    var outerRadius=(w/3);
    var innerRadius=45;*/
    var duration = 1500,
    transition = 200;
    var percent =dataRelevance[3].relevance;
    var matchedText=dataRelevance[3].search_keywords.substring(0,30);
    document.getElementById("mLabel4").innerHTML =matchedText;
    document.getElementById("sLabel4").innerHTML =dataRelevance[3].solutionid;
    document.getElementById("link4").setAttribute("href", "/webkedb/solutions/"+dataRelevance[3].solutionid); 
    document.getElementById("aLabel4").innerHTML =dataRelevance[3].solutionlinked;
    
   
    //clear the chart before redrawing it
    d3.selectAll("#donut4 > *").remove();
    
    var dataset = {
            lower: calcPercent(0),
            upper: calcPercent(percent)
        },
        radius = Math.min(width, height) / 3,
        pie = d3.pie().sort(null),
        format = d3.format(".0%");

var arc = d3.arc()
        .innerRadius(radius * .8)
        .outerRadius(radius);

var svg = d3.select("#donut4").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var path = svg.selectAll("path")
                .data(pie(dataset.lower))
                .enter().append("path")
                .attr("class", function (d, i) {
                    return "color" + i
                })
                .attr("d", arc)
                .each(function (d) {
                    this._current = d;
                });

var text = svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".3em");

var progress = 0;

var timeout = setTimeout(function () {
    clearTimeout(timeout);
    path = path.data(pie(dataset.upper));
    path.transition().duration(duration).attrTween("d", function (a) {
        var i = d3.interpolate(this._current, a);
        var i2 = d3.interpolate(progress, percent)
        this._current = i(0);
        return function (t) {
            text.text(format(i2(t) / 100));
            return arc(i(t));
        };
    });
}, 200);

function calcPercent(percent) {
    return [percent, 100 - percent];
};
};
