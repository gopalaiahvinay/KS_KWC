$(document).ready(function(){
	$("#login-submit").off('click').on('click',function(e){
		var userName = $("#userName").val();
		var password = $("#password").val();
		console.log(userName);
		//console.log(password);
		//Node Js evaluate user name and password
		
		
	});

	
	$("#crate-user-submit").off('click').on('click',function(e){
		var userName = $("#userName").val();
		var password = $("#password").val();
		var emailId = $("#emailId").val();
		var role = $("#role").val();
		console.log(userName+"&"+emailId+"&"+role);
		//console.log(password);
		//Node Js CREATE NEW EDITOR
	});

	$("#view-editors").off('click').on('click',function(e){
		
		console.log("Fetch Editors");
		
		
		//request code is here
		var request = require([request]);
		request({
		  uri: "http://localhost:8081/view_editors",
		  method: "GET",
		  timeout: 10000,
		  followRedirect: true,
		  maxRedirects: 10
		}, function(error, response, body) {
		  console.log(response);
		});
		//request code ends here
		
		//Node Js EDITORS
	});


});
