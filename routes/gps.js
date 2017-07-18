function init(app, Truck, User){
	app.io = require('socket.io')();
	app.post('/gps/track', function(req, res){
		app.io.on('connection', function(socket){
			socket.on('truck_location', function(data){
				Truck.findOneAndUpdate({_id : req.param('id')}, {location : data}, function(err, result){
					if(err){
						console.log(err);
						res.send(401, "/gps/track DB Updating Error");
					}
					User.findOne({_id : req.param('user_id')}, function(err, result){
						if(err){
							console.log(err);
							res.send(401, "/gps/track User Finding Error");
						}
						io.emit('user_location', result.location);
					});
				});
			});

			socket.on('user_location', function(data){
				User.findOneAndUpdate({_id : req.param('id')}, {location : data}, function(err, result){
					if(err){
						console.log(err);
						res.send(401, "/gps/track DB Updating Error");
					}
					Truck.findOne({_id : req.param('truck_id')}, function(err, result){
						if(err){
							console.log(err);
							res.send(401, "/gps/track Truck Finding Error");
						}
						io.emit('truck_location', result.location);
					});
				});
			});
		});
	})
}
module.exports = init;
