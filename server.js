'use strict';

var express = require('express'),
    cheerio = require('cheerio'),
    path = require('path'),
    bodyParser = require('body-parser'),
    router = require('./app/action'),
    sequelize = require('./models').sequelize,
    favicon = require('serve-favicon'),
    config = require('./config'),
    Intlpedia = require('intl-wikipedia');
    // Twitter = require('twitter');

var app = express();

var port = 3000;

// var twitter = new Twitter(config.twitter);
// var intlpedia = new Intlpedia('en');
var server;

app.set('view engine', 'jade');
app.set('views', path.join(__dirname, './app/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use('/', router);

app.listen(port, function() {
 console.log(`Listening on port ${port}`);
});
