function Bishop(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

Bishop.prototype = new Piece();

Bishop.prototype.default_move = function() {
	var item = this.sprite;
	if (item.originX === item.x || item.originY === item.y){
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    } else {
      function isPieceHere(element){
        if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite){
            return true
          } else {
            return false;
          }
      } // <-- end of isPieceHere function
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
        } else if(between.length > 0){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else {
          item.originX = item.x;
          item.originY = item.y;
        }
      }
      valid(item);
    }
  };
Bishop.prototype.move = Bishop.prototype.default_move;

