function makeKing(color, x, y){
  function kingMove(item, pointer){
      if (Math.abs(item.originX - item.x) > 100 || Math.abs(item.originY - item.y) > 100) {
        game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      } else {
        item.originX = item.x;
        item.originY = item.y;
      }
    }

	if (color == "white") {
		king = game.add.sprite(x, y, 'wking');
  } else {
  	king = game.add.sprite(x,y, 'bking');
  }
  king.inputEnabled = true;
  king.input.enableDrag();
  king.input.enableSnap(100, 100, false, true, 5, 5);
  king.events.onDragStop.add(kingMove ,king);
  king.originX = king.x;
  king.originY = king.y;
  return king
}