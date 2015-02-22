function Piece(game, color, xcoor, ycoor, piecename){
  this.game = game;
  this.color = color;
  this.sprite = null;
  // this.create(xcoor, ycoor, piecename);
// add function that will call 'create' in the 
}

Piece.prototype = {
  create: function(xcoor, ycoor, piecename, color) {
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
    this.sprite.color = color;
    // this.sprite.events.onDragStop.add(this.validMove, this.sprite);
  }, updateMove: function(rule, item){
      console.log(rule);
      console.log(this.sprite);
      this.sprite.events.onDragStop.add(this.rule(), this);
  },
  rookMove: function(item, pointer){
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
     //should be able to turn this into it's own function, but how to call it from within?
     // Ask a TA about scoping, should be able to figure 
    function isHere(element){
      //checks to see if there is another piece on the 'new' square
        if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite && item.color != element.sprite.color){
            element.sprite.destroy();
            item.originX = item.x;
            item.originY = item.y;
            return true
          } 
          //checks to see if the other piece is of the same color or not
        if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite && item.color === element.sprite.color){
          game.add.tween(item).to({x: item.originX, y: item.originY}, 400, Phaser.Easing.Back.Out, true);
        } else {
            return false
        }
    }
      var match = allPiecesArray.filter(isHere);
      item.originX = item.x;
      item.originY = item.y;
     }
  },
  queenMove: function(item, pointer){

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
  validMove: function(item, pointer){
    // // function isHere(element){
    //   // if(element.sprite.x === item.x && element.sprite.y === item.y && item != element.sprite){
    //     element.sprite.destroy();
    //     return true
    //   } else{
    //     return false
    //   }
    // }

    // var match = allPiecesArray.filter(isHere);
  },
}

function Queen(game, color, xcoor, ycoor, pieceName){
  this.create(xcoor, ycoor, pieceName, color);
}
Queen.prototype = new Piece();

Queen.prototype.move = function(){
  this.move = this.sprite.events.onDragStop.add(this.queenMove, this.sprite);
}
