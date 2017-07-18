function init(app, User){
	app.post('/pay/:id/history', function(req, res){
		User.findOne({_id : req.param('user_id')}, function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/pay/:id/history DB Searching Error");
			}
			res.send(result.purchase_history);
		});
	});
}
module.exports = init;
