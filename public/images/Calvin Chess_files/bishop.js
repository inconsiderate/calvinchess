function Bishop(game, color, xcoor, ycoor, pieceName) {
  this.create(xcoor, ycoor, pieceName, color);
}

Bishop.prototype = new Piece();

Bishop.prototype.default_move = function() {
  var piece = this;
  var item = this.sprite;
  if (Math.abs(item.originX - item.x) != Math.abs(item.originY - item.y)) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else {
    this.BishopMoveValidation(item);
  }
};

Bishop.prototype.move = Bishop.prototype.default_move;
