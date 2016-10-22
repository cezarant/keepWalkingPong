var net = require('net');
var vr_sockets = [];
var vi_servidor = '127.0.0.1';
var dados = "";
var http = require('http');
var myserver  = http.createServer(function (req,res)
{
	res.writeHead(200, {'Content-Type'   : 'text/plain','Access-Control-Allow-Origin' : '*'});
	/*req.on('data',function(data)
	{
		console.log(data); 		
	});
		
	for (var j=0; j < vr_sockets.length; j++)
	{
		dados += " Socket"+ j +"";
	}
	
	req.on('end', function()
	{			
		console.log(dados); 		
	});*/
	res.end(dados); 
});
var port_number = myserver.listen(process.env.PORT || 3000);

net.createServer(function(sock)
{   		
	sock.on('data', function(data)
	{
		console.log('colocando socker na lista');
		vr_sockets.push(sock);
	});
}).listen(6161,vi_servidor);
