'use strict';
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mnla-developement",function(err){
  if(err){
    console.log("Databse is not Connected!");
  }else{
    console.log("Database is Connected!");
  }
});
