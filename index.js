var express = require('express');
var net = require('net');
var app = express();

app.set('port', (process.env.PORT || 5000));

//app.use(express.static(__dirname + '/public'));

// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('Estou aqui');
});

/*app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});*/

net.createServer(function(sock)
{   		
	sock.on('data', function(data)
	{
		console.log('colocando socker na lista');
		vr_sockets.push(sock);
	});
}).listen(6161,vi_servidor);
