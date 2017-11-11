/*var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth;
    //height = w.innerHeight|| e.clientHeight|| g.clientHeight;
//var width = w, height = h;
*///var dataRelevance = [];
$(document).ready(function () {
	$('#collapsibleMenu3').hide().css("visibility", "hidden");
	$('#collapsibleMenu4').hide().css("visibility", "hidden");
	});
var width = 960,
height = 630;
var svg;
var firstSolutionKey="";
var sKeyName = "";
var sValueName = "";
var padding = 4;
var radiusSwitch;
var filteredSolutionData;
var total_solutions;
var solution_linked;
var radioValue = "";
var solution_id;
var masterData;
var level1;


d3.select("#bubbleChartSolution")
.append("svg")
.attr("width", width)
.attr("height",height)
.attr("id", "solutionSVG");

var color = d3.scale.category10();

d3.json("/webkedb/solution",function(error, data) {
	var drag = d3.behavior.drag()
	.origin(function(d) { return d; })
	.on("dragstart", dragstarted)
	.on("drag", dragged)
	.on("dragend", dragended);	
	//code to store master data
	//not important
	masterData=data;
	setMasterData();
	function setMasterData(){
		//console.log(masterData);
	}

					// alert("size of json data"+_.size(data));
					total_solutions = _.size(data);
					document.getElementById("total_solutions").innerHTML = total_solutions;

					solution_linked = _.size(_.filter(data, function(d) {
						return d.solutionLinked == "Linked";
					}));
					document.getElementById("solution_linked").innerHTML = solution_linked;

					data.sort(function(a, b) {
						return b.sortcolumn - a.sortcolumn;
					});

					svg = d3.select("#solutionSVG");

				
				
					// alert(data.length); //to get json data length
					var length = data.length;
				
					switch (true) {
					case length < 200:
						radiusSwitch = 15;
						break;
					case length <= 200 && length < 500:
						radiusSwitch = 13;
						break;
					case length <= 500 && length < 1000:
						radiusSwitch = 12;
						break;
					case length <= 1000 && length < 2000:
						radiusSwitch = 10;
						break;
					case length <= 2000 && length < 5000:
						radiusSwitch = 8;
						break;
					case length <= 5000 && length < 10000:
						radiusSwitch = 6;
						break;
					case length >= 10000:
						radiusSwitch = 4;
						break;
					default:
					}
					for (var j = 0; j < data.length; j++) {
						/* data[j].radius = 10; */
						data[j].radius = radiusSwitch;
						// alert(Math.random());//0-1 scale
						data[j].x = Math.random() + 10;
						data[j].y = Math.random() + 10;
						/*
						 * data[j].x = Math.random() * width; data[j].y =
						 * Math.random() * height;
						 */
					}

					var maxRadius = d3.max(_.pluck(data, 'radius'));

					var getCenters = function(vname, size) {
						var centers, map;
						centers = _.uniq(_.pluck(data, vname)).map(function(d) {
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

					// drawing the circles
					var nodes = svg.selectAll("circle").data(data);

					

					nodes.enter().append("circle")
					// .attr("class", "node")
					.attr("class", function(d) {
						return d.category;
					})
					//to apply color based on ticket_status
					.style("fill", function (d) { return fillSolutionStatusColor(d.status); })
					.attr("cx", function(d) {
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
					})
					.call(drag);
					
					function dragstarted(d) {
						  d3.event.sourceEvent.stopPropagation();
						  d3.select(this).classed("dragging", true);
						}

						function dragged(d) {
						  d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
						}

						function dragended(d) {
						  d3.select(this).classed("dragging", false);
						}
					var text = nodes.append("text").attr("dx", 12).attr("dy",
							".35em").text(function(d) {
								
						return d.solution_id;
					});

					nodes.transition().duration(500).attr("r", function(d) {
						return d.radius;
					});

					var force = d3.layout.force();

	
/*					$("#filterSearchButton").click(function(){
						alert("search called");
					     selectedSearchVal = document.getElementById('filterSearch').value;
					});*/
					
					// create initial circles
					draw('sortcolumn');

/*					// hide the side menu's
					$('#collapsibleMenu3').hide();
					$('#collapsibleMenu4').hide();*/

					var callCount = 1;
					// sort bubble based level 1 label clicked
		$("label.ratingBtn").click(function() {
nodes.classed('selected', false).attr("r",radiusSwitch).style("opacity","1");
						$('#collapsibleMenu3').show().css("visibility", "visible");
						firstSolutionKey=this.id;
						//if it is a first call then filter on master data
						if(callCount==1){
							level1=document.getElementById("breadcrumbSolution").innerHTML="Filtered On:"+this.id;
		
						drawLevel1(this.id);
						$('a.secondKey').click(function() {
nodes.classed('selected', false).attr("r",radiusSwitch).style("opacity","1");
						//$('#collapsibleMenu4').hide();
						sKeyName = this.id;
						$('a.secondValue,#filterSearchButton').click(function() {
							callCount=2;
						
							//search keyword
							selectedSearchVal = document.getElementById('filterSearch').value;
							//alert("search value on click"+selectedSearchVal);
						$('#collapsibleMenu4').show().css("visibility", "visible");;
						sValueName = this.id;
						
						
						//remove legend when call retraces from L3 to L2

							svg.selectAll(".legend").remove();
							
							if(sValueName=="filterSearchButton"){
								document.getElementById("breadcrumbSolution").innerHTML=level1+">>"+sKeyName+"("+selectedSearchVal+")";
							}else{
						document.getElementById("breadcrumbSolution").innerHTML=level1+">>"+sKeyName+"("+sValueName+")";
							}	
						if (sKeyName == "category_name") {
								filteredSolutionData = _.filter(data,function(d) {
								return d.category_name == sValueName;})
							} else if (sKeyName == "status") {
								filteredSolutionData = _.filter(data,function(d) {
								return d.status == sValueName;})
							}  else if (sKeyName == "solutionLinked") {
								filteredSolutionData = _.filter(data,function(d) {
								return d.solutionLinked == sValueName;})
							} 
							else if(sKeyName=="search_keyword"){
								//alert("filter data gen");
								filteredSolutionData=Enumerable.From(data).Where("~($.search_keyword).toUpperCase().indexOf(selectedSearchVal.toUpperCase())").ToArray();
									console.log("search_keyword"+filteredSolutionData);
							}else {
								console.log("not able to filter the data based on side menu clicked");
							}
					getSolutionDataSource();
					})
					})//end of secondKey
					
				}//callCount monitoring
						//if it is a second call reload the bubble.js
						else{
							$('label[id*="breadcrumb"]').text('');
							
						    function reload_js(src) {
						    	//reset radio button
						    	$(".radioClass:checked").removeAttr("checked");
						    	//remove and append JS 
						    	$('svg[id="solutionSVG"]').remove();
						        $('script[src="' + src + '"]').remove();
						        $('<script>').attr('src', src).appendTo('head');
						    }
						    reload_js('static/js/bubblesSolutions.js');
						   callCount=1;
						}
			});

					function draw(varname) {
						d3.selectAll("circle").attr("r", radiusSwitch);
						// alert(varname); //done displays label clicked
						var centers = getCenters(varname, [ width, height ]);
						//console.log(centers);
						force.on("tick", tick(centers, varname));
					//	labels(centers);
						nodes.attr("class", function(d) {
							return d[varname];
						});
						legendStatus("status");

						force.start();
						makeClickable();

					}

function drawLevel1(varname) {
						svg.selectAll(".legend").remove();
						d3.selectAll("circle").attr("r", radiusSwitch);
						// alert(varname); //done displays label clicked
						var centers = getCenters(varname, [ width, height ]);
						//console.log(centers);
						force.on("tick", tick(centers, varname));
						labels(centers);
						nodes.attr("class", function(d) {
							return d[varname];
						});
						//to apply color based on ticket_status
						//nodes.style("fill", function (d) { return fillSolutionStatusColor(d.status); });
						applyColor();
						
						force.start();
						makeClickable();

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
					function tick(centers, varname) {
						var foci = {};
						for (var i = 0; i < centers.length; i++) {
							// alert(centers[i].name);//displaying sub modules
							// of label clicked
							foci[centers[i].name] = centers[i];
						}
						return function(e) {
							for (var i = 0; i < data.length; i++) {
								var o = data[i];
								var f = foci[o[varname]];
								o.y += (f.y - o.y) * e.alpha;
								o.x += (f.x - o.x) * e.alpha;
							}
							nodes.each(collide(.2)).attr("cx", function(d) {
								return d.x;
							}).attr("cy", function(d) {
								return d.y;
							});
						}
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
										                return 'translate(850,' + ((i*legendHeight)+400) + ')';
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
												+ d.status;
									}
								});
						$(this).popover('show');
					}

					function collide(alpha) {
					    var quadtree = d3.geom.quadtree(data);
					    return function(d) {
					       var r = d.radius + maxRadius + padding,
					        nx1 = d.x - r,
					        nx2 = d.x + r,
					        ny1 = d.y - r,
					        ny2 = d.y + r;
					      quadtree.visit(function(quad, x1, y1, x2, y2) {
					        if (quad.point && (quad.point !== d)) {
					          var x = d.x - quad.point.x,
					            y = d.y - quad.point.y,
					            l = Math.sqrt(x * x + y * y),
					            r = d.radius + quad.point.radius + padding;
					          if (l < r) {
					            l = (l - r) / l * alpha;
					            d.x -= x *= l;
					            d.y -= y *= l;
					            quad.point.x += x;
					            quad.point.y += y;
					          }
					        }
					        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
					      });
					    };
					  }
					  
					   var lowModGrad = svg.append("svg:defs")
					    .append("svg:linearGradient")
					    .attr("id", "lowModGrad")
					    .attr("x1", "0%")
					    .attr("y1", "0%")
					    .attr("x2", "100%")
					    .attr("y2", "100%")
					    .attr("spreadMethod", "pad");
					 
					  // Define the gradient colors
					  lowModGrad.append("svg:stop")
					    .attr("offset", "0%")
					    .attr("stop-color", "#88DB54")
					    .attr("stop-opacity", 1);
					 
					  lowModGrad.append("svg:stop")
					    .attr("offset", "100%")
					    .attr("stop-color", "#FE9A2E")
					    .attr("stop-opacity", 1);
					 
					  var modHighGrad = svg.append("svg:defs")
					    .append("svg:linearGradient")
					    .attr("id", "modHighGrad")
					    .attr("x1", "0%")
					    .attr("y1", "0%")
					    .attr("x2", "100%")
					    .attr("y2", "100%")
					    .attr("spreadMethod", "pad");
					 
					  // Define the gradient colors
					  modHighGrad.append("svg:stop")
					    .attr("offset", "0%")
					    .attr("stop-color", "#FE9A2E")
					    .attr("stop-opacity", 1);
					 
					  modHighGrad.append("svg:stop")
					    .attr("offset", "100%")
					    .attr("stop-color", "#FE2E2E")
					    .attr("stop-opacity", 1);
					    
					  var lowHighGrad = svg.append("svg:defs")
					    .append("svg:linearGradient")
					    .attr("id", "lowHighGrad")
					    .attr("x1", "0%")
					    .attr("y1", "0%")
					    .attr("x2", "100%")
					    .attr("y2", "100%")
					    .attr("spreadMethod", "pad");
					 
					  // Define the gradient colors
					  lowHighGrad.append("svg:stop")
					    .attr("offset", "0%")
					    .attr("stop-color", "#88DB54")
					    .attr("stop-opacity", 1);
					 
					  lowHighGrad.append("svg:stop")
					    .attr("offset", "100%")
					    .attr("stop-color", "#FE2E2E")
					    .attr("stop-opacity", 1);

					function makeClickable() {
						$("circle").dblclick(
								function() {
									 
									window.location.href = "/webkedb/solutions/"
											+ this.id;
								});

						$("circle").click(function() {
											/*
											 * write code to enable the relevant
											 * box
											 */
										//	document.getElementById("container").style.visibility = "visible";

											document.getElementById("solution").innerHTML = "Solution_ID: "+ (this.id);


											console.log(this.id);
										});

					}//end of makeClickable
					

					//get all search key words in an array
					var optArray = [];
					var searchArray=[];
					
					for (var i = 0; i <data.length - 1; i++) {
					    optArray.push( data[i].search_keyword);
					    searchArray.push(data[i].solution_id);
					  
					}
					optArray = optArray.sort();
					//console.log(optArray+"ticket_number from optArray");
					searchArray=searchArray.sort();
					
					$(function () {
					    $("#search").autocomplete({
					    	maxShowItems: 5,
					        source: searchArray
					    });
					});
					$(function () {
					    $("#filterSearch").autocomplete({
					    	maxShowItems: 10,
					        source: optArray
					    });
					});


					$("#searchButton").click(function(){
					
					    //find the node
					var    selectedVal = document.getElementById('search').value;

					    console.log("selected value from the search box:"+selectedVal);
					    var node = svg.selectAll("circle");
					    if (selectedVal == "none") {
					        node.style("stroke", "white").style("stroke-width", "1");
					    } else {
					        var selected = node.filter(function (d, i) {
					            return d.solution_id != selectedVal;
					        });
					        //reset bubble attr
					        nodes.classed('selected', false).attr("r",radiusSwitch).style("opacity","1");
					        
					   var  selectedBubble=node.filter(function(d,i){return d.solution_id==selectedVal;})
					       // console.log("selected node value:"+selected);
					        selected.style("opacity", "0.6");
					        //selected.classed("selected",false);
					        
					   nodes.classed('selected', false).attr("r",radiusSwitch).style("opacity","0.6");
					        selectedBubble.classed("selected",true)
					        .attr("r",radiusSwitch+2).style("opacity",1);
					    
					        d3.selectAll("circle").transition()
					            .duration(5000);
					    }
document.getElementById("search").value = "";
					});//EOF searchButton click
nodes.on("click", function(d) {
	
	//fade background bubbles
	nodes.classed('selected', false).attr("r",radiusSwitch).style("opacity","0.6");
	
	//highlight current bubble
	d3.select(this).classed('selected', true).attr("r",radiusSwitch+2).style("opacity",1)
			});//nodes click

nodes.exit().remove();
//code to focus out bubble on blank space click
$(document).on("click", function(e) {
    if (e.target === document || e.target.tagName === "svg") {
        // Clicked on blank space
    	  //alert('clicked the page');
	        nodes.classed('selected', false).attr("r",radiusSwitch).style("opacity","1");
    }
});

});//end of d3.json