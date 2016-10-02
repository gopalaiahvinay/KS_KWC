$(document).ready(function() {
    $("#login-submit").off('click').on('click', function(e) {
        var userName = $("#userName").val();
        var password = $("#password").val();
        console.log("sending req");
        $.post("/loginattempt?userName=" + userName + "&password=" + password, function(data, status) {
            //alert("Data: " + data + "\nStatus: " + status);
        }).done(function(data) {
            //alert(data);
            if (data == "fail") {
                $(".error-pan").text("Please provide valid - 'User Email'");
                //alert("Login Authentication Failed, \nUser Name or Password may be wrong");
            }else if(data == "Invalid Password"){
                $(".error-pan").text(data);
            }else if (data == "pass") {
                console.log("respond", data);
                //alert(data);
                window.location.href = "/admin-page.html";
                //$.get("/admin-page.html");
                //$("#form-container").html(data);
            }
        });
        console.log("Req NODE SERVER:user name and password is:", userName, password)
            //Node Js evaluate user name and password


    });

    $("#logout").off('click').on('click', function(e) {
        $.get("/logout", function(data, status) {

        }).done(function(data) {
            alert(data);
            window.location.href = "/admin-page.html";
        });
    });


    $("#crate-user-submit").off('click').on('click', function(e) {

        var userName = $("#userName").val();
        var emailId = $("#emailId").val();
        var password = $("#password").val();
        var repassword = $("#repassword").val();
        var role = $("#role").val();
        console.log("");
        //validate form
        if (userName == "" || userName == undefined) {
            $(".error-pan").text("Please provide User Name.");
            return;
        } else if (emailId == "" || emailId == undefined) {
            $(".error-pan").text("Please provide Email Id.");
            return;
        } else if (password == "" || password == undefined) {
            $(".error-pan").text("Please provide Password");
            return;
        } else if (repassword == "" || repassword == undefined) {
            $(".error-pan").text("Please provide Re-Enter Password.");
            return;
        } else if (password != repassword) {
            $(".error-pan").text("Password and Re-Entered Password are not matching!");
            $(":password").val("");
            return;
        } else {
            var emailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
            if (!emailRegex.test(emailId)) {
                $(".error-pan").text("Not a valid Email Id!");
                return;
            }
        }

        $.post("/save-new-editor?userName=" + userName + "&password=" + password + "&emailId=" + emailId + "&role=" + role, function(data, status) {
            //alert("Data: " + data + "\nStatus: " + status);
        }).done(function(data) {
            if (data == "failed") {
                $(".error-pan").text("Unable Create User Network Error, Please Try after some time");
            } else if (data == "success") {
                $(".error-pan").text("Created User Successfully");
                $(":text").val("");
                $(":password").val("");
            } else if (data == "user-exist") {
                $(".error-pan").text("User Already Exist, Please try with different Email ID.");
            }

        });
    });

    //view-editors
    $("#view-editors").off('click').on('click', function(e) {
        $.get("/fetch-editors", function(data, status) {
            console.log("fetch-editors");
        }).done(function(data) {
            if (data != "failed") {
                //window.location.href = "/view-editors";
                $("#admin-panel").hide();
                $("#view-users").show();
                var userTbodyTemplate = "";
                for (i = 0; i < data.length; i++) {
                    var count = i + 1;
                    console.log(data[i]._id);
                    userTbodyTemplate += "<tr><td>" + count + "</td><td>" + data[i].userName + "</td><td>" + data[i].userEmail + "</td><td class='delete-user' data-email='" + data[i].userEmail + "' data-id='" + data[i]._id + "'></td></tr>";
                }
                $("#users-tbody").html(userTbodyTemplate);

                $(".delete-user").off('click').on('click', function(e) {
                    var userEmail = $(e.target).data("email");
                    var id = $(e.target).data("id");
                    var row = $(e.target).parent();
                    $.post("/delete-user?id=" + id, function(data, status) {

                    }).done(function(data) {
                        if (data == "deleted") {
                            $(".error-pan").text("User of Email Id:" + userEmail + " Deleted from Editors list.");
                            $(row).remove();
                        }
                    });
                });
            }
        });

    });


    $("#view-editors-back-button").off('click').on('click', function(e) {
        $("#admin-panel").show();
        $("#view-users").hide();
    });


    $("#choose-media").off('change').on('change', function(e) {
        var mediaValue = $("#choose-media").val();
        $('input[type=file]').val("");
        $("#uploaded-video-url").val("");
        if (mediaValue == "image") {
            //$("#file-upload-label").html("Upload Image:");
            //$("#file-upload-content").html("<input type='file' id='uploaded-image' name='pic' accept='image/*''>");
            $("#video-content").hide(); 
            $("#image-content").show();   
        } else if (mediaValue == "video") {
           $("#video-content").show();
           $("#image-content").hide();
           // $("#file-upload-label").html("Enter Youtube URL:");
           // $("#file-upload-content").html("<input type='text' id='uploaded-video-url' placeholder='Please provide Youtube Embeded URL' maxlength='255' required>");
        }
    });

    $("#upload-content").off('click').on('click', function() {
        window.location.href = "/upload-content-page";
    });

    $("#file-upload-submit").off('click').on('click', function(e) {
        $(".error-pan").text("Please wait - Upload in progress..");
        var category = $("#category").val();
        var mediaType = $("#choose-media").val();
        var newsTitle = $("#news-title").val().trim();
        var description = $("#description").val().trim();
        var originalNewsURL = $("#original-news-url").val().trim();
        var authorName = $("#author-name").val().trim();

        var file = $("#uploaded-image");
        if (!newsTitle) {
            $(".error-pan").text("Please provide News title.");
            $("#news-title").focus();
            return;
        } else if (!description) {
            $(".error-pan").text("Please provide News description.");
            $("#description").focus();
            return;
        }  else if (!originalNewsURL) {
            $(".error-pan").text("Please provide Original News URL.");
            $("##original-news-url").focus();
            return;
        }  else if (!authorName) {
            $(".error-pan").text("Please provide Author Name.");
            $("#author-name").focus();
            return;
        } 

        if (mediaType == 'video') {
            //alert(category);
            var file = $("#uploaded-thumbnail");
            if (file.val() == "") {
                $(".error-pan").text("Please select Video Thumnail.");
                return;
            }
            var videoUrl = $("#uploaded-video-url").val();
            if (!videoUrl) {
                $(".error-pan").text("Please provide video URL.");
                $("#uploaded-video-url").focus();
                return;
            }
            var data = {
                'category': category,
                'mediaType': mediaType,
                'newsTitle': newsTitle,
                'description': description,
                'videoUrl': videoUrl,
                'originalNewsURL':originalNewsURL,
                'authorName': authorName 
            };
            //alert(category);
            var image = document.querySelectorAll('input[type=file]')[1].files[0];
            //$("#uploaded-image");
            var reader = new FileReader();
            reader.readAsDataURL(image);

            reader.addEventListener("load", function() {
                //  alert(reader.result);
            data["thumbnail"] = reader.result;
            
            $.ajax({
                url: 'uploading-content', //Server script to process data
                type: 'POST',

                data: JSON.stringify(data),
                contentType: "application/json",
                //contentType: "application/x-www-form-urlencoded",
                dataType: 'json',
                //Ajax events
                success: function(data) {
                    //  alert(String(data));
                    if (data.responseText == "success" || data.status == 413) {
                        //alert(data.status + " Uploaded Content successfully");
                        $(".error-pan").text("Uploaded News Title:"+newsTitle+" - successfully");
                    } else {
                       // alert(data.responseText);
                    }
                },
                error: function(data) {
                    //  alert(String(data));
                    if (data.responseText == "success" || data.status == 413) {
                        //alert(data.status + " Uploaded Content successfully");
                       $(".error-pan").text("Uploaded News Title:"+newsTitle+" - successfully");
                    } else {
                      //  alert(data.responseText);
                    }
                },
                complete: function() {
                  $('input[type=text], textarea, input[type=file]').val("");
                }
            });}, false );
        } else {
            var file = $("#uploaded-image");
            if (file.val() == "") {
                $(".error-pan").text("Please select an Image to Upload.");
                return;
            }
            var data = {
                'category': category,
                'mediaType': mediaType,
                'newsTitle': newsTitle,
                'description': description,
                'originalNewsURL':originalNewsURL,
                'authorName': authorName 
            };
            //alert(category);
            var image = document.querySelectorAll('input[type=file]')[0].files[0];
            //$("#uploaded-image");
            var reader = new FileReader();
            reader.readAsDataURL(image);

            reader.addEventListener("load", function() {
                //  alert(reader.result);
                data["image"] = reader.result;
                $.ajax({
                    url: 'uploading-content', //Server script to process data
                    type: 'POST',
                    data: JSON.stringify(data),
                    contentType: "application/json",
                    //contentType: "application/x-www-form-urlencoded",
                    dataType: 'json',
                    //Ajax events
                    success: function(data) {
                        //  alert(String(data));
                        if (data.responseText == "success" || data.status == 413) {
                           // alert(data.status + " Uploaded Content successfully");
                           $(".error-pan").text("Uploaded News Title:"+newsTitle+" - successfully");
                        } else {
                           // alert(data.responseText);
                        }
                    },
                    error: function(data) {
                        //  alert(String(data));
                        if (data.responseText == "success" || data.status == 413) {
                           // alert(data.status + " Uploaded Content successfully");
                           $(".error-pan").text("Uploaded News Title:"+newsTitle+" - successfully");
                        } else {
                           // alert(data.responseText);
                        }
                    },
                    complete: function() {
                        $('input[type=text], textarea, input[type=file]').val("");
                    }
                });
            }, false);
        }
    });
});
