var express = require('express');
var path = require('path');
var parser = require('body-parser');

var app = express();
var router = require('./app/action');
var port = process.env.port || 3000;

require('./src/database');
console.log(path.join(__dirname,'views'));
app.set('views', path.join(__dirname,'/app/views'));
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));
app.use(parser.json());
app.use('/',router);
app.listen(port,function(){
  console.log(`Listening to port ${port}`);
})
