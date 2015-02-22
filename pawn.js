function Pawn(){
}

Pawn.prototype = new Piece();

Pawn.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.pawnMove, this.sprite);
}
