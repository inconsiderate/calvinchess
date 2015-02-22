function King(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);

}

King.prototype = new Piece();

King.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.kingMove, this.sprite);
}
