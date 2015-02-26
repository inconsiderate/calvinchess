
var queenKillsPieces = function(){
	allPiecesArray[16].onBoard = Piece.prototype.deletePawns; 
	allPiecesArray[0].onBoard = Piece.prototype.deletePawns;
};


var someOtherAwesomeRule = function(){

};


window.allRulesArray = [['If a queen moves, all pawns will be captured', queenKillsPieces], 
['two', 'drei'], 
['three', 'zwei']];
