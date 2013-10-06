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
  alchemyapi.concepts('text', demo_text, { 'showSourceText':0 }, function(error, response) {
    output['concepts'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['concepts'] };
    keywords(req, res, output);
  });
}

function keywords(req, res, output) {
  alchemyapi.keywords('text', demo_text, {}, function(error, response) {
    output['keywords'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['keywords'] };
    category(req, res, output);
  });
}

function category(req, res, output) {
  alchemyapi.category('text', demo_text, {}, function(error, response) {
    output['relations'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response };
    relations(req, res, output);
  });
}

function relations(req, res, output) {
  alchemyapi.relations('text', demo_text, {}, function(error, response) {
    output['relations'] = {text:demo_text, response:JSON.stringify(response,null,4), results:response['relations'] };
    entities(req, res, output);
  });
}

function entities(req, res, output) {
  alchemyapi.entities('text', demo_text, { 'quotations':1 }, function(error, response) {
    output['entities'] = { text:demo_text, response:JSON.stringify(response,null,4), results:response['entities'] };
    res.send(output);
  });
}

