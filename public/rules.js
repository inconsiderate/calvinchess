var queenKillsPieces = function() {
  allPiecesArray[16].onBoard = Piece.prototype.deletePawn;
  allPiecesArray[0].onBoard = Piece.prototype.deletePawn;
};


var rooksToQueens = function() {
  console.log(allPiecesArray[2])
  allPiecesArray[2].move = Queen.prototype.default_move;
  allPiecesArray[3].move = Queen.prototype.default_move;
  allPiecesArray[18].move = Queen.prototype.default_move;
  allPiecesArray[19].move = Queen.prototype.default_move;
};

var oneTeleport = function() {
  console.log("ONE TELEPORT HAS BEEN CALLED");
  var random = Math.floor((Math.random() * 31) + 1);
  console.log("Teleportation Piece: ", allPiecesArray[random]);
  allPiecesArray[random].move = Piece.prototype.teleport
  console.log(allPiecesArray[random].pieceId);
}

var stuckQueens = function() {
  allPiecesArray[16].move = Piece.prototype.stuck;
  allPiecesArray[0].move = Piece.prototype.stuck;
}

var horizontalRooks = function() {
  allPiecesArray[2].move = Piece.prototype.sideways;
  allPiecesArray[3].move = Piece.prototype.sideways;
  allPiecesArray[18].move = Piece.prototype.sideways;
  allPiecesArray[19].move = Piece.prototype.sideways;
}

var kingsBecomeBatman = function() {
  // grab the current coords of the two kings
  allPiecesArray[1].sprite.loadTexture('batman');
  allPiecesArray[17].sprite.loadTexture('batman');
  window.whooshSound.play();
  allPiecesArray[17].sprite.height = 75;
  allPiecesArray[17].sprite.width = 75;
  allPiecesArray[17].sprite.animations.add('quiver');
  allPiecesArray[17].sprite.animations.play('quiver', 10, false);
  allPiecesArray[1].sprite.height = 75;
  allPiecesArray[1].sprite.width = 75;
  allPiecesArray[1].sprite.animations.add('quiver');
  allPiecesArray[1].sprite.animations.play('quiver', 10, false);
  console.log(allPiecesArray[1].sprite.color);
}

var verticalQueens = function() {
  allPiecesArray[16].move = Piece.prototype.vertical;
  allPiecesArray[0].move = Piece.prototype.vertical;
}

var sidewaysKings = function() {
  allPiecesArray[1].move = Piece.prototype.sideways;
  allPiecesArray[17].move = Piece.prototype.sideways;
}

var deleteBishops = function() {
  allPiecesArray[1].onBoard = Piece.prototype.deleteBishop;
  allPiecesArray[17].onBoard = Piece.prototype.deleteBishop;
}

var deleteBoard = function() {
  var explosionAnimation = game.add.sprite(-250, -200, 'largeExplosion');
  explosionAnimation.height = 1000;
  explosionAnimation.width = 1000;
  explosionAnimation.animations.add('largeExplosion');
  explosionAnimation.animations.play('largeExplosion', 20, false);
  window.background.loadTexture('background2');
  window.background.height = 600;
  window.background.width = 600;
}

var emptyFunction = function() {}

var backToStart = function(){
  //these changes are not sent to the server
  resetPosition(allPiecesArray[0], 3, 0);
  resetPosition(allPiecesArray[1], 4, 0)
  resetPosition(allPiecesArray[2], 7, 0)
  resetPosition(allPiecesArray[3], 0, 0)
  resetPosition(allPiecesArray[4], 2, 0)
  resetPosition(allPiecesArray[5], 5, 0)
  resetPosition(allPiecesArray[6], 1, 0)
  resetPosition(allPiecesArray[7], 6, 0)
  resetPosition(allPiecesArray[8], 0, 1)
  resetPosition(allPiecesArray[9], 1, 1)
  resetPosition(allPiecesArray[10], 2, 1)
  resetPosition(allPiecesArray[11], 3, 1)
  resetPosition(allPiecesArray[12], 4, 1)
  resetPosition(allPiecesArray[13], 5, 1)
  resetPosition(allPiecesArray[14], 6, 1)
  resetPosition(allPiecesArray[15], 7, 1)

  resetPosition(allPiecesArray[16], 3, 7);
  resetPosition(allPiecesArray[17], 4, 7)
  resetPosition(allPiecesArray[18], 7, 7)
  resetPosition(allPiecesArray[19], 0, 7)
  resetPosition(allPiecesArray[20], 2, 7)
  resetPosition(allPiecesArray[21], 5, 7)
  resetPosition(allPiecesArray[22], 1, 7)
  resetPosition(allPiecesArray[23], 6, 7)
  resetPosition(allPiecesArray[24], 0, 6)
  resetPosition(allPiecesArray[25], 1, 6)
  resetPosition(allPiecesArray[26], 2, 6)
  resetPosition(allPiecesArray[27], 3, 6)
  resetPosition(allPiecesArray[28], 4, 6)
  resetPosition(allPiecesArray[29], 5, 6)
  resetPosition(allPiecesArray[30], 6, 6)
  resetPosition(allPiecesArray[31], 7, 6)
}
function resetPosition(item, xcoord, ycoord){
    console.log("This piece was reset: ", item.pieceId)
    var newX = adjustCoord(xcoord);
    var newY = adjustCoord(ycoord);
    item.sprite.y = newY
    item.sprite.originY = newY
    item.sprite.x = newX
    item.sprite.originX = newX
  }

