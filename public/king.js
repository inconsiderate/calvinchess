function King(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

King.prototype = new Piece();

King.prototype.default_move = function() {
	var item = this.sprite;
	if (Math.abs(item.originX - item.x) > 100 || Math.abs(item.originY - item.y) > 100) {
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    } else {
      function isPieceHere(element){
        if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite){
            return true
          } else {
            return false;
          }
      } // <-- end of isHere function
      var match = allPiecesArray.filter(isPieceHere);
      function valid(item) {
        if (match.length > 0 && match[0].sprite.color === item.color){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else if (match.length > 0 && match[0].sprite.color != item.color) {
          match[0].sprite.destroy();
          match[0].sprite.lifeStatus = 'dead';
          item.originX = item.x;
          item.originY = item.y;
        } else {
          item.originX = item.x;
          item.originY = item.y;
        }
      }
      valid(item);
    }
  };
King.prototype.move = King.prototype.default_move;

