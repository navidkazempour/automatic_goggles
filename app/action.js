'use strict';

var express = require('express');
var router = express.Router();

var config = require('../config');

var Youtube = require('youtube-node');
var youTube = new Youtube();

var Twitter = require('twitter');
var twitter = new Twitter(config.twitter);

var Intlpedia = require('intl-wikipedia');
var intlpedia = new Intlpedia('en')

router.get('/', function(req, res, next) {
	res.render('search');
});

router.get('/results/:search_term?', function(req, res, next) {
	var searchTerm = req.params.search_term || 'cute wombats'

	twitter.stream('statuses/filter', {track: 'donald trump'}, function(stream) {
		stream.on('data',function(data){
			console.log(data);

			// var tweet = {
			// 		twid: data["id_str"],
			// 		author: data["user"]["name"],
			// 		avatar: data["user"]["profile_image_url"],
			// 		text: data["text"],
			// 		date: data['created_at'],
	    //   screenname: data['user']['screen_name']
			// 	};
			//
			// res.render('index', {tweets: tweet});
		 });
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
