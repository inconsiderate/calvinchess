function Queen(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}
Queen.prototype = new Piece();

Queen.prototype.default_move = function() {
	var item = this.sprite;

	var xRatio = Math.abs(item.originX - item.x);
    var yRatio = Math.abs(item.originY - item.y);
    if(xRatio === yRatio || item.originX === item.x || item.originY === item.y){
      function isPieceHere(element){
        if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite){
          return true
        } else {
          return false;
        }
      } // <-- end of isHere function
      function isPieceBetween(element){
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
        }
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
          match[0].sprite.status = 'dead';
          item.originX = item.x;
          item.originY = item.y;
        } else if(between.length > 0){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else {
          item.originX = item.x;
          item.originY = item.y;
        }
      }
      valid(item);
    } else {
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    }
};
Queen.prototype.move = Queen.prototype.default_move;
