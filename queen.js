function makeQueen(color, x, y){
  function queenMove(item, pointer){

  }

	if (color == "white") {
		queen = game.add.sprite(x, y, 'wQueen');
  } else {
  	queen = game.add.sprite(x,y, 'bQueen');
  }
  queen.inputEnabled = true;
  queen.input.enableDrag();
  queen.input.enableSnap(100, 100, false, true, 5, 5);
  // queen.events.onDragStop.add(queenMove, queen);
  queen.originX = queen.x;
  queen.originY = queen.y;

  return queen
}