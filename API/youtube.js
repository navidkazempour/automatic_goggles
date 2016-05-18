var Youtube = require('youtube-node');

var youTube = new Youtube();

youTube.setKey('AIzaSyBWDQ2uae9ojRM-lOHaL1qqyFJCF3B_P7A');

youTube.addParam('relevanceLanguage', 'en');

youTube.search('World War z Trailer',10,function(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(result,null,2));
  }
});
