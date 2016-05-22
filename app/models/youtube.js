'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var youtubeSchema = new mongoose.Schema({
  videoId: {type: String},
  title: {type: String},
  searchTerm: {type: Schema.ObjectId, ref: 'search'}
});

var model = mongoose.model('Youtube', youtubeSchema);

module.exports = model;
