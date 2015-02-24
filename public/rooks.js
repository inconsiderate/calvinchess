function Rook(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

Rook.prototype = new Piece();

Rook.prototype.default_move = function() {
	var item = this.sprite;
	if (item.originX != item.x && item.originY != item.y){
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    }
    else {
      function isPieceHere(element){
        if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite){
            return true
          } else {
            return false;
          }
      } // <-- end of isHere function
      function isPieceBetween(element){
        // refactor take this piece out 
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
      var match = allPiecesArray.filter(isPieceHere);
      var between = allPiecesArray.filter(isPieceBetween);
      function valid(item) {
        if (match.length > 0 && match[0].sprite.color === item.color){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else if (match.length > 0 && match[0].sprite.color != item.color) {
          match[0].sprite.destroy();
          match[0].sprite.lifeStatus = 'dead';
          item.originX = item.x;
          item.originY = item.y;
        } else if (between.length > 0){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        }else {
          item.originX = item.x;
          item.originY = item.y;
        }
      }
    valid(item);
  };
 }
Rook.prototype.move = Rook.prototype.default_move;

