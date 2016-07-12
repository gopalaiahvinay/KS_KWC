var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'01234523s4534545',
//		 name: cookie_name,
//		 store: sessionStore,
		 proxy: true,
		 resave: true,
		 saveUninitialized: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var sess;

app.get('/index.html', function (req, res) {  

 res.sendFile( __dirname + "/" + "index.html" );
})
app.get('/admin-page.html', function (req, res) {
   //console.log(req)
sess = req.session;
console.log(sess.password);
if(sess.password){
   res.sendFile( __dirname + "/" + "admin-page.html" );}
else{
	res.sendFile( __dirname + "/" + "index.html" );}
})

app.post('/loginattempt', function (req, res) {

console.log("NODE SERVER:user name and password is:",req.query.userName,req.query.password)
sess = req.session;

   // Prepare output in JSON format
  if(req.query.userName == "v" && req.query.password == "p"){
    console.log("Valid user");
sess.password = req.query.password;
console.log("sess.email",sess.email);
    res.send( "pass" );
    //res.redirect(__dirname + "/" + "admin-page.html");
  //res.sendFile( __dirname + "/" + "admin-page.html" );
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
