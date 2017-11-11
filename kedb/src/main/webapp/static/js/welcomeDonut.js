function donut1(){
	/* no of incidents in a category*/

	var pie=d3.layout.pie()
	  .value(function(d){return d.count})
	  .sort(null)
	  .padAngle(.03);

	var w=300,h=300;

	var outerRadius=w/3;
	var innerRadius=50;

	var color = d3.scale.category10();

	var arc=d3.svg.arc()
	  .outerRadius(outerRadius)
	  .innerRadius(innerRadius);

	var svg=d3.select("#donut1")
	  .append("svg")
	  .attr({
	      width:w,
	      height:h,
	      class:'shadow'
	  }).append('g')
	  .attr({
	      transform:'translate('+w/3+','+h/3+')'
	  });
	d3.json("/webkedb/solutioncategoriescount", function(error, data) {

		  data.forEach(function(d) {
		    d.count = +d.count;
		  });
	var path=svg.selectAll('path')
	  .data(pie(data))
	  .enter()
	  .append('path')
	  .attr({
	      d:arc,
	      fill:function(d,i){
	          return color(d.data.categoryname);
	      }
	  });

	path.transition()
	  .duration(1000)
	  .attrTween('d', function(d) {
	      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
	      return function(t) {
	          return arc(interpolate(t));
	      };
	  });
	  var restOfTheData=function(){
	    var text=svg.selectAll('text')
	        .data(pie(data))
	        .enter()
	        .append("text")
	        .transition()
	        .duration(200)
	        .attr("transform", function (d) {
	            return "translate(" + arc.centroid(d) + ")";
	        })
	        .attr("dy", ".4em")
	        .attr("text-anchor", "right")
	        .text(function(d){
	            return d.data.count;
	        })
	        .style({
	            fill:'#fff',
	            'font-size':'15px'
	        });
	    var legendRectSize=15;
	    var legendSpacing=7;
	    var legendHeight=legendRectSize+legendSpacing;


	    var legend=svg.selectAll('.legend')
	        .data(color.domain())
	        .enter()
	        .append('g')
	        .attr({
	            class:'legend',
	            transform:function(d,i){
	                //Just a calculation for x & y position
	                return 'translate(100,' + ((i*legendHeight)+80) + ')';
	            }
	        });
	    legend.append('rect')
	        .attr({
	            width:legendRectSize,
	            height:legendRectSize,
	            rx:15,
	            ry:15
	        })
	        .style({
	            fill:color,
	            stroke:color
	        });

	    legend.append('text')
	        .attr({
	            x:30,
	            y:15
	        })
	        .text(function(d){
	            return d;
	        }).style({
	            fill:'#929DAF',
	            'font-size':'14px'
	        });
	};
	
	setTimeout(restOfTheData,1000);
	});//d3.json end
}
function donut2(){
	/* solution status */

	var pie=d3.layout.pie()
	  .value(function(d){return d.count})
	  .sort(null)
	  .padAngle(.03);

	var w=300,h=300;

	var outerRadius=w/3;
	var innerRadius=50;

	var color = d3.scale.category10();

	var arc=d3.svg.arc()
	  .outerRadius(outerRadius)
	  .innerRadius(innerRadius);

	var svg=d3.select("#donut2")
	  .append("svg")
	  .attr({
	      width:w,
	      height:h,
	      class:'shadow'
	  }).append('g')
	  .attr({
	      transform:'translate('+w/3+','+h/3+')'
	  });
	d3.json("/webkedb/solutionstatuscount", function(error, data) {

		  data.forEach(function(d) {
		    d.count = +d.count;
		  });
	var path=svg.selectAll('path')
	  .data(pie(data))
	  .enter()
	  .append('path')
	  .attr({
	      d:arc,
	      fill:function(d,i){
	          return color(d.data.status);
	      }
	  });

	path.transition()
	  .duration(1000)
	  .attrTween('d', function(d) {
	      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
	      return function(t) {
	          return arc(interpolate(t));
	      };
	  });
	  var restOfTheData=function(){
	    var text=svg.selectAll('text')
	        .data(pie(data))
	        .enter()
	        .append("text")
	        .transition()
	        .duration(200)
	        .attr("transform", function (d) {
	            return "translate(" + arc.centroid(d) + ")";
	        })
	        .attr("dy", ".4em")
	        .attr("text-anchor", "right")
	        .text(function(d){
	            return d.data.count;
	        })
	        .style({
	            fill:'#fff',
	            'font-size':'15px'
	        });
	    var legendRectSize=15;
	    var legendSpacing=7;
	    var legendHeight=legendRectSize+legendSpacing;


	    var legend=svg.selectAll('.legend')
	        .data(color.domain())
	        .enter()
	        .append('g')
	        .attr({
	            class:'legend',
	            transform:function(d,i){
	                //Just a calculation for x & y position
	                return 'translate(85,' + ((i*legendHeight)+80) + ')';
	            }
	        });
	    legend.append('rect')
	        .attr({
	            width:legendRectSize,
	            height:legendRectSize,
	            rx:15,
	            ry:15
	        })
	        .style({
	            fill:color,
	            stroke:color
	        });

	    legend.append('text')
	        .attr({
	            x:30,
	            y:15
	        })
	        .text(function(d){
	            return d;
	        }).style({
	            fill:'#929DAF',
	            'font-size':'14px'
	        });
	};

	setTimeout(restOfTheData,1000);
	});//d3.json end
}
function donut3(){
	/* solutions linked/not linked count*/

	var pie=d3.layout.pie()
	  .value(function(d){return d.count})
	  .sort(null)
	  .padAngle(.03);

	var w=300,h=300;

	var outerRadius=w/3;
	var innerRadius=50;

	var color = d3.scale.category10();

	var arc=d3.svg.arc()
	  .outerRadius(outerRadius)
	  .innerRadius(innerRadius);

	var svg=d3.select("#donut3")
	  .append("svg")
	  .attr({
	      width:w,
	      height:h,
	      class:'shadow'
	  }).append('g')
	  .attr({
	      transform:'translate('+w/3+','+h/3+')'
	  });
	d3.json("/webkedb/Solutionlinkedcount", function(error, data) {

		  data.forEach(function(d) {
		    d.count = +d.count;
		  });
	var path=svg.selectAll('path')
	  .data(pie(data))
	  .enter()
	  .append('path')
	  .attr({
	      d:arc,
	      fill:function(d,i){
	          return color(d.data.name);
	      }
	  });

	path.transition()
	  .duration(1000)
	  .attrTween('d', function(d) {
	      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
	      return function(t) {
	          return arc(interpolate(t));
	      };
	  });
	  var restOfTheData=function(){
	    var text=svg.selectAll('text')
	        .data(pie(data))
	        .enter()
	        .append("text")
	        .transition()
	        .duration(200)
	        .attr("transform", function (d) {
	            return "translate(" + arc.centroid(d) + ")";
	        })
	        .attr("dy", ".4em")
	        .attr("text-anchor", "right")
	        .text(function(d){
	            return d.data.count;
	        })
	        .style({
	            fill:'#fff',
	            'font-size':'15px'
	        });
	    var legendRectSize=15;
	    var legendSpacing=7;
	    var legendHeight=legendRectSize+legendSpacing;


	    var legend=svg.selectAll('.legend')
	        .data(color.domain())
	        .enter()
	        .append('g')
	        .attr({
	            class:'legend',
	            transform:function(d,i){
	                //Just a calculation for x & y position
	                return 'translate(85,' + ((i*legendHeight)+80) + ')';
	            }
	        });
	    legend.append('rect')
	        .attr({
	            width:legendRectSize,
	            height:legendRectSize,
	            rx:15,
	            ry:15
	        })
	        .style({
	            fill:color,
	            stroke:color
	        });

	    legend.append('text')
	        .attr({
	            x:30,
	            y:15
	        })
	        .text(function(d){
	            return d;
	        }).style({
	            fill:'#929DAF',
	            'font-size':'14px'
	        });
	};

	setTimeout(restOfTheData,1000);
	});//d3.json end
}
function donut4(){
	/* solution status */
	var pie=d3.layout.pie()
	  .value(function(d){return d.count})
	  .sort(null)
	  .padAngle(.03);

	var w=300,h=300;

	var outerRadius=w/3;
	var innerRadius=50;

	var color = d3.scale.category10();

	var arc=d3.svg.arc()
	  .outerRadius(outerRadius)
	  .innerRadius(innerRadius);

	var svg=d3.select("#donut4")
	  .append("svg")
	  .attr({
	      width:w,
	      height:h,
	      class:'shadow'
	  }).append('g')
	  .attr({
	      transform:'translate('+w/3+','+h/3+')'
	  });
	d3.json("/webkedb/contributerscount", function(error, data) {

		  data.forEach(function(d) {
		    d.count = +d.count;
		  });
	var path=svg.selectAll('path')
	  .data(pie(data))
	  .enter()
	  .append('path')
	  .attr({
	      d:arc,
	      fill:function(d,i){
	          return color(d.data.username);
	      }
	  });

	path.transition()
	  .duration(1000)
	  .attrTween('d', function(d) {
	      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
	      return function(t) {
	          return arc(interpolate(t));
	      };
	  });
	  var restOfTheData=function(){
	    var text=svg.selectAll('text')
	        .data(pie(data))
	        .enter()
	        .append("text")
	        .transition()
	        .duration(200)
	        .attr("transform", function (d) {
	            return "translate(" + arc.centroid(d) + ")";
	        })
	        .attr("dy", ".4em")
	        .attr("text-anchor", "right")
	        .text(function(d){
	            return d.data.count;
	        })
	        .style({
	            fill:'#fff',
	            'font-size':'15px'
	        });
	    var legendRectSize=15;
	    var legendSpacing=7;
	    var legendHeight=legendRectSize+legendSpacing;


	    var legend=svg.selectAll('.legend')
	        .data(color.domain())
	        .enter()
	        .append('g')
	        .attr({
	            class:'legend',
	            transform:function(d,i){
	                //Just a calculation for x & y position
	                return 'translate(85,' + ((i*legendHeight)+80) + ')';
	            }
	        });
	    legend.append('rect')
	        .attr({
	            width:legendRectSize,
	            height:legendRectSize,
	            rx:15,
	            ry:15
	        })
	        .style({
	            fill:color,
	            stroke:color
	        });

	    legend.append('text')
	        .attr({
	            x:30,
	            y:15
	        })
	        .text(function(d){
	            return d;
	        }).style({
	            fill:'#929DAF',
	            'font-size':'14px'
	        });
	};

	setTimeout(restOfTheData,1000);
	});//d3.json end
}
function donut5(){
	/* incidents linked/not linked count*/

	var pie=d3.layout.pie()
	  .value(function(d){return d.count})
	  .sort(null)
	  .padAngle(.03);

	var w=300,h=300;

	var outerRadius=w/3;
	var innerRadius=50;

	var color = d3.scale.category10();

	var arc=d3.svg.arc()
	  .outerRadius(outerRadius)
	  .innerRadius(innerRadius);

	var svg=d3.select("#donut5")
	  .append("svg")
	  .attr({
	      width:w,
	      height:h,
	      class:'shadow'
	  }).append('g')
	  .attr({
	      transform:'translate('+w/3+','+h/3+')'
	  });
	d3.json("/webkedb/Incidentlinkedcount", function(error, data) {

		  data.forEach(function(d) {
		    d.count = +d.count;
		  });
	var path=svg.selectAll('path')
	  .data(pie(data))
	  .enter()
	  .append('path')
	  .attr({
	      d:arc,
	      fill:function(d,i){
	          return color(d.data.name);
	      }
	  });

	path.transition()
	  .duration(1000)
	  .attrTween('d', function(d) {
	      var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
	      return function(t) {
	          return arc(interpolate(t));
	      };
	  });
	  var restOfTheData=function(){
	    var text=svg.selectAll('text')
	        .data(pie(data))
	        .enter()
	        .append("text")
	        .transition()
	        .duration(200)
	        .attr("transform", function (d) {
	            return "translate(" + arc.centroid(d) + ")";
	        })
	        .attr("dy", ".4em")
	        .attr("text-anchor", "right")
	        .text(function(d){
	            return d.data.count;
	        })
	        .style({
	            fill:'#fff',
	            'font-size':'15px'
	        });
	    var legendRectSize=15;
	    var legendSpacing=7;
	    var legendHeight=legendRectSize+legendSpacing;


	    var legend=svg.selectAll('.legend')
	        .data(color.domain())
	        .enter()
	        .append('g')
	        .attr({
	            class:'legend',
	            transform:function(d,i){
	                //Just a calculation for x & y position
	                return 'translate(85,' + ((i*legendHeight)+80) + ')';
	            }
	        });
	    legend.append('rect')
	        .attr({
	            width:legendRectSize,
	            height:legendRectSize,
	            rx:15,
	            ry:15
	        })
	        .style({
	            fill:color,
	            stroke:color
	        });

	    legend.append('text')
	        .attr({
	            x:30,
	            y:15
	        })
	        .text(function(d){
	            return d;
	        }).style({
	            fill:'#929DAF',
	            'font-size':'14px'
	        });
	};

	setTimeout(restOfTheData,1000);
	});//d3.json end
}

