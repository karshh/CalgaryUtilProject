var express = require("express");
var axios = require("axios");
var router = express.Router();

var PORT = 8888;

var token = ""; // Your token here.

var commuteURL = "https://data.calgary.ca/resource/5ddc-u6jh.json";



function calculateTimeDifference(time1, time2) {
    var time1Seconds = (parseInt(time1.substring(0, time1.indexOf(':')) * 60)) + (parseInt(time1.substring(time1.indexOf(':') + 1, time1.length)));
    var time2Seconds = (parseInt(time2.substring(0, time2.indexOf(':')) * 60)) + (parseInt(time2.substring(time2.indexOf(':') + 1, time2.length)));
    return time1Seconds - time2Seconds; 
}

function getJSONdata(request, response, filename) {
    var JSONdata = [];
    
    // Empty out commuteData.
    trafficData.commuteData = { deerfootData: [], glenmoreData: [], crowchildData: [] };

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
                trafficData.commuteData.deerfootData.push(trafficVal); 
            } 
            else if (JSONdata[i].major_road === 'Glenmore') {
                trafficData.commuteData.glenmoreData.push(trafficVal); 
            } 
            else if (JSONdata[i].major_road === 'Crowchild') {
                trafficData.commuteData.crowchildData.push(trafficVal); 
            }


        }
        response.render(filename, { title: 'Express' });

    }).catch(function(err) {
        console.log("ERROR:" + err);
    });

}



function trafficData() {}
    trafficData.commuteData = { deerfootData: [], glenmoreData: [], crowchildData: [] };
    trafficData.getJSONdata = getJSONdata;


module.exports = trafficData;

