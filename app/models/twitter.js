'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./search');

var twitterSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  searchTerm: {type: String, ref:'Search'}
});

var Twit = mongoose.model('Twit', twitterSchema);

var Twitter = new Twit({ 
  title: 'title',
  description: 'twit',
  });
Twitter.save(function (err) {
  if (err) return console.log(err);
});

module.exports = Twitter;
