function Pawn(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}

Pawn.prototype = new Piece();

Pawn.prototype.default_move = function() {
	var item = this.sprite;

	console.log(item.counter);
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
		}
	} else if(item.color === 'black' && item.y < item.originY){
		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
	} else if(item.color === 'white' && item.y > item.originY){
		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
	}else {
		function isPieceHere(element){
			if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite){
				return true
			} else {
				return false;
			}
      } // <-- end of isHere function
      var match = allPiecesArray.filter(isPieceHere);
      function valid(item) {
      	if (match.length > 0 && item.x === item.originX){
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else if (match.length === 0 && item.x != item.originX) {
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else if (match.length > 0 && match[0].sprite.color != item.color && xRatio === yRatio) {
      		match[0].sprite.destroy();
      		match[0].sprite.status = 'dead';
      		item.counter++;
      		item.originX = item.x;
      		item.originY = item.y;

      	} else if (match.length > 0 && item.x != item.originX){
      		game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	} else {
      		item.counter++;
      		item.originX = item.x;
      		item.originY = item.y;
      	}
      }
      valid(item);
    }
  };
Pawn.prototype.move = Pawn.prototype.default_move;

