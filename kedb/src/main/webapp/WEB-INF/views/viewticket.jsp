<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="GENERATOR" content="MSHTML 11.00.9600.18538">
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
	<style type="text/css">
        .user {
            padding: 5px;
            margin-bottom: 5px;
            text-align: left;
        }
    </style>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="static/css/style.css">
</head>
<body data-page="home" class="html front">

	<header id="navbar" role="banner" class=""> </header>
	<div class="table-responsive">
		<div class="well lead">View Ticket</div>

	
		<table class="table table-hover">
			<thead>
				<tr>
					<th>TICKET ID</th>
					<th>TICKET NUMBER</th>
					<th>TICKET DESC</th>
					<th>TICKET PRIORITY</th>
					<th>TICKET STATUS</th>
					<th>CATEGORY NAME</th>
					<th>OPEN DATE</th>
					<th>CLOSE DATE</th>
					<th>RATING</th>

				</tr>
			</thead>
			<tbody>

				<tr>
					<td>${incident.ticket_id}</td>
					<td>${incident.ticket_number}</td>
					<td>${incident.ticket_desc}</td>
					<td>${incident.ticket_priority}</td>
					<td>${incident.ticket_status}</td>
					<td>${incident.category_name}</td>
					<td><fmt:formatDate value="${incident.opened_date}" pattern="dd-MM-yyyy" var="createdDate" />
					<c:out value="${createdDate}" /> </td>
					<td><fmt:formatDate value="${incident.closed_date}" pattern="dd-MM-yyyy" var="closedDate" />
					<c:out value="${closedDate}" /> </td>
					
					<td>${incident.ratingclassvalue}</td>
				</tr>
			</tbody>
		<tr>
			<td>
				<div class="form-actions floatRight">
					<a href="javascript: history.go(-1)">Cancel</a>
				</div>
			</td>
		</tr>
		</table>
</div>
</body>
</html>