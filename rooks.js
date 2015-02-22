function Rook(){

}

Rook.prototype = new Piece();

Rook.prototype.move = function(){
  this.sprite.events.onDragStop.add(this.rookMove, this.sprite);
}

