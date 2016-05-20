var Intlpedia = require('intl-wikipedia'),
	cheerio = require('cheerio'),
	request = require('request');

var searchTerm = 'Steve Jobs';
var intlpedia = new Intlpedia('en');
var wiki ={};
// url = "https://en.wikipedia.org/wiki/"+searchTerm;
// request(url, function(err,res,body){
// 	if(!err & res.statusCode === 200){
// 		var $ = cheerio.load(body);
// 		var heading = $('h1#firstHeading');
// 		var headingText = heading.text();
// 		var content = $('div#bodyContent div#mw-content-text > p:first-of-type');
// 		console.log(headingText);
// 		console.log(content.text().replace(/(\[\d*\])/g,""));
// 	}
// });
var wiki={};
var wikiFacts = {};
var key = [];
var value = [];
var count = 0;
intlpedia.search(searchTerm)
  .then(function(page){
  	var resultant = page.infobox;
	  for(var data in resultant){
	  	resultant[data].forEach(function(result){
	  		if(count>=2){
	  			if(result.name == "th"){
	  				console.log(result.text);
	  				key.push(result.text);
	  			}else if (result.name == "td"){
	  				console.log("\t"+result.text);
	  				value.push(result.text);
	  			}
	  		}
	  		count++;
	  	});
	  }
	  for(var i = 0; i<key.length;i++){
	  	wikiFacts[key[i]] = value[i];
	  }
	  console.log(wikiFacts);
	  console.log(key.length +" "+ value.length);
	}).catch(err => console.error(err));
page => console.log(page)