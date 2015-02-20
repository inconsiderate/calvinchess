

b2Rook = game.add.sprite(5, 5, 'b2Rook');
b2Rook.inputEnabled = true;
b2Rook.input.enableDrag();
b2Rook.input.enableSnap(100, 100, false, true, 5, 5);
b2Rook.events.onDragStop.add(rookMove, this);
b2Rook.originX = b2Rook.x;
b2Rook.originY = b2Rook.y;
allPieces.add(b2Rook);