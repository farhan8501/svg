/*var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    width = w.innerWidth || e.clientWidth || g.clientWidth;
    //height = w.innerHeight|| e.clientHeight|| g.clientHeight;
//var width = w, height = h;
*///var dataRelevance = [];
$(document).ready(function () {
	$('#collapsibleMenu1').hide().css("visibility", "hidden");
	$('#collapsibleMenu2').hide().css("visibility", "hidden");
	});
var width = 960,
height = 630;
var svg;
var firstKey="";
var secondKeyName = "";
var secondValueName = "";
var padding = 4;
var rSwitch;
var filteredData;
var total_tickets
var ticket_open;
var ticket_highSeverity;
var ticket_closed;
var ticekts_linked;
var radioValue = "";
var ticket_id;
var masterData;
var level1;
var searchArray = [];
d3.select("#bubbleChart")
.append("svg")
.attr("width", width)
.attr("height",height)
.attr("id", "primarySVG");

var color = d3.scale.category10();




d3.json("/webkedb/incidents",function(error, data) {

	//code to store master data
	//not important
	masterData=data;
	setMasterData();
	function setMasterData(){
		//console.log(masterData);
	}

					// alert("size of json data"+_.size(data));
					total_tickets = _.size(data);
					document.getElementById("total_tickets").innerHTML = total_tickets;

					ticket_open = _.size(_.filter(data, function(d) {
						return d.ticket_status == "Open";
					}));
					document.getElementById("ticket_open").innerHTML = ticket_open;

					ticket_closed = _.size(_.filter(data, function(d) {
						return d.ticket_status == "Closed";
					}));
					document.getElementById("ticket_closed").innerHTML = ticket_closed;

					ticket_highSeverity = _.size(_.filter(data, function(d) {
						return d.ticket_priority == "High";
					}));
					document.getElementById("ticket_highSeverity").innerHTML = ticket_highSeverity;

					ticekts_linked = _.size(_.filter(data, function(d) {
						return d.solutionLinked == "Linked";
					}));
					document.getElementById("ticekts_linked").innerHTML = ticekts_linked;

					data.sort(function(a, b) {
						return b.ratingclassvalue - a.ratingclassvalue;
					});

				svg= d3.select("#primarySVG");
	
					
					// alert(data.length); //to get json data length
					var length = data.length;

					switch (true) {
					case length < 200:
						rSwitch = 15;
						break;
					case length <= 200 && length < 500:
						rSwitch = 13;
						break;
					case length <= 500 && length < 1000:
						rSwitch = 12;
						break;
					case length <= 1000 && length < 2000:
						rSwitch = 10;
						break;
					case length <= 2000 && length < 5000:
						rSwitch = 8;
						break;
					case length <= 5000 && length < 10000:
						rSwitch = 6;
						break;
					case length >= 10000:
						rSwitch = 4;
						break;
					default:
					}
					for (var j = 0; j < data.length; j++) {
						/* data[j].radius = 10; */
						data[j].radius = rSwitch;
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
					.style("fill", function (d) { return fillStatusColor(d.ticket_status); })
					.attr("cx", function(d) {
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

					var text = nodes.append("text").attr("dx", 12).attr("dy",
							".35em").text(function(d) {
						//ticket_ids = d.ticket_id;
						return d.ticket_number;
					});

					nodes.transition().duration(500).attr("r", function(d) {
						return d.radius;
					});

					var force = d3.layout.force();



					// create initial circles
					draw('ratingclassvalue');

/*					// hide the side menu's
					$('#collapsibleMenu1').hide();
					$('#collapsibleMenu2').hide();*/

					var callCount = 1;
					
					// sort bubble based level 1 label clicked
		$("label.ratingBtn").click(function() {
			nodes.classed('selected', false).attr("r",rSwitch).style("opacity","1");
						$('#collapsibleMenu1').show().css("visibility", "visible");;
						firstKey=this.id;
						console.log("level 1 filter name"+firstKey);
						//if it is a first call then filter on master data
						if(callCount==1){
							level1=document.getElementById("breadcrumb").innerHTML="Filtered On:"+this.id;
							
						drawLevel1(this.id);
						$('a.secondKey').click(function() {
							nodes.classed('selected', false).attr("r",rSwitch).style("opacity","1");
						//$('#collapsibleMenu2').hide();
						secondKeyName = this.id;
						$('a.secondValue').click(function() {
							callCount=2;
							
							
						$('#collapsibleMenu2').show().css("visibility", "visible");;
						secondValueName = this.id;
						
						//remove legend when call retraces from L3 to L2

							svg.selectAll(".legend").remove();
						
						document.getElementById("breadcrumb").innerHTML=level1+">>"+secondKeyName+"("+secondValueName+")";
							if (secondKeyName == "category_name") {
								filteredData = _.filter(data,function(d) {
								return d.category_name == secondValueName;})
							} else if (secondKeyName == "ticket_status") {
								filteredData = _.filter(data,function(d) {
								return d.ticket_status == secondValueName;})
							} else if (secondKeyName == "ticket_priority") {
								filteredData = _.filter(data,function(d) {
								return d.ticket_priority == secondValueName;})
							} else if (secondKeyName == "solutionLinked") {
								filteredData = _.filter(data,function(d) {
								return d.solutionLinked == secondValueName;})
							} else {
								console.log("not able to filter the data based on side menu clicked");
							}
					getDataSource();
					})
					})//end of secondKey
					
				}//callCount monitoring
						//if it is a second call reload the bubble.js
						else{
							$('label[id*="breadcrumb"]').text('');
							
						    function reload_js(src) {
						    	$(".radioClass:checked").removeAttr("checked");
						    	$('svg[id="primarySVG"]').remove();
						        $('script[src="' + src + '"]').remove();
						        $('<script>').attr('src', src).appendTo('head');
						    }
						   
						    reload_js('static/js/bubbles.js');
						   // reload_js('static/js/ticket.js');
						   callCount=1;
						}
			});


					function draw(varname) {
						d3.selectAll("circle").attr("r", rSwitch);
						// alert(varname); //done displays label clicked
						var centers = getCenters(varname, [ width, height ]);
						console.log("centers data");
						console.log(centers);
						force.on("tick", tick(centers, varname));
						//labels(centers);
						nodes.attr("class", function(d) {
							return d[varname];
						});
						//to apply color based on ticket_status
						//nodes.style("fill", function (d) { return fillStatusColor(d.ticket_status); });
						//applyColor();
						legendStatus("ticket_status");
						force.start();
						makeClickable();
						if(callCount==2){
							alert("called")
						drawLevel1(firstKey);}

					}
					function drawLevel1(varname) {
						svg.selectAll(".legend").remove();
						d3.selectAll("circle").attr("r", rSwitch);
						// alert(varname); //done displays label clicked
						var centers = getCenters(varname, [ width, height ]);
						//console.log(centers);
						force.on("tick", tick(centers, varname));
						labels(centers);
						nodes.attr("class", function(d) {
							return d[varname];
						});
						//to apply color based on ticket_status
						//nodes.style("fill", function (d) { return fillStatusColor(d.ticket_status); });
						applyColor();
						
						force.start();
						makeClickable();

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
							nodes.each(
							collide(0.05)).attr("cx", function(d) {
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
												        .data(fillStatusColor.domain());
												    var enterGroups=legend.enter()
												        .append('g')
												        .attr('class','legend');
												  
												    
												    //legend.exit().remove();
												    
												    //prev translate(100,80)
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
												+ "</br>Severity: "
												+ d.ticket_priority
												+ "</br>status: "
												+ d.ticket_status;
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
					  
						//get all ticket number in an array
						
						
						
						for (var i = 0; i <data.length - 1; i++) {
						    searchArray.push( data[i].ticket_number);
						  
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
					  
nodes.on("click", function(d) {
	
	//fade background bubbles
	nodes.classed('selected', false).attr("r",rSwitch).style("opacity","0.6");
	
	//highlight current bubble
	d3.select(this).classed('selected', true).attr("r",rSwitch+2).style("opacity",1)
}); 
					function makeClickable() {
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
						
					         
											document.getElementById("incident").innerHTML = "Ticket_Number: "+ (this.id);
											//function call to hide donut when no relevant results
											hideRelevantDonut();

											var ticket_number = this.id;
											ticket_id = data
													.filter(function(d) {
																return d.ticket_number === ticket_number;
															})
													.map(function(d) {
														return d.ticket_id;
													});
										
											$.getJSON('/webkedb/releavancesearchjson/'+ this.id,function(data) {
														dataRelevance = data;
														getRelevantData();
													});

											
										});

					}//end of makeClickable
					nodes.exit().remove();
					//code to focus out bubble on blank space click
					$(document).on("click", function(e) {
					    if (e.target === document || e.target.tagName === "svg") {
					        // Clicked on blank space
					    	  //alert('clicked the page');
						        nodes.classed('selected', false).attr("r",rSwitch).style("opacity","1");
					    }
					});
					      
		
});//end of d3.json
