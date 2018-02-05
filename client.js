///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Fills each table row with temperature data.
//

function writeTable(data, freeway) {
	$.each(data, (i, val) => {
		var color = val.diff_time > 0 ? "#196619" : (val.diff_time < 0 ? "#7f0000" : "black");
		var delaySymbol = val.diff_time > 0 ? "-" : (val.diff_time < 0 ? "+" : " ");
		$('#' + freeway).append(`
            <tr>
                <td>` + val.from + `</td>
                <td><i class=\"fa fa-long-arrow-right\"></td>
                <td>` + val.to + `</td>
                <td>` + val.avg_time + `</td>
                <td>` + val.cur_time + `</td>
                <td style=\"color:`+ color +`\">` 
                	+ delaySymbol + " "
                	+ (val.diff_time == 0 ? "No Delay" : Math.abs(val.diff_time)) + " " 
                	+ (val.diff_time == 1 || val.diff_time == -1 ? "min" : (val.diff_time == 0 ? "" : "mins")) 
                	 +  `</td>
            </tr>
    	`);
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////
//
//  Upon every page load, get weather data.
//

$(document).ready(function() {

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8888/trafficData',
		success: (trafficData) => {
			writeTable(trafficData.deerfootData, "deerfootTable");
			writeTable(trafficData.glenmoreData, "glenmoreTable");
			writeTable(trafficData.crowchildData, "crowchildTable");
		}
	});
	
});

