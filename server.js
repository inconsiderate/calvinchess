// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;
var turnCounter = 1;
server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var usernames = {};
var numUsers = 0;
var player1 = "";
var player2 = "";

io.on('connection', function (socket) {
  var addedUser = false;

  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });

    // echo globally to all users that a rule has changed
    console.log(data);
    if (data === "rule change") {
      io.sockets.emit('rules changed', {
      });
    }
  });

  socket.on('add user', function (username) {
    // store the username in the socket session for this client
    socket.username = username;
    if (player1 === "") {
      player1 = username;
      console.log('Player 1 assigned to:',player1);
      socket.emit('player1 active', {});
    }else if (player2 === "") {
      player2 = username;
      console.log('Player 2 assigned to:',player2);
      socket.emit('player inactive', {});
    } else {
      console.log('Spectator joined:',socket.username);
      socket.emit('player inactive', {});
    };

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
      console.log("before disconnect:", player1, player2);
      if (player1 === socket.username) {
        player1 = "";
      } else if (player2 === socket.username) {
        player2 = "";
      }
      console.log("after disconnect:", player1, player2);
    }
  });

  // when the client emits 'move piece', we broadcast the movement to others
  socket.on('move piece', function (data) {
    console.log('PIECE MOVED!!!!! LOLWUT');
    turnCounter += 1;
    socket.broadcast.emit('piece moved', {
      xcoord: data.xcoord,
      ycoord: data.ycoord,
      pieceId: data.pieceId
    });
    if (socket.username == player1) {
      socket.broadcast.emit('player2 active', {});
      socket.emit('player inactive', {});
      console.log("player 1 moved");
    } else if (socket.username == player2) {
      socket.broadcast.emit('player1 active', {});
      socket.emit('player inactive', {});
      console.log("player 2 moved");
    }
  });

  socket.on('piece killed', function (data) {
    console.log(data.pieceId);
    console.log(data.coordX);
    console.log(data.coordY);
    socket.broadcast.emit('kill piece', {
      xcoord: data.coordX,
      ycoord: data.coordY,
      pieceId: data.pieceId
    });
  });

});