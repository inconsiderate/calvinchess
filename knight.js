

function Knight(){
}

Knight.prototype = new Piece();

Knight.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.knightMove, this.sprite);
}
