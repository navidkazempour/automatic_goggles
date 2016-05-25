var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')
var favicon = require('serve-favicon');

var app = express();
var router = require('./app/action');
var port = process.env.port || 3000;

require('./app/database');
app.set('views', path.join(__dirname,'/app/views'));
app.set('view engine','jade');
app.use(express.static(path.join(__dirname,'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/',router);
app.listen(port,function(){
  console.log(`Listening to port ${port}`);
})
