function Piece(game, color, xcoor, ycoor, piecename){
  this.game = game;
  this.color = color;
  this.sprite = null;
};

Piece.prototype.create = function(xcoor, ycoor, piecename, color) {
    // game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
    var x = (xcoor * 100) + 5;
    var y = (ycoor * 100) + 5;
    this.sprite = game.add.sprite(x, y, piecename);
    this.pieceId = piecename + xcoor //Math.floor(Math.random() * 1000);
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
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
    this.sprite.events.onDragStop.add(function(){
      piece.onBoard();
    })
}
// METHODS THAT ARE USED IN ALL PIECE MOVEMENTS

// Check if move is valid and if a kill occurs.
Piece.prototype.killAction = function (item, match) {
  console.log('inside the kill action');
  var piece = this;
  if (match.length > 0 && match[0].sprite.color === item.color){
    game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    return true
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
  console.log(item.sprite.x);
  console.log(item.sprite.y);
  console.log(item.pieceId);
  socket.emit('piece killed', {
    coordX: item.sprite.x,
    coordY: item.sprite.y,
    pieceId: item.pieceId
  });
}

Piece.prototype.resetOrigin = function(item, x, y, piece){
  if(item.originX != item.x || item.originY != item.y){
    item.counter++;
    console.log('Turn Count: ', turnCounter);
    turnCounter += 1;
    changeTurn();
  }
  item.originX = item.x;
  item.originY = item.y;
  piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
}

//King and Knight have the same movement validation.
Piece.prototype.kingKnightMoveValidation = function (item) {
  var piece = this;
  var match = allPiecesArray.filter(this.isPieceHere, this);
  var item = this.sprite
  if (piece.killAction(item, match) === true) {
    console.log('knight kill action');
  } else {
    piece.resetOrigin(item, item.x, item.y, piece);
  }
}

//Rook and Bishop have the same movement validation.
Piece.prototype.rookBishopMoveValidation = function (item) {
  var piece = this;
  var match = allPiecesArray.filter(this.isPieceHere, this);
  var between = allPiecesArray.filter(this.isPieceBetweenUpDown, this);
  if (piece.killAction(item, match) === true) {
    console.log('knight kill action');
  } else if (between.length > 0){
    game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
  } else {
    piece.resetOrigin(item, item.x, item.y, piece);
  }
}

Piece.prototype.onBoard = function() {

}

Piece.prototype.isPieceBetweenDiagonal = function (element, index, array, piece){
  var item = this.sprite
  if (item.x > item.originX && item.y > item.originY){
    for(var i = item.originX + 100, a = item.originY + 100; i < item.x; i += 100, a += 100){
      if(element.sprite.x === i && element.sprite.y === a && item != element.sprite && element.sprite.lifeStatus != 'dead'){
        return true;
      }
    }
  } if(item.x < item.originX && item.y < item.originY){
    for(var i = item.originX - 100, a = item.originY - 100; i > item.x; i -= 100, a -= 100){
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite && element.sprite.lifeStatus != 'dead'){
        return true;
      }
    }    
  } if (item.x > item.originX && item.y < item.originY){
    for(var i = item.originX + 100, a = item.originY - 100; i < item.x; i += 100, a -= 100){
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite && element.sprite.lifeStatus != 'dead'){
        return true;
      }
    }
  } if(item.x < item.originX && item.y > item.originY){
    for(var i = item.originX - 100, a = item.originY + 100; i > item.x; i -= 100, a += 100){
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite && element.sprite.lifeStatus != 'dead'){
        return true;
      }
    }
  } else {
    return false;
  }
}

Piece.prototype.isPieceHere = function(element){
  var item = this.sprite
  if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite && element.sprite.lifeStatus != 'dead'){
    return true
  } else {
    return false;
  }
}

Piece.prototype.sendServerCoord = function(originX, originY, pieceId){
  socket.emit('move piece', {
    xcoord:  originX,
    ycoord: originY,
    pieceId: pieceId,
  });
}

Piece.prototype.isPieceBetweenUpDown = function(element){
  var item = this.sprite
  if(element.sprite.x === item.x && item != element.sprite){
    for( i = item.originY + 100; i < item.y; i++){
      if(element.sprite.y === i){
        var betweenPiece = element;
        return true
      }
    }
    for( i = item.originY - 100; i > item.y; i--){
      if(element.sprite.y === i){
        var betweenPiece = element;
        return true
      }
    }

  } else if(element.sprite.y === item.y && item != element.sprite){
    for(i = item.originX + 100; i < item.x; i++){
      if(element.sprite.x === i){
        var betweenPiece = element;
        return true
      }
    }
    for (i = item.originX - 100; i > item.x; i--){
      if(element.sprite.x === i){
        var betweenPiece = element;
        return true
      }
    }
  }
}

/// FUN METHODS THAT CHANGE ALL THE RULES

Piece.prototype.teleport = function(){
    var item = this.sprite;
      function isPieceHere(element){
        if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite){
          return true
        } else {
          return false;
        }
      }
      var match = allPiecesArray.filter(isPieceHere);
      function valid(item) {
        if (match.length > 0 && match[0].sprite.color === item.color){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else if (match.length > 0 && match[0].sprite.color != item.color) {
          match[0].sprite.destroy();
          match[0].sprite.status = 'dead';
          item.originX = item.x;
          item.originY = item.y;
      
        } else {
          item.originX = item.x;
          item.originY = item.y;
        }
      }
      valid(item);
}

Piece.prototype.stuck = function(){
    var item = this.sprite;
    game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
}

Piece.prototype.sideways = function(){
  var item = this.sprite;
    // piece can only move on the x axis
  if(item.y != item.originY){
    game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
  } else {
    var match = allPiecesArray.filter(this.isPieceHere, this);
    function valid(item) {
      if (match.length > 0 && match[0].sprite.color === item.color){
        game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      } else if (match.length > 0 && match[0].sprite.color != item.color) {
        match[0].sprite.destroy();
        match[0].sprite.status = 'dead';
        item.originX = item.x;
        item.originY = item.y;
      } else {
        item.originX = item.x;
        item.originY = item.y;
      }
    }
    valid(item);
  }
}

Piece.prototype.vertical = function(){
  var item = this.sprite;
  // piece can only move on the x axis
  if(item.x != item.originX){
    game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
  } else {
    var match = allPiecesArray.filter(this.isPieceHere, this);
    function valid(item) {
      if (match.length > 0 && match[0].sprite.color === item.color){
        game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      } else if (match.length > 0 && match[0].sprite.color != item.color) {
        match[0].sprite.destroy();
        match[0].sprite.status = 'dead';
        item.originX = item.x;
        item.originY = item.y;
      } else {
        item.originX = item.x;
        item.originY = item.y;
      }
    }
    valid(item);
  }
}

Piece.prototype.deletePawns = function(){
  // check to see if the other player can see this happen 
  var match = allPiecesArray.filter(isPawn);
  function isPawn(element){
    if(element instanceof Pawn){
      return true;
    } else {
      return false;
    }
  }
  if(match.length > 0){
    for(i = 0; i < match.length; i++ ){
      match[i].sprite.destroy();
      match[i].sprite.lifeStatus = 'dead';
    }
  }
}

Piece.prototype.deletePieces = function(pieceType){
  var match = allPiecesArray.filter(isPiece);
  function isPiece(element){
    if(element instanceof pieceType){
      return true;
    } else {
      return false;
    }
  }
  if(match.length > 0){
    for(i = 0; i < match.length; i++ ){
      match[i].sprite.destroy();
    }
  }
}