var express = require('express');
var app = express();


//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/kidn';


//example added to test to connect mongo
// Import events module
var events = require('events');
// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {
   console.log('connection succesful.');
 MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                 var collection = db.collection('users');
 console.log('connect to the mongoDB server');
                 //collection.find();   
            }
        });
  
   // Fire the data_received event 
   eventEmitter.emit('data_received');
}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);
 
// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function(){
   console.log('data received succesfully.');
});

// Fire the connection event 
eventEmitter.emit('connection');


/*
These below function will give the maximm Newslist of 10 
The function and  parameters are 
request(NewsType,FromNumber)
response(list[titles],list[descreptions],list[thumbnailOriginallFileName])

pseudo Code:

if(FromNumber<totalNumberOfNewsRows){

	if((FromNumber+10)<totalNumberOfNewsRows){
		appendAllTenItems;
		send(list[titles],list[descreptions],list[thumbnailOriginallFileName])
	}else{
		appendLeftoutItems;
		send(list[titles],list[descreptions],list[thumbnailOriginallFileName])
	}
}
*/
app.get('/getEntertainment', function (req, res) {
	res.send('getEntertainment');
})


app.get('/getInternational', function (req, res) {
   	res.send('getInternational');
})


app.get('/getNationalPolitics', function (req, res) {
   	res.send('getNationalPolitics');
})


app.get('/getNationalSocial', function (req, res) {
   res.send('getNationalSocial');
})


app.get('/getScienceTech', function (req, res) {
   res.send('getScienceTech');
})


app.get('/getSports', function (req, res) {
   res.send('getSports');
})


/*
These below function will give only the particular image or Vedio
The function and  parameters are 
request(thumbnailOrOriginal,ImageORVedio,thumbnailOriginallFileName)
response(imageorVedioFile)

pseudo code:

if(thumbnailOrOriginal == thumbnail){
	goto ThumbnailDirectory
	send(thumbnailFile)
} 
else if(thumbnailOrOriginal == Original && ImageORVedio == Image){
	goto OriginalImageDirectory
	send(OriginalImageFile)
}
else{
	goto OriginalVedioDirectory
	send(OriginalVedioFile)
}
*/
app.get('/getParticularEntertainment', function (req, res) {
   res.send('getEntertainment');
})


app.get('/getParticularInternational', function (req, res) {
   res.send('getInternational');
})


app.get('/getParticularNationalPolitics', function (req, res) {
   res.send('getNationalPolitics');
})


app.get('/getParticularNationalSocial', function (req, res) {
   res.send('getNationalSocial');
})


app.get('/getParticularScienceTech', function (req, res) {
   res.send('getScienceTech');
})


app.get('/getParticularSports', function (req, res) {
   res.send('getSports');
})

var server = app.listen(8090, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
