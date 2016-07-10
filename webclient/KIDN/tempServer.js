var express = require('express');
var app = require('express')();

//var app = express();

//app.use(express.static('public'));

app.get('/index.html', function (req, res) {
   res.sendFile( __dirname + "/" + "index.html" );
})
/*app.get('/admin-page.html', function (req, res) {
console.log(req)
   res.sendFile( __dirname + "/" + "admin-page.html" );
})*/

app.get('/Login_attempt', function (req, res) {

console.log("user name and password is:",req.query.userName,req.query.password,req )
   // Prepare output in JSON format
if(req.query.userName == "vishwa" && req.query.password == "vishwa"){
   /*response = {
       first_name:req.query.userName,
       last_name:req.query.password
   };*/
res.sendFile( __dirname + "/" + "admin-page.html" );
}
   //console.log(response);
   //res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
