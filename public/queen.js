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
      var betweenDiagonal = allPiecesArray.filter(this.isPieceBetweenDiagonal, this);
      var betweenLateral = allPiecesArray.filter(this.isPieceBetweenUpDown, this);
      valid(item);
    //   
    function valid(item){
      if(match.length > 0 && match[0].sprite.color != item.color){
        piece.killAction(item, match[0]);
        piece.resetOrigin(item, item.x, item.y, piece);
        } else if (betweenDiagonal.length > 0 && xRatio === xRatio) {
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else if (betweenLateral.length > 0 && item.originX === item.x || betweenLateral.length > 0 && item.originY === item.y) {
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else {
          piece.resetOrigin(item, item.x, item.y, piece);
        }
      }
    } else {
     game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
   }
};

Queen.prototype.move = Queen.prototype.default_move;

Queen.prototype.onBoard = Queen.prototype.onBoard;
