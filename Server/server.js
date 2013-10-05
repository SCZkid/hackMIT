var http = require("http");
var url = require("url");

function start(route) {
	function onRequest(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log("Request for " + pathname + " received.");

		route(pathname);

		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("<h1>" + pathname + "</h1>");
		response.end();
	}
	http.createServer(onRequest).listen(80);
	console.log("Server has started.");
}

exports.start = start;