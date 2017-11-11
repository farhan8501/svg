<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>

	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <link rel="stylesheet" href="static/css/bootstrap.min.css">
 
 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

    <link rel="stylesheet" href="static/css/BootSideMenu.css">
     <link type="text/css" rel="Stylesheet" href="http://ajax.microsoft.com/ajax/jquery.ui/1.8.6/themes/smoothness/jquery-ui.css">
	<!-- 	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css"> -->
	<style type="text/css">
        .user {
            padding: 5px;
            margin-bottom: 5px;
            text-align: left;
        }
    </style>


    <!-- <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>  commented to include ajax version of jquery
    <script src="static/js/jquery-1.12.4.min.js"></script>-->
    <script src="static/js/jquery.min.js"></script>
    <script src="static/js/bootstrap.min.js"></script>
    <script src="static/js/BootSideMenu.js"></script>
  <script src="static/js/jquery.cookie.js"></script>

	
<title>KEDB - Tickets </title>
 

<meta name="GENERATOR" content="MSHTML 11.00.9600.18538">
<link href="<c:url value='/static/css/app.css' />" rel="stylesheet"></link>
<link rel="stylesheet" href="static/css/style.css">

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js" charset="utf-8"></script> -->
<!-- <script src="static/js/d3.min.js" charset="utf-8"></script> -->

<script src="http://d3js.org/d3.v4.min.js"></script>

		
</head>

<body data-page="tickets" class="html front">

<%@ include file = "header.jsp" %>

<div class="container-fluid" >
<div class="row">
  <div class="col-sm-2 leftSection">
  	<!-- <div class="centerBlock"> -->
	<span id="total_tickets"style="color: blue;font-size: 50px;"></span><br><label style="font-size: 20px;">Total tickets</label>
	<br/>
	<span id="ticket_open" style="color: grey;font-size: 50px;"></span><br><label style="font-size: 20px;">Open Tickets</label>
		<br />
	<span id="ticket_highSeverity"style="color: red;font-size: 50px;"></span><br><label style="font-size: 20px;">High Severity Tickets</label>
		<br>
	<span id="ticket_closed" style="color: green;font-size: 50px;"></span><br><label style="font-size: 20px;">Tickets Closed</label>
		<br>
	<span id="ticekts_linked" style="color: violet;font-size: 50px;"></span><br><label style="font-size: 20px;">Tickets Linked</label>
<!-- 	</div> -->
	
  </div>
  <div class="col-sm-10 rightSection">
<!-- bubbles v3 code  -->
<!--   <div class="row">
  <div class="levelOne">
  <div id="overallRatings" class="btn-group btn-info top-btn" data-toggle="buttons">
  	<label class="btn ratingBtn" id="ratingclassvalue">
	<input type="radio" name="options">reset</label>
	<label class="btn ratingBtn" id="ticket_priority">
	<input type="radio" name="options">Severity</label>
	<label class="btn ratingBtn" id="ticket_status">
	<input type="radio" name="options">Status</label>
	<label class="btn ratingBtn" id="category_name">
	<input type="radio" name="options">Categories</label>
	<label class="btn ratingBtn" id="solutionLinked">
	<input type="radio" name="options">Solution Linked</label>

</div> 
	<input id="search" placeholder="Enter:Ticket Number">
    <button type="button" id="searchButton">Search</button> 
<label id="breadcrumb"></label>
</div>
<div id="bubbleChart">
	
</div>
</div> -->
<div class="row">
<!-- toolbar to append button from d3 -->
      <div id="toolbar">
      </div>
<!-- d3 select to draw svg -->
      <div id="vis"></div>
</div>
<!-- code for collapwhat whatsible side menu -->
<div class="row">

<!-- html of side bars begin  -->
<div id="collapsibleMenu1" style="float: right;">
    
    <div class="list-group">

        <a href="#item-1" class="list-group-item secondKey" data-toggle="collapse" id="category_name">Category</a>

        <div class="list-group collapse" id="item-1">
        <c:forEach items="${categorytypes}" var="categories">
            <a  style="cursor: pointer;" class="list-group-item secondValue" id="${categories}">${categories}</a>
          </c:forEach>
		</div>

        <a href="#item-2" class="list-group-item secondKey" data-toggle="collapse" id="ticket_status">Status</a>

        <div class="list-group collapse" id="item-2">
            <c:forEach items="${status}" var="status">
            <a  style="cursor: pointer;" class="list-group-item secondValue" id="${status}">${status}</a>
          </c:forEach>      
        </div>

        <a href="#item-3" class="list-group-item secondKey" data-toggle="collapse" id="ticket_priority">Severity</a>

       <div class="list-group collapse" id="item-3">
            <c:forEach items="${severity}" var="severity">
            <a  style="cursor: pointer;" class="list-group-item secondValue" id="${severity}">${severity}</a>
          </c:forEach>      
        </div>

        <a href="#item-4" class="list-group-item secondKey" data-toggle="collapse" id="solutionLinked">Solutions Linked</a>

        <div class="list-group collapse" id="item-4">
            <a href="#" class="list-group-item secondValue" id="Linked">Linked</a>
            <a href="#" class="list-group-item secondValue" id="NotLinked">Not Linked</a>
        </div>

    </div>
    
</div>
 <br>
  <br>
  
<div id="collapsibleMenu2" style="    top: 280px; bottom: 250px;">
  <div class="list-group">
      <a href="#item-5" class="list-group-item" >Index Based on</a>
