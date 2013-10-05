var server = require("./server");
var router = require("./router");

//AlchemyAPI
var alchemyapi = require('./alchemyapi');

server.start(router.route);
var app = server.app;
app.get('/example', example);

var demo_text = 'My physics professor says that Newton discovered F=m*a, where m is mass and a is acceleration. F is force, measured in Newtons, an SI unit.';

function example(req, res) {
  var output = {};

  concepts(req, res, output);
}

function concepts(req, res, output) {
  alchemyapi.concepts('text', demo_text, { 'showSourceText':1 }, function(error, response) {
    output['concepts'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['concepts'] };
    res.send(output);
  });
}
