function makeRook(color, x, y){
	
	function rookMove(item, pointer){
      if (item.originX != item.x && item.originY != item.y){
        game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      	console.log("rook is moving back1");
      }
        else {
          item.originX = item.x;
          item.originY = item.y;
        }
    }

	if (color == 'white') {
		rook = game.add.sprite(x, y, 'wRook');
	} else {
		rook = game.add.sprite(x, y, 'bRook');
	}
  rook.inputEnabled = true;
  rook.input.enableDrag();
  rook.input.enableSnap(100, 100, false, true, 5, 5);
  rook.events.onDragStop.add(rookMove, this);
  rook.originX = rook.x;
  rook.originY = rook.y;
  return rook;
}



