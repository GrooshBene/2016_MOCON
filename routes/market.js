function init(app, Market){
	var multer = require('multer');
	var randomString = require('randomstring');
	var upload = multer({
		dest : '../public/images/',
		rename : function(fieldname, filename){
			return 'thumbnails_' + filename;
		}
	});

	app.post('/market/add', upload.array('thumbnail', 5), function(req, res){
		var market = new Market({
			_id : randomString.generate(15),
			name : req.param('name'),
			thumbnail : "/images/" + req.files[0].filename,
			location : {
				lat : req.param('lat'),
				lng : req.param('lng')
			},
			goods_type : req.param('goods_type'),
			open_type : req.param('open_type'),
			parking_lot : req.param('parking_lot'),
			toilet : req.param('toilet')
		});
		market.save(function(err){
			if(err){
				console.log(err);
				res.send(401, "/market/add Error");
			}
			res.send(200, market);
		});
	});

	app.post('/market/info', function(req, res){
		Market.findOne({_id : req.param('market_id')}, function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/market/info DB Search Error");
			}
			res.send(200, result);
		});
	});

	app.post('/market/list', function(req, res){
		Market.find({}, function(err, result){
			if(err){
				console.log(err);
				res.send(401, "/market/list DB Search Error");
			}
			res.send(200, result);
		})
	})
}
module.exports = init;
