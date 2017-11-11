var radioValue;
var fillSolutionStatusColor = d3.scale.ordinal()
.domain(["Created","Rejected", "Updated", "Approved"])
.range(['#1f77b4','#d62728', '#ff7f0e', '#2ca02c']); 

function getSolutionDataSource() {
	
	
//filter data check completed
/*	console.log("solution filtered data"+firstSolutionKey);*/
	console.log(filteredSolutionData);
	for (var j = 0; j < filteredSolutionData.length; j++) {
		/* data[j].radius = 10; */
		filteredSolutionData[j].radius = radiusSwitch;
		// alert(Math.random());//0-1 scale
		filteredSolutionData[j].x = Math.random() + 10;
		filteredSolutionData[j].y = Math.random() + 10;
		/*
		 * data[j].x = Math.random() * width; data[j].y =
		 * Math.random() * height;
		 */
	}
	var maxRadius = d3.max(_.pluck(filteredSolutionData, 'radius'));
	var getCenter = function(vname, size) {
		var centers, map;
		centers = _.uniq(_.pluck(filteredSolutionData, vname)).map(function(d) {
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
						// console.log("json from getDataSource:"+filteredSolutionData);
						//d3.selectAll("#primarySVG > *").remove();
						var nodes = svg.selectAll("circle").data(filteredSolutionData,
								function(d) {
									return d.solution_id;
								});
						nodes.enter().append("circle")
						// .attr("class", "node")
						.attr("class", function(d) {
							return d.category;
						}).attr("cx", function(d) {
							return d.x;
						}).attr("cy", function(d) {
							return d.y;
						}).attr("r", 2).attr("solution_id", function(d) {
							return d.solution_id;
						}).attr("id", function(d) {
							return d.solution_id;
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
						var centers = getCenter(firstSolutionKey, [ width, height ]);
						//console.log(centers);
						force.on("tick", onTick(centers, firstSolutionKey));
						//labels(centers);
						nodes.attr("class", function(d) {
							return d[firstSolutionKey];
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
						        	console.log("calling to draw::"+firstSolutionKey+"radio value::"+radioValue);
									draw(firstSolutionKey);
									//legend("ticket_status");
								} else {
										alert("chill");
								}
						    });

						});

						function draw(varname) {
							console.log("draw called with varname::"+varname);
							d3.selectAll("circle").attr("r", 10);
							var centers = getCenter(varname, [ width, height ]);
							//console.log(centers);
							force.on("tick", onTick(centers, varname));
							labels(centers);
							nodes.attr("class", function(d) {
								return d[varname];
							});
							if (radioValue == "status") {
								nodes.style("fill", function (d) { return fillSolutionStatusColor(d.status); });
								legendStatus("status");
							} else {
								alert("chill");
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

							svg.selectAll(".legend").remove();
							var legendRectSize=15;
						    var legendSpacing=7;
						    var legendHeight=legendRectSize+legendSpacing;
						    
						    var legend=svg.selectAll('.legend')
						        .data(fillSolutionStatusColor.domain());
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
						            fill:fillSolutionStatusColor,
						            stroke:fillSolutionStatusColor
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
		for (var i = 0; i < filteredSolutionData.length; i++) {
			var o = filteredSolutionData[i];
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
					//solution_ids = d.solution_id;
					return "Solution_ID: " + d.solution_id
							+ "</br>Search Keyword: "
							+ d.search_keyword
							+ "</br>status: "
							+ d.status
							+ "</br>Ticket Count: "
							+ d.ticket_count
				}
			});
	$(this).popover('show');
}
function applyColor(){
	switch (firstSolutionKey) {
	case "category_name":
		nodes.style("fill", function (d) { return color(d.category_name); });
		break;
	case "status":
		nodes.style("fill", function (d) { return color(d.status); });
		break;
	case "solutionLinked":
		nodes.style("fill", function (d) { return color(d.solutionLinked); });
		break;
	default:
		nodes.style("fill", function (d) { return color(d.category); });
	}
}
function onCollide(alpha) {
	var quadtree = d3.geom.quadtree(filteredSolutionData);
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
				window.location.href = "/webkedb/solution/"
						+ this.id;
			});

	$("circle").click(function() {
						/*
						 * write code to enable the relevant
						 * box
						 */
					//	document.getElementById("container").style.visibility = "visible";

						document.getElementById("solution").innerHTML = "Solution_ID: "+ (this.id);

						
						//relevance not required for solution
/*	$.getJSON('/webkedb/releavancesearchjson/'+ this.id,function(data) {
									dataRelevance = data;
									getRelevantData();
								});*/

						console.log(this.id);
					});

}//end of makeClickable
}//getDataSource