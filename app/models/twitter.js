'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Search = require('./search');

var twitterSchema = new mongoose.Schema({
  _search: {type: Schema.Types.ObjectId, ref: 'Search'},
  description: {type: Array}
  // searchId: {type: Schema.Types.ObjectId, ref:'search'}
  // _id: {type: Schema.Types.ObjectId, auto:true}
});

var Twitter = mongoose.model('Twitter', twitterSchema);

module.exports = Twitter;