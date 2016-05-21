'use strict';

var express = require('express');
var router = express.Router();

var config = require('../config');

var Youtube = require('youtube-node');
var youTube = new Youtube();

var Twitter = require('twitter');
var twitter = new Twitter(config.twitter);

var Intlpedia = require('intl-wikipedia');
var intlpedia = new Intlpedia('en');
var cheerio = require('cheerio');
var request = require('request');

// router.get('/todos',function(req,res){
//   res.json({todos:todos});
// });

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
            console.log(wiki["title"]);
            console.log(wiki["body"]);
            callback(null);
      		}
      	});
      };
      wikipedia(url,function(){
      	var wikiFacts = {};
      	var key = [];
      	var value = []
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
            wiki["key"] = key;
            wiki["value"]= value;
            console.log(wiki["key"]);
            console.log(wiki["value"]);
      		  // for(var i = 0; i<key.length;i++){
      		  // 	wikiFacts[key[i]] = value[i];
      		  // }
      		  // console.log(key);
      		  // console.log(value);
      		}).catch(err => console.error(err)).then(
            ()=>{
              console.log(wiki);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ data: wiki }));
            });
      });
  /*******************************/

});
router.get('/results/:search_term?', function(req, res, next) {
	var searchTerm = req.params.search_term || 'cute wombats'

	// twitter.stream('statuses/filter', {track: searchTerm}, function(stream) {
	// 	stream.on('data',function(data){
	// 		console.log(data);
	//
	// 		var tweet = {
	// 				twid: data["id_str"],
	// 				author: data["user"]["name"],
	// 				avatar: data["user"]["profile_image_url"],
	// 				text: data["text"],
	// 				date: data['created_at'],
	//       screenname: data['user']['screen_name']
	// 			};
	//
	// 		res.render('index', {tweets: tweet});
	// 	 });
	// });

	twitter.get('search/tweets', {q: searchTerm}, function(error, tweets, response) {
		for (var i = 0; i < tweets.statuses.length; i++) {
			console.log(tweets.statuses[i].user.screen_name);
			console.log(tweets.statuses[i].text);
			// console.log(tweets.statuses[0]);
		};
	});

	// intlpedia.search(searchTerm)
	//   .then(page => console.log(page))
	//   .catch(err => console.error(err));

	youTube.setKey(config.youtube.consumer_key);
	youTube.addParam('relevanceLanguage', 'en');

	youTube.search(searchTerm, 2, function(error, result) {
		var videos = [];

		function parseResult(result) {
			for (var i = 0; i < result["items"].length; i++) {
				videos.push({
					video_id: result["items"][i].id.videoId,
					date: result["items"][i].snippet.publishedAt,
					title: result["items"][i].snippet.title,
					description: result["items"][i].snippet.description
				});
			}
		}

		if (error) {
			console.log(error);
		} else {
			parseResult(result)
			res.render('index', {videos: videos});
		}
	});
	// res.render('index');
});

module.exports = router;
