var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/kidn';

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
console.log(sess);
sess = req.session;
if(sess.kidnValidSess){
   res.sendFile( __dirname + "/" + "admin-page.html" );}
else{
	res.sendFile( __dirname + "/" + "index.html" );}
})


/*LOGIN Attempt*/
app.post('/loginattempt', function (req, res) {

//console.log("NODE SERVER:user name and password is:",req.query.userName,req.query.password)


  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('users');

    // Insert some users
    return collection.find({userEmail:req.query.userName}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result[0].password);
        if(req.query.password == result[0].password){
          console.log("valid user");
          //sess.password = req.query.password;
          sess = req.session;
          sess.kidnValidSess = true;
          res.send("pass");
        }else{
          console.log("Invalid user");
          res.send("fail");
        }
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      //Close connection
      db.close();
    });
  }
});

});


var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
