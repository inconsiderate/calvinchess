function Pawn(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

Pawn.prototype = new Piece();

Pawn.prototype.default_move = function() {
	var piece = this;
	var item = this.sprite;
	var xRatio = Math.abs(item.x - item.originX);
	var yRatio = Math.abs(item.y - item.originY);
	if (Math.abs(item.originY - item.y) > 100 || Math.abs(item.originX - item.x) > 100) {
		if(item.counter > 0 || xRatio > 1){
			game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
		} else if((Math.abs(item.originY - item.y) > 200 || Math.abs(item.originX - item.x) > 200)){
			game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
		}else {
			item.counter++;
			item.originX = item.x;
			item.originY = item.y;
			// After moving, tell server that a piece has been moved.
			piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
		}
	} else if(item.color === 'black' && item.y < item.originY){
		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
	} else if(item.color === 'white' && item.y > item.originY){
		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
	}else {
      var match = allPiecesArray.filter(this.isPieceHere, this);
      function valid(item) {
      	if (match.length > 0 && item.x === item.originX){
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else if (match.length === 0 && item.x != item.originX) {
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else if (match.length > 0 && match[0].sprite.color != item.color && xRatio === yRatio) {
      		match[0].sprite.destroy();
      		match[0].sprite.lifeStatus = 'dead';
      		item.counter++;
      		item.originX = item.x;
      		item.originY = item.y;
      		piece.sendServerCoord(item.originX, item.originY, piece.pieceId);

      	} else if (match.length > 0 && item.x != item.originX){
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else {
      		item.counter++;
      		item.originX = item.x;
      		item.originY = item.y;
      		piece.sendServerCoord(item.originX, item.originY, piece.pieceId);
      	}
      }
      valid(item);
    }
  };
Pawn.prototype.move = Pawn.prototype.default_move;

