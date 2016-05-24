'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Search = require('./search');

var youtubeSchema = new mongoose.Schema({
  _search: {type: Schema.Types.ObjectId, ref: 'Search'},
  videoId: {type: String},
  title: {type: String}
});

var Youtube = mongoose.model('Youtube', youtubeSchema);

module.exports = Youtube;