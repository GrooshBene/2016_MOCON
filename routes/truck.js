function init(app, Truck, Goods){
	app.post('/truck/add/goods', function(req, res){
		var goods = new Goods({
			_id : randomString.generate(15),
			name : req.param('name'),
			truck : req.param('truck_id'),
			thumbnail : "",
			description : req.param('description'),
			price : req.param('price')
		});
		goods.save(function(err, silence){
			if(err){
				res.send(401, "/truck/add/goods DB Error");
				console.log(err);
			}
			Truck.findOneAndUpdate({_id : req.param('truck_id')}, {$push : {goods : goods._id}}, function(err, result){
				if(err){
					res.send(401, "/truck/add/goods Update DB Error");
					console.log(err);
				}	
				res.send(200, result);
			});
		});
	});

	app.post('/truck/goods', function(req, res){
		Truck.findOne({_id : req.param('id')}, function(err, result){
			if(err){
				res.send(401, "/truck/goods DB Search Error");
			}
			res.send(200, result.goods);
		});
	});

	app.post('/truck/add', function(req, res){
		var truck = new Truck({
			_id : randomString.generate(15),
			name : req.param('name'),
			goods_type : req.param('type'),
			inapp_purchase : req.param('inapp_purchase'),
			credit_purchase : req.param('credit_purchase'),
			goods : []
		});
	});

}
module.exports = init;
