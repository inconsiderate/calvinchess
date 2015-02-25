function Queen(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}
Queen.prototype = new Piece();

Queen.prototype.default_move = function() {
  var piece = this;
  var item = this.sprite;
  var xRatio = Math.abs(item.originX - item.x);
  var yRatio = Math.abs(item.originY - item.y);
    /// check to see if the move was diagonal or lateral movement
    if(xRatio === yRatio || item.originX === item.x || item.originY === item.y){
      var match = allPiecesArray.filter(this.isPieceHere, this);
      console.log(match);
      var betweenDiagonal = allPiecesArray.filter(this.isPieceBetweenDiagonal, this);
      var betweenLateral = allPiecesArray.filter(this.isPieceBetweenUpDown, this);
      valid(item);
    //   
    function valid(item){
      if(match.length > 0 && match[0].sprite.color != item.color){
        match[0].sprite.destroy();
         // make sure the game knows the piece is dead 
        match[0].sprite.lifeStatus = 'dead';
        item.originX = item.x;
        item.originY = item.y;
          // After moving, tell server that a piece has been moved.
        piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
        } else if (betweenDiagonal.length > 0 && xRatio === xRatio) {
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else if (betweenLateral.length > 0 && item.originX === item.x || betweenLateral.length > 0 && item.originY === item.y) {
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else {
          item.originX = item.x;
          item.originY = item.y;
          // After moving, tell server that a piece has been moved.
          piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
        }
      }
    } else {
     game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
   }
};

Queen.prototype.move = Queen.prototype.default_move;
