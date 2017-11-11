/*$('#search').keydown(function(){
	$.getJSON('/webkedb/incidents/',function(data){
		var search=$('#search').val();
		var regex=new RegExp(search,'i');
		var output;
		$.each(data,function(key,val){
			output+="<tr>";
			output+="<td id='"+key+"'>"+val.ticket_number+"<td>";
			output+="<td id='"+key+"'>"+val.ticket_desc+"<td>";
			output+="<td id='"+key+"'>"+val.assignedTo+"<td>";
			output+="<td id='"+key+"'>"+val.ticket_priority+"<td>";
			output+="<td id='"+key+"'>"+val.ticket_status+"<td>";
			output+="<td id='"+key+"'>"+val.category_name+"<td>";
			output+="<td id='"+key+"'>"+val.opened_date+"<td>";
			output+="<tr>";
			
			
		});
		$('tbody').html(output);
	});
})*/
  $(document).ready(function(){
    $('input[type=radio][name=option]').click(function(){
        var related_class=$(this).val();
        $('.'+related_class).prop('disabled',false);
        
        $('input[type=radio][name=option]').not(':checked').each(function(){
            var other_class=$(this).val();
            $('.'+other_class).prop('disabled',true);
            
        });
        if(related_class=="ticket"){
        	document.getElementById("panelHead").innerHTML="List Of Tickets";
        }
        else{
        	$('span[id*="panelHead"]').text('');
        	document.getElementById("panelHead").innerHTML="List Of Solutions";
        }
    });
	$('#ticket_number').focus(
		    function(){
		        $(this).val('');
		       // $('#ticket_desc').attr('disabled',true);
		        //event.preventDefault();
		    });
	$('#ticket_desc').focus(
		    function(){
		        $(this).val('');
		      //  $('#ticket_number').prop('disabled',true);
		       // event.preventDefault();
		    });
	$('#solution_desc').focus(
		    function(){
		        $(this).val('');
		       
		    });
  });
  /*var searchArray = [];
	//autocomplete ticket number box
  $(document).ready(function(){
    $.ajax({
  	    type: "GET", 
  	    url: '/webkedb/incidents',
  	    data: "text",
  		success:function(response){
  			for (var i = 0; i <response.length - 1; i++) {
  			    searchArray.push( response[i].ticket_number);
  			  
  			}
  			}
  	});
		searchArray = searchArray.sort();
			//console.log(searchArray);
	$(function () {
	    $("#ticket_number").autocomplete({
	    	 maxShowItems: 10,
	        source: searchArray
	    });
	});
  });*/
  function ticketsearchBtn(){
	  var search = {}
	  var id = document.getElementById('ticket_number').value;
	  var desc = document.getElementById('ticket_desc').value;
	  if (id!==null || id.trim()!==""){
  	    $.ajax({
  	    type: "GET", 
  	    url: '/webkedb/searchticketid/'+id,
  	    data: "text",
  		success:function(response){
  			ticketdata(response)
  			}
  	});
	} 
	  
    if (desc!==null || desc.trim()!==""){
    	
         	$.ajax({
      	    type: "GET", 
      	    url: '/webkedb/searchticketdesc/'+desc,
      	    data: "text",
      		success:function(response){
      			if(response===""){ticketDataEmpty()}
      			else{ticketdata(response)}
      			
      	    }
      	});
      }
	  
  }
  
  function solutionsearchBtn(){
	  var search = {}
	  var desc = document.getElementById('solution_desc').value;
	  if (desc!==null || desc.trim()!==""){
  	    $.ajax({
  	    type: "GET", 
  	    url: '/webkedb/searchsolutiondesc/'+desc,
  	    data: "text",
  		success:function(response){
  			if(response===""){}
  			else{ticketdata(response)}
  			
  	    }
  	});
	} 
  }
  function ticketDataEmpty(){
	  $('#tableData').append('<label>sorry there are no tickets for the searched option</label>');
  }
  function ticketdata(response) {
/*	  var output;
		//var json = "<h4>Ticket_Number Search data:</h4><pre>"+ JSON.stringify(response, null, 4) + "</pre>";
	  	output+=" <table>" +
			"<thead>" +
			"<th>TICKET NUMBER</th><th>DESCRIPTION</th><th>PRIORITY</th><th>STATUS</th><th>CATEGORY</th><th>OPENED DATE</th></tr></thead>" +
			"<tbody>";
	  $.each(response,function(key,val){
		  output+="<tr>";
			output+="<td id='"+key+"'>"+val.ticket_number+"<td>";
			output+="<td id='"+key+"'>"+val.ticket_desc+"<td>";
			//output+="<td id='"+key+"'>"+val.assignedTo+"<td>";
			output+="<td id='"+key+"'>"+val.ticket_priority+"<td>";
			output+="<td id='"+key+"'>"+val.ticket_status+"<td>";
			output+="<td id='"+key+"'>"+val.category_name+"<td>";
			output+="<td id='"+key+"'>"+val.opened_date+"<td>";
			output+="<tr>";
		});
	  output+="</tr></tbody></table>";
		$('#tableData').html(output);*/
      // EXTRACT VALUE FOR HTML HEADER. 
      // ('Book ID', 'Book Name', 'Category' and 'Price')
      var col = [];
      for (var i = 0; i < response.length; i++) {
          for (var key in response[i]) {
              if (col.indexOf(key) === -1) {
                  col.push(key);
              }
          }
      }

      // CREATE DYNAMIC TABLE.
      var table = document.createElement("table");

      // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

      var tr = table.insertRow(-1);                   // TABLE ROW.

      for (var i = 0; i < col.length; i++) {
          var th = document.createElement("th");      // TABLE HEADER.
          var nameFormat=col[i];
          var index = nameFormat.lastIndexOf("_");
          var result = nameFormat.substr(index+1);
          th.innerHTML = result.toUpperCase();
          tr.appendChild(th);
      }

      // ADD JSON DATA TO THE TABLE AS ROWS.
      for (var i = 0; i < response.length; i++) {

          tr = table.insertRow(-1);

          for (var j = 0; j < col.length; j++) {
              var tabCell = tr.insertCell(-1);
              tabCell.innerHTML = response[i][col[j]];
          }
      }

/*      // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
      var divContainer = document.getElementById("#tableData");
     // divContainer.innerHTML = "";
      divContainer.appendChild(table);*/
      $('#tableData').html(table);
  }
  
   