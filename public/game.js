// window.Chess = {};
// function Board() {
//   this.pieces = [];
// }

// Board.prototype.addPiece = function(piece, coordinate) {

// };

window.onload = function() {
    window.game = new Phaser.Game(800, 800, Phaser.AUTO, 'game', { preload: preload, create: create, render: render, update: update});
    window.allPiecesArray = [];
    //Are you sure these have to be defined here?
    var bQueen, bKing, b1Rook, b2Rook, b1Bishop, b2Bishop, b1Knight, b2Knight, 
          b1Pawn, b2Pawn, b3Pawn, b4Pawn, b5Pawn, b6Pawn, b7Pawn, b8Pawn;
    //Are you sure these have to be defined here?
    var wQueen, wKing, w1Rook, w2Rook, w1Bishop, w2Bishop, w1Knight, w2Knight, 
          w1Pawn, w2Pawn, w3Pawn, w4Pawn, w5Pawn, w6Pawn, w7Pawn, w8Pawn;
    
    function preload () {
    
      game.load.image('background', '/images/chessboard.png');
      game.load.image('square', '/images/grid.jpeg');
      game.load.image('bQueen', '/images/blackqueen.png');
      game.load.image('bKing', '/images/blackking.png');
      game.load.image('bRook', '/images/blackrook.png');
      game.load.image('bBishop', '/images/blackbishop.png');
      game.load.image('bKnight', '/images/blackknight.png');
      game.load.image('bPawn', '/images/blackpawn.png');

      game.load.image('wQueen', '/images/whitequeen.png');
      game.load.image('wKing', '/images/whiteking.png');
      game.load.image('wRook', '/images/whiterook.png');
      game.load.image('wBishop', '/images/whitebishop.png');
      game.load.image('wKnight', '/images/whiteknight.png');
      game.load.image('wPawn', '/images/whitepawn.png');
  }
    var fullScreenKey
    var allPieces;
    var grid = [];
    var currentTile = new Phaser.Point();
    
    function create () {

      game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.physics.startSystem(Phaser.Physics.ARCADE);

        // Create GRID for units to move over.
        for (var y=0; y<8; y++) 
        {
          grid[y]= [];
          for (var x=0; x<8; x++){
            grid[y][x] = game.add.image(x * 100, y * 100, 'square');
          }
        }
        var background = game.add.image(0, 0, 'background');
        background.height = 800;
        background.width = 800;

        // var allPieces = game.add.group();
        bQueen = new Queen(game, 'black',3, 0, 'bQueen');
        bKing = new King(game, 'black', 4, 0, 'bKing');
        b1Rook = new Rook(game, 'black',7,0,'bRook');
        b2Rook = new Rook(game, 'black',0,0, 'bRook');
        b1Bishop = new Bishop(game, 'black', 2,0, 'bBishop');
        b2Bishop = new Bishop(game, 'black', 5,0, 'bBishop');
        b1Knight = new Knight(game, 'black', 1, 0, 'bKnight');
        b2Knight = new Knight(game, 'black', 6, 0, 'bKnight');
        b1Pawn = new Pawn(game, 'black', 0, 1, 'bPawn');
        b2Pawn = new Pawn(game, 'black', 1, 1, 'bPawn');
        b3Pawn = new Pawn(game, 'black', 2, 1, 'bPawn');
        b4Pawn = new Pawn(game, 'black', 3, 1, 'bPawn');
        b5Pawn = new Pawn(game, 'black', 4, 1, 'bPawn');
        b6Pawn = new Pawn(game, 'black', 5, 1, 'bPawn');
        b7Pawn = new Pawn(game, 'black', 6, 1, 'bPawn');
        b8Pawn = new Pawn(game, 'black', 7, 1, 'bPawn');
          
        // Generate WHITE starting pieces
        wQueen = new Queen(game, 'white', 3, 7, 'wQueen');
        wKing = new King(game, 'white',4, 7, 'wKing');
        w1Rook = new Rook(game, 'white', 7, 7, 'wRook');
        w2Rook = new Rook(game, 'white',0, 7, 'wRook');
        w1Bishop = new Bishop(game, 'white', 2, 7, 'wBishop');
        w2Bishop = new Bishop(game, 'white', 5, 7, 'wBishop');
        w1Knight = new Knight(game, 'white', 1, 7, 'wKnight');
        w2Knight = new Knight(game, 'white', 6, 7, 'wKnight');

        w1Pawn = new Pawn(game, 'white', 0, 6, 'wPawn');
        w2Pawn = new Pawn(game, 'white', 1, 6, 'wPawn');
        w3Pawn = new Pawn(game, 'white', 2, 6, 'wPawn');
        w4Pawn = new Pawn(game, 'white', 3, 6, 'wPawn');
        w5Pawn = new Pawn(game, 'white', 4, 6, 'wPawn');
        w6Pawn = new Pawn(game, 'white', 5, 6, 'wPawn');
        w7Pawn = new Pawn(game, 'white', 6, 6, 'wPawn');
        w8Pawn = new Pawn(game, 'white', 7, 6, 'wPawn');

        // add all pieces to an array, so their positions on the board can be checked
        allPiecesArray.push(bQueen, bKing, b1Rook, b2Rook, b1Bishop, b2Bishop, b1Knight, b2Knight, 
          b1Pawn, b2Pawn, b3Pawn, b4Pawn, b5Pawn, b6Pawn, b7Pawn, b8Pawn, wQueen, wKing, w1Rook, w2Rook, w1Bishop, w2Bishop, w1Knight, w2Knight, 
          w1Pawn, w2Pawn, w3Pawn, w4Pawn, w5Pawn, w6Pawn, w7Pawn, w8Pawn  );

        // Set F keypress to go Full Screen
        var fullScreenKey = this.input.keyboard.addKey(Phaser.Keyboard.F);
        fullScreenKey.onDown.add(gofull, this);
    }

    function clickedBlock() {
      if (currentTile.x >= 0 && currentTile.x <= 8 && currentTile.y >= 0 && currentTile.y <= 8)
      {
        square = grid[currentTile.y][currentTile.x];
        square.alpha = 0.5;
      }
      // valid();
    }

    function gofull() {
      if (game.scale.isFullScreen)
      {
        game.scale.stopFullScreen();
      } else {
        game.scale.startFullScreen(false);
      }
    }
    function update(){
      currentTile.x = this.game.math.snapToFloor(game.input.x, 100)/100;
      currentTile.y = this.game.math.snapToFloor(game.input.y, 100)/100;
      if(wKing.sprite.status === 'dead' || bKing.sprite.status === 'dead'){
        var style = { font: "65px Arial", fill: "#ff0044", align: "center", color: 'red' };
        var text = game.add.text(200, 200, 'Game Over!', style);
        wQueen.move = Piece.prototype.deletePieces;
        // wQueen.move(Knight);
      }
    }

    function render() {
      // game.debug.text('Tile X: ' + currentTile.x + 'Y: ' + currentTile.y, 100, 100);
    }
};