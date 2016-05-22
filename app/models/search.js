'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var searchSchema = new mongoose.Schema({
  searchTerm: {type: String, required:true}
});

var model = mongoose.model('Search', searchSchema);

module.exports = model;
