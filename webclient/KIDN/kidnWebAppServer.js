var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

var bodyParser = require('body-parser');
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}));

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/kidn';

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '01234523s4534545',
  //     name: cookie_name,
  //     store: sessionStore,
  proxy: true,
  resave: true,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var sess;

app.get('/index.html', function(req, res) {

  res.sendFile(__dirname + "/" + "index.html");
});

app.get('/admin-page.html', function(req, res) {
  sess = req.session;
  if (sess.kidnValidSess) {
    if (sess.admin == true) {
      res.sendFile(__dirname + "/" + "admin-page.html");
    } else {
      res.sendFile(__dirname + "/" + "upload-content.html");
    }
  } else {
    res.sendFile(__dirname + "/" + "index.html");
  }
});


/*LOGIN Attempt*/
app.post('/loginattempt', function(req, res) {

  //console.log("NODE SERVER:user name and password is:",req.query.userName,req.query.password)


  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      //HURRAY!! We are connected. :)
      console.log('Connection established to', url);

      // Get the documents collection
      var collection = db.collection('users');

      // Insert some users
      return collection.find({
        userEmail: req.query.userName
      }).toArray(function(err, result) {
        if (err) {
          console.log(err);
        } else if (result.length) {
          console.log('Found:', result[0].password);
          if (req.query.password == result[0].password) {
            console.log("valid user");
            //sess.password = req.query.password;
            sess = req.session;
            sess.kidnValidSess = true;
            if (result[0].role == "admin") {
              sess.admin = true;
            }
            res.send("pass");
          } else {
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

//Loout  Handler
app.get('/logout', function(req, res) {
  sess = null;
  req.session.destroy(); //ends the session in express node
  res.send("logout successfully");
});

//Create Editors
app.get('/create-editors', function(req, res) {
  sess = req.session;
  if (sess.kidnValidSess && sess.admin) {
    res.sendFile(__dirname + "/" + "create-editors.html");
  } else {
    res.sendFile(__dirname + "/" + "index.html");
  }
});

//save-new-editor
app.post('/save-new-editor', function(req, res) {

  //console.log("NODE SERVER:user name and password is:",req.query.userName,req.query.password)
  sess = req.session;
  if (sess.kidnValidSess) {

    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log('Connection established to', url);
        var user = {
          "userName": req.query.userName,
          "userEmail": req.query.emailId,
          "password": req.query.password,
          "role": req.query.role
        };
        // Get the documents collection
        var collection = db.collection('users');
        collection.find({
          userEmail: req.query.emailId
        }).toArray(function(err, result) {
          if (err) {
            console.log(err);
          } else if (result.length) {
            db.close();
            res.send("user-exist");
            console.log("EXITST:", result.length);
          } else if (result.length == 0) {
            collection.insert(user, function(err, result) {
              if (err) {
                console.log(err);
                res.send("failed");
              } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                res.send("success");
              }
              //Close connection
              db.close();
            });
          }
        });
      }
    });
  } else {
    res.sendFile(__dirname + "/" + "index.html");
  }
});

app.get("/fetch-editors", function(req, res) {
  sess = req.session;
  if (sess.kidnValidSess) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        var collection = db.collection('users');
        //fetching without admin role
        collection.find({
          role: {
            $ne: "admin"
          }
        }).toArray(function(err, result) {
          if (err) {
            console.log(err);
            res.send("failed");
          } else if (result.length) {
            res.send(result);
          } else {
            console.log('No document(s) found with defined "find" criteria!');
            res.send("failed");
          }
          //Close connection
          db.close();
        });
      }
    });
  } else {
    res.sendFile(__dirname + "/" + "index.html");
  }
});

app.get('/view-editors', function(req, res) {
  sess = req.session;
  if (sess.kidnValidSess && sess.admin) {
    res.sendFile(__dirname + "/" + "view-editors.html");
  } else {
    res.sendFile(__dirname + "/" + "index.html");
  }
});

app.post('/delete-user', function(req, res) {
  sess = req.session;
  if (sess.kidnValidSess) {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        var collection = db.collection('users');
        collection.deleteOne({
          _id: new mongodb.ObjectID(req.query.id)
        }, function(err, results) {
          if (err) {
            console.log("failed deleting user Id:" + req.query.id);
            //throw err;
            console.log("error is:" + err);
            db.close();
          } else {
            console.log("successfully deleted user Id:" + req.query.id);
            res.send("deleted");
            db.close();
          }
        });
      }
    });
  } else {
    res.sendFile(__dirname + "/" + "index.html");
  }
});

app.get('/upload-content-page', function(req, res) {
  sess = req.session;
  if (sess.kidnValidSess) {
    res.sendFile(__dirname + "/" + "upload-content.html");
  } else {
    res.sendFile(__dirname + "/" + "index.html");
  }
});


