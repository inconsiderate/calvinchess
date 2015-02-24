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
}
/// method for bishops and queens to check if diagonal movement is valid
Piece.prototype.isPieceBetweenDiagonal = function (element, index, array, piece){
  var item = this.sprite
  if (item.x > item.originX && item.y > item.originY){
    for(var i = item.originX + 100, a = item.originY + 100; i < item.x; i += 100, a += 100){
      if(element.sprite.x === i && element.sprite.y === a && item != element.sprite){
        return true;
      }
    }
  } if(item.x < item.originX && item.y < item.originY){
    for(var i = item.originX - 100, a = item.originY - 100; i > item.x; i -= 100, a -= 100){
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite){
        return true;
      }
    }    
  } if (item.x > item.originX && item.y < item.originY){
    for(var i = item.originX + 100, a = item.originY - 100; i < item.x; i += 100, a -= 100){
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite){
        return true;
      }
    }
  } if(item.x < item.originX && item.y > item.originY){
    for(var i = item.originX - 100, a = item.originY + 100; i > item.x; i -= 100, a += 100){
      if (element.sprite.x === i && element.sprite.y === a && item != element.sprite){
        return true;
      }
    }
  } else {
    return false;
  }
}

Piece.prototype.isPieceHere = function(element){
  var item = this.sprite
  if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite){
    return true
  } else {
    return false;
  }
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

/// methods to switch the rules ; 
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
}

Piece.prototype.vertical = function(){
    var item = this.sprite;
    // piece can only move on the x axis
    if(item.x != item.originX){
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    } else {
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
}

Piece.prototype.deletePawns = function(){
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
    }
  }
}

Piece.prototype.deletePieces = function(pieceType){
  // call this function like: wQueen.move = Piece.prototype.deletePieces(Knight);
  // OR wQueen.move = Piece.prototype.deletePieces;
  // Queen.move(Knight);

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








