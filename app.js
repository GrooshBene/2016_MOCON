var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var randomString = require('randomstring');
var schema = mongoose.Schema;

var routes = require('./routes/index');


var app = express();
var UserSchema = new schema({
	_id : String,
	name : String,
	address : String,
	bucket : {
		type : String,
		ref : 'buckets'
	},
	purchase_history : [{
		type : String,
		ref : 'buckets'
	}],
	payment_info : Object,
	location : Object
});

var MarketSchema = new schema({
	_id : String,
	name : String,
	thumbnail : String,
	location : Object,
	goods_type : String,
	open_type : String,
	parking_lot : Number,
	toilet : Number
});

var BucketSchema = new schema({
	_id : String,
	user : {
		type : String,
		ref : 'users'
	},
	content : [{
		type : String,
		ref : 'goods'
	}]
});

var GoodsSchema = new schema({
	_id : String,
	name : String,
	thumbnail : String,
	description : String,
	price : Number
});

var TruckSchema = new schema({
	_id : String,
	name : String,
	goods_type : String,
	inapp_purchase : Number,
	credit_purchase : Number,
	goods : [{
		type : String,
		ref : 'goods'
	}],
	location : Object
});

mongoose.connect("mongodb://localhost:27017/mocon", function(err){
	if(err){
		throw err;
	}
	console.log("DB Server Connect Success");
})

var User = mongoose.model('users', UserSchema);
var Bucket = mongoose.model('buckets', BucketSchema);
var Goods = mongoose.model('goods', GoodsSchema);
var Truck = mongoose.model('trucks', TruckSchema);
var Market = mongoose.model('markets', MarketSchema);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

require('./routes/auth.js')(app, User, randomString);
require('./routes/bucket.js')(app, User, Bucket);
require('./routes/gps.js')(app, Truck, User);
require('./routes/pay.js')(app, User);
require('./routes/truck.js')(app, Truck, Goods, randomString);
require('./routes/users.js')(app, User);
require('./routes/market.js')(app, Market);


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