var scramble = function(){
  resetPosition(allPiecesArray[0], 6, 4);
  resetPosition(allPiecesArray[1], 0, 1)
  resetPosition(allPiecesArray[2], 5, 2)
  resetPosition(allPiecesArray[3], 1, 0)
  resetPosition(allPiecesArray[4], 7, 7)
  resetPosition(allPiecesArray[5], 3, 4)
  resetPosition(allPiecesArray[6], 2, 7)
  resetPosition(allPiecesArray[7], 5, 5)
  resetPosition(allPiecesArray[8], 6, 6)
  resetPosition(allPiecesArray[9], 7, 1)
  resetPosition(allPiecesArray[10], 5, 3)
  resetPosition(allPiecesArray[11], 4, 3)
  resetPosition(allPiecesArray[12], 2, 5)
  resetPosition(allPiecesArray[13], 5, 1)
  resetPosition(allPiecesArray[14], 2, 3)
  resetPosition(allPiecesArray[15], 7, 6)

  resetPosition(allPiecesArray[16], 0, 7);
  resetPosition(allPiecesArray[17], 0, 3)
  resetPosition(allPiecesArray[18], 1, 2)
  resetPosition(allPiecesArray[19], 3, 3)
  resetPosition(allPiecesArray[20], 4, 4)
  resetPosition(allPiecesArray[21], 0, 4)
  resetPosition(allPiecesArray[22], 4, 7)
  resetPosition(allPiecesArray[23], 6, 7)
  resetPosition(allPiecesArray[24], 0, 6)
  resetPosition(allPiecesArray[25], 1, 7)
  resetPosition(allPiecesArray[26], 2, 6)
  resetPosition(allPiecesArray[27], 3, 0)
  resetPosition(allPiecesArray[28], 4, 0)
  resetPosition(allPiecesArray[29], 5, 7)
  resetPosition(allPiecesArray[30], 7, 3)
  resetPosition(allPiecesArray[31], 6, 1)
}

window.allRulesArray = [
  ['If a queen moves, all pawns will be captured', queenKillsPieces, 'If a queen moves, all pawns will be captured'],
  ['All rooks can now move like queens', rooksToQueens, 'All rooks can now move like queens'],
  ['One piece on the board can now teleport...but which one?', oneTeleport, 'One piece on the board can now teleport...but which one?'],
  ['Both Queens are now stuck', stuckQueens, 'Both Queens are now stuck'],
  ['Kings are now Batman', kingsBecomeBatman, 'Kings are now Batman'],
  ['Rooks can only move horizontally', horizontalRooks, 'Rooks can only move horizontally'],
  ['Queens can only move vertically', verticalQueens, 'Queens can only move vertically'],
  ['Kings can only move sideways', sidewaysKings, 'Kings can only move sideways'],
  ['If a king moves, all bishops will be captured', deleteBishops, 'If a king moves, all bishops will be captured'],
  ['Welp! No more board!', deleteBoard, 'Welp! No more board!'],
  ['Mystery rule! Something has changed, but what?', emptyFunction, 'Mystery rule! Something has changed, but what?'], 
  ['Whoosh! All pieces back to their start positions!', backToStart, 'Whoosh! All pieces back to their start positions!'], 
  ['Scramble!', scramble, 'Scramble!']
];