function lineChart(){
var margin = {top: 15, right: 10, bottom: 15, left: 50},width=300,height=300;

// Parse the date / time
var parseDate = d3.time.format("%Y-%m-%d").parse;

// Set the ranges
var x = d3.time.scale().range([0, 250]);
var y = d3.scale.linear().range([250, 0]);

// Define the axes
var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(5);

var yAxis = d3.svg.axis().scale(y)
    .orient("left").ticks(5);

// Define the line
var valueline = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); });
    
// Adds the svg canvas
var svg = d3.select("#line")
.append("svg")
    .attr("width", 360)
    .attr("height", 350)
.append("g")
    .attr("transform", 
          "translate(" + 60+ "," + 55+ ")");

// Get the data
d3.json("/webkedb/solutionslist", function(error, data) {
    data.forEach(function(d) {
        d.date = parseDate(d.date);
        d.value = +d.value;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.date; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    // Add the valueline path.
    svg.append("path")
        .attr("class", "line")
        .attr("d", valueline(data));

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + 250 + ")")
        .call(xAxis);

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

});	

}
function lineChart1(){
	d3.json('/webkedb/solutionslist', function(day_data) {
		  var formatDate = d3.time.format("%Y-%m-%d");
		  var bisectDate = d3.bisector(function(d) { return formatDate.parse(d['date']); }).left;

		  // fix those integers
		  day_data.forEach(function(d, i) {
		    d.value = parseInt(d.value);
		  });

		  ///////////////////////
		  // generate weekly data
		  var week_data = create_time_unit_data(parse_for_week);

		  function parse_for_week(date) {
		    return formatDate.parse(date).getDay();
		  }

		  ///////////////////////
		  // generate monthly data
		  var month_data = create_time_unit_data(parse_for_month);

		  function parse_for_month(date) {
		    return formatDate.parse(date).getDate() - 1;
		  }

		  ///////////////////////
		  // helper functions
		  function create_time_unit_data(parse_date) {
		    var new_data = JSON.parse(JSON.stringify(day_data));
		    new_data.forEach(function(d, i) {
		      var offset = parse_date(d.date);
		      if(offset == 0 || i == 0 || i == day_data.length - 1) { // it's a new date_unit, or this is the first or last date in the array
		        d['start'] = true;
		      } else {
		        d['start'] = false;

		        // add this value to the start of the week
		        var tar_idx = i - offset;
		        if(tar_idx < 0) { tar_idx = 0; }
		        new_data[tar_idx].value += d.value;

		        // then nil out
		        d.value = -1;
		      }
		    });

		    fill_in_gaps(new_data);
		    return new_data;
		  }

		  function fill_in_gaps(data_array) {
		    // go back in and fill in the missing dates
		    data_array.forEach(function(d, i) {
		      if(d.start == false) {
		        var prev_val, next_val, prev_dist, next_dist;
		        for(var idx = i; idx>=0; idx--) {
		          if(data_array[idx].start == true) {
		            prev_val = data_array[idx].value;
		            prev_dist = i - idx;
		            break;
		          }
		        }

		        for(var idx = i; idx < data_array.length; idx++) {
		          if(data_array[idx].start == true) {
		            next_val = data_array[idx].value;
		            next_dist = idx - i;
		            break;
		          }
		        }

		        d.value = prev_val + ((next_val - prev_val) * (prev_dist/ (prev_dist + next_dist)));
		      }
		    });
		  }

		  ///////////////////////
		  // Time unit selection buttons
		  var all_data = [
		    { 'name': 'daily', 'data': day_data},
		    { 'name': 'weekly', 'data': week_data},
		    { 'name': 'monthly', 'data': month_data}
		  ];

		  d3.select('.button-area').selectAll('.app-button')
		    .data(all_data)
		    .enter().append('button')
		    .attr('class', 'app-button')
		    .html(function(d) { return d.name; })
		    .on('click', function(d) {
		      curr_data = d.data;
		      updateChart();
		    });

		  ///////////////////////
		  // Chart Size Setup
		  var margin = { top: 10, right: 15, bottom: 10, left: 10 };

		  var width = 340 - margin.left - margin.right;
		  var height = 200 - margin.top - margin.bottom;

		  var chart = d3.select(".chart")
		      .attr("width", 340)
		      .attr("height", 200)
		    .append("g")
		      .attr("transform", "translate(" + 0 + "," + 0 + ")");

		  ///////////////////////
		  // Title
		 /* chart.append("text")
		    .text("Time Series")
		    .attr("text-anchor", "middle")
		    .attr("class", "graph-title")
		    .attr("y", -10)
		    .attr("x", width / 2.0);

		  chart.append("text")
		    .attr("text-anchor", "middle")
		    .attr("style", "font-size: 0.9em")
		    .attr("y", height + 50)
		    .attr("x", width / 2.0);
		*/
		  ///////////////////////
		  // Scales
		  var x = d3.time.scale()
		      .domain(d3.extent(day_data, function(d) { return formatDate.parse(d.date); }))
		      .range([0, width]);

		  var y;

		  ///////////////////////
		  // Axis
		  var xAxis = d3.svg.axis()
		      .scale(x)
		      .orient("bottom");

		  chart.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

		  ///////////////////////
		  // Tooltips
		  var overlay = chart.append("rect")
		      .attr("class", "overlay")
		      .attr("width", width)
		      .attr("height", height)
		      .on("mouseover", function() { chart.selectAll('.focus').style("display", null); })
		      .on("mouseout", function() { chart.selectAll('.focus').style("display", "none"); })

		 // var tooltip = d3.select("body").append("div")
		   //   .attr("class", "tooltip");

		  var focus = chart.append("g")
		      .attr("class", "focus")
		      .style("display", "none");

		  focus.append("circle")
		      .attr("r", 4.5)

		  focus.append("text")
		      .attr("x", 9)
		      .attr("dy", ".35em");

		  ///////////////////////
		  // DYNAMIC STUFF GOES HERE
		  // any data things that need to update (yxis, lines, etc)
		  function updateChart() {
		    ///////////////////////
		    // Y axis changes
		    y = d3.scale.linear()
		        .domain([0, d3.max(curr_data, function(d) { return d.value; })])
		        .range([height, 0]);

		    var yAxis = d3.svg.axis()
		        .scale(y)
		        .orient("right");

		    // remove any old axis
		    chart.selectAll(".y-axis").remove()

		    chart.append("g")
		        .attr("class", "y axis y-axis")
		        .attr("transform", "translate(" + (width + 5) + ",0)")
		        .call(yAxis);

		    ///////////////////////
		    // Line changes
		    var lineGenerator = d3.svg.line()
		        .x(function(d) { return x(formatDate.parse(d.date)) })
		        .y(function(d) { return y(d.value) });

		    var lines = chart.selectAll(".line")
		        .data([curr_data])

		    lines.enter().append("path")
		        .attr("class", "line")
		        .attr("d", lineGenerator);

		    lines.transition()
		        .duration(1000)
		        .attr("d", lineGenerator);

		    overlay.on("mousemove", mousemove);
		  }

		  function mousemove() {
		    var x0 = x.invert(d3.mouse(this)[0]),
		        i = bisectDate(curr_data, x0, 1),
		        d0 = curr_data[i - 1],
		        d1 = curr_data[i];

		    // search for dates where "start" == true, in other words, only valid dates for the dataset
		    // start of week, start of month
		    var i0 = i - 1;
		    while(d0.start == false && i0 > 0) {
		      i0 -= 1;
		      d0 = curr_data[i0];
		    }
		    var i1 = i;
		    while(d1.start == false && i1 < curr_data.length - 1) {
		      i1 += 1;
		      d1 = curr_data[i1];
		    }

		    var dIdx = x0 - d0.date > d1.date - x0 ? i1 : i0;

		    var tar_date = curr_data[dIdx]['date'];
		    var tooltip_string = tar_date;

		    var tar_value = curr_data[dIdx].value;
		    focus.attr("transform", "translate(" + x(formatDate.parse(tar_date)) + ","+y(tar_value)+ ")");
		    tooltip_string += "<br>" + tar_value;

		    tooltip.html(tooltip_string)
		      .style("visibility", "visible")
		      .style("top", d3.mouse(this)[1] - (tooltip[0][0].clientHeight - 30) + "px")
		      .style("left", d3.mouse(this)[0] - (tooltip[0][0].clientWidth / 2.0) + "px");
		  }

		  // default
		  curr_data = day_data;
		  updateChart();
		});
}

lineChart()
//lineChart1()
donut1()
donut2()
donut3()
donut4()
donut5()