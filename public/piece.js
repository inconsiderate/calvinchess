function Piece(game, color, xcoor, ycoor, piecename) {
  this.game = game;
  this.color = color;
  this.sprite = null;
};

Piece.prototype.create = function(xcoor, ycoor, piecename, color) {
    var x = (xcoor * 100) + 5;
    var y = (ycoor * 100) + 5;
    this.sprite = game.add.sprite(x, y, piecename);
    this.pieceId = piecename + xcoor //Math.floor(Math.random() * 1000);
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
    this.sprite.input.draggable = false;

    this.sprite.height = 90;
    this.sprite.width = 90;
    this.sprite.input.enableSnap(100, 100, false, true, 5, 5);
    this.sprite.originX = x;
    this.sprite.originY = y;
    this.sprite.color = color;
    this.sprite.lifeStatus = 'alive';
    this.sprite.counter = 0;
    var piece = this;
    this.sprite.events.onDragStop.add(function() {
      piece.move();
    });
    this.sprite.events.onDragStop.add(function() {
      piece.onBoard();
    })
  }
  // METHODS THAT ARE USED IN ALL PIECE MOVEMENTS

// Check if move is valid, and if a kill occurs, and send off to server.
Piece.prototype.killAction = function(item, match) {
  var piece = this;
  if (match.length > 0 && match[0].sprite.color === item.color) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
    return false
  } else if (match.length > 0 && match[0].sprite.color != item.color) {
    piece.sendServerKill(match[0]);
    match[0].sprite.destroy();
    match[0].sprite.lifeStatus = 'dead';

    var explosionPiece = game.add.sprite(match[0].sprite.originX, match[0].sprite.originY, 'explosion');
    explosionPiece.height = 90;
    explosionPiece.animations.add('boom');
    explosionPiece.animations.play('boom', 20, false, true);
    piece.resetOrigin(item, item.x, item.y, piece);
    return true
  }
  return false
}

Piece.prototype.sendServerKill = function(item) {
  socket.emit('piece killed', {
    channel: window.CHANNEL,
    coordX: item.sprite.x,
    coordY: item.sprite.y,
    pieceId: item.pieceId
  });
}

Piece.prototype.resetOrigin = function(item, x, y, piece) {
  if (item.originX != item.x || item.originY != item.y) {
    item.counter++;
    console.log(item.counter);
  }
  item.originX = item.x;
  item.originY = item.y;
  console.log('reset origin');
  piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
}

//King and Knight have the same movement validation.
Piece.prototype.kingKnightMoveValidation = function(item) {
  var piece = this;
  var match = allPiecesArray.filter(this.isPieceHere, this);
  var item = this.sprite
  if (piece.killAction(item, match) === true) {} else {
    piece.resetOrigin(item, item.x, item.y, piece);
  }
}

Piece.prototype.canCastle = function(item){
  function moveToNewPlace(item, x, y) {
    item.sprite.x = x;
    item.sprite.y = y;
    item.sprite.originX = x;
    item.sprite.originY = y;
    game.add.tween(item.sprite).to({x: x, y: y}, 400, Phaser.Easing.Back.Out, true);
    item.resetOrigin(item.sprite, item.x, item.y, item);
  }  
  if (this.pieceId === 'bRook7') {
    moveToNewPlace(this, 405, 5);
    moveToNewPlace(item, 505, 5);
  } else if(this.pieceId === 'brook0') {
    moveToNewPlace(this, 305, 5);
    moveToNewPlace(item, 205, 5);
  } else if(this.pieceId === 'wRook0') {
    moveToNewPlace(this, 405, 705);
    moveToNewPlace(item, 505, 705);
  } else if(this.pieceId === 'wRook7') {
    moveToNewPlace(this, 305, 705);
    moveToNewPlace(item, 205, 705);
  }
}

Piece.prototype.rookMoveValidation = function(item) {
  var piece = this;
  var match = allPiecesArray.filter(this.isPieceHere, this);
  var between = allPiecesArray.filter(this.isPieceBetweenUpDown, this);
  //TODO: perhaps factor out into validator class instead??
  
  if (piece.killAction(item, match) === true) {
  } else if (match.length > 0) {
    if (item.counter === 0 && match[0] instanceof King) {
      piece.canCastle(match[0]);
    } else {
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    }
  } else {
    if (item.x === item.originX && item.y === item.originY) {
      return true;
    } else {
      piece.resetOrigin(item, item.x, item.y, piece);
    }
  }
}

Piece.prototype.BishopMoveValidation = function(item) {
  var piece = this;
  var match = allPiecesArray.filter(this.isPieceHere, this);
  var between = allPiecesArray.filter(this.isPieceBetweenDiagonal, this);
  if (piece.killAction(item, match) === true) {
    console.log('knight kill action');
  } else if (between.length > 0) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else {
    if (item.x === item.originX && item.y === item.originY) {
      return true;
    } else {
      piece.resetOrigin(item, item.x, item.y, piece);
    }
  }
}

Piece.prototype.onBoard = function() {

}

