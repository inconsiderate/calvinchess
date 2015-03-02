var queenKillsPieces = function() {
  allPiecesArray[16].onBoard = Piece.prototype.deletePawn;
  allPiecesArray[0].onBoard = Piece.prototype.deletePawn;
};


var rooksToQueens = function() {
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
  allPiecesArray[1].sprite.loadTexture('batman'),
  allPiecesArray[17].sprite.loadTexture('batman')
  allPiecesArray[17].sprite.height = 75;
  allPiecesArray[17].sprite.width = 75;
  allPiecesArray[17].sprite.animations.add('quiver');
  allPiecesArray[17].sprite.animations.play('quiver', 10, false);
  allPiecesArray[1].sprite.height = 75;
  allPiecesArray[1].sprite.width = 75;
  allPiecesArray[1].sprite.animations.add('quiver');
  allPiecesArray[1].sprite.animations.play('quiver', 10, false);
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
  ["Mystery rule! Something has changed, but what?", emptyFunction]

];
