function King(){
}

King.prototype = new Piece();

King.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.kingMove, this.sprite);
}
