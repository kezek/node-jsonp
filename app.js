var http = require('http');
var connect = require('connect');
var url = require('url');

//first server : serve a static html file
connect.createServer(
    connect.static(__dirname + '/public')
).listen(8080);

console.log('Server 1 running at http://127.0.0.1:' + 8080 + '/');

//second server : serve a string that will be used in the 
//$.getJSON callback 
http.createServer(function (req, res) {
	var obj = {
		name : 'jsonp',
		//Return a random number between 1 and 100
		random : Math.floor((Math.random()*100)+1)
	};
	//assign the 'callback' param value
	var callback = url.parse(req.url, true).query.callback;
	res.end(callback + "(" + JSON.stringify(obj) + ")");
}).listen(8181);

console.log('Server 2 running at http://127.0.0.1:' + 8181 + '/');