function Pawn(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}


Pawn.prototype = new Piece();

Pawn.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.pawnMove, this.sprite);
}