Piece.prototype.isPieceBetweenDiagonal = function(element, index, array, piece) {
  var item = this.sprite
  if (item.x > item.originX && item.y > item.originY) {
    for (var i = item.originX + 100, a = item.originY + 100; i < item.x; i += 100, a += 100) {
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite && element.sprite.lifeStatus != 'dead') {
        return true;
      }
    }
  }
  if (item.x < item.originX && item.y < item.originY) {
    for (var i = item.originX - 100, a = item.originY - 100; i > item.x; i -= 100, a -= 100) {
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite && element.sprite.lifeStatus != 'dead') {
        return true;
      }
    }
  }
  if (item.x > item.originX && item.y < item.originY) {
    for (var i = item.originX + 100, a = item.originY - 100; i < item.x; i += 100, a -= 100) {
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite && element.sprite.lifeStatus != 'dead') {
        return true;
      }
    }
  }
  if (item.x < item.originX && item.y > item.originY) {
    for (var i = item.originX - 100, a = item.originY + 100; i > item.x; i -= 100, a += 100) {
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite && element.sprite.lifeStatus != 'dead') {
        return true;
      }
    }
  } else {
    return false;
  }
}

Piece.prototype.isPieceHere = function(element) {
  var item = this.sprite
  if (element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite && element.sprite.lifeStatus != 'dead') {
    return true
  } else {
    return false;
  }
}

Piece.prototype.sendServerCoord = function(originX, originY, pieceId) {
  socket.emit('move piece', {
    channel: window.CHANNEL,
    xcoord: originX,
    ycoord: originY,
    pieceId: pieceId,
  });
}

Piece.prototype.isPieceBetweenUpDown = function(element) {
  var item = this.sprite
  if (element.sprite.x === item.x && item != element.sprite) {
    for (i = item.originY + 100; i < item.y; i++) {
      if (element.sprite.y === i) {
        var betweenPiece = element;
        return true
      }
    }
    for (i = item.originY - 100; i > item.y; i--) {
      if (element.sprite.y === i) {
        var betweenPiece = element;
        return true
      }
    }

  } else if (element.sprite.y === item.y && item != element.sprite) {
    for (i = item.originX + 100; i < item.x; i++) {
      if (element.sprite.x === i) {
        var betweenPiece = element;
        return true
      }
    }
    for (i = item.originX - 100; i > item.x; i--) {
      if (element.sprite.x === i) {
        var betweenPiece = element;
        return true
      }
    }
  } else {
    return false
  }
}

/// FUN METHODS THAT CHANGE ALL THE RULES

Piece.prototype.teleport = function() {
  var item = this.sprite;

  function isPieceHere(element) {
    if (element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite) {
      return true
    } else {
      return false;
    }
  }
  var match = allPiecesArray.filter(isPieceHere);

  function valid(item) {
    if (match.length > 0 && match[0].sprite.color === item.color) {
      game.add.tween(item).to({
        x: item.originX,
        y: item.originY
      }, 400, Phaser.Easing.Back.Out, true);
    } else if (match.length > 0 && match[0].sprite.color != item.color) {
      piece.killAction(item, match);
      piece.resetOrigin(item, item.x, item.y, piece);
    } else {
      piece.resetOrigin(item, item.x, item.y, piece);
    }
  }
  valid(item);
}

Piece.prototype.stuck = function() {
  var item = this.sprite;
  game.add.tween(item).to({
    x: item.originX,
    y: item.originY
  }, 400, Phaser.Easing.Back.Out, true);
}

Piece.prototype.sideways = function() {
  var item = this.sprite;
  // piece can only move on the x axis
  if (item.y != item.originY) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else {
    var match = allPiecesArray.filter(this.isPieceHere, this);

    function valid(item) {
      if (match.length > 0 && match[0].sprite.color === item.color) {
        game.add.tween(item).to({
          x: item.originX,
          y: item.originY
        }, 400, Phaser.Easing.Back.Out, true);
      } else if (match.length > 0 && match[0].sprite.color != item.color) {
        piece.killAction(item, match);
        piece.resetOrigin(item, item.x, item.y, piece);
      } else {
        piece.resetOrigin(item, item.x, item.y, piece);
      }
    }
    valid(item);
  }
}

Piece.prototype.vertical = function() {
  var item = this.sprite;
  // piece can only move on the x axis
  if (item.x != item.originX) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else {
    var match = allPiecesArray.filter(this.isPieceHere, this);

    function valid(item) {
      if (match.length > 0 && match[0].sprite.color === item.color) {
        game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      } else if (match.length > 0 && match[0].sprite.color != item.color) {
        piece.killAction(item, match);
        piece.resetOrigin(item, item.x, item.y, piece);
      } else {
        piece.resetOrigin(item, item.x, item.y, piece);
      }
    }
    valid(item);
  }
}

Piece.prototype.deletePiece = function(Piece) {
  // check to see if the other player can see this happen 
  var match = allPiecesArray.filter(isPawn);

  function isPawn(element) {
      if (element instanceof Piece) {
        return true;
      } else {
        return false;
      }
    }
  if (match.length > 0) {
    for (i = 0; i < match.length; i++) {
      piece.sendServerKill(match[i]);
      match[i].sprite.destroy();
      match[i].sprite.lifeStatus = 'dead';
    }
  }
}
