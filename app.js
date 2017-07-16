var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var randomString = require('randomString');
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
	payment_info : Object
});

var BucketSchema = new schema({
	_id : String,
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
	goods_type : String,

})



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

require('./routes/auth.js');
require('./routes/bucket.js');
require('./routes/gps.js');
require('./routes/market.js');
require('./routes/pay.js');
require('./routes/truck.js');
require('./routes/users.js');


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