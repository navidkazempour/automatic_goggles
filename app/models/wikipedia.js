'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./search');

var wikipediaSchema = new mongoose.Schema({
  title: {type: String},
  body: {type: String},
  facts: {type: String},
  searchTerm: {type: String, ref:'Search'}
});

var Wiki = mongoose.model('Wiki', wikipediaSchema);

var Wikipedia = new Wiki({ 
  title: 'title',
  body: 'body',
  facts: 'facts',
  });
Wikipedia.save(function (err) {
  if (err) return console.log(err);
});

module.exports = Wikipedia;
