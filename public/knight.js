function Knight(game, color, xcoor, ycoor, pieceName) {
  this.create(xcoor, ycoor, pieceName, color);
}

Knight.prototype = new Piece();

Knight.prototype.default_move = function() {
  var piece = this;
  var item = this.sprite;

  if ((Math.abs(item.originX - item.x) === 200 && Math.abs(item.originY - item.y) === 100) || (Math.abs(item.originX - item.x) === 100 && Math.abs(item.originY - item.y) === 200)) {
    this.kingKnightMoveValidation(item);
  } else {
    if (item.x === item.originX && item.y === item.originY) {
      return true;
    } else {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
    }
  }
};
Knight.prototype.move = Knight.prototype.default_move;
