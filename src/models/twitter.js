'use strict';

var mongoose = require('mongoose');

var twitterSchema = new mongoose.Schema({
  searchTerm: {type: String, required: true},
  title: {type: String, required:true},
  videoId:  {type: String, required:true},
  description:  {type: String, required:true}
});

var model = mongoose.model('Twitter', twitterSchema);

module.exports = model;
