function Rook(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

Rook.prototype = new Piece();

Rook.prototype.default_move = function() {
  var piece = this;
  var item = this.sprite;
  if (item.originX != item.x && item.originY != item.y){
    game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
  }
  else {
    this.rookMoveValidation(item);
  };
}

Rook.prototype.move = Rook.prototype.default_move;