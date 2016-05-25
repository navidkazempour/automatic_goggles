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
  searchTerm = req.params.search_term || "http://www.google.com";

});
/***********************/

// wikipedia
router.post('/wikipedia',function(req,res){
  var Term = req.body.search_term;
  var query = Search.find({searchTerm: Term}, function(err, data){
    if(data.length === 0){
      var search = new Search({searchTerm: Term});
      search.save(function(err){
        if(err){
          return console.log(err);
        }
        var url = "https://en.wikipedia.org/wiki/"+Term;
        wikipedia(url,function(wiki){
          var result = new Wikipedia({title: wiki.title , body: wiki.body ,  _search: search._id});
          result.save(function(err){
            if(err){
              return console.log(err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: wiki }));
          });
        });
      });
    }else{
      Wikipedia.find({_search: data[0]._id },function(err, wiki){
        if(err){
          return console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: wiki[0] }));
      });
    }
  });
});


// youtube
router.post('/youtube',function(req,res){
  console.log(req.body.search_term);
  var Term = req.body.search_term;
  var query = Search.find({searchTerm: Term}, function(err, data){
    if(data.length === 0){
      var search = new Search({searchTerm: Term});
      search.save(function(err){
        if(err){
          return console.log(err);
        }
        videos(Term,function(result){
          var youtubes = new Youtube({videoId: result, _search: search._id});
          youtubes.save(function(err){
            if(err){
              return console.log(err);
            }
            console.log(result);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: result }));
          });
        });
      });
    }else{
      Youtube.find({_search: data[0]._id}, function(err,vids){
        if(err){
          return console.log(err);
        }
        console.log(vids);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: vids[0].videoId }));
      });
    }
  });
});


// twitter
router.post('/twitter', function(req, res) {
  var Term = req.body.search_term;
  var query = Search.find({searchTerm: Term}, function(err, data){
    if(data.length === 0){
      var search = new Search({searchTerm: Term});
      search.save(function(err){
        if(err){
          return console.log(err);
        }
        tweets(Term,function(result){
          var twits = new Twitter({description: result, _search: search._id});
          twits.save(function(err){
            if(err){
              return console.log(err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: result }));
          });
        });
      });
    }else{
      Twitter.find({_search: data[0]._id}, function(err, twits){
        if(err){
          return console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: twits[0].description }));
      });
    }
  });
});

// google map
router.post('/gmap', function(req, res) {
  var Term = req.body.search_term;
  var query = Search.find({searchTerm: Term}, function(err, data){
    if(data.length === 0){
      var search = new Search({searchTerm: Term});
      search.save(function(err){
        if(err){
          return console.log(err);
        }
        gmaps(Term,function(result){
          var map = new Gmap({description: result, _search: search._id});
          map.save(function(err){
            if(err){
              return console.log(err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ data: result }));
          });
        });
      });
    }else{
      Gmap.find({_search: data[0]._id}, function(err, map){
        if(err){
          return console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ data: map[0].description }));
      });
    }
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
