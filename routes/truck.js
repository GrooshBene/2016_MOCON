function init(app, Truck, Goods){
	var randomString = require('randomstring');
	var multer = require('multer');
	var upload = multer({
		dest : './public/photos/',
		rename : function(fieldname, filename){
			return 'thumbnails_' + filename;
		}
	});
	app.post('/truck/add/goods', upload.array('thumbnail', 5), function(req, res){
		var goods = new Goods({
			_id : randomString.generate(15),
			name : req.param('name'),
			truck : req.param('truck_id'),
			thumbnail : "/photos/" + req.files[0].filename,
			description : req.param('description'),
			price : req.param('price')
		});
		goods.save(function(err, silence){
			if(err){
				res.send(401, "/truck/add/goods DB Error");
				console.log(err);
			}
			Truck.findOneAndUpdate({_id : req.param('truck_id')}, {$push : {goods : goods._id}}, {new : true},function(err, result){
				if(err){
					res.send(401, "/truck/add/goods Update DB Error");
					console.log(err);
				}	
				res.send(200, result);
			});
		});
	});

	app.get('/truck/:id', function(req, res){
		Truck.findOne({_id : req.param('id')}).populate('goods').exec(function(err, result){
			if(err){
				res.send(401, "/truck/:id DB Search Error");
				console.log(err);
			}
			res.send(200, result);
		});
	});

	

	app.post('/truck/add', function(req, res){
		console.log('asdf');
		var truck = new Truck({
			_id : randomString.generate(15),
			name : req.param('name'),
			goods_type : req.param('type'),
			inapp_purchase : req.param('inapp_purchase'),
			credit_purchase : req.param('credit_purchase'),
			goods : [],
			location : {
				lat : "",
				lng : ""
			}
		});
		truck.save(function(err){
			if(err){
				console.log(err);
				res.send(401, "/truck/add DB Saving Error");
			}
			res.send(200, truck);
		})
	});
	app.post('/truck/list', function(req, res){
		Truck.find({}, function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/truck/list DB Finding Error");
			}
			res.send(200, result);
		})
	})

}
module.exports = init;
