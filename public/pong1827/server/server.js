var http = require('http');
var io = require('socket.io');

var server = http.createServer(function(request, response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('hello world');
	response.end();
});

var listener = io.listen(server);

listener.sockets.on('connection', function(socket) {
	socket.emit('message', {'message': 'hello world'});
});

server.listen(8001);