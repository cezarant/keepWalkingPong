var http = require('http');
var port = process.env.PORT || 6000;
var http = require('http');
var myserver  = http.createServer(function (req,res)
{
	console.log('Server listening at port %d', port);	
});
var io = require('socket.io')(myserver);

myserver.listen(port, function () 
{
  console.log('Server listening at port %d', port);	
});

/*app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});*/


