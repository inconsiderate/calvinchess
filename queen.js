function Piece(game, color, xcoor, ycoor, piecename){
  this.game = game;
  this.color = color;
  this.sprite = null;
  // this.create(xcoor, ycoor, piecename);
// add function that will call 'create' in the 
}

Piece.prototype = {
  create: function(xcoor, ycoor, piecename) {
    var x = (xcoor * 100) + 5;
    var y = (ycoor * 100) + 5;
    this.sprite = game.add.sprite(x, y, piecename);
    this.sprite.inputEnabled = true;
    this.sprite.input.enableDrag();
    // want to set this method in each individual sub class of piece 
    this.move(); 
    this.sprite.height = 90;
    this.sprite.width = 90;
    this.sprite.input.enableSnap(100, 100, false, true, 5, 5);
    this.sprite.originX = x;
    this.sprite.originY = y;
  }, updateMove: function(rule, item){
      console.log(rule);
      console.log(this.sprite);
      this.sprite.events.onDragStop.add(this.rule(), this);
  },
  rookMove: function(item, pointer){
    console.log(item.originX);
    if (item.originX != item.x && item.originY != item.y){
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
      console.log("rook is moving back.");
    }
    else {
      item.originX = item.x;
      item.originY = item.y;
    }
  },
  kingMove: function(item, pointer){
    if (Math.abs(item.originX - item.x) > 100 || Math.abs(item.originY - item.y) > 100) {
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    } else {
      item.originX = item.x;
      item.originY = item.y;
    }
  },
  move: function(){
    this.sprite.events.onDragStop.add(this.rookMove, this.sprite);
  }, 
  knightMove: function(item, pointer){
    if((Math.abs(item.originX - item.x) === 200 && Math.abs(item.originY - item.y) === 100 )|| (Math.abs(item.originX - item.x) === 100 && Math.abs(item.originY - item.y) === 200)){
      item.originX = item.x;
      item.originY = item.y;
    }else{
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    }
  },
  pawnMove: function(item, pointer){
    if (Math.abs(item.originY - item.y) > 100 || item.originX != item.x) {
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    } else {
      item.originX = item.x;
      item.originY = item.y;
    }
  }, 
  bishopMove: function(item, pointer){
    if (item.originX === item.x || item.originY === item.y){
      game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
    }else{
      item.originX = item.x;
      item.originY = item.y;
    }
  },

}
function Queen(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, game);
}
Queen.prototype = new Piece();

Queen.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.kingMove, this.sprite);
}
