function Piece(game, color, xcoor, ycoor, piecename){
  this.game = game;
  this.color = color;
  this.sprite = null;
};

Piece.prototype.create = function(xcoor, ycoor, piecename, color) {
    var x = (xcoor * 100) + 5;
    var y = (ycoor * 100) + 5;
    this.sprite = game.add.sprite(x, y, piecename);
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
    this.sprite.height = 90;
    this.sprite.width = 90;
    this.sprite.input.enableSnap(100, 100, false, true, 5, 5);
    this.sprite.originX = x;
    this.sprite.originY = y;
    this.sprite.color = color;
    this.sprite.status = 'alive';
    this.sprite.counter = 0; 
    var piece = this;
    this.sprite.events.onDragStop.add(function() {
      piece.move();
    });
}