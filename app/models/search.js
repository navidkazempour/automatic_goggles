'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new mongoose.Schema({
  _id: {type: Schema.Types.ObjectId, auto:true},
  url: {type:String, required: true},
  searchTerm: {type: Array},
});

var Search = mongoose.model('Search', searchSchema);

module.exports = Search;
