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
  console.log("KINGS ARE BECOMING BATMAN");
  var blackX = allPiecesArray[1].sprite.x,
    blackY = allPiecesArray[1].sprite.y,
    whiteX = allPiecesArray[17].sprite.x,
    whiteY = allPiecesArray[17].sprite.y,
    blackID = allPiecesArray[1].pieceId,
    whiteID = allPiecesArray[17].pieceId;

  // destroy the kings, insert a fun smoke animation or something

  console.log('before transform', allPiecesArray[1].pieceId);

  whooshSound.play();

  allPiecesArray[1].sprite.destroy();
  allPiecesArray[1].sprite.destroy();
  allPiecesArray[17].sprite.destroy();
  allPiecesArray[17].sprite.destroy();
  // generate batman on the king coords
  var bKing = new King(game, 'black', (blackX / 100), (blackY / 100), 'batman');
  var wKing = new King(game, 'white', (whiteX / 100), (whiteY / 100), 'batman');
  bKing.pieceId = blackID;
  wKing.pieceId = whiteID;
  // ensure that pieceId identifier stays the same after recreating the kings

  bKing.sprite.height = 95;
  bKing.sprite.width = 95;
  bKing.sprite.animations.add('quiver');
  bKing.sprite.animations.play('quiver', 10, false);
  wKing.sprite.height = 95;
  wKing.sprite.width = 95;
  wKing.sprite.animations.add('quiver');
  wKing.sprite.animations.play('quiver', 10, false);
}

var verticalQueens = function(){
  allPiecesArray[16].move = Piece.prototype.vertical;
  allPiecesArray[0].move = Piece.prototype.vertical;
}

var sidewaysKings = function(){
  allPiecesArray[1].move = Piece.prototype.sideways;
  allPiecesArray[17].move = Piece.prototype.sideways;
}
var deleteBishops = function(){
  allPiecesArray[1].onBoard = Piece.prototype.deleteBishop;
  allPiecesArray[17].onBoard = Piece.prototype.deleteBishop;

}
var deleteBoard = function(){
  var testImage = game.add.sprite(-250, -200, 'largeExplosion');
  testImage.height = 1200;
  testImage.width = 1200;
  testImage.animations.add('largeExplosion');
  testImage.animations.play('largeExplosion', true);
  window.background.destroy();
}
var nothing = function(){
  
}

window.allRulesArray = [
  ['If a queen moves, all pawns will be captured', queenKillsPieces],
  ['All rooks can now move like queens', rooksToQueens],
  ['One piece on the board can now teleport', oneTeleport],
  ['Both Queens are now stuck', stuckQueens],
  ['Kings are now Batman', kingsBecomeBatman],
  ['Rooks can only move horizontally', horizontalRooks], 
  ['Queens can only move vertically', verticalQueens], 
  ['Kings can only move sideways', sidewaysKings], 
  ['If a king moves, all bishops will be captured', deleteBishops], 
  ['Welp! No more board!', deleteBoard],
  ["Mystery rule! Something has changed, but what?",  nothing] 
];
