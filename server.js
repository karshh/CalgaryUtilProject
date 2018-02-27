var express = require("express");
var axios = require("axios");
var app = express();
var https = require("https");
var fs = require("fs");
var PORT = 8888;

var key = fs.readFileSync('encryption/privkey.pem' );
var cert = fs.readFileSync('encryption/fullchain.pem' );

var options = {
	key: key,
	cert: cert
}
var token = ""; // Your token here.


var commuteData = { deerfootData: [], glenmoreData: [], crowchildData: [] };


var commuteURL = "https://data.calgary.ca/resource/5ddc-u6jh.json";
// var accidentURL = "https://data.calgary.ca/resource/m328-x8wy.json";
// var accidentData = null;


app.use('/jquery.js', express.static(__dirname + "/" + '/js/jquery.js'));
app.use('/style.css', express.static(__dirname + "/" + '/css/style.css'));
app.use('/client.js', express.static(__dirname + "/" + '/js/client.js'));

function calculateTimeDifference(time1, time2) {
    var time1Seconds = (parseInt(time1.substring(0, time1.indexOf(':')) * 60)) + (parseInt(time1.substring(time1.indexOf(':') + 1, time1.length)));
    var time2Seconds = (parseInt(time2.substring(0, time2.indexOf(':')) * 60)) + (parseInt(time2.substring(time2.indexOf(':') + 1, time2.length)));
    return time1Seconds - time2Seconds; 
}

function getJSONdata(request, response, filename) {
    var JSONdata = [];
    
    // Empty out commuteData.
    commuteData = { deerfootData: [], glenmoreData: [], crowchildData: [] };

    axios({
            method: "GET",
            url: commuteURL,
            data: {
                "$limit" : 5000,
                "$$app_token" : token
            }
        }).then(function(res) {
            JSONdata.push.apply(JSONdata, res.data);

            for (var i = 0; i < JSONdata.length; i++) {
                var avg_time_ = JSONdata[i].avg_travel_time_mins_secs;
                var cur_time_ = JSONdata[i].current_travel_time_mins_secs;

                var diff_time_ = calculateTimeDifference(avg_time_, cur_time_);
                var trafficVal = {
                        from: JSONdata[i].road_segment.substring(0, JSONdata[i].road_segment.indexOf('-')),
                        to: JSONdata[i].road_segment.substring(JSONdata[i].road_segment.indexOf('-') + 1, JSONdata[i].road_segment.length),
                        avg_time: avg_time_,
                        cur_time: cur_time_,
                        diff_time: diff_time_
                };
                if (trafficVal.from === '') {
                    trafficVal.from = JSONdata[i].road_segment.substring(0, JSONdata[i].road_segment.indexOf(' to '));
                    trafficVal.to = JSONdata[i].road_segment.substring(JSONdata[i].road_segment.indexOf(' to ') + 4, JSONdata[i].road_segment.length);
                }

                if (JSONdata[i].major_road === 'Deerfoot') {
                    commuteData.deerfootData.push(trafficVal); 
                } 
                else if (JSONdata[i].major_road === 'Glenmore') {
                    commuteData.glenmoreData.push(trafficVal); 
                } 
                else if (JSONdata[i].major_road === 'Crowchild') {
                    commuteData.crowchildData.push(trafficVal); 
                }


            }

            response.sendFile(__dirname + "/" + filename);

        }).catch(function(err) {
            console.log("ERROR:" + err);
        });

}
app.use((req, res, next) => {
  if(!req.secure) {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  next();
});

app.get('/', (request, response) => getJSONdata(request,response, '/index.html'));
app.get('/contact', (request, response) => response.sendFile(__dirname + "/" + "/pg/contact.html"));
app.get('/products', (request, response) => response.sendFile(__dirname + "/" + "/pg/products.html"));
app.get('/about', (request, response) => response.sendFile(__dirname + "/" + "/pg/about.html"));

app.get('/trafficData', (request, response) => response.send(commuteData));

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Whenever we load the page, client.js will post request weather data once the 
//  html doc has been fully loaded. The code here responds to that request, with the
//  value we stored in data earlier.
//  


///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Begin listening on PORT.
//

var Server = app.listen(PORT, 
    () => console.log("App listening at http://localhost:%s\n", Server.address().port));

https.createServer(options, app).listen(PORT+1);
///////////////////////////////////////////////////////////////////////////////////////////////
