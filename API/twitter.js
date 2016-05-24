var config = require('../config');
var Twitter = require('twitter');
var embed = require('embed');
var twitter = new Twitter(config.twitter);
var request = require('request');


var twit = function(searchTerm, cb){
		twitter.get('search/tweets', {q: searchTerm, lang: "en", result_type: "popular", count: 12}, function(error, tweets, response) {
			var topTweets = [];
				if (error) {
					console.log(error);
				} else {
					for(var i =0 ;i < tweets.statuses.length;i++){
						var url = "https://api.twitter.com/1/statuses/oembed.json?url=https://twitter.com/"+tweets.statuses[i].user.screen_name+"/status/"+tweets.statuses[i].id_str;
						request(url,function(err,res,body){
							if(err){
								console.log(err);
							}else{
									var data = JSON.parse(body);
									topTweets.push(data);
									if(topTweets.length === tweets.statuses.length){
										cb(topTweets);
									}
								}
						});
					};
				}
		});
}

module.exports = twit;
