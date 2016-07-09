var express = require('express');
var app = express();

// This respont the list of editors
app.get('/view_editors', function (req, res) {
   console.log("Got a GET request for the homepage");
   res.send('Hello view_editors');
})


// This responds a POST request for login page
app.post('/login', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

// This responds a DELETE request for the deleting an editor.
app.get('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a editor is created or not.
app.post('/create_editor', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds content uploaded successfully or not
app.get('/upload_content', function(req, res) {   
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})