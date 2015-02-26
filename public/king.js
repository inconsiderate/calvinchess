function King(game, color, xcoor, ycoor, pieceName) {
  this.create(xcoor, ycoor, pieceName, color);
}

King.prototype = new Piece();

King.prototype.default_move = function() {
  var item = this.sprite;
  if (Math.abs(item.originX - item.x) > 100 || Math.abs(item.originY - item.y) > 100) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else {
    if (item.x === item.originX && item.y === item.originY) {
      return true;
    } else {
      piece.resetOrigin(item, item.x, item.y, piece);
    }
  }
};

King.prototype.move = King.prototype.default_move;
