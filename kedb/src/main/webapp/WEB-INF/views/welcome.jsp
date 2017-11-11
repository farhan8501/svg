<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="GENERATOR" content="MSHTML 11.00.9600.18538">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">


    <script src="static/js/jquery.min.js"></script>
	<script src="static/js/bootstrap.min.js"></script>
	<script src="static/js/d3.min.js" charset="utf-8"></script>
	<script src="static/css/underscore-min.js"></script>

    <link rel="stylesheet" href="static/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="static/css/style.css">
	<link rel="stylesheet"href="/static/css/jquery-ui.css" />
	
<title>KEDB - Capgemini - Solutions for Known Error</title>
<%-- <link href="<c:url value='/static/css/bootstrap.css' />"rel="stylesheet"></link> --%>
<link href="<c:url value='/static/css/app.css' />" rel="stylesheet"></link>

</head>
<body data-page="home" class="html front">

	<%@ include file = "header.jsp" %>
	
<div class="container-fluid" >
	<div class="row">
		<div class="col-md-2 col-sm-2 leftSection" style="height:450px;">
			<ul class="nav nav-stacked sidelist">
				<li class="mlistitem" data-url="feature_tab_1.do"><label
					class="inlinks" style="font-size: 15px">Recent Solutions</label> <span
					class="labeled"></span> <c:forEach items="${recentsolutions}"
						var="solution">
						<li><a href="<c:url value='/solutions/${solution}' />">Solution_${solution}
						</a></li>
					</c:forEach>
				
				<li class="mlistitem" data-url="feature_tab_2.do"><label
					style="font-size: 15px">Top Five Solutions</label> <span
					class="labeled"></span>
					<div>
						<table>
							<c:forEach items="${topsolutions}" var="solutions">
								<li>
								<tr>
									<td>
										<div class="panel-mlistitem">
											<h4>
													<a class="inlinks"
													href="<c:url value='/solutions/${solutions.id}' />"
													style="font-size: 12px">Solution_${solutions.id}</a>
											</h4>
										</div>
									</td>
									<td><span class="pull-right">
											<button id="like${solutions.id}" class="btn btn-block btn-primary bLike" onclick="likeSolution(${solutions.id})">
												<i class="fa fa-thumbs-up"></i>
											</button>
									</span></td>
									<td>&nbsp;&nbsp; <span class="pull-right"> 
											<h6><label id="rating${solutions.id}"><c:out value="${solutions.rate}" /></label></h6>
									</span></td>
								</tr>
								</li>
							</c:forEach>
						</table>
					</div></li>
			</ul>
		</div>
		<div class="col-md-10 rightSection">
			<!-- updated app.css(html) and style.css(path) to get donut color right -->
			<div class="row">
				<div class=" col-sm-4 col-md-4">
					<!-- <div class="widget">
		    						<div class="header">KBA Relevancy</div>
						    		<div id="donut1" class="chart-container"></div>
								</div> -->
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-xs-9 text-center">
									<div style="Font-size: 15px">Knowledge Base Article</div>
									<div></div>
								</div>
							</div>
						</div>

						<div class="panel-footer">
							<div id='donut1'></div>

							<div class="clearfix"></div>
						</div>

					</div>
				</div>

				<div class=" col-sm-4 col-md-4">
					<!-- <div class="widget">
		    						<div class="header">Status OF KBA</div>
						    		<div id="donut2" class="chart-container"></div>
								</div> -->
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-xs-9 text-center">
									<div style="Font-size: 15px">Status OF KBA</div>
									<div></div>
								</div>
							</div>
						</div>

						<div class="panel-footer">
							<div id='donut2'></div>

							<div class="clearfix"></div>
						</div>

					</div>
				</div>

				<div class="col-sm-4 col-md-4">
					<!-- <div class="widget">
		    						<div class="header">KBA Relevancy</div>
						    		<div id="donut3" class="chart-container"></div>
								</div> -->
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-xs-9 text-center">
									<div style="Font-size: 15px">KBA Relevancy</div>
									<div></div>
								</div>
							</div>
						</div>

						<div class="panel-footer">
							<div id='donut3'></div>

							<div class="clearfix"></div>
						</div>

					</div>
				</div>
			</div>

			<div class="row">
				<div class="col-sm-4 col-md-4">
					<!-- <div class="widget">
		    						<div class="header">Contributers</div>
						    		<div id="donut4" class="chart-container"></div>
								</div> -->
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-xs-9 text-center">
									<div style="Font-size: 15px">Contributers</div>
									<div></div>
								</div>
							</div>
						</div>

						<div class="panel-footer">
							<div id='donut4'></div>

							<div class="clearfix"></div>
						</div>

					</div>
				</div>

				
				<div class="col-sm-4 col-md-4">
					<!-- <div class="widget">
		    						<div class="header">Contributers</div>
						    		<div id="donut4" class="chart-container"></div>
								</div> -->
					<div class="panel panel-primary" style="border-color: white;">
						<div class="panel-heading">
							<div class="row">
								<div class="col-xs-9 text-center">
									<div style="Font-size: 15px">KBA Usage</div>
									<div></div>
								</div>
							</div>
						</div>

						<div class="panel-footer">
							<div id='line'></div>

							<div class="clearfix"></div>
						</div>

					</div>
				</div>
				
				<div class="col-sm-4 col-md-4">
					<!-- <div class="widget">
		    						<div class="header">Ticket Relevancy</div>
						    		<div id="donut5" class="chart-container"></div>
								</div> -->
					<div class="panel panel-primary">
						<div class="panel-heading">
							<div class="row">
								<div class="col-xs-9 text-center">
									<div style="Font-size: 15px">Ticket Relevancy</div>
									<div></div>
								</div>
							</div>
						</div>
						<div class="panel-footer">
							<div id='donut5'></div>

							<div class="clearfix"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- </h2> -->
	</div>
</div><!-- end of container fluid -->
		<script src="static/js/welcomeDonut.js"></script>
		<script src="static/js/donut.js"></script>
<!-- 		<footer class="fixed-bottom"> 
		
		</footer> -->
<br>
<br>
<br>
<br>
<%@ include file = "footer.jsp" %>
</body>
</html>
