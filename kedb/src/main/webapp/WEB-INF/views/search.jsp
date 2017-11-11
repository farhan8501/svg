<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
    <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  
    
   
	
<title>KEDB - Search </title>
<meta name="GENERATOR" content="MSHTML 11.00.9600.18538">
<link rel="stylesheet" href="static/css/style.css">
</head>
<body data-page="tickets" class="html front">
<%@ include file = "header.jsp" %>
<div class="generic-container" >
	<div class="row">
 		<div class="panel panel-default">
			<div class="panel-heading">
				<i style="font-size:24px" class="fa">&#xf0c0;</i><span class="lead" id="panelHead"></span>
			</div>
		</div> 
	</div>
<div class="row">
	<div class="col-md-1">
		<label for="ticket">
         	<input type="radio" name="option" value="ticket" />Ticket
    	</label>
    <br>
    <br>
   	 	<label for="solution">
    		<input type="radio" name="option" value="solution" />Solution
    	</label>
    </div>
    <div class="col-md-5">
    Ticket Number:<input type="text" name="for_ticket[]" class="ticket" disabled="true" id="ticket_number" />
    Ticket Description:<input type="text" name="for_ticket[]" class="ticket" disabled="true" id="ticket_desc" />
    <button type="button" id="ticketsearchBtn" onclick="ticketsearchBtn()">Search</button> 
    <br>
    <br>
     Solution Description:<input type="text" name="for_solution[]" class="solution" disabled="true" id="solution_desc"/>
     <button type="button" id="solutionsearchBtn" onclick="solutionsearchBtn()">Search</button> 
    </div>
</div>
<div id="tableData"></div>
</div>

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<%@ include file = "footer.jsp" %>
</body>
<script src="static/js/search.js"></script>
<script src="static/js/jquery.ui.autocomplete.scroll.js"></script>
</html>