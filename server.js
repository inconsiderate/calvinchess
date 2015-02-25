// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {
  socket.join('chess room');
  var addedUser = false;

  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
    console.log(data);
    if (data === "rules change") {
      io.sockets.emit('rules changed', {
      });
    }
  });

  socket.on('add user', function (username) {
    // store the username in the socket session for this client
    socket.username = username;
    clientIp = socket.request.connection.remoteAddress;
    console.log(username, 'logged on from ip:', clientIp);
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally to all clients that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });

  // when the client emits 'move piece', we broadcast the movement to others
  socket.on('move piece', function (data) {
    console.log(data);
    socket.broadcast.emit('piece moved', {
      xcoord: data.xcoord,
      ycoord: data.ycoord,
      pieceId: data.pieceId
    });
  });
});