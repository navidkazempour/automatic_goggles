'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Search = require('./search');

var gmapSchema = new mongoose.Schema({
  _search: {type: Schema.Types.ObjectId, ref: 'Search'},
  position: {type: Array}
});

var Gmap = mongoose.model('Gmap', gmapSchema);

module.exports = Gmap;