'use strict';

var express = require('express');
var router = express.Router();

var config = require('../config');

// for youtube functionality
var Youtube = require('youtube-node');
var youTube = new Youtube();
youTube.setKey('AIzaSyBWDQ2uae9ojRM-lOHaL1qqyFJCF3B_P7A');
youTube.addParam('relevanceLanguage', 'en');

// for twitter functionality
var Twitter = require('twitter');
var twitter = new Twitter(config.twitter);

// for wikipedia functionality
var Intlpedia = require('intl-wikipedia');
var intlpedia = new Intlpedia('en');
var cheerio = require('cheerio');
var request = require('request');

router.get('/',function(req,res){
  res.render('index');
});
router.post('/wikipedia',function(req,res){
  /*******************************/
      var searchTerm = 'Steve Jobs';
      var wiki ={};
      var url = "https://en.wikipedia.org/wiki/"+searchTerm;
      function wikipedia(url,callback){
      	request(url, function(err,res,body){
      		if(!err & res.statusCode === 200){
      			var $ = cheerio.load(body);
      			var heading = $('h1#firstHeading');
      			var headingText = heading.text();
      			var content = $('div#bodyContent div#mw-content-text > p:first-of-type');
      			wiki["title"] = headingText;
      			wiki["body"] = content.text().replace(/(\[\d*\])/g,"");
            callback(null);
      		}
      	});
      };
      wikipedia(url,function(){
      	var wikiFacts = {};
      	var key = [];
      	var value = [];
        var result = {};
      	var count = 0;
      	intlpedia.search(searchTerm)
      	  .then(function(page){
      	  	var resultant = page.infobox;
      		  for(var data in resultant){
      		  	resultant[data].forEach(function(result){
      		  		if(count>=2){
      		  			if(result.name == "th"){
      		  				key.push(result.text);
      		  			}else if (result.name == "td"){
      		  				value.push(result.text);
      		  			}
      		  		}
      		  		count++;
      		  	});
      		  }
      		  for(var i = 0; i<key.length;i++){
      		  	result[key[i]] = value[i];
      		  }
            wiki["facts"]=result;
      		}).catch(err => console.error(err)).then(
            ()=>{
              console.log(wiki);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ data: wiki }));
            });
      });
  /*******************************/
});
router.post('/youtube',function(req,res){
  var vids = [];
  var searchTerm = req.params.search_term || 'World War z Trailer';

  var videos = function(searchTerm,callback){
    youTube.search(searchTerm,10,function(error, result) {
      if (error) {
      	console.log(error);
      	}
      	else {
        	for(var i=0;i<result["items"].length;i++){
        		vids.push({
        			video_id: result["items"][i].id.videoId,
        			date: result["items"][i].snippet.publishedAt,
        			title: result["items"][i].snippet.title,
        			description: result["items"][i].snippet.description
        		});
        	}
          callback(null);
        }
    });
  };

  videos(searchTerm,function(){
    console.log("Completed");
    console.log(vids);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data: vids }));
  });
});

// code below powers tweet retrieval functionality
router.post('/twitter/:search_term?', function(req, res) {
  var tweets = [];
  var searchTerm = req.params.search_term || 'brexit';

  var fetchTweets = function(searchTerm, callback) {
    twitter.get('search/tweets', {q: searchTerm, lang: "en", result_type: "popular", count: 12}, function(error, tweets, response) {
      if (error) {
      	console.log(error);
      } else {
      	for (var i = 0; i < tweets.statuses.length; i++) {
      		tweets.push({
            id_str: tweets.statuses[i].id_str,
      			screen_name: tweets.statuses[i].user.screen_name,
      			text: tweets.statuses[i].text,
      			profile_image_url: tweets.statuses[i].user.profile_image_url,
      			constructed_tweet_url: "https://twitter.com/" + screen_name + "/status/" + id_str
      		});
      	}
        callback(null);
      }
    });
  };

  fetchTweets(searchTerm, function() {
    console.log("Tweets retrieved");
    console.log("constructed tweet url: " + "https://twitter.com/" + tweets.statuses[i].user.screen_name + "/status/" + tweets.statuses[i].id_str);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ data: tweets }));
  });
});

module.exports = router;
