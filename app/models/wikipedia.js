'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Search = require('./search');

var wikipediaSchema = new mongoose.Schema({
  _search: {type: Schema.Types.ObjectId, ref: 'Search'},
  title: {type: String},
  body: {type: String}
});

var Wikipedia = mongoose.model('Wikipedia', wikipediaSchema);

module.exports = Wikipedia;