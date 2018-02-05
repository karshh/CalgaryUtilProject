var express = require("express");
var axios = require("axios");
var app = express();

var PORT = 8888;

var token = ""; // Your token here.


var commuteData = {
    deerfootData: [],
    glenmoreData: [],
    crowchildData: []
};


var commuteURL = "https://data.calgary.ca/resource/5ddc-u6jh.json";
var accidentURL = "https://data.calgary.ca/resource/m328-x8wy.json";






var accidentData = null;
// app.use('/style.css', express.static(__dirname + "/" + '/style.css'));
// app.use('/jquery.js', express.static(__dirname + "/" + '/jquery.js'));
app.use('/client.js', express.static(__dirname + "/" + '/client.js'));


///////////////////////////////////////////////////////////////////////////////////////////////
//
//  This code is executed when we access the home page of the host.
//

app.get('/', (request, response) => {
    var JSONdata = [];
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
                


                if (JSONdata[i].major_road === 'Deerfoot') {
                    commuteData.deerfootData.push({
                        from: JSONdata[i].road_segment.substring(0, JSONdata[i].road_segment.indexOf('-')),
                        to: JSONdata[i].road_segment.substring(JSONdata[i].road_segment.indexOf('-') + 1, JSONdata[i].road_segment.length),
                        avg_time: avg_time_,
                        cur_time: cur_time_,
                        diff_time: parseInt(avg_time_.replace(':','')) - parseInt(cur_time_.replace(':',''))
                    }); 
                } 
                else if (JSONdata[i].major_road === 'Glenmore') {
                    commuteData.glenmoreData.push({
                        from: JSONdata[i].road_segment.substring(0, JSONdata[i].road_segment.indexOf('-')),
                        to: JSONdata[i].road_segment.substring(JSONdata[i].road_segment.indexOf('-') + 1, JSONdata[i].road_segment.length),
                        avg_time: avg_time_,
                        cur_time: cur_time_,
                        diff_time: parseInt(avg_time_.replace(':','')) - parseInt(cur_time_.replace(':',''))
                    }); 
                } 
                else if (JSONdata[i].major_road === 'Crowchild') {
                    commuteData.crowchildData.push({
                        from: JSONdata[i].road_segment.substring(0, JSONdata[i].road_segment.indexOf('-')),
                        to: JSONdata[i].road_segment.substring(JSONdata[i].road_segment.indexOf('-') + 1, JSONdata[i].road_segment.length),
                        avg_time: avg_time_,
                        cur_time: cur_time_,
                        diff_time: parseInt(avg_time_.replace(':','')) - parseInt(cur_time_.replace(':',''))
                    }); 
                } 
            }

            console.log(commuteData);

        }).catch(function(err) {
            console.log("ERROR:" + err);
        });
});

app.get('/trafficdata', (request, response) => {
    res.send(commuteData);
}

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

///////////////////////////////////////////////////////////////////////////////////////////////