<br>
<br>
<label><input type="radio" class="radioClass" name="radioButton" id="status" value="status"> status</label><br>
<label><input type="radio" class="radioClass" name="radioButton" id="severity" value="severity"> severity</label><br>
<!-- 	<label class="radioBtn1" id="status">
	<input type="radio" name="radioButton" class="radioClass">status</label>
	<br>
		<label class="radioBtn1" id="severity">
	<input type="radio" name="radioButton" class="radioClass">severity</label> -->
  </div>
</div> 
  <!-- html of side bars ends  -->




</div> 

<!-- end of code for collapsible menu -->
<div class="row" >
<div class="pannel">
Relevant Solutions:<label id="relevantMessage"></label><br/>
<strong id="incident"></strong>
</div>
 <div class="col-sm-2"> 
 <div class="widget" id="widget1">
	<div id="upleft">
       <div id="donut1" class="chart-container scontainer"></div>	
	</div>	 
	<div class="scontainer" id="upright">
	<div class="scontainer">Matched:<label id="mLabel1"></label></div>
		<div class="likeAdjust">
		<a id="aLink1"><label id="aLabel1"></label></a>
		<button id="like1" class="btn btn-block btn-primary bLike"><i  class="fa fa-thumbs-up"></i></button>
		</div>
	</div>
	<div class="scontainer" id="bottomleft">
	<a id="link1">Solution<label id="sLabel1"></label></a>
	 </div>
<!-- 	 <div class="scontainer" id="bottomright">
		<a id="aLink1"><label id="aLabel1"></label></a>
		<button id="like1" class="btn btn-block btn-primary bLike"><i  class="fa fa-thumbs-up"></i></button>
    </div> -->
 </div>
</div>
<div class="col-sm-2">
<div class="widget" id="widget2">
	<div id="upleft">
       <div id="donut2" class="chart-container scontainer"></div>	
	</div>	 
	<div class="scontainer" id="upright">
	<div class="scontainer">Matched:<label id="mLabel2"></label></div>
		<div class="likeAdjust">
		<a id="aLink2"><label id="aLabel2"></label></a>
		<button id="like2" class="btn btn-block btn-primary bLike"><i  class="fa fa-thumbs-up"></i></button>
		</div>
	</div>
	<div class="scontainer" id="bottomleft">
	<a id="link2">Solution<label id="sLabel2"></label></a>
	 </div>
<!-- 	 <div class="scontainer" id="bottomright">
		<a id="aLink2"><label id="aLabel2"></label></a>
		<button id="like2" class="btn btn-block btn-primary bLike"><i  class="fa fa-thumbs-up"></i></button>
    </div> -->
 </div>
</div>
<div class="col-sm-2">
<div class="widget" id="widget3">
	<div id="upleft">
       <div id="donut3" class="chart-container scontainer"></div>	
	</div>	 
	<div class="scontainer" id="upright">
	<div class="scontainer">Matched:<label id="mLabel3"></label></div>
		<div class="likeAdjust">
		<a id="aLink3"><label id="aLabel3"></label></a>
		<button id="like3" class="btn btn-block btn-primary bLike"><i  class="fa fa-thumbs-up"></i></button>
		</div>
	</div>
	<div class="scontainer" id="bottomleft">
	<a id="link3">Solution<label id="sLabel3"></label></a>
	 </div>
<!-- 	 <div class="scontainer" id="bottomright">
		<a id="aLink3"><label id="aLabel3"></label></a>
		<button id="like3" class="btn btn-block btn-primary bLike"><i  class="fa fa-thumbs-up"></i></button>
    </div> -->
 </div>
</div>
<div class="col-sm-2">
<div class="widget" id="widget4">
	<div id="upleft">
       <div id="donut4" class="chart-container scontainer"></div>	
	</div>	 
	<div class="scontainer" id="upright">
	<div class="scontainer">Matched:<label id="mLabel4"></label></div>
		<div class="likeAdjust">
		<a id="aLink4"><label id="aLabel4"></label></a>
		<button id="like4" class="btn btn-block btn-primary bLike"><i  class="fa fa-thumbs-up"></i></button>
		</div>
	</div>
	<div class="scontainer" id="bottomleft">
	<a id="link4">Solution<label id="sLabel4"></label></a>
	 </div>
<!-- 	 <div class="scontainer" id="bottomright">
		<a id="aLink4"><label id="aLabel4"></label></a>
		<button id="like4" class="btn btn-block btn-primary bLike"><i  class="fa fa-thumbs-up"></i></button>
    </div> -->
 </div>
</div>

<div class="col-sm-2">
<a href="/webkedb/newsolution" id="pop"><input type="image" id="myButton" src="static/image/createsolution.png" alt="CreateSolution" style="padding:40px 5px 5px 20px;">
</a>
</div>


</div>
</div>
  </div>
</div>

<script type='text/javascript' src="http://code.jquery.com/ui/1.11.0/jquery-ui.min.js"> </script>
<script src="static/js/tickets.js"></script>
<script src="static/js/bubbles.js"></script>
<!--  <script src="static/js/ticket_bubble_filter.js"></script> -->
<!--<script src="static/js/d3.v3.min.js"></script> 
<script src="static/js/Underscore.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/d3-legend/1.1.0/d3-legend.js"></script>
<script src="static/js/donut.js"></script>

  <script src="static/js/jquery.ui.autocomplete.scroll.js"></script>
  <br>
<br>
<br>
<br>
  <br>
<br>
<br>
<br>
  <br>
<br>
<br>
<br>
<%@ include file = "footer.jsp" %>
</body>
</html>