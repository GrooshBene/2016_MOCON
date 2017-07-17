function init(app, Truck, User){
	var gps = require('gps-tracking');
	var options = {
		'debug' : true,
		'port' : 8090,
		'device_adapter' : "TK103"
	}

	var server = gps.server(options, function(device_id, msg_parts){
		//device.on
	})
}
module.exports = init;
