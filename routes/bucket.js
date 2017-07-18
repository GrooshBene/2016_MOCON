function init(app, User, Bucket){
	app.post('/bucket/add', function(req, res){
		var bucket = new Bucket({
			_id : randomString.generate(15),
			user : req.param('user_id'),
			content : []
		});
		bucket.save(function(err, silence){
			if(err){
				console.log(err);
				res.send(401, "/bucket/add DB Error");
			}
			console.log("Bucket "+ bucket._id + " Has Created");
			res.send(200, bucket);
		});
	});

	app.post('/bucket/update', function(req, res){
		Bucket.findOneAndUpdate({_id : req.param('bucket_id')}, {$push : {"content" : req.param('content')}} , function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/bucket/update DB Update Error");
			}	
			res.send(200, result);
		});
	});

	app.post('/bucket/info', function(req, res){
		Bucket.findOne({_id : req.param('bucket_id')}).populate('content', 'user').exec(function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/bucket/info DB Searching Error");
			}
			res.send(200, result);
		});
	});

	app.post('/bucket/destroy', function(req,res){
		User.findOneAndUpdate({_id : "user_id"}, {bucket : "", $push : {purchase_history : req.param('bucket_id')}}).exec(function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/bucket/destroy DB Updating Error");
			}
			res.send(200, result);
		});
	});

}
module.exports = init;
