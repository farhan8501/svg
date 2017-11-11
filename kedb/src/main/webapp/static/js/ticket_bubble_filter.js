var radioValue;
 
var fillSeverityColor = d3.scale.ordinal()
.domain(["Low", "Medium", "High"])
.range(['#2ca02c', '#ff7f0e', '#d62728']); 
function getDataSource() {

	//get all ticket number in an array
	
	
	searchArray = [];
	for (var i = 0; i <filteredData.length - 1; i++) {
	    searchArray.push( filteredData[i].ticket_number);
	  
	}
	searchArray = searchArray.sort();
	//console.log(searchArray);
	$(function () {
	    $("#search").autocomplete({
	    	 maxShowItems: 10,
	        source: searchArray
	    });
	});
	
	
	for (var j = 0; j < filteredData.length; j++) {
		/* data[j].radius = 10; */
		filteredData[j].radius = rSwitch;
		// alert(Math.random());//0-1 scale
		filteredData[j].x = Math.random() + 10;
		filteredData[j].y = Math.random() + 10;
		/*
		 * data[j].x = Math.random() * width; data[j].y =
		 * Math.random() * height;
		 */
	}
	var maxRadius = d3.max(_.pluck(filteredData, 'radius'));
	var getCenter = function(vname, size) {
		var centers, map;
		centers = _.uniq(_.pluck(filteredData, vname)).map(function(d) {
			return {
				name : d,
				value : 1
			};
		});

		map = d3.layout.pack().size(size);
		map.nodes({
			children : centers
		});

		return centers;
	};
	// Select the section we want to apply our changes to
    //var svg = d3.select("#primarySVG").transition();
						// console.log("json from getDataSource:"+filteredData);
						//d3.selectAll("#primarySVG > *").remove();
						var nodes = svg.selectAll("circle").data(filteredData,
								function(d) {
									return d.ticket_id;
								});
						nodes.enter().append("circle")
						// .attr("class", "node")
						.attr("class", function(d) {
							return d.category;
						}).attr("cx", function(d) {
							return d.x;
						}).attr("cy", function(d) {
							return d.y;
						}).attr("r", 2).attr("ticket_id", function(d) {
							return d.ticket_id;
						}).attr("id", function(d) {
							return d.ticket_number;
						}).on("mouseover", function(d) {
							showPopover.call(this, d);
						}).on("mouseout", function(d) {
							removePopovers();
						});
						nodes.transition().duration(500).attr("r", function(d) {
							return d.radius;
						});

						var force = d3.layout.force();
						nodes.exit().remove();
						//d3.selectAll("circle").attr("r", 10);
						// alert(varname); //done displays label clicked
						var centers = getCenter(firstKey, [ width, height ]);
						//console.log(centers);
						force.on("tick", onTick(centers, firstKey));
						//labels(centers);
						nodes.attr("class", function(d) {
							return d[firstKey];
						});
						applyColor();
						force.start();
						makeClicked();
						
						//code to generate legend on radio button clicked

						$(document).ready(function() {
						    $(".radioClass").change(function() {
						    	radioValue = $(".radioClass:checked").val();

						        if (radioValue == "status") {
						        	//l="Low",m="Medium",h="High";
						        	console.log("calling to draw::"+firstKey+"radio value::"+radioValue);
									draw(firstKey);
									//legend("ticket_status");
								} else if (radioValue == "severity") {
								//	l="Open",m="In-Progress",h="Closed";
									draw(firstKey);
									//legend("ticket_priority");
								}
						    });

						});

						function draw(varname) {
							console.log("draw called with varname::"+varname);
							d3.selectAll("circle").attr("r", rSwitch);
							var centers = getCenter(varname, [ width, height ]);
							//console.log(centers);
							force.on("tick", onTick(centers, varname));
							//labels(centers);
							nodes.attr("class", function(d) {
								return d[varname];
							});
							if (radioValue == "status") {
								nodes.style("fill", function (d) { return fillStatusColor(d.ticket_status); });
								legendStatus("ticket_status");
							} else if (radioValue == "severity") {
								nodes.style("fill", function (d) { return fillSeverityColor(d.ticket_priority); });
								legendSeverity("ticket_priority");
							}							
							force.start();
							makeClicked();

						}
						function labels(centers) {
							svg.selectAll(".label").remove();

							svg.selectAll(".label").data(centers).enter().append(
									"text").attr("class", "label").text(
									function(d) {
										// alert(d.name);
										return d.name;
									}).attr(
									"transform",
									function(d) {
										return "translate("
												+ (d.x - ((d.name.length) * 3))
												+ ", " + (d.y + 15 - d.r) + ")";
									});
						}
						function legendStatus(varname) {
/*							var centers = getCenter(varname, [ width, height ]);
							console.log("centers from legend"+centers);				
							var legend = svg.append("g").attr("class", "legend")
									.selectAll("g").data(centers).enter().append(
											"g").attr(
											"transform",
											function(d, i) {
												return "translate(" + d.depth * 10
														+ "," + i * 20 + ")";
											})

							// Draw rects, and color them by original_index
							legend.append("rect").attr("width", 8)
									.attr("height", 8).style("fill", function (d) { return fillColor(d.value); });

							legend.append("text").attr("x", function(d, i) {
								return d.depth * 10 + 15;
							}).attr("dy", "0.50em").text(function(d) {
								return d.name;
							});*/
							svg.selectAll(".legend").remove();
							var legendRectSize=15;
						    var legendSpacing=7;
						    var legendHeight=legendRectSize+legendSpacing;
						    
						    var legend=svg.selectAll('.legend')
						        .data(fillStatusColor.domain());
						    var enterGroups=legend.enter()
						        .append('g')
						        .attr('class','legend');
						  
						    
						    //legend.exit().remove();
						    
						    
						    legend.attr("transform",function(d,i){
				                //Just a calculation for x & y position
				                return 'translate(100,' + ((i*legendHeight)+80) + ')';
				            });
						    
						    legend.append('rect')
						        .attr({
						            width:legendRectSize,
						            height:legendRectSize,
						            rx:15,
						            ry:15
						        })
						        .style({
						            fill:fillStatusColor,
						            stroke:fillStatusColor
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
						}

						function legendSeverity(){
							svg.selectAll(".legend").remove();
							var legendRectSize=15;
						    var legendSpacing=7;
						    var legendHeight=legendRectSize+legendSpacing;
						    
						    var legend=svg.selectAll('.legend')
						        .data(fillSeverityColor.domain());
						    var enterGroups=legend.enter()
						        .append('g')
						        .attr('class','legend');
						  
						    
						    //legend.exit().remove();
						    
						    
						    legend.attr("transform",function(d,i){
				                //Just a calculation for x & y position
				                return 'translate(100,' + ((i*legendHeight)+80) + ')';
				            });
						    
						    legend.append('rect')
						        .attr({
						            width:legendRectSize,
						            height:legendRectSize,
						            rx:15,
						            ry:15
						        })
						        .style({
						            fill:fillSeverityColor,
						            stroke:fillSeverityColor
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
						}
function onTick(centers, varname) {
	var foci = {};
	for (var i = 0; i < centers.length; i++) {
		// alert(centers[i].name);//displaying sub modules
		// of label clicked
		foci[centers[i].name] = centers[i];
	}
	return function(e) {
		for (var i = 0; i < filteredData.length; i++) {
			var o = filteredData[i];
			var f = foci[o[varname]];
			o.y += (f.y - o.y) * e.alpha;
			o.x += (f.x - o.x) * e.alpha;
		}
		nodes.each(onCollide(.2)).attr("cx", function(d) {
			return d.x;
		}).attr("cy", function(d) {
			return d.y;
		});
	}
}
function removePopovers() {
	$('.popover').each(function() {
		$(this).remove();
	});
}

function showPopover(d) {
	$(this).popover(
			{
				placement : 'auto top',
				container : 'body',
				trigger : 'manual',
				html : true,
				content : function() {
					//ticket_ids = d.ticket_id;
					return "Ticket_ID: " + d.ticket_number
							+ "</br>priority: "
							+ d.ticket_priority
							+ "</br>status: "
							+ d.ticket_status;
				}
			});
	$(this).popover('show');
}
function applyColor(){
	switch (firstKey) {
	case "category_name":
		nodes.style("fill", function (d) { return color(d.category_name); });
		break;
	case "ticket_status":
		nodes.style("fill", function (d) { return color(d.ticket_status); });
		break;
	case "ticket_priority":
		nodes.style("fill", function (d) { return color(d.ticket_priority); });
		break;
	case "solutionLinked":
		nodes.style("fill", function (d) { return color(d.solutionLinked); });
		break;
	default:
		nodes.style("fill", function (d) { return color(d.category); });
	}
}
function onCollide(alpha) {
	var quadtree = d3.geom.quadtree(filteredData);
	return function(d) {
		var r = d.radius + maxRadius + padding, nx1 = d.x
				- r, nx2 = d.x + r, ny1 = d.y - r, ny2 = d.y
				+ r;
		quadtree.visit(function(quad, x1, y1, x2, y2) {
			if (quad.point && (quad.point !== d)) {
				var x = d.x - quad.point.x, y = d.y
						- quad.point.y, l = Math.sqrt(x * x
						+ y * y), r = d.radius
						+ quad.point.radius + padding;
				if (l < r) {
					l = (l - r) / l * alpha;
					d.x -= x *= l;
					d.y -= y *= l;
					quad.point.x += x;
					quad.point.y += y;
				}
			}
			return x1 > nx2 || x2 < nx1 || y1 > ny2
					|| y2 < ny1;
		});
	};
}
function makeClicked() {
	$("circle").dblclick(
			function() {
				window.location.href = "/webkedb/ticket/"
						+ ticket_id;
			});

	$("circle").click(function() {
						/*
						 * write code to enable the relevant
						 * box
						 */
					//	document.getElementById("container").style.visibility = "visible";

						document.getElementById("incident").innerHTML = "Ticket_ID: "+ (this.id);
						//function call to hide donut when no relevant results
						hideRelevantDonut();

						var ticket_number = this.id;
						ticket_id = filteredData
								.filter(function(d) {
											return d.ticket_number === ticket_number;
										})
								.map(function(d) {
									return d.ticket_id;
								});
						console.log("ticket id from number"+ ticket_id);
						$.getJSON('/webkedb/releavancesearchjson/'+ this.id,function(data) {
									dataRelevance = data;
									getRelevantData();
								});

						console.log(this.id);
					});

}//end of makeClickable

}//getDataSource