
//for models functionality
var Twitter = require('./models/twitter');
var Wikipedia = require('./models/wikipedia');
var Youtube = require('./models/youtube');
var Search = require('./models/search');


router.get('/test', function(req, res){

  // create a new search
  var topicSearch = new Search({ searchTerm: 'Search URL' });
  topicSearch.save(function (err) {
    if (err) return console.log(err);

    // create the twitter
    var twitter = new Twitter({ 
      description: 'Tweet description',
      _search: topicSearch._id  // use the id of the search model to connect the twitter to the search
    });
    twitter.save(function (err) {
      if (err) return console.log(err);
    });

    // create the wikipedia
    var wikipedia = new Wikipedia({ 
      title: 'title',
      body: 'body',
      facts: 'facts',
      _search: topicSearch._id
      });
    wikipedia.save(function (err) {
      if (err) return console.log(err);
    });

    // create the youtube
    var youtube = new Youtube({ 
      videoId: 'videoId',
      title: 'title',
      _search: topicSearch._id
      });
    youtube.save(function (err) {
      if (err) return console.log(err);
    });

  });
});
//////////////////////////////////////////////////////////
