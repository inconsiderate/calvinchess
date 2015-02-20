function makePawn(color, x, y){
  function pawnMove(item, pointer){
    if (Math.abs(item.originX - item.x) > 100 || item.originX != item.x) {
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    } else {
      item.originX = item.x;
      item.originY = item.y;
    }
  }

	if (color == "white") {
		pawn = game.add.sprite(x, y, 'wPawn');
  } else {
  	pawn = game.add.sprite(x, y, 'bPawn');
  }
  pawn.inputEnabled = true;
  pawn.input.enableDrag();
  pawn.input.enableSnap(100, 100, false, true, 5, 5);
  pawn.events.onDragStop.add(pawnMove, pawn);
  pawn.originX = pawn.x;
  pawn.originY = pawn.y;
  return pawn;
  console.log("pawn made!");
}