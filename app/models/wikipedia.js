'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wikipediaSchema = new mongoose.Schema({
  title: {type: String},
  body: {type: String},
  facts: {type: String},
  searchTerm: {type: Schema.ObjectId, ref: 'search'}
});

var model = mongoose.model('Wikipedia', wikipediaSchema);

module.exports = model;
