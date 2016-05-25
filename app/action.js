'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config');
var mongoose = require('mongoose');
var wikipedia = require('../API/wikipedia.js');
var videos = require('../API/youtube.js');
var tweets = require('../API/twitter.js');

router.get('/',function(req,res){
  res.render('index');
});

// wikipedia
router.post('/wikipedia',function(req,res){
  var searchTerm = req.params.search_term || 'Lighthouse Labs';
  var url = "https://en.wikipedia.org/wiki/"+searchTerm;
  wikipedia(url,function(wiki){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data: wiki }));
  });
});

// youtube
router.post('/youtube',function(req,res){
  var searchTerm = req.params.search_term || 'Lighthouse Labs';
  videos(searchTerm,function(vids){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data: vids }));
  });
});

// twitter
router.post('/twitter', function(req, res) {
  console.log('in post twitter', req.params);
  var searchTerm = req.params.search_term || 'Lighthouse Labs';
  tweets(searchTerm,function(result){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data: result }));
  });
});

//Create the AlchemyAPI object
var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI();

router.get('/alchemy/what', doAlchemy);
var what_url = 'http://www.ctvnews.ca/world/officer-acquitted-in-freddie-gray-case-1.2913341';

function doAlchemy(req, res) {
  var output = {};

  function entities(req, res, output) {
  	alchemyapi.entities('url', what_url,{ 'sentiment': 1 }, function(response) {
      console.log('Alchemy is real');

      console.log("entities:");

      if (response.language === "english") {
        for (var i = 0; i < response.entities.length; i++) {
          if (response.entities[i].relevance > 0.5) {
            console.log(response.entities[i]);
            // output['entities'] = { url: what_url, response: JSON.stringify(response, null, 4), results: response['entities'] };
          }
        }
      } else {
        console.log("this article is not in english");
      }

      keywords(req, res, output);
  	});
  }

  function keywords(req, res, output) {
  	alchemyapi.keywords('url', what_url, { 'sentiment': 1 }, function(response) {
      console.log("keywords:");

      for (var i = 0; i < response.keywords.length; i++) {
        if (response.keywords[i].relevance > 0.5) {
          console.log(response.keywords[i]);
          // output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
        }
      }

      concepts(req, res, output);
  	});
  }

  function concepts(req, res, output) {
  	alchemyapi.concepts('url', what_url, { 'showSourceText':1 }, function(response) {
      console.log("concepts:");

      for (var i = 0; i < response.concepts.length; i++) {
        if (response.concepts[i].relevance > 0.5) {
          console.log(response.concepts[i]);
          // output['concepts'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['concepts'] };
        }
      }

      taxonomy(req, res, output);
  	});
  }

  function taxonomy(req, res, output) {
  	alchemyapi.taxonomy('url', what_url, {}, function(response) {
      console.log("taxonomy:");

      for (var i = 0; i < response.taxonomy.length; i++) {
        if (response.taxonomy[i].confident) {
        } else {
          console.log(response.taxonomy[i]);
          // output['taxonomy'] = { url:demo_url, response:JSON.stringify(response,null,4), results:response };
        }
      }
  	});
  }

  // maps:
  // find entity hash with the highest relevance that is a .type === 'City' || 'Country' || "StateOrCounty"
  // twitter:
  // combine multiple items into one and send to the twitter query. if entity .type === 'Hashtag' || 'TwitterHandle', send as priority
  // wikipedia:
  // if the hash with the highest relevance is a .type === 'Person', use that to query wikipedia
  // youtube:
  // send the hash text with the highest relevance

  //Start the analysis chain
	entities(req, res, output);

  // res.render('index',output);
  res.render('index');
};

module.exports = router;
