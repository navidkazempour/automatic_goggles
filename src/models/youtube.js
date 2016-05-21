'use strict';

var mongoose = require('mongoose');

var youtubeSchema = new mongoose.Schema({
  searchTerm: {type: String, required: true},
  title: {type: String, required:true},
  videoId:  {type: String, required:true},
  description:  {type: String}
});

var model = mongoose.model('Youtube', youtubeSchema);

module.exports = model;
