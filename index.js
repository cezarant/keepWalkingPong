var dados = "Nenhum socket ainda"; 
var net = require('net');
var http = require("http");
var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});  
  response.write("<html>");
  response.write("<head>");
  response.write("<title>Hello World Page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write(dados);
  response.write("</body>");
  response.write("</html>");
  response.end();
});

net.createServer(function(sock)
{   		
	sock.on('data', function(data)
	{
		dados += 'colocando socker na lista\n';
		vr_sockets.push(sock);
	});	
}).listen(3000);

server.listen((process.env.PORT || 5000));
console.log("Server is listening");