var server = require("./server");
var router = require("./router");

//AlchemyAPI
var alchemyapi = require('./alchemyapi');

server.start(router.route);
//var app = server.app;
//app.get('/example', example);

var revision = function (contents, title) {
  var output = {};
  concepts(output, contents, title);
}

//var contents = 'My physics professor says that Newton discovered F=m*a, where m is mass and a is acceleration. F is force, measured in Newtons, an SI unit.';

/* function example(req, res) {
  var output = {};

  concepts(req, res, output);
}
*/

function concepts(output, contents, title) {
  alchemyapi.concepts('text', contents, { 'showSourceText':0 }, function(error, response) {
    output['concepts'] = { text:contents, response:JSON.stringify(response,null,4), results:response['concepts'] };
    keywords(output, contents, title);
  });
}

function keywords(output, contents, title) {
  alchemyapi.keywords('text', contents, {}, function(error, response) {
    output['keywords'] = { text:contents, response:JSON.stringify(response,null,4), results:response['keywords'] };
    category(output, contents, title);
  });
}

function category(output, contents, title) {
  alchemyapi.category('text', contents, {}, function(error, response) {
    output['relations'] = { text:contents, response:JSON.stringify(response,null,4), results:response };
    relations(output, contents, title);
  });
}

function relations(output, contents, title) {
  alchemyapi.relations('text', contents, {}, function(error, response) {
    output['relations'] = {text:contents, response:JSON.stringify(response,null,4), results:response['relations'] };
    entities(output, contents, title);
  });
}

function entities(output, contents, title) {
  alchemyapi.entities('text', contents, { 'quotations':1 }, function(error, response) {
    output['entities'] = { text:contents, response:JSON.stringify(response,null,4), results:response['entities'] };
    // THIS HAS TO BE REPLACED WITH AN INSERT INTO THE DATABASE!!!!!
    addDoc(title, output);
  });
}

// A test for the revision function
//revision("This is a really bad test about Newton and cookies and milk and the moon.");

function addDoc(title, output)
{
  var newDoc = new Doc({ 
      output: output,
      title: title
    });
    newDoc.save(function(error, data) {
      if(error) {
        console.log(error);
      } else {
        //console.log(data);
      }
    });
}