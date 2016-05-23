'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./search');

var youtubeSchema = new mongoose.Schema({
  videoId: {type: String},
  title: {type: String},
  searchTerm: {type: String, ref:'Search'}
});

var YT = mongoose.model('YT', youtubeSchema);

var Youtube = new YT({ 
  videoId: 'videoId',
  title: 'title',
  });
Youtube.save(function (err) {
  if (err) return console.log(err);
});

module.exports = Youtube;
