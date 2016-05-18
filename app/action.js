var express = require('express');
var config = require('../config');
var twitter = require('ntwitter');
var Youtube = require('youtube-node');
var youTube = new Youtube();
var router = express.Router();

var twit = new twitter(config.twitter);

router.get('/',function(req,res,next){
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
	// youTube.setKey(config.youtube.consumer_key);
	// youTube.addParam('relevanceLanguage', 'en');

	// youTube.search('World War z Trailer',5,function(error, result) {
	// if (error) {
	// console.log(error);
	// }
	// else {
	// var vids = [];
	// for(var i=0;i<result["items"].length;i++){
	// 	vids.push({
	// 		video_id: result["items"][i].id.videoId,
	// 		date: result["items"][i].snippet.publishedAt,
	// 		title: result["items"][i].snippet.title,
	// 		description: result["items"][i].snippet.description
	// 	});
	// }
	// res.render('index',{video: vids});
	// }
	// });
	res.render('index');
});

module.exports = router;