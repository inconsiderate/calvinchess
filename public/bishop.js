function Bishop(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

Bishop.prototype = new Piece();

Bishop.prototype.default_move = function() {
  var piece = this;
	var item = this.sprite;
	if (item.originX === item.x || item.originY === item.y){
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    } else {
      var match = allPiecesArray.filter(this.isPieceHere, this);
      var between = allPiecesArray.filter(this.isPieceBetweenDiagonal, this);
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
        } else if(between.length > 0){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else {
          item.originX = item.x;
          item.originY = item.y;
          // After moving, tell server that a piece has been moved.
          piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
        }
      }
      valid(item);
    }
  };
Bishop.prototype.move = Bishop.prototype.default_move;

