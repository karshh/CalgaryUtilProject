var express = require("express");
var axios = require("axios");
var app = express();

var PORT = 8888;

var token = ""; // Your token here.


var commuteURL = "https://data.calgary.ca/resource/5ddc-u6jh.json";
var commuteDeerfootURL = commuteURL+"?major_road=Deerfoot" 
var commuteGlenmoreURL = commuteURL+"?major_road=Glenmore" 
var commuteCrowchildURL = commuteURL+"?major_road=Crowchild" 

var deerfootData = null;
var glenmoreData = null;
var crowchildData = null;

var accidentURL = "https://data.calgary.ca/resource/m328-x8wy.json";
var accidentData = null;
// app.use('/style.css', express.static(__dirname + "/" + '/style.css'));
// app.use('/jquery.js', express.static(__dirname + "/" + '/jquery.js'));
// app.use('/client.js', express.static(__dirname + "/" + '/client.js'));


function getCommuteData(commURL) {

    console.log("URL=" + commURL);
    axios({
        method: "GET",
        url: commURL,
        data: {
            "$limit" : 5000,
            "$$app_token" : token
        }
    }).then(function(res) {

        console.log("DatSize=" + res.data.length);
        return res.data;
    }).catch(function(err) {
        console.log("ERROR:" + err);
    });

}

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  This code is executed when we access the home page of the host.
//

app.get('/', (request, response) => {

});

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Whenever we load the page, client.js will post request weather data once the 
//  html doc has been fully loaded. The code here responds to that request, with the
//  value we stored in data earlier.
//  

app.post('/deerfootData', (req, res) => res.send(deerfootData));
app.post('/glenmoreData', (req, res) => res.send(glenmoreData));
app.post('/crowchildData', (req, res) => res.send(crowchildData));

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Begin listening on PORT.
//

var Server = app.listen(PORT, 
    () => {

        deerfootData = getCommuteData(commuteDeerfootURL);
        glenmoreData = getCommuteData(commuteGlenmoreURL);
        crowchildData = getCommuteData(commuteCrowchildURL);

        console.log(deerfootData.length);
        console.log(glenmoreData.length);
        console.log(crowchildData.length);

    });


///////////////////////////////////////////////////////////////////////////////////////////////