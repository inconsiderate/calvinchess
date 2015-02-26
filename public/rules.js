
var queenKillsPieces = function(){
	allPiecesArray[16].onBoard = Piece.prototype.deletePawns; 
	allPiecesArray[0].onBoard = Piece.prototype.deletePawns;
};


var rooksToQueens = function(){
	// since the array is a global variable this is the way we chose to access it.
	allPiecesArray[2].move = Queen.prototype.default_move;
	allPiecesArray[3].move = Queen.prototype.default_move;
	allPiecesArray[18].move = Queen.prototype.default_move;
	allPiecesArray[19].move = Queen.prototype.default_move;

};

var oneTeleport = function(){
	var random = Math.floor((Math.random() * 31) + 1);
	allPiecesArray[random].move = Piece.prototype.teleport
	console.log(allPiecesArray[random].pieceId);
}

var stuckQueens = function(){
	allPiecesArray[16].move = Piece.prototype.stuck; 
	allPiecesArray[0].move = Piece.prototype.stuck;
}

var horizontalRooks = function(){
	allPiecesArray[2].move = Piece.prototype.sideways;
	allPiecesArray[3].move = Piece.prototype.sideways;
	allPiecesArray[18].move = Piece.prototype.sideways;
	allPiecesArray[19].move = Piece.prototype.sideways;
}

var kingsBecomeBatman = function(){
	// grab the current coords of the two kings
	var x1 = allPiecesArray[1].sprite.x,
	y1 = allPiecesArray[1].sprite.y,
	x2 = allPiecesArray[17].sprite.x,
	y2 = allPiecesArray[17].sprite.y;
	// destroy the kings, with a fun smoke bomb
	allPiecesArray[1].sprite.destroy();
	allPiecesArray[1].sprite.destroy();
	allPiecesArray[17].sprite.destroy();
	allPiecesArray[17].sprite.destroy();
	// generate batman on the king coords
  var bKing = new King(game, 'black', (x1 / 100), (y1 / 100), 'batman');
  var wKing = new King(game, 'white', (x2 / 100), (y2 / 100), 'batman');

  bKing.height = 200;
  bKing.width = 200;
  bKing.animations.add('quiver');
  bKing.animations.play('quiver', 10, true);

}


window.allRulesArray = [['If a queen moves, all pawns will be captured', queenKillsPieces], 
['All rooks can now move like queens', rooksToQueens], 
['One piece on the board can now teleport', oneTeleport],
['Both Queens are now stuck', stuckQueens], 
['Kings are now Batman', kingsBecomeBatman],
['Rooks can only move horizontally', horizontalRooks]];

