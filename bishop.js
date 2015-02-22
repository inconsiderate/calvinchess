function Bishop(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, game);
}

Bishop.prototype = new Piece();

Bishop.prototype.move = function(){
  this.sprite.events.onDragStop.add(this.bishopMove, this.sprite);
}
