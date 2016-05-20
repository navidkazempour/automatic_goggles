'use strict';

var express = require('express'),
    cheerio = require('cheerio'),
    path = require('path'),
    bodyParser = require('body-parser'),
    sequelize = require('./models').sequelize,
    router = require('./app/action'),
    favicon = require('serve-favicon'),
    config = require('./config');

var app = express();

var port = 3000;

var server;

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './app/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use('/', router);

app.listen(port, function() {
 console.log(`Listening on port ${port}`);
});
