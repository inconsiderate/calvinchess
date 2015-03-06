function Pawn(game, color, xcoor, ycoor, pieceName) {
  this.create(xcoor, ycoor, pieceName, color);
}

Pawn.prototype = new Piece();

Pawn.prototype.default_move = function() {
  var piece = this;
  var item = this.sprite;
  var xRatio = Math.abs(item.x - item.originX);
  var yRatio = Math.abs(item.y - item.originY);
  if (Math.abs(item.originY - item.y) > adjustDistance(1) || Math.abs(item.originX - item.x) > adjustDistance(1)) {
    if (item.counter > 0 || xRatio > 1) {
      game.add.tween(item).to({
        x: item.originX,
        y: item.originY
      }, 400, Phaser.Easing.Back.Out, true);
    } else if (yRatio > adjustDistance(2) || xRatio > adjustDistance(2)) {
      game.add.tween(item).to({
        x: item.originX,
        y: item.originY
      }, 400, Phaser.Easing.Back.Out, true);
    } else {
        var match = allPiecesArray.filter(this.isPieceHere, this);
        var between = allPiecesArray.filter(this.isPieceBetweenUpDown, this);
        console.log(between);
        valid(item);
    }
    // below if statements check for the color of the pawn - ensures they can not move backwards
  } else if (item.color === 'black' && item.y < item.originY) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else if (item.color === 'white' && item.y > item.originY) {
    game.add.tween(item).to({
      x: item.originX,
      y: item.originY
    }, 400, Phaser.Easing.Back.Out, true);
  } else {
    var match = allPiecesArray.filter(this.isPieceHere, this);
    var between = allPiecesArray.filter(this.isPieceBetweenUpDown, this);
    function valid(item) {
      if (match.length > 0 && item.x === item.originX) {
        console.log(1);
        game.add.tween(item).to({
          x: item.originX,
          y: item.originY
        }, 400, Phaser.Easing.Back.Out, true);
      } else if (match.length === 0 && item.x != item.originX) {
        game.add.tween(item).to({
          x: item.originX,
          y: item.originY
        }, 400, Phaser.Easing.Back.Out, true);
      } else if (match.length > 0 && match[0].sprite.color != item.color && xRatio === yRatio) {
        piece.killAction(item, match);
      } else if (match.length > 0 && item.x != item.originX) {
        console.log(3);
        game.add.tween(item).to({
          x: item.originX,
          y: item.originY
        }, 400, Phaser.Easing.Back.Out, true);
      } else {
        if (item.x === item.originX && item.y === item.originY) {
          return true;
        } else if(between.length > 0){
          console.log("something between, bouncing back!");
          game.add.tween(item).to({
            x: item.originX,
            y: item.originY
          }, 400, Phaser.Easing.Back.Out, true);
        }else{
          console.log("resetting!");
          piece.resetOrigin(item, item.x, item.y, piece);
        }
      }
    }
    valid(item);
  }
  console.log ('pawn position:', item.y, this);
  if ((item.color == "white") && (item.y == 2)) {
    //make this piece a queen
    console.log(item);
    item.loadTexture('wQueen');
    piece.move = Queen.prototype.default_move;
    console.log('WHITE BECOME A QUEEN');
  } else if ((item.color == "black") && (item.y == 527)) {
    //make this piece a queen 
    item.loadTexture('bQueen');
    piece.move = Queen.prototype.default_move;
    console.log('BLACK BECOME A QUEEN');
  }
};
Pawn.prototype.move = Pawn.prototype.default_move;
Pawn.prototype.onBoard= Piece.prototype.onBoard;
