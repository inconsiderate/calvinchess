
var queenKillsPieces = function(){
	wQueen.onBoard = Piece.prototype.deletePawns; 
	bQueen.onBoard = Piece.prototype.deletePawns;
};


var someOtherAwesomeRule = function(){

};


window.allRulesArray = [['If a queen moves, all pawns will be captured', queenKillsPieces], ['two', 'drei'], ['three', 'zwei']];
