
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


window.allRulesArray = [['If a queen moves, all pawns will be captured', queenKillsPieces], 
['All rooks can now move like queens', rooksToQueens], 
['One piece on the board can now teleport', oneTeleport],
['Both Queens are now stuck', stuckQueens], 
['Rooks can only move horizontally', horizontalRooks]];
