function Knight(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

Knight.prototype = new Piece();

Knight.prototype.default_move = function() {
  var piece = this;
  var item = this.sprite;

  if((Math.abs(item.originX - item.x) === 200 && Math.abs(item.originY - item.y) === 100 )|| (Math.abs(item.originX - item.x) === 100 && Math.abs(item.originY - item.y) === 200)){
      var match = allPiecesArray.filter(this.isPieceHere, this);
      function valid(item) {
        if (match.length > 0 && match[0].sprite.color === item.color){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else if (match.length > 0 && match[0].sprite.color != item.color) {
          match[0].sprite.destroy();
          match[0].sprite.lifeStatus = 'dead';
          item.originX = item.x;
          item.originY = item.y;
          // After moving, tell server that a piece has been moved.
          piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
        } else {
          item.originX = item.x;
          item.originY = item.y;
          // After moving, tell server that a piece has been moved.
          piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
        }
      }
      valid(item);
    } else {
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    }
  };
Knight.prototype.move = Knight.prototype.default_move;