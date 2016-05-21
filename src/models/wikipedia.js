'use strict';

var mongoose = require('mongoose');

var wikipediaSchema = new mongoose.Schema({
  title: {type: String, required:true},
  videoId:  {type: String, required:true},
  description:  {type: String, required:true},
});

var model = mongoose.model('Wikipedia', wikipediaSchema);

module.exports = model;
