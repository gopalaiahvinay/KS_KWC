$(document).ready(function(){
	$("#login-submit").off('click').on('click',function(e){
		var userName = $("#userName").val();
		var password = $("#password").val();
		console.log("sending req");
		$.post("/loginattempt?userName="+userName+"&password="+password,function(data, status){
        	//alert("Data: " + data + "\nStatus: " + status);
        }).done(function(data){
			//alert(data);
			if(data=="fail"){
				
				//alert("Login Authentication Failed, \nUser Name or Password may be wrong");
			}
			if(data == "pass"){
				console.log("respond",data);
				//alert(data);				
				window.location.href = "/admin-page.html";
								
				//$("#form-container").html(data);
			}
		});
		console.log("Req NODE SERVER:user name and password is:",userName,password)
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
