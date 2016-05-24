'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new mongoose.Schema({
  _id: {type: Schema.Types.ObjectId, auto:true},
  searchTerm: {type: String, required:true},
});

var Search = mongoose.model('Search', searchSchema);

module.exports = Search;