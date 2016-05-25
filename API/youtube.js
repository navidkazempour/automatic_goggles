var config = require('../config');
var Youtube = require('youtube-node');
var youTube = new Youtube();
youTube.setKey('AIzaSyB8bbPptVEFOy-YSRmaTjQdCuhAynm6S-A');
youTube.addParam('relevanceLanguage', 'en');


var videos = function(searchTerm,callback){
  youTube.search(searchTerm,5,function(error, result) {
    var vids = [];
    if (error) {
      console.log(error);
    }else {
      for(var i=0;i<result["items"].length;i++){
        vids.push({
          video_id: result["items"][i].id.videoId
        });
      }
        if(vids.length === result["items"].length){
          callback(vids);
        }
      }
  });
};

module.exports = videos;


// date: result["items"][i].snippet.publishedAt,
// title: result["items"][i].snippet.title,
// description: result["items"][i].snippet.description
