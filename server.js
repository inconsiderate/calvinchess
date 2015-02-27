// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var yaml = require('js-yaml');
var path = require('path');
var fs = require('fs');

var port = process.env.PORT || 3000;
var turnCounter = 1;
server.listen(port, function() {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

var usernames = {};
var numUsers = 0;
var player1 = "";
var player2 = "";
var player1ID = "";
var player2ID = "";

var filename = path.join(__dirname, 'calvinQuotes.yml'),
  contents = fs.readFileSync(filename, 'utf8'),
  calvinQuotes = yaml.load(contents);

io.on('connection', function(socket) {
  socket.join('default');
  socket.emit('player inactive', {});

  var addedUser = false;

  socket.on('new message', function(data) {
    socket.broadcast.to(data.channel).emit('new message', {
      username: socket.username,
      message: data.message
    });

    // echo globally to all users that a rule has changed
    console.log(socket.username, 'posted:', data.message);
    if (data.message === "rule change") {
      io.to(data.channel).emit('rules changed', {});
    } else if (data.message.indexOf("join channel") > -1) {
      var splitData = data.message.split(" "),
        channelName = splitData[2];
      io.to(data.channel).emit('new message', {
        username: 'SYSTEM MESSAGE',
        message: 'Player ' + socket.username + ' switched to channel: ' + channelName
      });
      socket.leave('default');
      socket.join(channelName);
      socket.emit('current channel', {
        currentChannel: channelName
      });
    } else if (Math.floor(Math.random(10) * 10) === 4 || data.message.indexOf("calvin") > -1) {
      calvinNumber = (Math.floor(Math.random(calvinQuotes.length) * 10) - 1);
      io.to(data.channel).emit('new message', {
        username: 'CalvinBot',
        message: calvinQuotes[calvinNumber]
      });
    } else {
      return false;
    }
  });

  socket.on('add user', function(username) {
    // store the username in the socket session for this client
    socket.username = username;
    if (player1 === "") {
      player1 = username;
      console.log('Player 1 assigned to:', player1);
      socket.emit('player1 active', {});
      player1ID = socket.id;
    } else if (player2 === "") {
      player2 = username;
      console.log('Player 2 assigned to:', player2);
      player2ID = socket.id;
      socket.emit('player inactive', {});
    } else {
      console.log('Spectator joined:', socket.username);
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
  socket.on('typing', function() {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function() {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  socket.on('disconnect', function() {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;
      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
      console.log("user disconnected:", player1, player2);
      if (player1 === socket.username) {
        player1 = "";
      } else if (player2 === socket.username) {
        player2 = "";
      }
    }
  });

  // when the client emits 'move piece', we broadcast the movement to others
  socket.on('move piece', function(data) {
    console.log('PIECE MOVED!!!!! LOLWUT');
    turnCounter += 1;
    io.emit('piece moved', {
      xcoord: data.xcoord,
      ycoord: data.ycoord,
      pieceId: data.pieceId
    });
    console.log('player2 id:', player2ID);
    if (socket.username == player1) {
      io.sockets.connected[player2ID].emit('player2 active', {});
      // socket.broadcast.emit('player2 active', {});
      socket.emit('player inactive', {});
      console.log("player 1 moved");
    } else if (socket.username == player2) {
      io.sockets.connected[player1ID].emit('player1 active', {});
      socket.emit('player inactive', {});
      console.log("player 2 moved");
    }
  });

  socket.on('piece killed', function(data) {
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
