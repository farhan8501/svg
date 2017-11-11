<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page isELIgnored="false"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
   
    <link rel="stylesheet" href="static/css/bootstrap.min.css">
 	<!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"> -->

    <link rel="stylesheet" href="static/css/BootSideMenu.css">
   

	<style type="text/css">
        .user {
            padding: 5px;
            margin-bottom: 5px;
            text-align: left;
        }
    </style>

    <!-- <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>  commented to include ajax version of jquery-->
    <script src="static/js/jquery.min.js"></script>
    <script src="static/js/bootstrap.min.js"></script>
    <script src="static/js/BootSideMenu.js"></script>
   
	
<title>KEDB - Tickets </title>
 

<meta name="GENERATOR" content="MSHTML 11.00.9600.18538">

<link rel="stylesheet" href="static/css/style.css">

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js" charset="utf-8"></script> -->
<script src="static/js/d3.min.js" charset="utf-8"></script>
<script src="static/css/underscore-min.js"></script>
		
</head>

<body data-page="home" class="html front">

<%@ include file = "header.jsp" %>
	<div class="generic-container">

		<div class="well lead">Create Solution</div>
		<form:form method="POST" modelAttribute="solution"
			class="form-horizontal">
			<form:input type="hidden" path="solution_id" id="solution_id" />
				<div class="row">
				<div class="form-group col-md-12">
					<c:choose>
						<c:when test="${edit}">
						<label class="col-md-3 control-lable" for="solution_id">
						Solution Id</label>
					<div class="col-md-7">
						<form:input type="text" path="solution_id" readonly="true"
							id="solution_id" class="form-control input-sm" />
					</div>
					</c:when>
					</c:choose>
					</div>
					</div>

			<div class="row">
				<div class="form-group col-md-12">
					<label class="col-md-3 control-lable" for="solution_description">
						Description</label>
					<div class="col-md-7">
						<form:textarea path="solution_description"
							id="solution_description" class="form-control input-sm" />
						<div class="has-error">
							<form:errors path="solution_description" class="help-inline" />
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="form-group col-md-12">
					<label class="col-md-3 control-lable" for="search_keyword">Key
						Words</label>
					<div class="col-md-7">
						<form:textarea path="search_keyword" id="search_keyword"
							class="form-control input-sm" rows="5" cols="30" />
						<div class="has-error">
							<form:errors path="search_keyword" class="help-inline" />
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div class="form-group col-md-12">
					<c:choose>
						<c:when test="${edit}">
							<label class="col-md-3 control-lable" for="applicationCategory">
								Category</label>
							<div class="col-md-7">
								<form:select path="applicationCategory" items="${categories}"
									multiple="flase" itemValue="categoryId"
									itemLabel="categoryName" class="form-control input-sm">
								</form:select>
								<div class="has-error">
									<form:errors path="applicationCategory" class="help-inline" />
								</div>
							</div>
						</c:when>
						<c:otherwise>
							<label class="col-md-3 control-lable" for="applicationCategory">
								Category</label>
							<div class="col-md-7">
								<form:select path="applicationCategory" multiple="flase"
									class="form-control input-sm">
									<option value="">Select Category</option>
									<c:forEach items="${categories}" var="category">
										<option value="${category.categoryId}">${category.categoryName}</option>
									</c:forEach>
								</form:select>
								<div class="has-error">
									<form:errors path="applicationCategory" class="help-inline" />
								</div>
							</div>
						</c:otherwise>
					</c:choose>
				</div>
			</div>

			<div class="row">
				<div class="form-group col-md-12">
					<c:choose>
						<c:when test="${edit}">

							<label class="col-md-3 control-lable" for="incident">
								Incidents</label>
							<div class="col-md-7">
								<form:select path="incident" items="${incidents}"
									multiple="true" itemValue="ticket_id"
									itemLabel="ticket_number" class="form-control input-sm">
								</form:select>
								<div class="has-error">
									<form:errors path="incident" class="help-inline" />
								</div>
							</div>
						</c:when>
						<c:otherwise>
							<label class="col-md-3 control-lable" for="incident">
								Ticket Number</label>
							<div class="col-md-7">
								<form:select path="incident" multiple="true"
									class="form-control input-sm">
									
									<c:forEach items="${incidents}" var="incident">
										<option value="${incident.ticket_id}">${incident.ticket_number}</option>
									</c:forEach>
								</form:select>
								<div class="has-error">
									<form:errors path="incident" class="help-inline" />
								</div>
							</div>
						</c:otherwise>
					</c:choose>
				</div>
			</div>



			<div class="row">
				<div class="form-actions floatRight">
					<c:choose>
						<c:when test="${edit}">
							<input type="submit" value="Update"
								class="btn btn-primary btn-sm" /> or <a href="javascript: history.go(-1)">Cancel</a>
						</c:when>
						<c:otherwise>
							<input type="submit" value="Save" class="btn btn-primary btn-sm" /> or <a href="javascript: history.go(-1)">Cancel</a>
						</c:otherwise>
					</c:choose>
				</div>
			</div>
		</form:form>
	</div>
	<%@ include file = "footer.jsp" %>
</body>
</html>