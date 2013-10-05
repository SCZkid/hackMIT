var http = require("http");
var url = require("url");
var express = require("express");
var app = express();
/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.once('open', function callback () {
    console.log("hooray!");
    db.createCollection("hackers", {});
    db.hackers.insert({firstName: "Jordan", lastName: "Haines", gender: "m", age: 20});
    db.hackers.insert({firstName: "Collin", lastName: "Stedman", gender: "m", age: 20});
    db.hackers.insert({firstName: "Steven", lastName: "Zierk", gender: "m", age: 20});
    console.log(db.hackers.find());
}); */


function start(route) {
	app.use(express.static(__dirname + '/Public'));
	app.get('/', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
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
	console.log("Server has started.");
}

exports.start = start;
