'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
    
var jeanSchema = new Schema({
	user: ObjectId,
	fittingDate : Date,
	shippingDate : Date,
	status: Number,
	gender: Number,
	style : Number,
	fakePocket : Number,
	fabric : Number,
	rivets: Number,
	threadTop: ObjectId,
	threadBottom : ObjectId,
	threadAccent : ObjectId,
	measurements: {
		waist: Number,
		seatDown: Number,
		seatRight: Number,
		rise: Number,
		fullRise: Number,
		thighUpperDown: Number,
		thighUpperRight: Number,
		thighMiddleDown: Number,
		thighMiddleRight: Number,
		thighLowerDown: Number,
		thighLowerRight: Number,
		outseam: Number,
		kneeUp: Number,
		kneeRight: Number,
		calfUp: Number,
		legOpening: Number,
		desiredFit: Number
	},
	notes: String,
	vendor: ObjectId
},
{
  timestamps: true
});


var model =  mongoose.model('jean', jeanSchema);

module.exports = model;