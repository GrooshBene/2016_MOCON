function init(app, User, randomString){
	var passport = require('passport');
	var FacebookTokenStrategy = require('passport-facebook-token');
	app.use(passport.initialize());
	app.use(passport.session());
	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new FacebookTokenStrategy({
		clientID : "154408675125421",
		clientSecret : "68edaefd6224963cd8defe795c0c6d3b"
	}, function(accessToken, refreshToken, profile, done){
		console.log(profile);
		User.findOne({
			_id : profile.id
		}, function(err, user){
			if(err){
				return done(err);
			}
			if(!user){
				user = new User({
					//plz add user info
				});
				user.save(function(err){
					if(err) console.log(err);
					else{
						done(null, profile);
					}
				});
			}
			else if(user){
				done(null, profile);
			}
		});
	}));

	app.get('/auth/facebook/token', passport.authenticate('facebook-token'), function(req, res){
		console.log("user token : " + req.param('access_token'));
		if(req.user){
			res.send(200, response);
		}
		else if(!req.user){
			res.send(401, "Can't find User on Facebook. It May Be Unusable");
		}
	});

	app.get('/auth/facebook/callback', passport.authenticate('facebook-token', {
		successRedirect : '/',
		failureRedirect : '/'
	}));

}
module.exports = init;
