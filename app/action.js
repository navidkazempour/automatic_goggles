'use strict';

var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../config');
var mongoose = require('mongoose');
var wikipedia = require('../API/wikipedia');
var videos = require('../API/youtube');
var tweets = require('../API/twitter');
var gmap = require('../API/gmap');
var Search = require('./models/search');
var Twitter = require('./models/twitter');
var Wikipedia = require('./models/wikipedia');
var Youtube = require('./models/youtube');
var Gmap = require('./models/gmap');
var MongoClient = require('mongodb').MongoClient;

/**** Global Variables ****/


router.get('/',function(req,res){
  res.render('index');
});
/*****************Practice Routes ****/
router.post('/search',function(req,res){
  var url = req.body.search_term;
  var query = Search.find({url: url}, function(err, data){
    if(data.length === 0){
      var search = new Search({url: url});
      search.save(function(err){
        if(err){
          return console.log(err);
        }
          /******* Pass into Alchemy *****/
          // /*******************************/ Name = 1, Country={}, News = 1 SearchTerm = Bill Gates
        // var searchTerm = {News:'Bill Gates', Country:'London'};
        search.update({searchTerm: url},function(err){
          if(err){
            return console.log(err);
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ data: url }));
        });
      });
    }else{
      Search.find({url: data[0].url },function(err, term){
        if(err){
          return console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: term[0].searchTerm }));
      });
    }

  });
});
/***********************/

// wikipedia
router.post('/wikipedia',function(req,res){
  var Term = req.body['search_term[]'] || req.body.search_term;
  console.log(Term);
  console.log(req.body);
  Search.find({searchTerm: Term}, function(err, data){
    if(data.length !== 0){
    Wikipedia.find({searchTerm: Term },function(err, wiki){
      if(wiki.length === 0){
        var url = "https://en.wikipedia.org/wiki/"+Term;
        wikipedia(url,function(wiki){
          var result = new Wikipedia({title: wiki.title , body: wiki.body ,  _search: data[0]._id, searchTerm: Term});
          result.save(function(err){
            if(err){
              return console.log(err);
            }
            // console.log(wiki);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: wiki }));
          });
        });
      }else{
        // console.log(wiki[0]);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: wiki[0]}));
      }
    });
  }
  });
});


// youtube
router.post('/youtube',function(req,res){
  var Term = req.body['search_term[]'] || req.body.search_term;
  Search.find({searchTerm: Term}, function(err, data){
    if(data.length !== 0){
    Youtube.find({searchTerm: Term },function(err, youtubeData){
      if(youtubeData.length === 0){
        videos(Term,function(result){
          console.log(data);
          var youtubes = new Youtube({videoId: result,  _search: data[0]._id, searchTerm: Term});
          youtubes.save(function(err){
            if(err){
              return console.log(err);
            }
            // console.log(result);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: result }));
          });
        });
      }else{
        // console.log(youtubeData[0].videoId);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: youtubeData[0].videoId }));
      }
    });
  }
  });
});


// twitter
router.post('/twitter', function(req, res) {
  var Term = req.body['search_term[]'] || req.body.search_term;
  Search.find({searchTerm: Term}, function(err, data){
    if(data.length !== 0){
    Twitter.find({searchTerm: Term },function(err, twits){
      if(twits.length === 0){
        tweets(Term,function(result){
          // console.log(data);
          // console.log(result);
          var twits = new Twitter({description: result,_search: data[0]._id, searchTerm: Term});
          twits.save(function(err){
            if(err){
              return console.log(err);
            }
            // console.log(result);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: result }));
          });
        });
      }else{
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ data: twits[0].description }));
      }
    });
  }
  });
});

// google map
router.post('/gmap', function(req, res) {
  var Term = req.body['search_term[]'] || req.body.search_term;
  console.log(Term);
  Search.find({searchTerm: Term}, function(err, data){
    console.log(data);
    if(data.length !== 0){
    Gmap.find({searchTerm: Term },function(err, gmap){
      if(gmap.length === 0){
        console.log("Entering the dungeon");
        // gmaps(Term,function(result){
        //   console.log(data);
        //   console.log(result);
        var result = [{lat: 56, lng:-111}];
          var gmapData = new Gmap({position: result,_search: data[0]._id, searchTerm: Term});
          gmapData.save(function(err){
            if(err){
              return console.log(err);
            }
            console.log("Saved the dungeon");
            // console.log(result);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: result }));
          });
        // });
      }else{
        console.log(gmap[0].position);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: gmap[0].position }));
      }
    });
  }
  });
});


//Create the AlchemyAPI object
var AlchemyAPI = require('../alchemyapi');
var alchemyapi = new AlchemyAPI();

router.get('/alchemy/what', doAlchemy);
var what_url = 'http://vancouversun.com/news/local-news/metro-vancouver-mayors-likely-to-raise-property-taxes-fares-as-province-ponies-up-cash-for-transit';

function doAlchemy(req, res) {
  var output = {};

  function entities(req, res, output) {
  	alchemyapi.entities('url', what_url,{ 'sentiment': 1 }, function(response) {
      console.log('Alchemy is real');

      console.log("entities:");

      if (response.language === "english") {
        for (var i = 0; i < response.entities.length; i++) {
          // if (response.entities[i].relevance > 0.5) {
            console.log(response.entities[i]);
            // output['entities'] = { url: what_url, response: JSON.stringify(response, null, 4), results: response['entities'] };
          // }
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
