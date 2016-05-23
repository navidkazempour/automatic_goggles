// var Twitter = require('twitter'),
// 	twitter = new Twitter({
// 		consumer_key: 'ncsEPVHDq4FUMMj2YXdMLHitx',
// 		consumer_secret: 'iSMHHcHyJMBSzZauem5iHbEkGvMi8Vpq2FP5c3XuPVrzqlhpyr',
// 		access_token_key: '729343703471423488-M1jtQ5RG2DSPrgcWyGo07i39DEMlXln',
// 		access_token_secret: 'loQIwI2oEmSTUOwzO18vk24pm2a2UsSNuz0aVhugfohCh'
// 	});
//
// module.exports = twitter;
//
var config = require('../config');
var Twitter = require('twitter');
var embed = require('embed');
var twitter = new Twitter(config.twitter);
var request = require('request');

var searchTerm ='brexit';
var topTweets = [];
var twit = function(searchTerm, cb){
	twitter.get('search/tweets', {q: searchTerm, lang: "en", result_type: "popular", count: 12}, function(error, tweets, response) {
			if (error) {
				console.log(error);
			} else {
				for(var i =0 ;i < tweets.statuses.length;i++){
					var url = "https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2F"+tweets.statuses[i].user.screen_name+"%2Fstatus%2F"+tweets.statuses[i].id_str;
					request(url,function(err,res,body){
						if(err){
							console.log(err);
						}else{
								var data = JSON.parse(body);
								topTweets.push(data);
							}
					});
				};
			}

	});
}

twit(searchTerm,function(){
	console.log(topTweets);
});
//
//
// 	.then(()=>{
// 	console.log(topTweets);
// });








					// request(url,function(err,res,body){
					// 	for(var i =0 ;i < tweets.statuses.length;i++){
					// 		var url = "https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2F"+tweets.statuses[i].user.screen_name+"%2Fstatus%2F"+tweets.statuses[i].id_str;
					// 		topTweets.push({
					// 			id_str: tweets.statuses[i].id_str,
					// 			screen_name: tweets.statuses[i].user.screen_name,
					// 			text: tweets.statuses[i].text,
					// 			profile_image_url: tweets.statuses[i].user.profile_image_url,
					// 			constructed_tweet_url: "https://twitter.com/" + tweets.statuses[i].user.screen_name + "/status/" + tweets.statuses[i].id_str,
					// 			result: JSON.parse(body)
					// 		});
					// }
				// });

				// var url = topTweets[0].constructed_tweet_url;
				// console.log(url);
				// embed(url).key('81e4deb31cd849179ba687e660a96a08').oembed(function(err, tweet){
				// 	if(err){
				// 		console.log(err);
				// 	}else{
				// 		console.log(tweet);
				// 	}
				// });