app.post('/uploading-content', function(req, res) {
  sess = req.session;
  if (sess.kidnValidSess) {
    //console.log(JSON.stringify(req.body));
    //console.log(req.body.category);
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //Choosing Different Type of Collection
        // var = count;
        switch (req.body.category) {
          case "InternationalContents":
          var collection = db.collection('InternationalContents');
          break;
          case "NationalPoliticalContents":
          var collection = db.collection('NationalPoliticalContents');
          break;
          case "NationalSocialContents":
          var collection = db.collection('NationalSocialContents');
          break;
          case "EntertainmentContents":
          var collection = db.collection('EntertainmentContents');
          break;
          case "ScienceAndTechContents":
          var collection = db.collection('ScienceAndTechContents');
          break;
          case "SportsContents":
          var collection = db.collection('SportsContents');
          break;
          default:
          var collection = db.collection('ContentCollections');
        }
        var sequence=0, count1=0;
        if (req.body.mediaType == 'video') {
          console.log("Entered video")
          collection.count(function(err, count) {
            sequence = count+1;
            var content = {
              '_id':sequence,
              'category': req.body.category,
              'mediaType': req.body.mediaType,
              'newsTitle': req.body.newsTitle,
              'description': req.body.description,
              'videoUrl': req.body.videoUrl
            }
            collection.insert(content, function(err, result) {
              if (err) {
                console.log(err);
                res.send("failed");
                db.close();
              } else {
                console.log("Inserted content");
                res.send("success");
                db.close();
              }
            });
          });
        } else {
          collection.count(function(err, count ) {
            sequence = count+1;
            var base64Image = req.body.image;

            var matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            base64ImageResponse = {};

            if (matches.length !== 3) {
              return new Error('Invalid input string');
            }

            base64ImageResponse.type = matches[1];
            //console.log(base64ImageResponse.type);
            var fileFormat = "." + base64ImageResponse.type.substring(6, base64ImageResponse.type.length);
            base64ImageResponse.data = new Buffer(matches[2], 'base64');
            var hash = crypto.createHash('md5').update(base64ImageResponse.data).digest('hex');
            var fileName = hash + fileFormat;
            //console.log(hash);
            var photoFolder = req.body.category;
            require("fs").writeFile("public/uploaded-images/" + photoFolder + "/" + fileName, base64ImageResponse.data, 'base64', function(err) {
              if (err) {
                console.log(err);
              } else {
                console.log("uploaded successfully");
              }
            });

            var content = {
              '_id':sequence,
              'category': req.body.category,
              'mediaType': req.body.mediaType,
              'newsTitle': req.body.newsTitle,
              'description': req.body.description,
              'imageName': fileName
            }
            collection.insert(content, function(err, result) {
              if (err) {
                console.log(err);
                res.send("failed");
                db.close();
              } else {
                console.log("Inserted content");
                res.send("success");
                db.close();
              }
            });
          });
        }

      }
    });

  } else {
    res.sendFile(__dirname + "/" + "index.html");
    res.send('fail');
  }
});

app.get('/getInternational', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('InternationalContents');
      collection.find( { $and: [ { '_id': { $gte: parseInt(req.query.from) } }, { '_id': { $lte: parseInt(req.query.to) } } ] } ).toArray(function(err, result){
        if(err){console.log(err);
          res.send("noRecordsFound");}
          else if (result.length){res.send(result);}
        else{res.send("noUpdates");}
        db.close();
      });
    }
  });
});
app.get('/getNationalPoliticalContents', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('NationalPoliticalContents');
      collection.find( { $and: [ { '_id': { $gte: parseInt(req.query.from) } }, { '_id': { $lte: parseInt(req.query.to) } } ] } ).toArray(function(err, result){
        if(err){console.log(err);
          res.send("noRecordsFound");}
          else if (result.length){res.send(result);}
        else{res.send("noUpdates");}
        db.close();
      });
    }
  });
});
app.get('/getNationalSocialContents', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('NationalSocialContents');
      collection.find( { $and: [ { '_id': { $gte: parseInt(req.query.from) } }, { '_id': { $lte: parseInt(req.query.to) } } ] } ).toArray(function(err, result){
        if(err){console.log(err);
          res.send("noRecordsFound");}
          else if (result.length){res.send(result);}
        else{res.send("noUpdates");}
        db.close();
      });
    }
  });
});
app.get('/getEntertainmentContents', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('EntertainmentContents');
      collection.find( { $and: [ { '_id': { $gte: parseInt(req.query.from) } }, { '_id': { $lte: parseInt(req.query.to) } } ] } ).toArray(function(err, result){
        if(err){console.log(err);
          res.send("noRecordsFound");}
          else if (result.length){res.send(result);}
        else{res.send("noUpdates");}
        db.close();
      });
    }
  });
});
app.get('/getScienceAndTechContents', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('ScienceAndTechContents');
      collection.find( { $and: [ { '_id': { $gte: parseInt(req.query.from) } }, { '_id': { $lte: parseInt(req.query.to) } } ] } ).toArray(function(err, result){
        if(err){console.log(err);
          res.send("noRecordsFound");}
          else if (result.length){res.send(result);}
        else{res.send("noUpdates");}
        db.close();
      });
    }
  });
});
app.get('/getSportsContents', function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      var collection = db.collection('SportsContents');
      collection.find( { $and: [ { '_id': { $gte: parseInt(req.query.from) } }, { '_id': { $lte: parseInt(req.query.to) } } ] } ).toArray(function(err, result){
        if(err){console.log(err);
          res.send("noRecordsFound");}
          else if (result.length){res.send(result);}
        else{res.send("noUpdates");}
        db.close();
      });
    }
  });
});

var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});
