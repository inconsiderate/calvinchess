function makeBishop(color, x, y){
    function bishopMove(item, pointer){
      if (item.originX === item.x || item.originY === item.y){
        game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
  
      }else{
        item.originX = item.x;
        item.originY = item.y;
      }
    }

	if (color == "white") {
		bishop = game.add.sprite(x, y, 'wbishop');
  } else {
  	bishop = game.add.sprite(x,y, 'bbishop');
  }
  bishop.inputEnabled = true;
  bishop.input.enableDrag();
  bishop.input.enableSnap(100, 100, false, true, 5, 5);
  bishop.events.onDragStop.add(bishopMove ,bishop);
  bishop.originX = bishop.x;
  bishop.originY = bishop.y;
  return bishop
}