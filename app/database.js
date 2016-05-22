'use strict';
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mnla-db",function(err){
  if(err){
    console.log("Database is not Connected!");
  }else{
    console.log("Database is Connected!");
  }
});
