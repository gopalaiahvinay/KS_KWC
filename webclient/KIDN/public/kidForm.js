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
				//$.get("/admin-page.html");
				//$("#form-container").html(data);
			}
		});
		console.log("Req NODE SERVER:user name and password is:",userName,password)
		//Node Js evaluate user name and password
		
		
	});

	
	$("#crate-user-submit").off('click').on('click',function(e){
		
		var userName = $("#userName").val();
		var emailId = $("#emailId").val();
		var password = $("#password").val();
		var repassword = $("#repassword").val();
		var role = $("#role").val();
		console.log("");
		//validate form
		if(userName == "" || userName == undefined){			
			$(".error-pan").text("Please provide User Name.");
			return;
		}else if(emailId == "" || emailId == undefined){
			$(".error-pan").text("Please provide Email Id.");
			return;
		}else if(password  == "" || password  == undefined){
			$(".error-pan").text("Please provide Password");
			return;
		}else if(repassword == "" || repassword == undefined){
			$(".error-pan").text("Please provide Re-Enter Password.");
			return;
		}else if(password != repassword){
			$(".error-pan").text("Password and Re-Entered Password are not matching!");
			$(":password").val("");
			return;
		}else{
			var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
			if(!emailRegex.test(emailId)){
				$(".error-pan").text("Not a valid Email Id!");				 
				return;
			}
		}

		$.post("/save-new-editor?userName="+userName+"&password="+password+"&emailId="+emailId+"&role="+role,function(data, status){
        	//alert("Data: " + data + "\nStatus: " + status);
        }).done(function(data){
        	if(data == "failed"){
        		$(".error-pan").text("Unable Create User Network Error, Please Try after some time");
        	}else if (data == "success"){
        		$(".error-pan").text("Created User Successfully");
        		$( ":text" ).val("");
				$( ":password" ).val("");
        	}else if(data == "user-exist"){
        		$(".error-pan").text("User Already Exist, Please try with different Email ID.");
        	}

    	});
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
