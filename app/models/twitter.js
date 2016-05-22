'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var twitterSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  searchTerm: {type: Schema.ObjectId, ref: 'search'}
});

var model = mongoose.model('Twitter', twitterSchema);

module.exports = model;
