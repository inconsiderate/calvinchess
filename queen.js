function Queen(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}
Queen.prototype = new Piece();

Queen.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.queenMove, this.sprite);
}