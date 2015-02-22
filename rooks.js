function Rook(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}


Rook.prototype = new Piece();

Rook.prototype.constructor = Piece;

Rook.prototype.move = function(){
  this.sprite.events.onDragStop.add(this.rookMove, this.sprite);
}

