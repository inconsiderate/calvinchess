function Rook(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}


Rook.prototype = new Piece();

Rook.prototype.move = function(){
 this.move = this.sprite.events.onDragStop.add(this.rookMove, this.sprite);
}

Rook.prototype.change = function() {
  this.move = this.sprite.events.onDragStop.add(this.pawnMove, this.sprite);
  console.log("Rook.change was called!");
}