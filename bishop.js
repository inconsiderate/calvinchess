function Bishop(){
}

Bishop.prototype = new Piece();

Bishop.prototype.move = function(){
  this.sprite.events.onDragStop.add(this.bishopMove, this.sprite);
}
