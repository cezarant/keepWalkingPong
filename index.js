// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));
var numUsers = 0;

io.on('connection', function (socket) 
{
  var addedUser = false;
  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message',
	{
      username: socket.username,
      message: data
    });
  });
 
  // when the client emits 'add user', this listens and executes
  socket.on('user', function (username)
  {  
    if ((addedUser) || (numUsers === 2)) return;
    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on('subir', function ()
  {
    socket.broadcast.emit('subir', {
      username: socket.username
    });
  });

  socket.on('auth', function ()
  {
    socket.broadcast.emit('auth', {
      username: socket.username
    });
  });	
  
  
  socket.on('descer', function ()
  {
    socket.broadcast.emit('descer', {
      username: socket.username
    });
  });  
    

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
