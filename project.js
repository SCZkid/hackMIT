var server = require("./server");
var router = require("./router");

//AlchemyAPI
var alchemyapi = require('./alchemyapi');

server.start(router.route);
//var app = server.app;
//app.get('/example', example);

var revision = function (contents) {
  var output = {};
  concepts(output, contents);
}

//var contents = 'My physics professor says that Newton discovered F=m*a, where m is mass and a is acceleration. F is force, measured in Newtons, an SI unit.';

/* function example(req, res) {
  var output = {};

  concepts(req, res, output);
}
*/

function concepts(output, contents) {
  alchemyapi.concepts('text', contents, { 'showSourceText':0 }, function(error, response) {
    output['concepts'] = { text:contents, response:JSON.stringify(response,null,4), results:response['concepts'] };
    keywords(output, contents);
  });
}

function keywords(output, contents) {
  alchemyapi.keywords('text', contents, {}, function(error, response) {
    output['keywords'] = { text:contents, response:JSON.stringify(response,null,4), results:response['keywords'] };
    category(output, contents);
  });
}

function category(output, contents) {
  alchemyapi.category('text', contents, {}, function(error, response) {
    output['relations'] = { text:contents, response:JSON.stringify(response,null,4), results:response };
    relations(output, contents);
  });
}

function relations(output, contents) {
  alchemyapi.relations('text', contents, {}, function(error, response) {
    output['relations'] = {text:contents, response:JSON.stringify(response,null,4), results:response['relations'] };
    entities(output, contents);
  });
}

function entities(output, contents) {
  alchemyapi.entities('text', contents, { 'quotations':1 }, function(error, response) {
    output['entities'] = { text:contents, response:JSON.stringify(response,null,4), results:response['entities'] };
    // THIS HAS TO BE REPLACED WITH AN INSERT INTO THE DATABASE!!!!!
    console.log(output, contents);
  });
}

// A test for the revision function
revision("This is a really bad test about Newton and cookies and milk and the moon.");
