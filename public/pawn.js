function Pawn(game, color, xcoor, ycoor, pieceName) {
  this.create(xcoor, ycoor, pieceName, color);
}

Pawn.prototype = new Piece();

Pawn.prototype.default_move = function() {
  var piece = this;
  var item = this.sprite;
  var xRatio = Math.abs(item.x - item.originX);
  var yRatio = Math.abs(item.y - item.originY);
  if (Math.abs(item.originY - item.y) > adjustDistance(1) || Math.abs(item.originX - item.x) > adjustDistance(1)) {
    if (item.counter > 0 || xRatio > 1) {
      game.add.tween(item).to({
        x: item.originX,
        y: item.originY
      }, 400, Phaser.Easing.Back.Out, true);
    } else if (yRatio > adjustDistance(2) || xRatio > adjustDistance(2)) {
      game.add.tween(item).to({
        x: item.originX,
        y: item.originY
      }, 400, Phaser.Easing.Back.Out, true);
    } else {
        var match = allPiecesArray.filter(this.isPieceHere, this);
        valid(item);
      // this is causing a problem when you move two spaces and something is in the space
      // it does not bounce away, but rather sits on top of the other
      // TO DO : fix above bug
    }
    // below if statements check for the color of the pawn - ensures they can not move backwards
  } else if (item.color === 'black' && item.y < item.originY) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else if (item.color === 'white' && item.y > item.originY) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else {
    var match = allPiecesArray.filter(this.isPieceHere, this);

    function valid(item) {
      if (match.length > 0 && item.x === item.originX) {
        game.add.tween(item).to({
          x: item.originX,
          y: item.originY
        }, 400, Phaser.Easing.Back.Out, true);
      } else if (match.length === 0 && item.x != item.originX) {
        game.add.tween(item).to({
          x: item.originX,
          y: item.originY
        }, 400, Phaser.Easing.Back.Out, true);
      } else if (match.length > 0 && match[0].sprite.color != item.color && xRatio === yRatio) {
        piece.killAction(item, match);
      } else if (match.length > 0 && item.x != item.originX) {
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
    }
    valid(item);
  }
};
Pawn.prototype.move = Pawn.prototype.default_move;
