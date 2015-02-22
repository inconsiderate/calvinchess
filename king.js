function King(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, game);

}

King.prototype = new Piece();

King.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.kingMove, this.sprite);
}
