function Knight(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, game);
}

Knight.prototype = new Piece();

Knight.prototype.move = function(){
  console.log();
  this.move = this.sprite.events.onDragStop.add(this.knightMove, this.sprite);
}
