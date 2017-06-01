var passport = require('passport');
var mongoose = require('mongoose');
var sanitize = require('mongo-sanitize');
var User = mongoose.model('User');


var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  if(!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
  	});
		return;
  }
	var cleanEmail = sanitize(req.body.email);
	User.find({'email':cleanEmail}, function(err, user){
		
		if (err){ //Any error accessing Mongo
			sendJSONresponse(res, 500, {
      	"message": "Database Error"
  		});
		}
		
	  if (user.length > 0) { //User already Exists
	    sendJSONresponse(res, 401, {
				"message": "We already have an account associated with this email address"
  		});
  	}else{
	  	
	  	//Register a user
      var user = new User();
		  user.name = req.body.name;
		  user.email = req.body.email;
			user.permissions = ['user'];
		  user.setPassword(req.body.password);
		
		  user.save(function(err) {
		    var token;
		    token = user.generateJwt();
		    res.status(200);
		    res.json({
		      "token" : token
		    });
		  });
		  
    }
    
	});
  

};

module.exports.login = function(req, res) {

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};