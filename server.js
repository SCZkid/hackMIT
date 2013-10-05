var http = require("http");
var url = require("url");
var express = require("express");
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb:hack:hack,hack.kalosal.com/wheee');
var db = mongoose.connection;
db.once('open', function callback () {
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



function start(route) {
	app.use(express.static(__dirname + '/Public'));
	app.get('/', function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");
        route(pathname);
        response.sendfile('Public/testPage.html')
		//response.end();
	});
	app.listen(9001);
	console.log("Server has started.");
}

exports.start = start;
