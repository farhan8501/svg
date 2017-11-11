<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta name="GENERATOR" content="MSHTML 11.00.9600.18538">
   
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	
<title>KEDB - View Solution </title>
 
		
</head>

<body data-page="home" class="html front">

	<header id="navbar" role="banner" class=""> </header>
	<div class="table-responsive">
		<div class="well lead">View Solution</div>

		<table  class="table table-striped">
			<thead >
				<tr>
					<th>Solution Id</th>
					<th>Solution Description</th>
					<th>Search KeyWords</th>
					<th>Created By</th>
					<th>Created Date</th>
					<th>Updated Date</th>
					<th>Status</th>
					<th>Category Name</th>
					<th align="center">Ticket Number</th>
					<sec:authorize access="hasRole('ADMIN') or hasRole('DBA')">
						<th width="100"></th>
					</sec:authorize>
					<sec:authorize access="hasRole('ADMIN')">
						<th width="100"></th>
					</sec:authorize>

				</tr>
			</thead>
			
			<tbody>
				<tr>

					<td>${solution.solution_id}</td>
					<td>${solution.solution_description}</td>
					<td>${solution.search_keyword}</td>
					<td>${solution.created_by}</td>
					<td>${solution.created_date}</td>
					<td>${solution.last_update_date}</td>
					<td>${solution.status}</td>
					<td><c:forEach items="${solution.applicationCategory}"
							var="applicationCategory"> 
							 ${applicationCategory.categoryName} 
					</c:forEach></td>
					
					<td>
					<table>
					<c:forEach items="${solution.incident}" var="incident">
					<tr>    
       				<td>
					<a href="<c:url value='/ticket/${incident.ticket_id}' />" > ${incident.ticket_number} </a>
					</td>      
       				</tr>
					</c:forEach>
					</table>
					</td>

					 
					 
						<c:choose>
						<c:when test="${edit}"> 
						<td><a href="<c:url value='/edit-solution-${solution.solution_id}' />"
							class="btn btn-success custom-width">Edit</a></td>
						</c:when> 
						</c:choose>
					 
					<sec:authorize access="hasRole('DBA')">
						<c:choose>
						<c:when test="${Approve}"> 
						<td><a  
							href="<c:url value='/status-solution-${solution.solution_id}' />"
							class="btn btn-success custom-width">Approve</a></td>
						</c:when> 
						</c:choose>
					</sec:authorize>
					
					<sec:authorize access="hasRole('DBA')">
						<td><a
							href="<c:url value='/delete-solution-${solution.solution_id}' />"
							class="btn btn-danger custom-width">Delete</a></td>
					</sec:authorize>
				</tr>


			</tbody>
		</table>
		<tr>
			<td>
				<div class="form-actions floatRight">
					<a href="javascript: history.go(-1)">Cancel</a>
				</div>
			</td>
		</tr>
	</div>


</body>
</html>