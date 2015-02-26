function Pawn(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

Pawn.prototype = new Piece();

Pawn.prototype.default_move = function() {
	var piece = this;
	var item = this.sprite;
	var xRatio = Math.abs(item.x - item.originX);
	var yRatio = Math.abs(item.y - item.originY);
	if(Math.abs(item.originY - item.y) > 100 || Math.abs(item.originX - item.x) > 100) {
		if(item.counter > 0 || xRatio > 1){
			game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
		} else if(yRatio > 200 || xRatio > 200){
			game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
		} else {
			piece.resetOrigin(item, item.x, item.y, piece);
		}
	} else if(item.color === 'black' && item.y < item.originY){
		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
	} else if(item.color === 'white' && item.y > item.originY){
		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
	} else {
      var match = allPiecesArray.filter(this.isPieceHere, this);
      function valid(item) {
      	if (match.length > 0 && item.x === item.originX){
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else if (match.length === 0 && item.x != item.originX) {
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else if (match.length > 0 && match[0].sprite.color != item.color && xRatio === yRatio) {
          piece.killAction(item, match);
      		piece.resetOrigin(item, item.x, item.y, piece);

      	} else if (match.length > 0 && item.x != item.originX){
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else {
      		piece.resetOrigin(item, item.x, item.y, piece);
      	}
      }
      valid(item);
    }
  };
Pawn.prototype.move = Pawn.prototype.default_move;

