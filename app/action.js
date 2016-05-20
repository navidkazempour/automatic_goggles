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

router.get('/search', function(req, res, next) {
	res.render('search');
});

router.get('/results/:search_term?', function(req, res, next) {
	var searchTerm = req.params.search_term || 'cute wombats'

	// 	twit.stream('statuses/filter',{track: 'nodejs'},function(stream){
	// 	stream.on('data',function(data){
	// 		// console.log(data);
	// 		var tweet = {
	// 	 		twid: data["id_str"],
	// 	 		author: data["user"]["name"],
	// 	 		avatar: data["user"]["profile_image_url"],
	// 	 		text: data["text"],
	// 	 		date: data['created_at'],
	//         	screenname: data['user']['screen_name']
	// 	 	};
	// 		 res.render('twitter',{tweets: tweet});
	// 	 });
	// });

	intlpedia.search(searchTerm)
	  .then(page => console.log(page))
	  .catch(err => console.error(err));

	youTube.setKey(config.youtube.consumer_key);
	youTube.addParam('relevanceLanguage', 'en');

	youTube.search(searchTerm, 2, function(error, result) {
		if (error) {
			console.log(error);
		} else {
			var videos = [];

			for (var i = 0; i < result["items"].length; i++) {
				videos.push({
					video_id: result["items"][i].id.videoId,
					date: result["items"][i].snippet.publishedAt,
					title: result["items"][i].snippet.title,
					description: result["items"][i].snippet.description
				});
			}

			res.render('index', {videos: videos});
		}
	});
	// res.render('index');
});

module.exports = router;
