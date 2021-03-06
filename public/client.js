var socket = io();
window.CHANNEL = "default";

window.onload = function() {
  window.game = new Phaser.Game(600, 600, Phaser.AUTO, 'gamecanvas', {
    preload: preload,
    create: create,
    render: render,
    update: update
  });

  window.game.scaleMode = Phaser.ScaleManager.RESIZE;

  window.allPiecesArray = [];
  window.blackPieces = [];
  window.whitePieces = [];
  window.turnCounter = 0
  window.allRulesArray;
  window.background;
  var explosionPiece;

  var bQueen, bKing, b1Rook, b2Rook, b1Bishop, b2Bishop, b1Knight, b2Knight,
    b1Pawn, b2Pawn, b3Pawn, b4Pawn, b5Pawn, b6Pawn, b7Pawn, b8Pawn;
  window.bQueen;
  window.wQueen;
  window.bKing;
  window.wKing;
  var wKing, w1Rook, w2Rook, w1Bishop, w2Bishop, w1Knight, w2Knight,
    w1Pawn, w2Pawn, w3Pawn, w4Pawn, w5Pawn, w6Pawn, w7Pawn, w8Pawn;

  function preload() {

    game.load.audio('background', 'audio/backgroundLoop.mp3');
    game.load.audio('shotgun', 'audio/shotgun.mp3');
    game.load.audio('whoosh', 'audio/whoosh.mp3');
    game.load.audio('batmanTheme', 'audio/batmanTheme.mp3');

    game.load.spritesheet('explosion', 'spritesheets/explosion.png', 64, 64, 24);
    game.load.spritesheet('batman', 'spritesheets/batman.png', 69, 69, 30);
    game.load.spritesheet('largeExplosion', 'spritesheets/largeExplosion.png', 220, 220);

    // game.load.image('background2', '/images/chessboard2.png');
    game.load.image('background2', 'images/chessboard3.jpg');

    game.load.image('background', 'images/chessboard.png');
    game.load.image('square', 'images/grid.jpeg');
    game.load.image('bQueen', 'images/whitequeenb.png');
    game.load.image('bKing', 'images/whitekingb.png');
    game.load.image('bRook', 'images/whiterookb.png');
    game.load.image('bBishop', 'images/whitebishopb.png');
    game.load.image('bKnight', 'images/whiteknightb.png');
    game.load.image('bPawn', 'images/whitepawnb.png');

    game.load.image('wQueen', 'images/whitequeena.png');
    game.load.image('wKing', 'images/whitekinga.png');
    game.load.image('wRook', 'images/whiterooka.png');
    game.load.image('wBishop', 'images/whitebishopa.png');
    game.load.image('wKnight', 'images/whiteknighta.png');
    game.load.image('wPawn', 'images/whitepawna.png');
    game.load.image('gameover', 'images/GAMEOVER.png');
  }
  var fullScreenKey
  var allPieces;
  var grid = [];
  var currentTile = new Phaser.Point();

  function create() {

    // game.scaleMode = Phaser.StageScaleMode.EXACT_FIT;
    game.scale.setScreenSize(true);
    game.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Create GRID for units to move over.
    for (var y = 0; y < 8; y++) {
      grid[y] = [];
      for (var x = 0; x < 8; x++) {
        grid[y][x] = game.add.image(x * 100, y * 100, '');
      }
    }
    window.background = game.add.image(0, 0, 'background');
    window.background.height = 600;
    window.background.width = 600;

    window.backgroundMusic = game.add.audio('background', 0.5, true);
    window.backgroundMusic.loop = true;
    window.backgroundMusic.play();

    window.batmanTheme = game.add.audio('batmanTheme', 1, false);
    window.shotgunSound = game.add.audio('shotgun', 1, false);
    window.whooshSound = game.add.audio('whoosh', 1, false);

    bQueen = new Queen(game, 'black', 3, 0, 'bQueen');
    bKing = new King(game, 'black', 4, 0, 'bKing');
    b1Rook = new Rook(game, 'black', 7, 0, 'bRook');
    b2Rook = new Rook(game, 'black', 0, 0, 'bRook');
    b1Bishop = new Bishop(game, 'black', 2, 0, 'bBishop');
    b2Bishop = new Bishop(game, 'black', 5, 0, 'bBishop');
    b1Knight = new Knight(game, 'black', 1, 0, 'bKnight');
    b2Knight = new Knight(game, 'black', 6, 0, 'bKnight');
    b1Pawn = new Pawn(game, 'black', 0, 1, 'bPawn');
    b2Pawn = new Pawn(game, 'black', 1, 1, 'bPawn');
    b3Pawn = new Pawn(game, 'black', 2, 1, 'bPawn');
    b4Pawn = new Pawn(game, 'black', 3, 1, 'bPawn');
    b5Pawn = new Pawn(game, 'black', 4, 1, 'bPawn');
    b6Pawn = new Pawn(game, 'black', 5, 1, 'bPawn');
    b7Pawn = new Pawn(game, 'black', 6, 1, 'bPawn');
    b8Pawn = new Pawn(game, 'black', 7, 1, 'bPawn');

    // Generate WHITE starting pieces
    wQueen = new Queen(game, 'white', 3, 7, 'wQueen');
    wKing = new King(game, 'white', 4, 7, 'wKing');
    w1Rook = new Rook(game, 'white', 7, 7, 'wRook');
    w2Rook = new Rook(game, 'white', 0, 7, 'wRook');
    w1Bishop = new Bishop(game, 'white', 2, 7, 'wBishop');
    w2Bishop = new Bishop(game, 'white', 5, 7, 'wBishop');
    w1Knight = new Knight(game, 'white', 1, 7, 'wKnight');
    w2Knight = new Knight(game, 'white', 6, 7, 'wKnight');

    w1Pawn = new Pawn(game, 'white', 0, 6, 'wPawn');
    w2Pawn = new Pawn(game, 'white', 1, 6, 'wPawn');
    w3Pawn = new Pawn(game, 'white', 2, 6, 'wPawn');
    w4Pawn = new Pawn(game, 'white', 3, 6, 'wPawn');
    w5Pawn = new Pawn(game, 'white', 4, 6, 'wPawn');
    w6Pawn = new Pawn(game, 'white', 5, 6, 'wPawn');
    w7Pawn = new Pawn(game, 'white', 6, 6, 'wPawn');
    w8Pawn = new Pawn(game, 'white', 7, 6, 'wPawn');

    // add all pieces to an array, so their positions on the board can be checked
    allPiecesArray.push(bQueen, bKing, b1Rook, b2Rook, b1Bishop, b2Bishop, b1Knight, b2Knight,
      b1Pawn, b2Pawn, b3Pawn, b4Pawn, b5Pawn, b6Pawn, b7Pawn, b8Pawn, wQueen, wKing, w1Rook, w2Rook, w1Bishop, w2Bishop, w1Knight, w2Knight,
      w1Pawn, w2Pawn, w3Pawn, w4Pawn, w5Pawn, w6Pawn, w7Pawn, w8Pawn);

    blackPieces.push(bQueen, bKing, b1Rook, b2Rook, b1Bishop, b2Bishop, b1Knight, b2Knight,
      b1Pawn, b2Pawn, b3Pawn, b4Pawn, b5Pawn, b6Pawn, b7Pawn, b8Pawn);

    whitePieces.push(wQueen, wKing, w1Rook, w2Rook, w1Bishop, w2Bishop, w1Knight, w2Knight,
      w1Pawn, w2Pawn, w3Pawn, w4Pawn, w5Pawn, w6Pawn, w7Pawn, w8Pawn);

    // Set F keypress to go Full Screen
    var fullScreenKey = this.input.keyboard.addKey(Phaser.Keyboard.TILDE);
    fullScreenKey.onDown.add(gofull, this);

    function lockPlayers() {
      for (i = 0; i < blackPieces.length; i++) {
        blackPieces[i].sprite.input.draggable = false;
      }
      for (i = 0; i < whitePieces.length; i++) {
        whitePieces[i].sprite.input.draggable = false;
      }
    }
  }

  function clickedBlock() {
    if (currentTile.x >= 0 && currentTile.x <= 8 && currentTile.y >= 0 && currentTile.y <= 8) {
      square = grid[currentTile.y][currentTile.x];
      square.alpha = 0.5;
    }
    // valid();
  }

  function gofull() {
    if (game.scale.isFullScreen) {
      game.scale.stopFullScreen();
    } else {
      game.scale.startFullScreen(false);
    }
  }

  function update() {
    currentTile.x = this.game.math.snapToFloor(game.input.x, 75) / 75;
    currentTile.y = this.game.math.snapToFloor(game.input.y, 75) / 75;
 
  }
  function render() {
    // game.debug.text('Tile X: ' + currentTile.x + 'Y: ' + currentTile.y, 100, 100);
  }
};
$(function() {
  var FADE_TIME = 150;
  var TYPING_TIMER_LENGTH = 400;
  var COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];

  // Initialize varibles
  var $window = $(window);
  var $usernameInput = $('.usernameInput');
  var $messages = $('.messages');
  var $inputMessage = $('.inputMessage');
  var $loginPage = $('.login.page');
  var $chatPage = $('.chat.page');
  var $rulesChangeBox = $('#rules-box');
  var $recentRuleDiv = $('#recentRuleDiv');
  var $currentPlayerBox = $('#current-player-box');

  // Prompt for setting a username
  var username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  function addParticipantsMessage(data) {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += "there are " + data.numUsers + " participants";
    }
    log(message);
  }

  // Sets the client's username
  function setUsername() {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      // Tell the server your username
      socket.emit('add user', username);
    }
  }

  // Set the client's current channel
  function setCurrentChannel(data) {
    console.log('current channel:', data.currentChannel);
    window.CHANNEL = data.currentChannel;
  }


  // Sends a chat message
  function sendMessage() {
    var message = $inputMessage.val();
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
    };
    // tell server to execute 'new message' and send along one parameter
    socket.emit('new message', {
      message: message,
      channel: window.CHANNEL
    });
  }

  // Log a message
  function log(message, options) {
      var $el = $('<li>').addClass('log').text(message);
      addMessageElement($el, options);
    }
    // Adds the visual chat message to the message list

  function addChatMessage(data, options) {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }
    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);
    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);
    addMessageElement($messageDiv, options);
  }


  // Adds the visual chat typing message
  function addChatTyping(data) {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  function removeChatTyping(data) {
    getTypingMessages(data).fadeOut(function() {
      $(this).remove();
    });
  }

  function addMessageElement(el, options) {
    var $el = $(el);

    // Setup default options
    if (!options) {
      options = {};
    }
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  function cleanInput(input) {
    return $('<div/>').text(input).text();
  }

  // Updates the typing event
  function updateTyping() {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing', {
          channel: window.CHANNEL
        });

      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function() {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  function getTypingMessages(data) {
    return $('.typing.message').filter(function(i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  function getUsernameColor(username) {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events

  $window.keydown(function(event) {
    // Auto-focus the current input when a key is typed
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    // When the client hits ENTER on their keyboard
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });

  // Chess events

  // Broadcast that a piece has been verified as a legal move
  function movePiece(data) {
    var match = allPiecesArray.filter(isPieceId);

    function isPieceId(element) {
      if (element.pieceId === data.pieceId) {
        return true;
      } else {
        return false;
      }
    }
    var item = match[0];

    item.sprite.x = data.xcoord;
    item.sprite.y = data.ycoord;
    item.sprite.originX = data.xcoord;
    item.sprite.originY = data.ycoord;
    game.add.tween(item.sprite).to({
      x: data.xcoord,
      y: data.ycoord
    }, 400, Phaser.Easing.Back.Out, true);
  }

  function rulesChange(data) {
    console.log(data)
    allRulesArray[data][1]();
    console.log('rule active: ',data);
    var $calvinnameDiv = $('<span class="username"/>')
      .text('CalvinBot');
    var $messageRuleDiv = $('<span class="messageBody">')
     .text(allRulesArray[data][0])
    var $ruleChangeDiv = $('<li class="message"/>')
      .data('username', 'CalvinBot')
      .append($calvinnameDiv, $messageRuleDiv);
    addMessageElement($ruleChangeDiv);
    $rulesChangeBox.text(allRulesArray[data][0]);
    $recentRuleDiv.append('<a>' + allRulesArray[data][0] + '<br><em>' + allRulesArray[data][2] + '</em><p>');
  }

  // Click events

  // Focus input when clicking anywhere on login page
  $loginPage.click(function() {
    $currentInput.focus();
  });

  // Focus input when clicking on the message input's border
  $inputMessage.click(function() {
    $inputMessage.focus();
  });

  // SOCKET EVENTS

  // Whenever the server emits 'login', log the login message
  socket.on('login', function(data) {
    connected = true;
    // Display the welcome message
    var message = "Lighthouse Plays Calvin Chess – ";
    log(message, {
      prepend: true
    });
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'new message', update the chat body
  socket.on('new message', function(data) {
    addChatMessage(data);
  });

  // Whenever the server emits 'user joined', log it in the chat body
  socket.on('user joined', function(data) {
    log(data.username + ' joined');
    addParticipantsMessage(data);
  });

  // Whenever the server emits 'user left', log it in the chat body
  socket.on('user left', function(data) {
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });

  // Whenever the server emits 'typing', show the typing message
  socket.on('typing', function(data) {
    addChatTyping(data);
  });

  // Whenever the server emits 'stop typing', kill the typing message
  socket.on('stop typing', function(data) {
    removeChatTyping(data);
  });

  // When the server verifies moving to a new channel, this client will start emitting to that channel
  socket.on('current channel', function(data) {
    setCurrentChannel(data);
  });

  // When the server emits 'piece moved', move the piece locally
  socket.on('piece moved', function(data) {
    movePiece(data);
  });

  socket.on('rules changed', function(data) {
    rulesChange(data.newRuleNumber);
    // rulesChange(9);
  });

  socket.on('kill piece', function(data) {
    var x = data.xcoord,
      y = data.ycoord,
      match = allPiecesArray.filter(isPieceId);

    function isPieceId(element) {
      if (element.pieceId === data.pieceId) {
        return true;
      } else {
        return false;
      }
    }
    match[0].sprite.destroy();
    match[0].sprite.lifeStatus = 'dead';
    var explosionPiece = game.add.sprite(x, y, 'explosion');
    window.whooshSound.play();
    explosionPiece.height = 90;
    explosionPiece.animations.add('boom');
    window.whooshSound.play();
    explosionPiece.animations.play('boom', 20, false, true);
  });

  socket.on('player2 active', function() {
    console.log("PLAYER TWO ACTIVE");
    for (i = 0; i < blackPieces.length; i++) {
      blackPieces[i].sprite.input.draggable = true;
    }
  });

  socket.on('player1 active', function() {
    console.log("PLAYER ONE ACTIVE");
    for (i = 0; i < whitePieces.length; i++) {
      whitePieces[i].sprite.input.draggable = true;
    }
  });

  socket.on('player inactive', function() {
    console.log("player 1 inactive");
    for (i = 0; i < blackPieces.length; i++) {
      blackPieces[i].sprite.input.draggable = false;
    }
    for (i = 0; i < whitePieces.length; i++) {
      whitePieces[i].sprite.input.draggable = false;
    }
  });

  socket.on('setActivePlayerMessage', function(data) {
    $currentPlayerBox.text(data.currentplayer);
  })
  socket.on('gameOverMessage', function(){
    GameOver();
  })
});

