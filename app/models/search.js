'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('../action');

var searchSchema = new mongoose.Schema({
  searchTerm: {type: String, required:true},
  yts : { type: Schema.Types.ObjectId, ref: 'YT' }
});

var term = mongoose.model('term', searchSchema);

var Search = new term({ searchTerm: `#{searchTerm}` });
Search.save(function (err) {
  if (err) return console.log(err);
});

module.exports = Search;