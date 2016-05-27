'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Search = require('./search');

var twitterSchema = new mongoose.Schema({
  _search: {type: Schema.Types.ObjectId, ref: 'Search'},
  searchTerm: {type:String},
  description: {type: Array}
});

var Twitter = mongoose.model('Twitter', twitterSchema);

module.exports = Twitter;
