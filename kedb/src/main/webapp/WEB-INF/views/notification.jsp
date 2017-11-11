<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="stylesheet" href="static/css/bootstrap.min.css">
   <link href="<c:url value='/static/css/app.css' />" rel="stylesheet"></link>
   <link rel="stylesheet" href="static/css/style.css">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="static/js/jquery.min.js"></script>
    <script src="static/js/bootstrap.min.js"></script>
    <title>KEDB -Notifications</title>
</head>
<body data-page="notifications" class="html front">

<%@ include file = "header.jsp" %>
		<div class="container">
  		<h2>My Tickets</h2>
      <div class="panel-group" id="accordion">
  	  <div class="panel panel-default">
	  <div class="panel-body">
  	  <table class="table table-hover">
      <thead>
					<tr class="success">
						<!-- <th style="visibility:hidden;">TICKET_ID</th> -->
						<th>TICKET NUMBER</th>
						<th>DESCRIPTION</th>
						<th>PRIORITY</th>
						<th>STATUS</th>
						<th>CATEGORY</th>
						<th>OPENED DATE</th>
						 
	<!-- style="visibility:hidden;" -->					 
					</tr>
	 </thead>
	  	<tbody class="active">
  	  <c:forEach items="${tickets}" var="ticket">
     
						<tr>
							<%-- <td style="visibility:hidden;">${ticket.ticket_id}</td> --%>
							<td><button type="button" id="num" class="btn btn-success" data-toggle="collapse" data-parent="#accordion" data-target="#${ticket.ticket_number}"> 
							<span id="${ticket.ticket_id}">${ticket.ticket_number}</span>
						
							</button>
							
							</td>
							<td>${ticket.ticket_desc}</td>
							<td>${ticket.ticket_priority}</td>
							<td>${ticket.ticket_status}</td>
							<td>${ticket.category_name}</td>
							<td>${ticket.opened_date}</td>
					        
				    	</tr>
				    
				    <tr class="collapse out" id="${ticket.ticket_number}">
				    </tr>
			</c:forEach>
			</tbody>
			</table>

 			 </div>
			</div>
			</div>
			</div>
 
 
</body>
<script src="static/js/d3.min.js" charset="utf-8"></script>
<script src="static/js/notification.js"></script>
</html>
