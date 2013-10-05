// Builtin packages
var http = require('http');
var url = require('url');

// AlchemyAPI
var alchemyapi = require('./alchemyapi');

// Express
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb:hack:hack,hack.kalosal.com/wheee');
var db = mongoose.connection;
/*db.once('open', function callback () {
    console.log("hooray!");
    var jfaoiwejfoiawe = mongoose.model('jfaoiwejfoiawe', { firstName: String });
    var jordan = new jfaoiwejfoiawe({
    	firstName: "Collin"
    });
    jordan.save(function(error, data) {
        if(error) {
        	console.log(error);
        } else {
        	console.log("WEHFIOWHEF");
        	console.log(data);
        }
    });
    jfaoiwejfoiawe.find(function(err, people) {
    	if(err) {
    		console.log(error);
    	} else {
    		console.log("JWEIOJFWEJFOIWEF");
    		console.log(people);
    	}
    })
    //var Jordan = new Person({ firstName: 'Jordan', lastName: 'Haines', age: 20});
});
*/

app.set('port', process.env.PORT || 3001);
app.use(express.favicon());
app.use(express.bodyParser());
//app.use(express.methodOverride());

//Check port
var port = process.env.PORT || 3001;
app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

function start(route) {
	app.use(express.static(__dirname + '/Public'));
	app.get('/', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request for ' + pathname + ' received.');
        route(pathname);
        response.sendfile('Public/testPage.html')
		//response.end();
	});
	app.get('/parse', function(request, response) {
		var pathname = url.parse(request.url).pathname;

		var dbox;
		var app;
		var key = "8higzkomex2c5jy";
		var secret = "rueapgelizhsyb1";
		dbox = require("dbox");
		app = dbox.app( {"app_key" : key, "app_secret" : secret} );

		app.requesttoken(function(status, request_token) {
			//console.log(request_token);
			console.log("Must visit: https://www.dropbox.com/1/oauth/authorize?oauth_token=#"+request_token.oauth_token);
		});


		console.log("Request for " + pathname + " received.");
        route(pathname);
        response.sendfile('Public/MarkdownParse.html')
		//response.end();
	});
	app.listen(9001);
	console.log('Server has started.');
}

app.get('/example', example);

exports.start = start;

// Replace this with the files we read!
var demo_text = 'My physics professor says that Newton discovered F=m*a, where m is mass and a is acceleration. F is force, measured in Newtons, an SI unit.';

// What is this?
function example(req, res) {
  var output = {};

  // Start the analysis chain
  concepts(req, res, output);
}

function concepts(req, res, output) {
  alchemyapi.concepts('text', demo_text, { 'showSourceText':1 }, function(error, response) {
    output['concepts'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['concepts'] };
    res.send(output);
  });
}
