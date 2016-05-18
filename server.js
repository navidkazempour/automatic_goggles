'use strict';

var express = require('express'),
    cheerio = require('cheerio'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./app/action'),
    sequelize = require('./models').sequelize,
    favicon = require('serve-favicon'),
    twitter = require('ntwitter'),
    Youtube = require('youtube-node'),
    config = require('./config'),
    Intlpedia = require('intl-wikipedia');
    // socket = require('socket.io')

var port = 3000;
var app = express();
var twit = new twitter(config.twitter);
var youTube = new Youtube();
var server ;

app.set('view engine','jade');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

var searchTerm = 'Steve Jobs'
var intlpedia = new Intlpedia('en')

app.use('/',routes);

app.listen(port,function(){
	console.log(`Listening on port ${port}`);
});
// twit.stream('statuses/filter',{track: 'nodejs'},function(stream){
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
// 		 // console.log(tweet);
// 	 });
// });

// intlpedia.search(searchTerm)
//   .then(page => console.log(page))
//   .catch(err => console.error(err));

// youTube.setKey(config.youtube.consumer_key);
// youTube.addParam('relevanceLanguage', 'en');

//  youTube.search('World War z Trailer',5,function(error, result) {
//    if (error) {
//      console.log(error);
//    }
//    else {
//    	// console.log(result["items"]);
//    	var vids = [];
//    	for(var i=0;i<result["items"].length;i++){
//    		vids.push({
//    			video_id: result["items"][i].id.videoId,
//    			date: result["items"][i].snippet.publishedAt,
//    			title: result["items"][i].snippet.title,
//    			description: result["items"][i].snippet.description
//    		});
//    	}
//    	// console.log(vids);
//    }
 // });
