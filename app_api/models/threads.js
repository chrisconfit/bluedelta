'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;
    
var threadSchema = new Schema({
	name: String,
	bdId: Number,
	image: String
});

var model =  mongoose.model('thread', threadSchema);
module.exports = model;