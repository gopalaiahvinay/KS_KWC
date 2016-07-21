var express = require('express');
var app = express();

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