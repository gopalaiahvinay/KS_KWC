var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
app.use(express.static(path.join(__dirname, 'public')));

//var app = express();

//app.use(express.static('public'));

app.get('/index.html', function (req, res) {  
 res.sendFile( __dirname + "/" + "index.html" );
})
/*app.post('/admin-page.html', function (req, res) {
console.log(req)
   res.sendFile( __dirname + "/" + "admin-page.html" );
})*/

app.post('/loginattempt', function (req, res) {

console.log("NODE SERVER:user name and password is:",req.query.userName,req.query.password)
   // Prepare output in JSON format
  if(req.query.userName == "v" && req.query.password == "p"){
    console.log("Valid user");
    //res.send( "pass" );
    //res.redirect(__dirname + "/" + "admin-page.html");
    res.sendFile( __dirname + "/" + "admin-page.html" );
  }else{
    console.log("Invalid user");
    res.send( "fail" );
  }
   //console.log(response);
   //res.end(JSON.stringify(response));
});

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
