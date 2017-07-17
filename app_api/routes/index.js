var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var guard = require('express-jwt-permissions')({
	requestProperty:'payload'
});

var auth = jwt({
  secret: process.env.secret,
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');
var ctrlOpts = require('../controllers/options');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

//options
router.get('/options', auth, guard.check('user'), ctrlOpts.getOptions);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
